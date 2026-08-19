/**
 * Frontend utility for formatting Google Drive image links to high-res embeddable URLs
 */

export function parseGoogleDriveUrl(urlOrId: string, width = 1600): string {
  if (!urlOrId) return "";
  
  // If it's already an HTTP URL not from drive/google, return as is
  if (urlOrId.startsWith("http") && !urlOrId.includes("drive.google.com") && !urlOrId.includes("googleusercontent.com")) {
    return urlOrId;
  }

  // Extract ID
  let fileId = urlOrId.trim();

  // Pattern /d/<ID>
  const dMatch = urlOrId.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (dMatch && dMatch[1]) {
    fileId = dMatch[1];
  } else {
    // Pattern id=<ID>
    const idMatch = urlOrId.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (idMatch && idMatch[1]) {
      fileId = idMatch[1];
    }
  }

  // If we have a valid Drive ID (25+ chars typical for Google Drive)
  if (/^[a-zA-Z0-9_-]{20,}$/.test(fileId)) {
    return `https://lh3.googleusercontent.com/d/${fileId}=w${width}`;
  }

  return urlOrId;
}
