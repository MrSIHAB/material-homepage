import * as __SVG_REGISTRY from "./svg.js";
// Expose registry on global so other scripts can use it easily
if (typeof window !== "undefined") {
  window.SVG_ICONS = Object.assign({}, window.SVG_ICONS || {}, __SVG_REGISTRY);
}

function _findSvgInRegistry(name) {
  if (!name) return undefined;
  // direct match
  if (Object.prototype.hasOwnProperty.call(__SVG_REGISTRY, name)) {
    return __SVG_REGISTRY[name];
  }
  // try normalized variants
  const alt1 = name.replace(/[^A-Za-z0-9_$]/g, "_");
  if (Object.prototype.hasOwnProperty.call(__SVG_REGISTRY, alt1)) {
    return __SVG_REGISTRY[alt1];
  }
  // camelCase from dashed/underscored names
  const alt2 = name.replace(/[-_ ]+(.)/g, (_, c) => c.toUpperCase());
  if (Object.prototype.hasOwnProperty.call(__SVG_REGISTRY, alt2)) {
    return __SVG_REGISTRY[alt2];
  }
  // lowercase match
  const keys = Object.keys(__SVG_REGISTRY);
  const lower = keys.find((k) => k.toLowerCase() === name.toLowerCase());
  return lower ? __SVG_REGISTRY[lower] : undefined;
}

function insertSvgs(root = document) {
  try {
    const nodes = (root || document).querySelectorAll("span[svg]");
    nodes.forEach((node) => {
      const key = node.getAttribute("svg");
      const svg = _findSvgInRegistry(key);
      if (svg) {
        // avoid double-inserting
        if (node.dataset.__svgInserted) return;
        node.insertAdjacentHTML("beforeend", svg);
        node.dataset.__svgInserted = "1";
      } else {
        // no svg found — warn once
        if (!node.dataset.__svgWarned) {
          console.warn("SVG not found for", key);
          node.dataset.__svgWarned = "1";
        }
      }
    });
  } catch (e) {
    console.error("insertSvgs error", e);
  }
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => insertSvgs(document));
  } else {
    // already ready
    insertSvgs(document);
  }
}
