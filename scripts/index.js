import "./svgLoader.js";
import { renderTime } from "./timeLoader.js";
import { initSearch } from "./search.js";
import { loadShortCutSites } from "./shortcuts.js";
import { initUiListeners } from "./ui.js";
import { applyTheme } from "./themeGenerator.js";

renderTime(); // render current date and days
initSearch(); // Load search bar scripts
initUiListeners(); // Load eventListeners for all ui
loadShortCutSites(); // Render shortcut sites and it's listeners

// Initially setting theme variables for css
// setTheme();
(async function () {
  const colors = [
    "#ff0000",
    "#00ffff",
    "#00ffaa",
    "#800080",
    "#ffff00",
    "#40ff40",
    "#ff00ff",
    "#ffaa00",
    "#ffffff",
    "#000000",
    "#aaaaaa",
    "#ff9999",
    "#ffff99",
    "#8f8f00ff",
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  applyTheme(color);
})();
