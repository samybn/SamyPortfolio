/**
 * Google Drive Helper utilities for fetching & formatting project assets
 */

export interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  webContentLink?: string;
  directImageUrl: string;
}

/**
 * Extracts a Google Drive file ID from various link formats
 */
export function extractDriveFileId(urlOrId: string): string {
  if (!urlOrId) return "";
  
  // If it's already an ID (alphanumeric, dashes, underscores)
  if (/^[a-zA-Z0-9_-]{25,}$/.test(urlOrId.trim())) {
    return urlOrId.trim();
  }

  // Matching /d/<ID>
  const dMatch = urlOrId.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (dMatch && dMatch[1]) return dMatch[1];

  // Matching id=<ID>
  const idMatch = urlOrId.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch && idMatch[1]) return idMatch[1];

  return urlOrId.trim();
}

/**
 * Converts a Google Drive file ID into a direct, high-res web-friendly image URL
 * @param fileIdOrUrl Google Drive file ID or shared link
 * @param width Max width desired (default: 1600px)
 */
export function getDriveDirectImageUrl(fileIdOrUrl: string, width = 1600): string {
  const fileId = extractDriveFileId(fileIdOrUrl);
  if (!fileId) return "";
  // Google's direct CDN format works for publicly accessible Drive images
  return `https://lh3.googleusercontent.com/d/${fileId}=w${width}`;
}

/**
 * Fetches files list from a public or API-accessible Google Drive folder
 */
export async function fetchDriveFolderFiles(
  folderId: string,
  apiKey?: string
): Promise<GoogleDriveFile[]> {
  if (!folderId) return [];

  // If Google Drive API Key is provided, use the official v3 REST API
  if (apiKey) {
    try {
      const q = encodeURIComponent(`'${folderId}' in parents and trashed = false`);
      const fields = encodeURIComponent("files(id, name, mimeType, thumbnailLink, webContentLink)");
      const url = `https://www.googleapis.com/drive/v3/files?q=${q}&fields=${fields}&key=${apiKey}`;

      const res = await fetch(url);
      if (res.ok) {
        const data = (await res.json()) as { files?: any[] };
        return (data.files || []).map((f) => ({
          id: f.id,
          name: f.name,
          mimeType: f.mimeType,
          thumbnailLink: f.thumbnailLink,
          webContentLink: f.webContentLink,
          directImageUrl: getDriveDirectImageUrl(f.id),
        }));
      }
    } catch (err) {
      console.error("Error fetching from Google Drive API:", err);
    }
  }

  return [];
}
