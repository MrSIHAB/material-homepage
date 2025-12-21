import { applyTheme } from "./themeGenerator.js";

const COLOR_KEY = "COLOR_KEY";

// Get and set color code from localHost
export const getColor = () => localStorage.getItem(COLOR_KEY);
/** @param {number} colorCode : a hexadecimal value */
export const setColor = (colorCode) => localStorage.setItem(COLOR_KEY, colorCode);

export function setTheme(color) {
  const colorInputs = document.getElementsByName("color");

  if (color) setColor(color);
  const colorCode = getColor() ?? "#00b3b3";
  applyTheme(colorCode);
  colorInputs.forEach((e) => e.value == colorCode && e.setAttribute("checked", true));
}
