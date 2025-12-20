// utils.js - tiny helpers used across modules
export function correctUrl(url) {
  if (url.includes("https://") || url.includes("http://")) return url;
  return `https://${url}`;
}

export function getFaviconUrl(pageUrl, size = 32) {
  try {
    const url = new URL(chrome.runtime.getURL("/_favicon/"));
    url.searchParams.set("pageUrl", pageUrl);
    url.searchParams.set("size", size.toString());
    return url.toString();
  } catch (e) {
    return `images/favicon.ico`;
  }
}
