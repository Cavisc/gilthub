const cache = new Map();

export function getCached(key) {
  const item = cache.get(key);
  if (item && Date.now() < item.expiry) {
    return item.data;
  }
  cache.delete(key);
  return null;
}

export function setCache(key, data, ttl = 5 * 60 * 1000) {
  cache.set(key, {
    data,
    expiry: Date.now() + ttl,
  });
}

export function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString("pt-BR");
}

export function escapeHtml(str) {
  return str.replace(/[&<>]/g, function (m) {
    if (m === "&") return "&amp;";
    if (m === "<") return "&lt;";
    if (m === ">") return "&gt;";
    return m;
  });
}

export function calcPages(reposNum) {
  return Math.ceil(reposNum / 30);
}
