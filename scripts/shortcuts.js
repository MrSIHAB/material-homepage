// shortcuts.js - handles storage and rendering of custom shortcuts
import { threeDots } from "./svg.js";
import { closePopup, showPopup } from "./ui.js";
import { correctUrl, getFaviconUrl } from "./utils.js";

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
 * Display all the saved sites to the specified section
 * @param {string} shortcutSectionId Element Id
 */
export async function loadShortCutSites() {
  const shortcutSection = document.getElementById("shortcutApp");
  const allApps = await getAllApp();

  let embedApps = "";
  if (allApps != null) {
    embedApps = allApps
      .map((value, index) => {
        const httpUrl = correctUrl(value.link);
        return `
      <div class="everyShortcut">
        <button class="threeDot">
          ${threeDots} <!-- three dots svg codes -->
          <div class="threeDotOptions">
            <p class="editShortcut" index="${index}">Edit</p>
            <p class="deleteShortcut" index="${index}" >Delete</p>
          </div>
        </button>
        <a href="${httpUrl}">
          <img src="${getFaviconUrl(httpUrl)}" alt="" class="icon" />
        </a>
        <h5 class="title">${value.title}</h5>
      </div>`;
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
      return (shortcut.getElementsByClassName("threeDot")[0].focus() = true);
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
