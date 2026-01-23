import { blurShortcuts, hideShortcuts, loadShortCutSites, lockShortcuts } from "./shortcuts.js";
import { setTheme } from "./theme.js";

export function initSettings() {
  document.addEventListener("DOMContentLoaded", () => {
    _loadColorSelectionBackground();
    _quickSitesSettings();
    _developerCardListeners();
    _loadAdaptiveIcon();
    _backupAndRestoreSetup();
    _loadShortCutSettings();
  });
}

/**
 * Developer information. A card should appear when user clicks this button
 */
function _developerCardListeners() {
  const openDevCardButton = document.getElementById("openCreditButton");
  const closeDevCardButton = document.getElementById("creditCloseBtn");
  const DevCard = document.getElementById("creditBox");
  const settingsContainer = document.getElementById("settingPage");

  openDevCardButton.addEventListener("click", function () {
    settingsContainer.classList.remove("show");
    DevCard.classList.add("show");
  });
  closeDevCardButton.addEventListener("click", function () {
    DevCard.classList.remove("show");
    settingsContainer.classList.add("show");
  });
}

/**
 * Color selection tool is just a selection with some color values.
 * This function will load their background color. The background color
 * will be exactly what is their value.
 */
function _loadColorSelectionBackground() {
  const colorInputs = document.getElementsByName("color");
  colorInputs.forEach(function (element) {
    // setting background
    element.style.background = element.value;
    // Listen click event
    element.addEventListener("input", () => setTheme(element.value));
  });
}

/**
 * Adaptive color for user defined shortcut section.
 */
function _loadAdaptiveIcon() {
  const adaptiveIconButton = document.getElementById("adaptiveIcon");
  const shortcutApp = document.getElementById("shortcutApp");

  const isAdaptive = localStorage.getItem("isAdaptive") == "true";
  adaptiveIconButton.checked = isAdaptive;
  if (isAdaptive) shortcutApp.classList.add("adaptive");
  adaptiveIconButton.addEventListener("change", () => {
    localStorage.setItem("isAdaptive", adaptiveIconButton.checked);
    shortcutApp.classList.toggle("adaptive");
  });
}

/**
 * Loads and initializes shortcut settings from storage.
 *
 * Retrieves the current state of hide, blur, and lock settings for shortcuts,
 * applies them to their corresponding UI elements, and attaches click event
 * listeners to update settings and refresh the shortcuts display when changed.
 */
function _loadShortCutSettings() {
  const hideShortcutsButton = document.getElementById("hideShortcuts");
  const blurShortcutsButton = document.getElementById("blurShortcuts");
  const lockShortcutsButton = document.getElementById("lockShortcuts");

  // load saved settings
  const isHidden = hideShortcuts();
  const isBlurred = blurShortcuts();
  const isLocked = lockShortcuts();

  // Set state on first load
  hideShortcutsButton.checked = isHidden;
  blurShortcutsButton.checked = isBlurred;
  lockShortcutsButton.checked = isLocked;

  // add event listener
  hideShortcutsButton.addEventListener("click", () => {
    const isEnabled = hideShortcutsButton.checked;
    hideShortcuts(isEnabled);
  });
  blurShortcutsButton.addEventListener("click", () => {
    const isEnabled = blurShortcutsButton.checked;
    blurShortcuts(isEnabled);
  });
  lockShortcutsButton.addEventListener("click", () => {
    const isEnabled = lockShortcutsButton.checked;
    lockShortcuts(isEnabled);
  });
}

/**
 * Quick sites settings event listeners. The material buttons to display or hide
 * sites category. Social sites are default and can't be removed as of now.
 *
 * This function not only register the event listeners, but also complete the initial
 * setup.
 */
function _quickSitesSettings() {
  applyThemeAndListeners("toggleDeveloperSites", "developerQuickSites", false);
  applyThemeAndListeners("toggleAiSites", "aiQuickSites", true);
  applyThemeAndListeners("toggleSocialSites", "socialQuickSites", true);
  applyThemeAndListeners("toggleGoogleSites", "googleQuickSites", false);
  applyThemeAndListeners("toggleMicrosoftSites", "microsoftQuickSites", false);

  /**
   * Reuseable function to load Initial UI and add listeners
   * @param {string} switchElementId
   * @param {string} siteElementId
   * @param {string} defaultValue
   */
  async function applyThemeAndListeners(switchElementId, siteElementId, defaultValue = true) {
    const switchElement = document.getElementById(switchElementId);
    const siteElement = document.getElementById(siteElementId);

    // load saved settings
    const isLocallyEnabled = (localStorage.getItem(switchElementId) ?? defaultValue.toString()) == "true";

    // Set state on first load
    switchElement.checked = isLocallyEnabled;
    if (isLocallyEnabled) siteElement.classList.remove("hide");
    else siteElement.classList.add("hide");

    // add event listener
    switchElement.addEventListener("click", () => {
      const isEnabled = switchElement.checked;
      localStorage.setItem(switchElementId, isEnabled);
      if (isEnabled) siteElement.classList.remove("hide");
      else siteElement.classList.add("hide");
    });
  }
}

/**
 * Backup , restore and reset to default settings.
 * Backup button will create a json file and download that.
 * Restore button will take a json file and store them to localStorage.
 * Reset button will delete everything from localStorage
 */
function _backupAndRestoreSetup() {
  const backupButton = document.getElementById("backupSettings");
  const restoreButton = document.getElementById("restoreSettings");
  const resetButton = document.getElementById("resetSettings");

  // Download or local Backup settings
  backupButton.addEventListener("click", async () => {
    // store all localStorage keys and values to backup object
    const backup = {};
    for await (const key of Object.keys(localStorage)) {
      backup[key] = localStorage.getItem(key);
    }
    // Creating new blob, link and anchor tag.
    const blob = new Blob([JSON.stringify(backup)]);
    const link = URL.createObjectURL(blob);
    const a = document.createElement("a");
    // Assigning link and name
    a.href = link;
    a.download = "material_homepage_backup.json";
    // automatically clicking the anchor tag to download
    return a.click();
  });

  // restore Settings from json file
  const jsonInput = document.createElement("input");
  jsonInput.type = "file";
  jsonInput.accept = "application/json,.json";
  restoreButton.addEventListener("click", () => jsonInput.click());
  jsonInput.addEventListener("change", async (event) => {
    const confirmed = confirm(
      "Restoring settings will remove all the existing settings.\n" + "Do you want to proceed?",
    );
    if (!confirmed) return;

    const file = event.target.files?.[0];
    if (!file) return; // no file chosen

    // Basic validation (accept attribute is advisory only)
    if (!file.name.endsWith(".json") && file.type !== "application/json") {
      alert("Please select a JSON file.");
      return;
    }

    try {
      const text = await file.text(); // modern and simple
      const json = JSON.parse(text);

      localStorage.clear();
      for await (const key of Object.keys(json)) {
        localStorage.setItem(key, json[key]);
      }
      location.reload();
    } catch (err) {
      console.error("Failed to read/parse JSON file:", err);
      alert("Invalid JSON file.");
    }
  });

  // Reset to default settings
  resetButton.addEventListener("click", () => {
    const confirmed = confirm(
      "Restore to default settings will remove every modification you made on this extension\n." +
        "Do you want to proceed?",
    );

    if (confirmed) {
      localStorage.clear();
      location.reload();
    }
  });
}
