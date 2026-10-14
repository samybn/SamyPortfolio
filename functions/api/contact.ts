import { fetchDriveFolderFiles } from "../../backend/src/googleDrive";

interface Env {
  GOOGLE_DRIVE_API_KEY?: string;
  GOOGLE_DRIVE_FOLDER_ID?: string;
  CONTACT_RECEIVER_EMAIL?: string;
  RESEND_API_KEY?: string;
  ALLOWED_ORIGIN?: string;
  ALLOWED_FOLDER_IDS?: string;
  TURNSTILE_SECRET_KEY?: string;
  RATE_LIMIT_KV?: KVNamespace;
}

const ALLOWED_FOLDER_IDS: string[] = [];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FIELD_LIMITS = { name: 100, email: 320, message: 5_000 } as const;

function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email) && email.length <= FIELD_LIMITS.email;
}

const RATE_MAX = 5;
const RATE_WINDOW = 60;

async function isRateLimited(ip: string, kv: KVNamespace): Promise<boolean> {
  const key = `rl:contact:${ip}`;
  const raw = await kv.get(key);
  const count = raw ? parseInt(raw, 10) : 0;
  if (count >= RATE_MAX) return true;
  await kv.put(key, String(count + 1), { expirationTtl: RATE_WINDOW });
  return false;
}

async function verifyTurnstile(token: string, secret: string, ip: string): Promise<boolean> {
  try {
    const body = new URLSearchParams({ secret, response: token, remoteip: ip });
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
    });
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

function getCorsHeaders(origin: string | null, env: Env) {
  const allowed = env.ALLOWED_ORIGIN || "*";
  return {
    "Access-Control-Allow-Origin": allowed === "*" ? (origin || "*") : allowed,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}

function getSecurityHeaders() {
  return {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  };
}

function jsonResponse(data: unknown, status = 200, origin: string | null, env: Env) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...getCorsHeaders(origin, env),
      ...getSecurityHeaders(),
    },
  });
}

export const onRequestOptions = async ({ request, env }: { request: Request; env: Env }) => {
  const origin = request.headers.get("Origin");
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(origin, env),
  });
};

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  const origin = request.headers.get("Origin");
  try {
    const ip =
      request.headers.get("CF-Connecting-IP") ||
      request.headers.get("X-Forwarded-For")?.split(",")[0].trim() ||
      "unknown";

    if (env.RATE_LIMIT_KV) {
      if (await isRateLimited(ip, env.RATE_LIMIT_KV)) {
        return jsonResponse(
          { success: false, error: "Trop de requêtes. Veuillez patienter avant de réessayer." },
          429,
          origin,
          env
        );
      }
    }

    const body = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
      website?: string;
      turnstileToken?: string;
    };

    if (body.website && body.website.trim() !== "") {
      return jsonResponse({ success: true, message: "Message reçu avec succès!" }, 200, origin, env);
    }

    if (env.TURNSTILE_SECRET_KEY) {
      const token = (body.turnstileToken || "").trim();
      if (!token) {
        return jsonResponse(
          { success: false, error: "Vérification de sécurité manquante. Veuillez recharger la page." },
          400,
          origin,
          env
        );
      }
      if (!(await verifyTurnstile(token, env.TURNSTILE_SECRET_KEY, ip))) {
        return jsonResponse(
          { success: false, error: "Échec de la vérification de sécurité. Veuillez réessayer." },
          403,
          origin,
          env
        );
      }
    }

    const { name, email, message } = body;
    if (!name || !email || !message) {
      return jsonResponse(
        { success: false, error: "Tous les champs sont requis (nom, email, message)." },
        400,
        origin,
        env
      );
    }

    if (name.trim().length > FIELD_LIMITS.name) {
      return jsonResponse({ success: false, error: `Le nom ne doit pas dépasser ${FIELD_LIMITS.name} caractères.` }, 400, origin, env);
    }
    if (message.trim().length > FIELD_LIMITS.message) {
      return jsonResponse({ success: false, error: `Le message ne doit pas dépasser ${FIELD_LIMITS.message} caractères.` }, 400, origin, env);
    }

    if (!isValidEmail(email.trim())) {
      return jsonResponse({ success: false, error: "Format d'email invalide." }, 400, origin, env);
    }

    const safeName    = name.trim().replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
    const safeEmail   = email.trim();
    const safeMessage = message.trim().replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

    if (env.RESEND_API_KEY && env.CONTACT_RECEIVER_EMAIL) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: [env.CONTACT_RECEIVER_EMAIL],
            subject: `Nouveau message Portfolio de ${safeName}`,
            reply_to: safeEmail,
            text: `De: ${safeName} (${safeEmail})\n\nMessage:\n${safeMessage}`,
          }),
        });
      } catch (mailErr) {
        console.error("Erreur lors de l'envoi du mail:", mailErr);
      }
    }

    return jsonResponse({ success: true, message: "Message reçu avec succès!" }, 200, origin, env);
  } catch (err: any) {
    console.error("Erreur traitement contact:", err);
    return jsonResponse(
      { success: false, error: "Une erreur est survenue lors du traitement de votre demande." },
      500,
      origin,
      env
    );
  }
};
