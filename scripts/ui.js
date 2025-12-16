// ui.js - popup, mail, settings, about and general UI handlers
export function closePopup() {
    const popup = document.querySelectorAll(".popup");
    popup.forEach((e) => e.classList.remove("show"));
    const popupbg = document.getElementById("popupbg");
    if (popupbg) popupbg.style.display = "none";
    const togglesvg = document.getElementById("icr");
    if (togglesvg) togglesvg.classList.remove("rotate");
    const mailToggle = document.getElementById("mailToggle");
    if (mailToggle) mailToggle.style.zIndex = "";
    const bottom = document.getElementById("bottom");
    if (bottom) bottom.style.zIndex = "";
    const mainSdiv = document.getElementById("setting");
    if (mainSdiv) mainSdiv.style.zIndex = "";
    const aboutBox = document.getElementById("aboutbox");
    if (aboutBox) aboutBox.style.display = "none";
    const container = document.getElementById("addAppContainer");
    if (container) {
        container.style.display = "none";
        container.style.zIndex = -1;
    }
}

export function allAppShowHide() {
    const allAppBox = document.getElementById("allAppPopup");
    const togglesvg = document.getElementById("icr");
    const popupbg = document.getElementById("popupbg");
    const bottom = document.getElementById("bottom");
    if (!allAppBox) return;
    if (!allAppBox.classList.contains("show")) {
        allAppBox.classList.add("show");
        if (togglesvg) togglesvg.classList.add("rotate");
        if (popupbg) popupbg.style.display = "block";
        if (bottom) bottom.style.zIndex = 3;
    } else {
        closePopup();
    }
}

export function initUI() {
    const appbtn = document.getElementById("toggleApp");
    const popupbg = document.getElementById("popupbg");
    const toggleMail = document.getElementById("ToggleMailBtn");
    const mailToggle = document.getElementById("mailToggle");
    const emails = document.querySelectorAll(".emails");
    const settingbtn = document.getElementById("settingbtn");
    const settingBody = document.getElementById("settingBody");
    const mainSdiv = document.getElementById("setting");
    const themeInput = document.querySelectorAll(".themes");
    const authorInfoButton = document.getElementById("authorInfoButton");
    const aboutBox = document.getElementById("aboutbox");
    const aboutCloseBtn = document.getElementById("aboutCloseBtn");

    if (appbtn) appbtn.addEventListener("click", allAppShowHide);
    if (popupbg) popupbg.addEventListener("click", closePopup);

    if (toggleMail) {
        toggleMail.addEventListener("click", () => {
            if (!mailToggle) return;
            if (!mailToggle.classList.contains("show")) {
                emails.forEach((e) => e.classList.add("show"));
                popupbg.style.display = "block";
                mailToggle.style.zIndex = 3;
                mailToggle.classList.add("show");
            } else {
                emails.forEach((e) => e.classList.remove("show"));
                mailToggle.style.zIndex = "";
                popupbg.style.display = "none";
                mailToggle.classList.remove("show");
            }
        });
    }

    if (settingbtn) {
        settingbtn.addEventListener("click", () => {
            if (!mainSdiv) return;
            const popupShown = mainSdiv.style.zIndex &&
                mainSdiv.style.zIndex > 0;
            if (!popupShown) {
                if (settingBody) settingBody.classList.add("show");
                mainSdiv.style.zIndex = 3;
                popupbg.style.display = "block";
            } else {
                settingBody && settingBody.classList.remove("show");
                mainSdiv.style.zIndex = 0;
                popupbg.style.display = "none";
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
                            "Dark Mode is in under development. Please Use other theme to avoid color issues",
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
            if (popupbg) popupbg.style.display = "block";
        });
    }
    if (aboutCloseBtn) aboutCloseBtn.addEventListener("click", closePopup);
}
