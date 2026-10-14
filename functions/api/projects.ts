import { fetchDriveFolderFiles } from "../../backend/src/googleDrive";

interface Env {
  GOOGLE_DRIVE_API_KEY?: string;
  GOOGLE_DRIVE_FOLDER_ID?: string;
  ALLOWED_ORIGIN?: string;
  ALLOWED_FOLDER_IDS?: string;
}

const ALLOWED_FOLDER_IDS: string[] = [];

function getCorsHeaders(origin: string | null, env: Env) {
  const allowed = env.ALLOWED_ORIGIN || "*";
  return {
    "Access-Control-Allow-Origin": allowed === "*" ? (origin || "*") : allowed,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
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

export const onRequestGet = async ({ request, env }: { request: Request; env: Env }) => {
  const url = new URL(request.url);
  const origin = request.headers.get("Origin");

  try {
    const defaultFolderId = env.GOOGLE_DRIVE_FOLDER_ID;
    const requestedFolderId = url.searchParams.get("folderId");
    const apiKey = env.GOOGLE_DRIVE_API_KEY;

    let targetFolderId = defaultFolderId;

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
};
