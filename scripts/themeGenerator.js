export const DARK_MODE_KEY = "DARK_MODE_KEY";

export function setVar(name, value) {
  document.documentElement.style.setProperty(name, value);
}

function hexToRGB(hex) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

// Perceived brightness formula
function brightness({ r, g, b }) {
  return (r * 299 + g * 587 + b * 114) / 1000;
}

// hex → HSL (for generating shades)
function hexToHSL(H) {
  let r = 0,
    g = 0,
    b = 0;
  if (H.length == 4) {
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
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);
  if (h < 0) h += 360;
  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { h, s, l };
}

function hsl(h, s, l) {
  return `hsl(${h},${s}%,${l}%)`;
}

export function applyTheme(accent) {
  const rgb = hexToRGB(accent);
  const bright = brightness(rgb); // 0-255 scale

  const hslBase = hexToHSL(accent);

  // is dark or light
  const isLight = bright < 140;

  // determine text color safety
  const textColor = isLight ? hsl(0, 0, 10) : hsl(0, 0, 90);

  // determine light/dark mode backgrounds
  const background = isLight ? hsl(0, 0, 90) : hsl(0, 0, 10);
  const lightBackground = isLight ? hsl(0, 0, 95) : hsl(0, 0, 15);

  // light accent (tint)
  const lightAccent = hsl(hslBase.h, hslBase.s, Math.min(100, hslBase.l + 25));

  // update CSS
  setVar("--accent", accent);
  setVar("--light-accent", lightAccent);
  setVar("--background", background);
  setVar("--light-background", lightBackground);
  setVar("--text-color", textColor);
}
