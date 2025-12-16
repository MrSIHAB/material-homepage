import "./svgLoader.js";
import "./timeLoader.js";
import * as Search from "./search.js";
import * as Shortcuts from "./shortcuts.js";
import { closePopup, initUI } from "./ui.js";

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
