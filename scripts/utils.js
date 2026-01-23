// utils.js - tiny helpers used across modules
export function correctUrl(url) {
  if (url.includes("https://") || url.includes("http://")) return url;
  return `https://${url}`;
}

export function getFaviconUrl(pageUrl, size = 32) {
  try {
    // in chrome case
    const isChrome = navigator.userAgent.toLowerCase().includes("chrome") && !!window.chrome;
    if (isChrome) {
      return chrome.runtime.getURL(`/_favicon/?size=32&pageUrl`);
    }

    // For other browsers
    return `https://faviconfetcher.deno.dev/?url`;
  } catch (e) {
    console.log(e);
    return `https://faviconfetcher.deno.dev/?url`;
  }
}

export function getOrUpdateLocalStorage(key, value) {
  if (value === undefined) {
    return localStorage.getItem(key);
  }
  localStorage.setItem(key, value);
}

/**
 * `https://sihab.deno.dev =>` `true`
 * `sihab.deno.dev` => `true`
 */
export function isLink(str) {
  // simple fallback: treat strings with dots and no spaces as links
  const simple = /^[^\s]+\.[^\s]+$/;
  return simple.test(str);
}
