import "./svgLoader.js";
import { renderTime } from "./timeLoader.js";
import { initSearch } from "./search.js";
import { loadShortCutSites } from "./shortcuts.js";
import { initUiListeners } from "./ui.js";
import { initSettings } from "./settings.js";
import { setTheme } from "./theme.js";

renderTime(); // render current date and days
initSearch(); // Load search bar scripts
initUiListeners(); // Load eventListeners for all ui
loadShortCutSites(); // Render shortcut sites and it's listeners
initSettings();
setTheme();
