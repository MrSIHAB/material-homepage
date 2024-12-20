const searchEngine = document.getElementById("searchEngine");
// searchEngine.style.borderBottomRightRadius = "25px";
var engineLink = document.getElementById("searchForm");
const searchInput = document.getElementById("search");
const container = document.getElementById("addAppContainer");
const body = document.querySelector("body");
body.classList = localStorage.getItem("theme");

// setting user setted theme
function setTheme() {
  let theme = localStorage.getItem("theme");
  if (theme == null) {
    localStorage.setItem("theme", "skyblue");
  }
  body.classList = localStorage.getItem("theme");
}

// searchEngine Animation and designing --------//

searchEngine.addEventListener("focusin", () => {
  searchEngine.style.borderBottomRightRadius = 0;
});
searchEngine.addEventListener("focusout", () => {
  searchEngine.style.borderBottomRightRadius = "25px";
});
searchEngine.addEventListener("change", async () => {
  searchEngine.style.borderBottomRightRadius = "25px";

  // changing search engine link
  let selectLink = await searchEngine.value;
  if (selectLink == "google") {
    engineLink.action = "https://www.google.com/search";
    searchInput.name = "q";
  } else if (selectLink == "bing") {
    engineLink.action = "https://www.bing.com/search";
    searchInput.name = "q";
  } else if (selectLink == "yahoo") {
    engineLink.action = "https://search.yahoo.com/search";
    searchInput.name = "p";
  } else if (selectLink == "youtube") {
    engineLink.action = "https://www.youtube.com/results";
    searchInput.name = "search_query";
  } else {
    engineLink.action = "https://www.google.com/search";
    searchInput.name = "q";
  }
});

//  search box radias fixing ------------------
window.addEventListener("DOMContentLoaded", async () => {
  // date function
  const time = new Date();
  const day = time.getDay();
  const dayLoader = document.getElementById("day");
  const timeLoader = document.getElementById("time");
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thusday",
    "Friday",
    "Satureday",
    "Sunday",
  ];
  const months = [
    "January",
    "Frebruary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = time.getDate();
  const month = time.getMonth();
  const year = time.getFullYear();
  dayLoader.innerText = days[day].toUpperCase();

  timeLoader.innerText = `${date}, ${months[month]}, ${year}`;
});

// url and prompt checker -----
function isLink(str) {
  var urlPattern =
    /^(?:(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/[\w-]*)*\/?)$/; // Regular expression to match URLs with optional protocol

  return urlPattern.test(str);
}

const search = () => {
  let qurey = searchInput.value;
  if (isLink(qurey)) {
    var link = qurey.replace("http://", "") && qurey.replace("https://", "");
    window.location.href = `https://${link}`;
  } else {
    engineLink.submit();
  }
};

const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", search);
engineLink.addEventListener("submit", search);

// --------------------------------

//  ? ---- All aplication section and popup blured bacground section
var popupValue = 0;
let popup = document.querySelectorAll(".popup");
let popupbg = document.getElementById("popupbg");
let allAppBox = document.getElementById("allAppPopup");
let appbtn = document.getElementById("toggleApp");
let togglesvg = document.getElementById("icr");
let bottom = document.getElementById("bottom");

const closePopup = () => {
  popup.forEach((e) => {
    e.classList.remove("show");
  });
  popupbg.style.display = "none";
  togglesvg.classList.remove("rotate");
  popupValue = 0;
  mailToggle.style.zIndex = "";
  bottom.style.zIndex = "";
  mainSdiv.style.zIndex = "";
  aboutBox.style.display = "none";
  container.style.display = "none";
  container.style.zIndex = -1;

  return;
};
popupbg.addEventListener("click", closePopup);

function allAppShowHide() {
  if (popupValue == 0) {
    allAppBox.classList.add("show");
    togglesvg.classList.add("rotate");
    popupbg.style.display = "block";
    bottom.style.zIndex = 3;
    popupValue = 1;
  } else {
    closePopup();
  }
}
appbtn.addEventListener("click", allAppShowHide);

// mail popup section ----------
const toggleMail = document.getElementById("ToggleMailBtn");
const mailToggle = document.getElementById("mailToggle");
const emails = document.querySelectorAll(".emails");
/** this value will should be 1 o higher to show blured background and should call
 * ``` javascript
 * closePopup();
 * ```
 * function to remove the blured background and that reset `popupValue` to `0`
 */

toggleMail.addEventListener("click", () => {
  if (popupValue != 1) {
    emails.forEach((e) => {
      e.classList.add("show");
    });
    popupbg.style.display = "block";
    popupValue = 1;
    mailToggle.style.zIndex = 3;
  } else {
    emails.forEach((e) => {
      e.classList.remove("show");
    });
    mailToggle.style.zIndex = "";
    popupbg.style.display = "none";
    popupValue = 0;
  }
});

// setting color / themes ---------------

const themeInput = document.querySelectorAll(".themes");
const settingbtn = document.getElementById("settingbtn");
const settingBody = document.getElementById("settingBody");
const mainSdiv = document.getElementById("setting");

settingbtn.addEventListener("click", () => {
  if (popupValue != 1) {
    settingBody.classList.add("show");
    mainSdiv.style.zIndex = 3;
    popupValue = 1;
    popupbg.style.display = "block";
  } else {
    popupValue = 0;
    settingBody.classList.remove("show");
    mainSdiv.style.zIndex = 0;
    popupbg.style.display = "none";
  }
});

themeInput.forEach((inp) => {
  inp.addEventListener("change", function () {
    if (this.checked) {
      let colorValue = this.value;
      if (colorValue == "dark") {
        alert(
          "Dark Mode is in under development. Please Use other theme to avoid color issues"
        );
      }
      localStorage.setItem("theme", colorValue);
    }
    setTheme();
  });
});

//  -----------------------------------------------------------------  About me / credit section
const authorInfoButton = document.getElementById("authorInfoButton");
const aboutBox = document.getElementById("aboutbox");
const aboutCloseBtn = document.getElementById("aboutCloseBtn");

authorInfoButton.addEventListener("click", () => {
  aboutBox.style.display = "block";
  popupbg.style.display = "block";
});
aboutCloseBtn.addEventListener("click", closePopup);

// ? Application Shortcut section -----------------------------

/**
 * To save a new app in shortcut list.
 * @param { * } option new app's info
 */
const saveNewApp = async (title, link) => {
  let existingApps = await getAllApp();
  if (!existingApps) {
    existingApps = [];
  }
  await existingApps.push({ title, link });
  localStorage.setItem("apps", JSON.stringify(existingApps));
};
/**
 * This function will return the saved apps collection as array.
 *
 * @returns Array[title, link, icon]
 */
const getAllApp = async () => {
  const result = await JSON.parse(localStorage.getItem("apps"));
  return result;
};

/**
 * Parse a link and retrns baseUrl domain.
 *
 * @param {*} url
 * @returns Base URL
 */
const baseUrl = (url) => {
  const link = document.createElement("a");
  link.href = url;
  return link.origin;
};
/**
 * Check if the link include Http or not. If not included, It will include one.
 * @param {*} url
 * @returns Valid Url
 */
function correctUrl(url) {
  if (url.includes("https://") || url.includes("http://")) return url;
  return `https://${url}`;
}

const shortcutAppDisplay = async () => {
  const shortcutSection = document.getElementById("shortcutApp");
  const allApps = await getAllApp();

  /**
   * Making a embaded list of shortcut applications.
   * It will return plus icon if there is no application added
   */
  let embadedApps = " ";

  if (allApps != null) {
    embadedApps += allApps
      .map(
        (value, index) => `
      <div class="everyShortcut">
        <div class="threeDot" index="${index}">
          <img src="svg/three-dots.svg" />
        </div>
        <a href="${correctUrl(value.link)}?source=https://github.com/mrsihab">
          <img 
            src="https://favicon.im/${value.link}?larger=true" 
            alt="" 
            class="icon" 
          />
        </a>
        <h6 class="title">${value.title}</h6>
      </div>
    `
      )
      .join("");
  }

  if (!allApps || allApps.length < 16) {
    embadedApps += `<div class="everyShortcut plusIcon" id="addShortcut"><p>&plus;</p></div>`;
  }

  shortcutSection.innerHTML = embadedApps;

  // resolving images
  // const icons = document.querySelectorAll(".icon")
  // icons.forEach((value)=>{
  //   value.
  // })

  // Listening plus buutton click
  const addAppBtton = document.getElementById("addShortcut");

  return addAppBtton.addEventListener("click", () => {
    container.style.display = "block";
    container.style.zIndex = 2;
    popupbg.style.zIndex = 1;
    popupbg.style.display = "block";

    const newShortcutForm = document.getElementById("newShortcutForm");
    return newShortcutForm.addEventListener("submit", () => {
      const title = document.getElementById("shortcutTitle").value;
      const url = document.getElementById("shortcutLink").value;
      saveNewApp(title, url);
      title.value = "";
      url.value = "";
      closePopup();
      return shortcutAppDisplay();
    });
  });
};

shortcutAppDisplay();

function onErrorAndLoading(param) {
  param.src = "image/web.png";
}

// saveNewApp("shoaib", "https://google.com", "11nono");

// localStorage.clear();
// container.style.display = "block";
// container.style.zIndex = 2;
// popupbg.style.zIndex = 1;
// popupbg.style.display = "block";

// localStorage.clear();
