import { fetchDriveFolderFiles } from "./googleDrive";

export interface Env {
  GOOGLE_DRIVE_API_KEY?: string;
  GOOGLE_DRIVE_FOLDER_ID?: string;
  CONTACT_RECEIVER_EMAIL?: string;
  RESEND_API_KEY?: string;
  ALLOWED_ORIGIN?: string;
  ALLOWED_FOLDER_IDS?: string;
  /** Cloudflare Turnstile secret key (dashboard → Turnstile) */
  TURNSTILE_SECRET_KEY?: string;
  /** Cloudflare KV namespace bound as RATE_LIMIT_KV in wrangler.toml */
  RATE_LIMIT_KV?: KVNamespace;
  ASSETS?: { fetch: (request: Request) => Promise<Response> };
}

/**
 * Whitelist des identifiants de dossiers Google Drive autorisés.
 * Ajoutez vos identifiants réels de dossiers ici lorsque vous les aurez prêts.
 */
export const ALLOWED_FOLDER_IDS: string[] = [
  // "1AbCdEfGhIjKlMnOpQrStUvWxYz",
];

// ── Validation ────────────────────────────────────────────────────────────────

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FIELD_LIMITS = { name: 100, email: 320, message: 5_000 } as const;

function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email) && email.length <= FIELD_LIMITS.email;
}

// ── Rate limiting (Cloudflare KV) ─────────────────────────────────────────────

const RATE_MAX = 5;       // submissions allowed per window
const RATE_WINDOW = 60;   // seconds

async function isRateLimited(ip: string, kv: KVNamespace): Promise<boolean> {
  const key = `rl:contact:${ip}`;
  const raw = await kv.get(key);
  const count = raw ? parseInt(raw, 10) : 0;
  if (count >= RATE_MAX) return true;
  await kv.put(key, String(count + 1), { expirationTtl: RATE_WINDOW });
  return false;
}

// ── Cloudflare Turnstile ──────────────────────────────────────────────────────

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

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: getCorsHeaders(origin, env),
      });
    }

    // Health check
    if (url.pathname === "/api/health") {
      return jsonResponse({ status: "healthy", timestamp: new Date().toISOString() }, 200, origin, env);
    }

    // Get Projects / Google Drive assets
    if (url.pathname === "/api/projects" && request.method === "GET") {
      try {
        const defaultFolderId = env.GOOGLE_DRIVE_FOLDER_ID;
        const requestedFolderId = url.searchParams.get("folderId");
        const apiKey = env.GOOGLE_DRIVE_API_KEY;

        let targetFolderId = defaultFolderId;

        // Validation whitelist si un folderId spécifique est passé en paramètre
        if (requestedFolderId) {
          const envAllowedIds = env.ALLOWED_FOLDER_IDS
            ? env.ALLOWED_FOLDER_IDS.split(",").map((id) => id.trim())
            : [];
          const allAllowed = [...ALLOWED_FOLDER_IDS, ...envAllowedIds];

          const isAllowed =
            requestedFolderId === defaultFolderId ||
            allAllowed.includes(requestedFolderId);

          if (!isAllowed) {
            return jsonResponse(
              { success: false, error: "Accès refusé : identifiant de dossier non autorisé." },
              403,
              origin,
              env
            );
          }

          targetFolderId = requestedFolderId;
        }

        if (!targetFolderId) {
          return jsonResponse({
            success: false,
            message: "No GOOGLE_DRIVE_FOLDER_ID configured",
            projects: [],
          }, 200, origin, env);
        }

        const files = await fetchDriveFolderFiles(targetFolderId, apiKey);
        return jsonResponse({
          success: true,
          count: files.length,
          files,
        }, 200, origin, env);
      } catch (err: any) {
        console.error("Erreur récupération projets:", err);
        return jsonResponse(
          { success: false, error: "Une erreur est survenue lors de la récupération des projets." },
          500,
          origin,
          env
        );
      }
    }

    // ── POST /api/contact ─────────────────────────────────────────────────────
    if (url.pathname === "/api/contact" && request.method === "POST") {
      try {
        const ip =
          request.headers.get("CF-Connecting-IP") ||
          request.headers.get("X-Forwarded-For")?.split(",")[0].trim() ||
          "unknown";

        // ① Rate limiting — 5 submissions per 60 s per IP
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
          /** Honeypot — hidden field, must stay empty */
          website?: string;
          /** Cloudflare Turnstile response token */
          turnstileToken?: string;
        };

        // ② Honeypot — silent accept so bots can't detect the trap
        if (body.website && body.website.trim() !== "") {
          return jsonResponse({ success: true, message: "Message reçu avec succès!" }, 200, origin, env);
        }

        // ③ Turnstile CAPTCHA (only enforced when TURNSTILE_SECRET_KEY is set)
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

        // ④ Required field presence
        const { name, email, message } = body;
        if (!name || !email || !message) {
          return jsonResponse(
            { success: false, error: "Tous les champs sont requis (nom, email, message)." },
            400,
            origin,
            env
          );
        }

        // ⑤ Field length limits
        if (name.trim().length > FIELD_LIMITS.name) {
          return jsonResponse({ success: false, error: `Le nom ne doit pas dépasser ${FIELD_LIMITS.name} caractères.` }, 400, origin, env);
        }
        if (message.trim().length > FIELD_LIMITS.message) {
          return jsonResponse({ success: false, error: `Le message ne doit pas dépasser ${FIELD_LIMITS.message} caractères.` }, 400, origin, env);
        }

        // ⑥ Email format validation
        if (!isValidEmail(email.trim())) {
          return jsonResponse({ success: false, error: "Format d'email invalide." }, 400, origin, env);
        }

        // ⑦ Sanitize — strip ASCII control characters (keep \n \r \t)
        const safeName    = name.trim().replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
        const safeEmail   = email.trim();
        const safeMessage = message.trim().replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

        // ⑧ Forward via Resend (optional — requires env vars)
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
    }


    // Static Assets & SPA routing fallback (clean URLs for React)
    if (env.ASSETS && !url.pathname.startsWith("/api/")) {
      try {
        const response = await env.ASSETS.fetch(request);
        if (response.status !== 404) {
          return response;
        }
        // If route not found as a static asset, serve index.html for SPA client-side routing
        const indexUrl = new URL("/index.html", request.url);
        return await env.ASSETS.fetch(new Request(indexUrl, request));
      } catch {
        // Fall through to 404 if ASSETS fails
      }
    }

    return jsonResponse({ error: "Route non trouvée" }, 404, origin, env);
  },
};
