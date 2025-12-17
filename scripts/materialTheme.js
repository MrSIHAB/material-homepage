function setVar(name, value) {
  document.documentElement.style.setProperty(name, value);
}

function hexToRGB(hex) {
  hex = hex.replace("#", "");
  const bigint = parseInt(hex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function brightness({ r, g, b }) {
  return (r * 299 + g * 587 + b * 114) / 1000;
}

function hexToHSL(H) {
  let r = 0,
    g = 0,
    b = 0;
  if (H.length === 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  r /= 255;
  g /= 255;
  b /= 255;

  const cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin;

  let h = 0,
    s = 0,
    l = (cmax + cmin) / 2;

  if (delta !== 0) {
    if (cmax === r) h = ((g - b) / delta) % 6;
    else if (cmax === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);
  if (h < 0) h += 360;

  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { h, s, l };
}

const HSL = (h, s, l) => `hsl(${h},${s}%,${l}%)`;

function applyMaterialTheme(accentHex) {
  const rgb = hexToRGB(accentHex);
  const bright = brightness(rgb);

  const isLight = bright > 140;
  const base = hexToHSL(accentHex);

  // PRIMARY & CONTAINERS
  let primary, primaryContainer, onPrimary;

  if (isLight) {
    primary = HSL(base.h, base.s, base.l);
    primaryContainer = HSL(base.h, base.s, Math.min(100, base.l + 30));
    onPrimary = bright > 140 ? "#000" : "#fff";
  } else {
    primary = HSL(base.h, base.s, Math.min(100, base.l + 20));
    primaryContainer = HSL(base.h, base.s, Math.max(0, base.l - 20));
    onPrimary = "#fff";
  }

  // SURFACES
  const surface = isLight ? "#ffffff" : "#121212";
  const surfaceContainer = isLight ? "#f2f2f2" : "#1e1e1e";
  const surfaceHighest = isLight ? "#e6e6e6" : "#292929";
  const onSurface = isLight ? "#000" : "#fff";
  const outline = isLight ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)";

  // SET VARIABLES
  setVar("--primary", primary);
  setVar("--primary-container", primaryContainer);
  setVar("--on-primary", onPrimary);
  setVar("--surface", surface);
  setVar("--surface-container", surfaceContainer);
  setVar("--surface-container-highest", surfaceHighest);
  setVar("--on-surface", onSurface);
  setVar("--outline", outline);
}
