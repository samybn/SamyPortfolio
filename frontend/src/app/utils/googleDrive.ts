/**
 * Frontend utility for formatting, compressing, and serving responsive images
 * Supports Google Drive CDN, Higgs proxy (WebP), Unsplash, and standard image providers.
 */

export function getOptimizedImageUrl(
  urlOrId: string,
  width = 1200,
  quality = 80
): string {
  if (!urlOrId) return "";

  const trimmed = urlOrId.trim();

  // 0. Local static asset paths
  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  // 1. Higgs AI WebP optimization proxy
  if (trimmed.includes("images.higgs.ai")) {
    let optimized = trimmed;
    if (optimized.includes("w=")) {
      optimized = optimized.replace(/w=\d+/, `w=${width}`);
    } else {
      optimized += `&w=${width}`;
    }
    if (optimized.includes("q=")) {
      optimized = optimized.replace(/q=\d+/, `q=${quality}`);
    } else {
      optimized += `&q=${quality}`;
    }
    return optimized;
  }

  // 2. Unsplash responsive CDN
  if (trimmed.includes("images.unsplash.com")) {
    let optimized = trimmed;
    if (optimized.includes("w=")) {
      optimized = optimized.replace(/w=\d+/, `w=${width}`);
    } else {
      optimized += `&w=${width}`;
    }
    if (optimized.includes("q=")) {
      optimized = optimized.replace(/q=\d+/, `q=${quality}`);
    } else {
      optimized += `&q=${quality}`;
    }
    return optimized;
  }

  // 3. Google Drive ID or drive URL
  let fileId = trimmed;
  const dMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (dMatch && dMatch[1]) {
    fileId = dMatch[1];
  } else {
    const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (idMatch && idMatch[1]) {
      fileId = idMatch[1];
    }
  }

  // If already googleusercontent with =w parameter
  if (trimmed.includes("googleusercontent.com")) {
    if (trimmed.includes("=w")) {
      return trimmed.replace(/=w\d+/, `=w${width}`);
    }
    return `${trimmed}=w${width}`;
  }

  // Valid Google Drive file ID
  if (/^[a-zA-Z0-9_-]{20,}$/.test(fileId)) {
    return `https://lh3.googleusercontent.com/d/${fileId}=w${width}`;
  }

  return trimmed;
}

/**
 * Generate responsive srcset string for HTML img / picture tags
 */
export function getImageSrcSet(
  urlOrId: string,
  widths: number[] = [480, 768, 1024, 1440],
  quality = 80
): string {
  if (!urlOrId || urlOrId.startsWith("data:") || urlOrId.startsWith("blob:") || urlOrId.startsWith("/")) {
    return "";
  }
  return widths
    .map((w) => `${getOptimizedImageUrl(urlOrId, w, quality)} ${w}w`)
    .join(", ");
}

/**
 * Backwards compatibility helper for existing callers
 */
export function parseGoogleDriveUrl(urlOrId: string, width = 1200): string {
  return getOptimizedImageUrl(urlOrId, width);
}
