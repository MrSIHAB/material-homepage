// shortcuts.js - handles storage and rendering of custom shortcuts
import { threeDots } from "./svg.js";
import { closePopup, showPopup } from "./ui.js";
import { correctUrl, getFaviconUrl, getOrUpdateLocalStorage } from "./utils.js";

// Constant Keys
const HIDE_SHORTCUTS_KEY = "HIDE_SHORTCUTS_KEY";
const BLUR_SHORTCUTS_KEY = "BLUR_SHORTCUTS_KEY";
const LOCK_SHORTCUTS_KEY = "LOCK_SHORTCUTS_KEY";

/**
 * This Function fetches shortcut sites that are saved by user.
 * @returns {SavedShortCutSite[]}
 */
export async function getAllApp() {
  const raw = localStorage.getItem("apps");
  try {
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn("invalid apps json", e);
    return null;
  }
}

/**
 * Save a shortcut site to the localStorage database.
 *
 * @param {string} title
 * @param {URL} link
 */
export async function saveNewApp(title, link) {
  let existingApps = (await getAllApp()) ?? [];
  if (existingApps.length > 22) return;
  existingApps.push({ title, link });
  localStorage.setItem("apps", JSON.stringify(existingApps));
}

/**
 * Deletes a shortcut site from localStorage database
 * @param {number} index
 */
export async function deleteApp(index) {
  const existingApps = await getAllApp();
  if (!existingApps) return;
  existingApps.splice(index, 1);
  localStorage.setItem("apps", JSON.stringify(existingApps));
}

/**
 * Updates a nth shortcut site in the localStorage database
 *
 * @param {number} index nth number of shortcut site
 * @param {string} title New Title
 * @param {string} link New URL or link
 * @returns
 */
export async function UpdateEntry(index, title, link) {
  const existingApps = await getAllApp();
  if (!existingApps) return;
  existingApps[index] = { title, link };
  localStorage.setItem("apps", JSON.stringify(existingApps));
}

/**  ===================  Toggle add and edit shortcut application Form ====================
 *
 * All the settings of the extension.
 */
export async function showShortcutEditOrAddForm(index) {
  const containerElement = document.getElementById("addAppContainer");
  const titleElement = document.getElementById("shortcutTitle");
  const linkElement = document.getElementById("shortcutLink");
  const form = document.getElementById("newShortcutForm");

  form.removeAttribute("index");
  showPopup(containerElement);

  if (!index) {
    titleElement.value = "";
    linkElement.value = "";
    return;
  }
  const apps = await getAllApp();
  if (!apps) {
    titleElement.value = "";
    linkElement.value = "";
    return;
  }
  const { title, link } = apps[index];
  if (!title || !link) {
    titleElement.value = "";
    linkElement.value = "";
    return;
  }

  titleElement.value = title;
  linkElement.value = link;
  form.setAttribute("index", index);
}

/**
 *
 * @param {string} title
 * @param {string} link Corrected httpUrl
 * @param {string} icon Icon link with favicon path
 * @param {number} index
 * @returns {string} the basic template
 */
const shortcutSiteTemplate = (title, link, icon, index) => {
  const everyShortcut = document.createElement("div");
  everyShortcut.classList.add("everyShortcut");
  const threeDotBtn = document.createElement("button");
  threeDotBtn.classList.add("threeDot");
  threeDotBtn.innerHTML = threeDots; // three dots svg codes

  const threeDotOptions = document.createElement("div");
  threeDotOptions.classList.add("threeDotOptions");

  const editOption = document.createElement("p");
  editOption.classList.add("editShortcut");
  editOption.setAttribute("index", index);
  editOption.textContent = "Edit";

  const deleteOption = document.createElement("p");
  deleteOption.classList.add("deleteShortcut");
  deleteOption.setAttribute("index", index);
  deleteOption.textContent = "Delete";

  threeDotOptions.appendChild(editOption);
  threeDotOptions.appendChild(deleteOption);
  threeDotBtn.appendChild(threeDotOptions);
  everyShortcut.appendChild(threeDotBtn);

  const linkElement = document.createElement("a");
  linkElement.href = link;

  const iconElement = document.createElement("img");
  iconElement.src = icon;
  iconElement.alt = title;
  iconElement.classList.add("icon");

  linkElement.appendChild(iconElement);
  everyShortcut.appendChild(linkElement);

  const titleElement = document.createElement("h5");
  titleElement.classList.add("title");
  titleElement.textContent = title;
  everyShortcut.appendChild(titleElement);

  return everyShortcut.outerHTML;

  // return `
  // <div class="everyShortcut">
  //   <button class="threeDot">
  //     ${threeDots} <!-- three dots svg codes -->
  //     <div class="threeDotOptions">
  //       <p class="editShortcut" index="${index}">Edit</p>
  //       <p class="deleteShortcut" index="${index}" >Delete</p>
  //     </div>
  //   </button>
  //   <a href="${link}">
  //     <img src="${icon}" alt="${title}" class="icon" />
  //   </a>
  //   <h5 class="title">${title}</h5>
  // </div>`;
};

/**
 * Display all the saved sites to the specified section
 * @param {string} shortcutSectionId Element Id
 */
export async function loadShortCutSites() {
  const shortcutSection = document.getElementById("shortcutApp");
  const allApps = await getAllApp();

  const faviconUrl = getFaviconUrl();
  let embedApps = "";
  if (allApps != null) {
    embedApps = allApps
      .map((value, index) => {
        const httpUrl = correctUrl(value.link);
        const iconUrl = isBlurred ? "/images/favicon.ico" : `${faviconUrl}=${httpUrl}`;
        const title = isBlurred ? `Site ${index + 1}` : value.title;

        return shortcutSiteTemplate(title, httpUrl, iconUrl, index);

        // return `
        //   <div class="everyShortcut">
        //     <button class="threeDot">
        //       ${threeDots} <!-- three dots svg codes -->
        //       <div class="threeDotOptions">
        //         <p class="editShortcut" index="${index}">Edit</p>
        //         <p class="deleteShortcut" index="${index}" >Delete</p>
        //       </div>
        //     </button>
        //     <a href="${httpUrl}">
        //       <img src="${faviconUrl}=${httpUrl}" alt="${value.title}" class="icon" />
        //     </a>
        //     <h5 class="title">${value.title}</h5>
        //   </div>`;
      })
      .join("");
  }

  if (!allApps || allApps.length < 20) {
    embedApps += `<div class="everyShortcut plusIcon" id="addShortcut"><p>&plus;</p></div>`;
  }
  shortcutSection.innerHTML = embedApps;

  // add listener at last
  _shortCutSiteEditAndDeleteListeners();
}

/** ---------------------------   Shortcut Sites Edit and Delete button  ----------------
 *
 */
function _shortCutSiteEditAndDeleteListeners() {
  const everyShortcuts = document.getElementsByClassName("everyShortcut");
  const addShortcut = document.getElementById("addShortcut");
  const threeDots = document.querySelectorAll(".threeDot");
  const editShortcuts = document.querySelectorAll(".editShortcut");
  const deleteShortcuts = document.querySelectorAll(".deleteShortcut");

  // create shortcut sites
  addShortcut.addEventListener("click", () => showShortcutEditOrAddForm());

  // edit shortcut sites
  for (const edit of editShortcuts) {
    edit.addEventListener("click", async () => {
      const index = edit.getAttribute("index");
      showShortcutEditOrAddForm(index);
      return;
    });
  }

  // delete shortcut sites
  for (const element of deleteShortcuts) {
    element.addEventListener("click", async () => {
      const index = element.getAttribute("index");
      await deleteApp(index);
      return loadShortCutSites();
    });
  }

  // show edit and delete options
  for (const btn of threeDots) {
    btn.addEventListener("focus", () => btn.parentElement.classList.add("showOptions"));
    btn.addEventListener("focusout", () => btn.parentElement.classList.remove("showOptions"));
  }

  // listen right click
  for (const shortcut of everyShortcuts) {
    shortcut.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      return shortcut.getElementsByClassName("threeDot")[0].focus();
    });
  }
}

/**
 * This function listens the user's shortcut sites submission. It prevents default actions.
 * This function will save or update and ai based on the presence of the index attribute of the form element
 */
export function shortcutSiteFormListener() {
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
    loadShortCutSites();
  });
}

/**
 * Hide the user saved shortcut section and let's the place empty.
 *
 * returns {boolean} whether it's enabled or not in localStorage
 * to update tha localStorage value, pass a boolean value to the function
 */
export const hideShortcuts = (value) => getOrUpdateLocalStorage(HIDE_SHORTCUTS_KEY, value) === "true";
/**
 * Blur the user saved shortcut section for privacy.
 *
 * returns {boolean} whether it's enabled or not in localStorage
 * to update tha localStorage value, pass a boolean value to the function
 */
export const blurShortcuts = (value) => getOrUpdateLocalStorage(BLUR_SHORTCUTS_KEY, value) === "true";
/**
 * Lock the user saved shortcut section to prevent adding, editing or deleting.
 *
 * returns {boolean} whether it's enabled or not in localStorage
 * to update tha localStorage value, pass a boolean value to the function
 */
export const lockShortcuts = (value) => getOrUpdateLocalStorage(LOCK_SHORTCUTS_KEY, value) === "true";
