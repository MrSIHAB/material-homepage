import { setTheme } from "./theme.js";

/**
 * Color selection tool is just a selection with some color values.
 * This function will load their background color. The background color
 * will be exactly what is their value.
 */
export function loadColorSelectionBackground() {
  const colorInputs = document.getElementsByName("color");
  colorInputs.forEach(function (element) {
    // setting background
    element.style.background = element.value;

    // Listen click event
    element.addEventListener("click", () => setTheme(element.value));
  });
}
