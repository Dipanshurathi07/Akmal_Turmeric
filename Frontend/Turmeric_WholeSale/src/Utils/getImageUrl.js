const rawBackendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
const BACKEND_URL = rawBackendUrl.replace(/\/api\/?$/i, '').replace(/\/$/, '');

function normalizeAssetPath(path) {
  const trimmed = path.replace(/^(\.\.\/|\.\/)+/, '').replace(/^\//, '');
  return trimmed.replace(/^assests\//i, 'Assests/');
}

export function getImageUrl(image) {
  if (!image) return '';

  const url = typeof image === 'string' ? image : image.url || '';
  if (!url) return '';

  const trimmedUrl = String(url).trim();
  if (!trimmedUrl) return '';

  if (/^(https?:|data:)/i.test(trimmedUrl)) {
    return trimmedUrl;
  }

  const normalized = normalizeAssetPath(trimmedUrl);

  try {
    return new URL(normalized, `${BACKEND_URL}/`).href;
  } catch {
    return BACKEND_URL ? `${BACKEND_URL}/${encodeURI(normalized)}` : encodeURI(normalized);
  }
}
