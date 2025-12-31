import { searchIcon } from "./svg.js";

// search.js - handles search engine selection, theme, and search submission
export const SEARCH_ENGINE_KEY = "engine";

/**
 * This function takes three element, the elements is simple sentence are:
 * Input field, select element of search engine and the search form around
 * the search input.
 *
 * ### What is does?
 * The function gets the selected search engine from local storage, and it
 * sets the engin to the select input as value. This will automatically toggle
 * to the selected engine.
 *
 * Next:- It tries to identify the search engine name and replace form's
 * action url and input's name based on what search engine was selected
 *
 * Use: Update the engine in localStorage and run this function.
 *
 * @param {HTMLSelectElement} searchEngineEl google, yahoo, bing
 * @param {HTMLFormElement} engineFormEl wrapper form around search input
 * @param {HTMLInputElement} searchInputEl the input where user writes query
 * @returns void;
 */
export function setSearchEngine(searchEngineEl, engineFormEl, searchInputEl) {
  const engine = localStorage.getItem(SEARCH_ENGINE_KEY);
  if (searchEngineEl) searchEngineEl.value = engine ?? "google";

  if (!engineFormEl || !searchInputEl) return;

  switch (engine) {
    case "bing":
      engineFormEl.action = "https://www.bing.com/search";
      searchInputEl.name = "q";
      break;
    case "yahoo":
      engineFormEl.action = "https://search.yahoo.com/search";
      searchInputEl.name = "p";
      break;
    case "youtube":
      engineFormEl.action = "https://www.youtube.com/results";
      searchInputEl.name = "search_query";
      break;
    case "duckduckgo":
      engineFormEl.action = "https://duckduckgo.com/";
      searchInputEl.name = "q";
      break;
    default:
      // case google by default
      engineFormEl.action = "https://www.google.com/search";
      searchInputEl.name = "q";
      break;
  }
}

/**
 * Checks if a string is link or not.
 *
 * `https://sihab.deno.dev =>` `true` \
 * `sihab.deno.dev` => `true` \
 *
 * Any whitespace will return false
 * @param {string} str
 * @returns {boolean}
 */
export function isLink(str) {
  // simple fallback: treat strings with dots and no spaces as links
  const simple = /^[^\s]+\.[^\s]+$/;
  return simple.test(str);
}

export function searchHandler(engineFormEl, searchInputEl) {
  return function (e) {
    if (e && e.preventDefault) e.preventDefault();
    const query = searchInputEl.value.trim();
    if (!query) return;
    // treat as link if contains a dot and no spaces
    if (isLink(query)) {
      let link = query.replace(/^https?:\/\//, "");
      window.location.href = `https://${link}`;
    } else {
      engineFormEl.submit();
    }
  };
}

export function initSearch() {
  /** Google, yahoo, bing, youtube, duck duck go */
  const searchEngineEl = document.getElementById("searchEngine");
  /** The wrapper form around the search input. */
  const engineFormEl = document.getElementById("searchForm");
  /** The search input where user writes query */
  const searchInputEl = document.getElementById("search");

  // setting engine name, form action and input name (q, p)
  setSearchEngine(searchEngineEl, engineFormEl, searchInputEl);

  // Setting up search engine when user change it form select element
  searchEngineEl.addEventListener("change", () => {
    localStorage.setItem(SEARCH_ENGINE_KEY, searchEngineEl.value);
    setSearchEngine(searchEngineEl, engineFormEl, searchInputEl);
    updateCustomSelectUI();
  });

  // Custom Select Logic
  const customSelect = document.getElementById("customSearchSelect");
  const selectedOptionDiv = document.getElementById("selectedOption");
  const optionsContainer = document.getElementById("optionsContainer");
  const options = optionsContainer.querySelectorAll(".option");

  function updateCustomSelectUI() {
    const currentVal = searchEngineEl.value;
    // Update selected icon/text
    // We only show icon in the trigger based on design commonly, or both.
    // Let's find the option that matches
    const matchingOption = Array.from(options).find((opt) => opt.dataset.value === currentVal);
    if (matchingOption) {
      const iconHTML = matchingOption.querySelector(".icon").innerHTML;
      selectedOptionDiv.querySelector(".icon").innerHTML = iconHTML;
      // Optionally update text if we uncommented it in HTML
      selectedOptionDiv.querySelector(".text").innerText = matchingOption.querySelector(".text").innerText;
    }
  }

  // Initial update
  // Wait for SVGs to load? They load via another script.
  // We can just set value, the SVGs are inside spans so copying innerHTML works if populated.
  // Actually svgLoader inserts into span[svg].
  // We need to re-run svg insertion for our new elements if they were dynamic, but they are in DOM.
  // just call updateCustomSelectUI after a small delay or trust svgLoader.

  selectedOptionDiv.addEventListener("click", (e) => {
    e.stopPropagation();
    customSelect.classList.toggle("active-options");
  });

  options.forEach((option) => {
    option.addEventListener("click", (e) => {
      e.stopPropagation();
      const value = option.dataset.value;
      searchEngineEl.value = value;
      searchEngineEl.dispatchEvent(new Event("change"));
      customSelect.classList.remove("active-options");
    });
  });

  document.addEventListener("click", (e) => {
    if (!customSelect.contains(e.target)) {
      customSelect.classList.remove("active-options");
    }
  });

  // Handle initial load sync
  setTimeout(updateCustomSelectUI, 55); // Slight delay for SVGs

  _searchSuggestionsLoader(); // Search suggestion builder

  const search = searchHandler(engineFormEl, searchInputEl);
  // if (submitBtn) submitBtn.addEventListener("click", search);
  if (engineFormEl) engineFormEl.addEventListener("submit", search);
}

/**
 *  Search suggestion building, listeners and initial loader
 */
function _searchSuggestionsLoader() {
  const engineFormEl = document.getElementById("searchForm");
  const searchInputEl = document.getElementById("search");
  // Suggestion elements
  const suggestionsContainer = document.getElementById("suggestions");
  const toggleSuggestionsEl = document.getElementById("toggleSuggestions");
  const SUGGESTIONS_ENABLED_KEY = "suggestions-enabled";

  let selectedIndex = -1;
  let suggestions = [];

  // Initialize toggle state
  const isEnabled = localStorage.getItem(SUGGESTIONS_ENABLED_KEY) === "true";
  if (toggleSuggestionsEl) {
    toggleSuggestionsEl.checked = isEnabled;
    toggleSuggestionsEl.addEventListener("change", async (e) => {
      const checked = e.target.checked;
      if (checked) {
        // Request permissions if in Chrome Extension context
        if (typeof chrome !== "undefined" && chrome.permissions) {
          try {
            const granted = await new Promise((resolve) => {
              chrome.permissions.request(
                {
                  origins: ["https://suggestqueries.google.com/*"],
                },
                (result) => resolve(result)
              );
            });
            if (!granted) {
              e.target.checked = false;
              localStorage.setItem(SUGGESTIONS_ENABLED_KEY, "false");
              return;
            }
          } catch (err) {
            console.error("Permission request failed:", err);
            // Fallback: continue anyway as it might work outside extension or if already granted
          }
        }
      }
      localStorage.setItem(SUGGESTIONS_ENABLED_KEY, checked);
      if (!checked) {
        suggestionsContainer.classList.remove("active");
      }
    });
  }

  async function fetchSuggestions(query) {
    selectedIndex = -1;
    if (!query || localStorage.getItem(SUGGESTIONS_ENABLED_KEY) !== "true") {
      suggestionsContainer.classList.remove("active");
      return;
    }
    try {
      // Using google suggest API with JSONP approach usually,
      // but client=chrome returns a simple JSON array.
      // Note: This might face CORS issues in some environments if not a browser extension.
      // For extension environments it usually works fine.
      const response = await fetch(
        `https://suggestqueries.google.com/complete/search?client=chrome&q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      suggestions = data[1] || [];
      renderSuggestions();
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  }

  function renderSuggestions() {
    if (suggestions.length === 0) {
      suggestionsContainer.classList.remove("active");
      return;
    }

    suggestionsContainer.innerHTML = suggestions
      .map(
        (suggestion, index) => `
      <div class="suggestion-item ${index === selectedIndex ? "selected" : ""}" data-index="${index}">
        <span class="suggestion-icon" svg="searchIcon">${searchIcon}</span>
        <span>${suggestion}</span>
      </div>
    `
      )
      .join("");

    suggestionsContainer.classList.add("active");

    const items = suggestionsContainer.querySelectorAll(".suggestion-item");
    items.forEach((item) => {
      item.addEventListener("click", () => {
        const index = parseInt(item.dataset.index);
        searchInputEl.value = suggestions[index];
        suggestionsContainer.classList.remove("active");
        engineFormEl.submit();
      });
    });
  }

  let debounceTimer;
  searchInputEl.addEventListener("input", (e) => {
    clearTimeout(debounceTimer);
    const query = e.target.value.trim();
    debounceTimer = setTimeout(() => {
      fetchSuggestions(query);
    }, 200);
  });

  searchInputEl.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + suggestions.length) % suggestions.length;
      searchInputEl.value = suggestions[selectedIndex];
      renderSuggestions();
      scrollIntoView(suggestionsContainer.querySelectorAll(".suggestion-item")[selectedIndex]);
    } else if (e.key === "ArrowDown" || e.key === "Tab") {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % suggestions.length;
      searchInputEl.value = suggestions[selectedIndex];
      renderSuggestions();
      scrollIntoView(suggestionsContainer.querySelectorAll(".suggestion-item")[selectedIndex]);
    } else if (e.key === "Enter" && selectedIndex > -1) {
      e.preventDefault();
      searchInputEl.value = suggestions[selectedIndex];
      suggestionsContainer.classList.remove("active");
      engineFormEl.submit();
    } else if (e.key === "Escape") {
      suggestionsContainer.classList.remove("active");
    }
  });

  function scrollIntoView(element) {
    if (!element) return;
    element.scrollIntoView({ block: "nearest" });
  }

  document.addEventListener("click", (e) => {
    if (!engineFormEl.contains(e.target)) {
      suggestionsContainer.classList.remove("active");
    }
  });
  searchInputEl.addEventListener("focus", () => {
    if (suggestions.length != 0 && searchInputEl.value.trim() !== "") {
      suggestionsContainer.classList.add("active");
    }
  });
}
