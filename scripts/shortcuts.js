// shortcuts.js - handles storage and rendering of custom shortcuts
import { threeDots } from "./svg.js";
import { correctUrl, getFaviconUrl } from "./utils.js";

export async function getAllApp() {
  const raw = localStorage.getItem("apps");
  try {
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn("invalid apps json", e);
    return null;
  }
}

export async function saveNewApp(title, link) {
  let existingApps = await getAllApp();
  if (!existingApps) existingApps = [];
  existingApps.push({ title, link });
  localStorage.setItem("apps", JSON.stringify(existingApps));
}

export async function deleteApp(index) {
  const existingApps = await getAllApp();
  if (!existingApps) return;
  existingApps.splice(index, 1);
  localStorage.setItem("apps", JSON.stringify(existingApps));
}

export async function UpdateEntry(index, title, link) {
  const existingApps = await getAllApp();
  if (!existingApps) return;
  existingApps[index] = { title, link };
  localStorage.setItem("apps", JSON.stringify(existingApps));
}

// reuse helpers from `utils.js` (imported above)

export async function showForm(containerEl, index) {
  const titleEl = document.getElementById("shortcutTitle");
  const linkEl = document.getElementById("shortcutLink");
  containerEl.style.display = "block";
  containerEl.style.zIndex = 2;
  const popupBg = document.getElementById("popupBg");
  popupBg.style.zIndex = 1;
  popupBg.style.display = "block";

  if (index == null) {
    titleEl.value = "";
    linkEl.value = "";
    return;
  }

  const apps = await getAllApp();
  if (!apps) return;
  const { title, link } = apps[index];
  titleEl.value = title;
  linkEl.value = link;
}

export async function shortcutAppDisplay(shortcutSectionId = "shortcutApp") {
  const shortcutSection = document.getElementById(shortcutSectionId);
  const allApps = await getAllApp();

  let embedApps = " ";
  if (allApps != null) {
    embedApps += allApps
      .map((value, index) => {
        const httpUrl = correctUrl(value.link);
        return `
      <div class="everyShortcut">
        <button class="threeDot">
          ${threeDots} <!-- three dots svg codes -->
          <div class="threeDotOptions" index="${index}">
            <p class="editShortcut">Edit</p>
            <p class="deleteShortcut">Delete</p>
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

  if (!allApps || allApps.length < 16) {
    embedApps += `<div class="everyShortcut plusIcon" id="addShortcut"><p>&plus;</p></div>`;
  }
  shortcutSection.innerHTML = embedApps;

  const addAppButton = document.getElementById("addShortcut");
  const dotBtns = document.querySelectorAll(".threeDot");
  const edits = document.querySelectorAll(".editShortcut");
  const deletes = document.querySelectorAll(".deleteShortcut");

  for (const edit of edits) {
    edit.addEventListener("click", async () => {
      const index = edit.parentElement.getAttribute("index");
      const form = document.getElementById("newShortcutForm");
      form.setAttribute("index", index);
      return await showForm(document.getElementById("addAppContainer"), index);
    });
  }

  for (const element of deletes) {
    element.addEventListener("click", async () => {
      const index = element.parentElement.getAttribute("index");
      await deleteApp(index);
      return location.reload();
    });
  }

  for (const btn of dotBtns) {
    btn.addEventListener("focus", () => btn.parentElement.classList.add("showOptions"));
    btn.addEventListener("focusout", () => btn.parentElement.classList.remove("showOptions"));
  }

  if (addAppButton) {
    addAppButton.addEventListener("click", () => {
      const form = document.getElementById("newShortcutForm");
      form.removeAttribute("index");
      showForm(document.getElementById("addAppContainer"));
    });
  }
}
