// ui.js - popup, mail, settings, about and general UI handlers
export function closePopup() {
  const popup = document.querySelectorAll(".popup");
  popup.forEach((e) => e.classList.remove("show"));
  const popupBg = document.getElementById("popupBg");
  if (popupBg) popupBg.style.display = "none";
  const toggleSvg = document.getElementById("icr");
  if (toggleSvg) toggleSvg.classList.remove("rotate");
  const mailToggle = document.getElementById("mailToggle");
  if (mailToggle) mailToggle.style.zIndex = "";
  const bottom = document.getElementById("bottom");
  if (bottom) bottom.style.zIndex = "";
  const mainSettingsDiv = document.getElementById("setting");
  if (mainSettingsDiv) mainSettingsDiv.style.zIndex = "";
  const aboutBox = document.getElementById("aboutBox");
  if (aboutBox) aboutBox.style.display = "none";
  const container = document.getElementById("addAppContainer");
  if (container) {
    container.style.display = "none";
    container.style.zIndex = -1;
  }
}

export function allAppShowHide() {
  const allAppBox = document.getElementById("allAppPopup");
  const toggleSvg = document.getElementById("icr");
  const popupBg = document.getElementById("popupBg");
  const bottom = document.getElementById("bottom");
  if (!allAppBox) return;
  if (!allAppBox.classList.contains("show")) {
    allAppBox.classList.add("show");
    if (toggleSvg) toggleSvg.classList.add("rotate");
    if (popupBg) popupBg.style.display = "block";
    if (bottom) bottom.style.zIndex = 3;
  } else {
    closePopup();
  }
}

export function initUI() {
  const appButton = document.getElementById("toggleApp");
  const popupBg = document.getElementById("popupBg");
  const toggleMail = document.getElementById("ToggleMailBtn");
  const mailToggle = document.getElementById("mailToggle");
  const emails = document.querySelectorAll(".emails");
  const settingButton = document.getElementById("settingButton");
  const settingBody = document.getElementById("settingBody");
  const mainSettingsDiv = document.getElementById("setting");
  const themeInput = document.querySelectorAll(".themes");
  const authorInfoButton = document.getElementById("authorInfoButton");
  const aboutBox = document.getElementById("aboutBox");
  const aboutCloseBtn = document.getElementById("aboutCloseBtn");

  if (appButton) appButton.addEventListener("click", allAppShowHide);
  if (popupBg) popupBg.addEventListener("click", closePopup);

  if (toggleMail) {
    toggleMail.addEventListener("click", () => {
      if (!mailToggle) return;
      if (!mailToggle.classList.contains("show")) {
        emails.forEach((e) => e.classList.add("show"));
        popupBg.style.display = "block";
        mailToggle.style.zIndex = 3;
        mailToggle.classList.add("show");
      } else {
        emails.forEach((e) => e.classList.remove("show"));
        mailToggle.style.zIndex = "";
        popupBg.style.display = "none";
        mailToggle.classList.remove("show");
      }
    });
  }

  if (settingButton) {
    settingButton.addEventListener("click", () => {
      if (!mainSettingsDiv) return;
      const popupShown =
        mainSettingsDiv.style.zIndex && mainSettingsDiv.style.zIndex > 0;
      if (!popupShown) {
        if (settingBody) settingBody.classList.add("show");
        mainSettingsDiv.style.zIndex = 3;
        popupBg.style.display = "block";
      } else {
        settingBody && settingBody.classList.remove("show");
        mainSettingsDiv.style.zIndex = 0;
        popupBg.style.display = "none";
      }
    });
  }

  if (themeInput && themeInput.forEach) {
    themeInput.forEach((inp) =>
      inp.addEventListener("change", function () {
        if (this.checked) {
          const colorValue = this.value;
          if (colorValue === "dark") {
            alert(
              "Dark Mode is in under development. Please Use other theme to avoid color issues"
            );
          }
          localStorage.setItem("theme", colorValue);
        }
        // apply theme
        const body = document.querySelector("body");
        body.classList = localStorage.getItem("theme");
      })
    );
  }

  if (authorInfoButton) {
    authorInfoButton.addEventListener("click", () => {
      if (aboutBox) aboutBox.style.display = "block";
      if (popupBg) popupBg.style.display = "block";
    });
  }
  if (aboutCloseBtn) aboutCloseBtn.addEventListener("click", closePopup);
}
