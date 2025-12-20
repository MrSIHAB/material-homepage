const popupBackground = document.getElementById("popupBg");

/**  ======================  Popup Background =========================
 *
 * A slightly blurry, dark and semi transparent background. It covers the entire screen.
 * It only shows when any popup is open. Clicking this background will close the popup.
 * Note: it only removes `show` class from all the html elements which have the class `popup`.
 * So every popup should be designed according the logic.
 */
export function showPopup(element) {
  popupBackground.classList.toggle("show");
  element.classList.toggle("show");
}
/**
 * Closing the popup and hiding the popup background. It will by default called on click event
 * of the popup background.
 */
export function closePopup() {
  const canPopupElements = document.querySelectorAll(".popup");
  canPopupElements.forEach((e) => e.classList.remove("show"));
  popupBackground.classList.toggle("show");
}
/**
 * Add click listener to close the popup and the background itself. Internally calling the
 * `closePopup` function.
 */
function _popupBackgroundListener() {
  popupBackground.addEventListener("click", closePopup);
}

/** =====================  Register all the UI eventListeners ====================== */
export async function initUI() {
  _popupBackgroundListener();
  _mailButtonListener();
  _applicationQuickAccessListener();
  _settingsToggleEventListener();
}

/**  ======================  Email =========================
 *
 * When user clicks on the button, There most popular email service provider including Gmail
 * Outlook and Yahoo will popup. The popupBackground should be display and blur the entire screen.
 */
function _mailButtonListener() {
  const mailContainer = document.getElementById("mailContainer");
  const toggleButton = document.getElementById("ToggleMailBtn");

  toggleButton.addEventListener("click", () => showPopup(mailContainer));
}

/**  ===================  Application Quick Access ====================
 *
 * The application quick access that ships with the extension. The toggle button is located
 * in the bottom right corner.
 */
function _applicationQuickAccessListener() {
  const quickApplication = document.getElementById("quickApplication");
  const toggleButton = document.getElementById("toggleApp");
  toggleButton.addEventListener("click", () => showPopup(quickApplication));
}

/**  ===================  Settings ====================
 *
 * All the settings of the extension.
 */
function _settingsToggleEventListener() {
  const settingPage = document.getElementById("settingPage");
  const showSettings = document.getElementById("showSettings");
  const closeSettings = document.getElementById("closeSettings");
  showSettings.addEventListener("click", () => showPopup(settingPage));
  closeSettings.addEventListener("click", () => closePopup());
}
