import "./svgLoader.js";
import "./timeLoader.js";
import "./theme.js";
import * as Search from "./search.js";
import * as Shortcuts from "./shortcuts.js";
import { closePopup, initUI } from "./ui.js";
import { setTheme } from "./theme.js";
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

initUI();

// render shortcuts area
Shortcuts.shortcutAppDisplay();

// handle new shortcut form submit (delegates to shortcuts module)
const newShortcutForm = document.getElementById("newShortcutForm");
if (newShortcutForm) {
  newShortcutForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("shortcutTitle").value;
    const link = document.getElementById("shortcutLink").value;
    const index = newShortcutForm.getAttribute("index");

    if (!index) {
      await Shortcuts.saveNewApp(title, link);
    } else {
      await Shortcuts.UpdateEntry(index, title, link);
    }

    closePopup();
    location.reload();
  });
}

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
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  applyTheme(color);
})();
