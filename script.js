const searchEngine = document.getElementById("searchEngine");
const SEARCH_ENGINE_KEY = "engine";
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

// initState
function setSearchEngine() {
  const currentEngine = localStorage.getItem(SEARCH_ENGINE_KEY);

  searchEngine.value = currentEngine ?? "google";

  if (currentEngine == "google") {
    engineLink.action = "https://www.google.com/search";
    searchInput.name = "q";
  } else if (currentEngine == "bing") {
    engineLink.action = "https://www.bing.com/search";
    searchInput.name = "q";
  } else if (currentEngine == "yahoo") {
    engineLink.action = "https://search.yahoo.com/search";
    searchInput.name = "p";
  } else if (currentEngine == "youtube") {
    engineLink.action = "https://www.youtube.com/results";
    searchInput.name = "search_query";
  } else {
    engineLink.action = "https://www.google.com/search";
    searchInput.name = "q";
  }
}

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
  localStorage.setItem(SEARCH_ENGINE_KEY, selectLink);
  setSearchEngine();

  // if (selectLink == "google") {
  //   engineLink.action = "https://www.google.com/search";
  //   searchInput.name = "q";
  // } else if (selectLink == "bing") {
  //   engineLink.action = "https://www.bing.com/search";
  //   searchInput.name = "q";
  // } else if (selectLink == "yahoo") {
  //   engineLink.action = "https://search.yahoo.com/search";
  //   searchInput.name = "p";
  // } else if (selectLink == "youtube") {
  //   engineLink.action = "https://www.youtube.com/results";
  //   searchInput.name = "search_query";
  // } else {
  //   engineLink.action = "https://www.google.com/search";
  //   searchInput.name = "q";
  // }
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

  setSearchEngine();
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
          "Dark Mode is in under development. Please Use other theme to avoid color issues",
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
 * To remove a shortcut by it's index.
 * @param {*} index
 */
const deleteApp = async (index) => {
  const existingApps = await getAllApp();
  existingApps.splice(index, 1);
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

/**
 * To show the form to Save, Edit and Update shortcuts.
 * It takes `index` : `num` to edit and update any shortcut.
 * It will update the index from the shortcut [array] with new updated values.
 *
 * Don't pass `index` while adding new shortcut. Instead, left it empty. After submitting, the handler will check
 * for the index in form's attribte. if, not found, it will save new one instead of updating old one by index.
 *
 * This function will add a new attribut called index while this function will triggered from edit button with index parameter.
 * If no index found and the function gets triggered from plus(adding new shortcut) button, It will remove the attribute `index`
 * @param {*} index
 * @returns
 */
const showForm = async (index) => {
  container.style.display = "block";
  container.style.zIndex = 2;
  popupbg.style.zIndex = 1;
  popupbg.style.display = "block";

  if (!index) {
    document.getElementById("shortcutTitle").value = "";
    document.getElementById("shortcutLink").value = "";
    return;
  } else {
    const existingApps = await getAllApp();
    const { title, link } = existingApps[index];

    document.getElementById("shortcutTitle").value = title;
    document.getElementById("shortcutLink").value = link;
  }

  return;
};

/**
 * As like saving a shortcut, this function updates(edits) existing shortcuts.
 * index defines which number of custom shortcut will be updated by title & link.
 *
 * It just updates the index of array, page reloading or rendering should be done manally.
 *
 * @param {*} index : ShortcutArray[index]
 * @param {*} title : newly updated title
 * @param {*} link : newly updated link
 */
const UpdateEntry = async (index, title, link) => {
  const existingApps = await getAllApp();
  existingApps[index] = { title, link };
  localStorage.setItem("apps", JSON.stringify(existingApps));
};

/**
 * This function runs the custom shortcut appliction section.
 *
 * Upper helpler function will be intrigreted in this main function.
 * After writting this function, this function will be called() immediately.
 * @returns void
 */
const shortcutAppDisplay = async () => {
  const shortcutSection = document.getElementById("shortcutApp");
  const allApps = await getAllApp();
  const faviconfetcher = "https://faviconfetcher.deno.dev?url=" ||
    "https://favicon.im/";

  // Making a embaded list of shortcut applications and adding plus button after it.
  let embadedApps = " ";
  if (allApps != null) {
    //  making a list of embaded HTML elements with loop.
    embadedApps += allApps
      .map(
        (value, index) => `
      <div class="everyShortcut">
        <button class="threeDot">
          <img src="svg/three-dots.svg" />
          <div class="threeDotOptions" index="${index}">
            <p class="editShortcut">Edit</p>
            <p class="deleteShortcut">Delete</p>
          </div>
        </button>
        <a href="${correctUrl(value.link)}?source=https://github.com/mrsihab">
          <img 
            src="${faviconfetcher}${value.link}" 
            alt="" 
            class="icon" 
          />
        </a>
        <h6 class="title">${value.title}</h6>
      </div>
    `,
      )
      .join("");
  }
  if (!allApps || allApps.length < 16) {
    // * I'm limiting the custom shortcuts within 16 apps.
    embadedApps +=
      `<div class="everyShortcut plusIcon" id="addShortcut"><p>&plus;</p></div>`;
  }
  shortcutSection.innerHTML = embadedApps; // Pushing to the specified containner.

  // Listening plus buutton click
  const addAppBtton = document.getElementById("addShortcut");
  const dotBtns = document.querySelectorAll(".threeDot");
  const edits = document.querySelectorAll(".editShortcut");
  const deletes = document.querySelectorAll(".deleteShortcut");

  // looping for edit buttons of all custom shortcuts
  for (const edit of edits) {
    edit.addEventListener("click", async () => {
      const index = edit.parentElement.getAttribute("index");
      newShortcutForm.setAttribute("index", index);
      return await showForm(index);
    });
  }

  // looping for delete buttons of all custom shortcuts
  for (const element of deletes) {
    element.addEventListener("click", async (e) => {
      const index = element.parentElement.getAttribute("index");
      await deleteApp(index);
      return location.reload();
    });
  }

  // looping for three dot buttons of all custom shortcuts to show `Edit` & `Delete` buttons.
  for (const btn of dotBtns) {
    btn.addEventListener("focus", () => {
      btn.parentElement.classList.add("showOptions");
    });
    btn.addEventListener("focusout", (e) => {
      btn.parentElement.classList.remove("showOptions");
    });
  }

  // While user click the plus button from the end shortcut section.
  addAppBtton.addEventListener("click", () => {
    newShortcutForm.removeAttribute("index");
    showForm();
  });
  return;
};
shortcutAppDisplay();

/**
 * This is the eventListener for the form for **saving new Shortcuts** and **Editing existing shortcuts**.
 * It will look for the `index` from the `form` tag. If it finds any index, it will understand that it was opend by editing and
 * it will call the `UpdateElement()` function.
 * If it won't find any `index` in form tag, it will call the `saveNewApp()` function.
 */
const newShortcutForm = document.getElementById("newShortcutForm");
newShortcutForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("shortcutTitle").value;
  const link = document.getElementById("shortcutLink").value;
  const index = newShortcutForm.getAttribute("index");

  if (!index) {
    await saveNewApp(title, link);
  } else {
    await UpdateEntry(index, title, link);
  }

  closePopup();
  location.reload();
});
