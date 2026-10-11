import { fetchDriveFolderFiles, getDriveDirectImageUrl } from "./googleDrive";

export interface Env {
  GOOGLE_DRIVE_API_KEY?: string;
  GOOGLE_DRIVE_FOLDER_ID?: string;
  CONTACT_RECEIVER_EMAIL?: string;
  RESEND_API_KEY?: string;
  ALLOWED_ORIGIN?: string;
  ALLOWED_FOLDER_IDS?: string;
  ASSETS?: { fetch: (request: Request) => Promise<Response> };
}

/**
 * Whitelist des identifiants de dossiers Google Drive autorisés.
 * Ajoutez vos identifiants réels de dossiers ici lorsque vous les aurez prêts.
 */
export const ALLOWED_FOLDER_IDS: string[] = [
  // "1AbCdEfGhIjKlMnOpQrStUvWxYz",
];

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

    // Contact form submission
    if (url.pathname === "/api/contact" && request.method === "POST") {
      try {
        const body = (await request.json()) as {
          name?: string;
          email?: string;
          message?: string;
        };

        const { name, email, message } = body;

        if (!name || !email || !message) {
          return jsonResponse({
            success: false,
            error: "Tous les champs sont requis (name, email, message).",
          }, 400, origin, env);
        }

        // Optional email forwarding if RESEND_API_KEY and CONTACT_RECEIVER_EMAIL are set
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
                subject: `Nouveau message Portfolio de ${name}`,
                reply_to: email,
                text: `De: ${name} (${email})\n\nMessage:\n${message}`,
              }),
            });
          } catch (mailErr) {
            console.error("Erreur lors de l'envoi du mail:", mailErr);
          }
        }

        return jsonResponse({
          success: true,
          message: "Message reçu avec succès!",
        }, 200, origin, env);
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

    // SPA fallback: serve index.html for all non-API routes (e.g. /projects/xxx)
    // This enables clean URL routing for the React frontend
    if (env.ASSETS && !url.pathname.startsWith("/api/")) {
      try {
        const indexUrl = new URL("/index.html", request.url);
        return await env.ASSETS.fetch(new Request(indexUrl, request));
      } catch {
        // Fall through to 404 if ASSETS fails
      }
    }

    return jsonResponse({ error: "Route non trouvée" }, 404, origin, env);
  },
};
