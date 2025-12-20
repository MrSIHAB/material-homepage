import "./svgLoader.js";
import "./timeLoader.js";
import "./theme.js";
import * as Search from "./search.js";
import * as Shortcuts from "./shortcuts.js";
import { initUiListeners } from "./ui.js";
import { applyTheme } from "./themeGenerator.js";

// Minimal bootstrap wiring for the page behavior.
// All behavior is delegated to the modules: `search.js`, `shortcuts.js`, `ui.js`.
/** Google, yahoo, bing, youtube, duck duck go */
const searchEngine = document.getElementById("searchEngine");
/** The wrapper form around the search input. */
const engineLink = document.getElementById("searchForm");
/** The search input where user writes query */
const searchInput = document.getElementById("search");
/** The submit button of search form */
const submitBtn = document.getElementById("submitBtn");

Search.initSearch({
  searchEngineEl: searchEngine,
  engineFormEl: engineLink,
  searchInputEl: searchInput,
  submitBtn,
});

initUiListeners();
// render shortcuts
Shortcuts.loadShortCutSites();

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
