import { setTheme } from "./theme.js";

export function initSettings() {
  document.addEventListener("DOMContentLoaded", () => {
    _loadColorSelectionBackground();
    _quickSitesSettings();
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
    element.addEventListener("click", () => setTheme(element.value));
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
  applyThemeAndListeners("toggleGoogleSites", "googleQuickSites", true);
  applyThemeAndListeners("toggleMicrosoftSites", "microsoftQuickSites", true);

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
