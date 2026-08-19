import { fetchDriveFolderFiles, getDriveDirectImageUrl } from "./googleDrive";

export interface Env {
  GOOGLE_DRIVE_API_KEY?: string;
  GOOGLE_DRIVE_FOLDER_ID?: string;
  CONTACT_RECEIVER_EMAIL?: string;
  RESEND_API_KEY?: string;
  ALLOWED_ORIGIN?: string;
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

function jsonResponse(data: unknown, status = 200, origin: string | null, env: Env) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...getCorsHeaders(origin, env),
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
        const folderId = url.searchParams.get("folderId") || env.GOOGLE_DRIVE_FOLDER_ID;
        const apiKey = env.GOOGLE_DRIVE_API_KEY;

        if (!folderId) {
          return jsonResponse({
            success: false,
            message: "No GOOGLE_DRIVE_FOLDER_ID configured",
            projects: [],
          }, 200, origin, env);
        }

        const files = await fetchDriveFolderFiles(folderId, apiKey);
        return jsonResponse({
          success: true,
          count: files.length,
          files,
        }, 200, origin, env);
      } catch (err: any) {
        return jsonResponse({ success: false, error: err.message }, 500, origin, env);
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
        return jsonResponse({ success: false, error: err.message }, 500, origin, env);
      }
    }

    return jsonResponse({ error: "Route non trouvée" }, 404, origin, env);
  },
};
