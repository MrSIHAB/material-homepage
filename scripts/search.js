import { searchIcon } from "./svg.js";
import { closePopup } from "./ui.js";
import { correctUrl, isLink } from "./utils.js";

// search.js - handles search engine selection, theme, and search submission
export const SEARCH_ENGINE_KEY = "engine";
export const SUGGESTIONS_ENABLED_KEY = "suggestions-enabled";

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

export function searchHandler(engineFormEl, searchInputEl) {
  return function (e) {
    if (e && e.preventDefault) e.preventDefault();
    const query = searchInputEl.value.trim();
    if (!query) return;
    // treat as link if contains a dot and no spaces
    if (isLink(query)) {
      // let link = query.replace(/^https?:\/\//, "");
      let link = correctUrl(query);
      window.location.href = link;
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

  // Key bindings for search bar
  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key == "k") {
      e.preventDefault();
      closePopup();
      searchInputEl.focus();
    }
  });
  document.onload = (e) => {
    e.preventDefault();
    searchInputEl.focus();
  };
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

  // Constants
  const DEBOUNCE_DELAY = 150; // ms - reduced for better responsiveness

  // State management
  let selectedIndex = -1;
  let suggestions = [];
  let originalQuery = null; // Store user's original input before navigation
  let isNavigating = false; // Flag to prevent duplicate fetches during keyboard navigation
  let debounceTimer;

  // Initialize toggle state
  const isEnabled = localStorage.getItem(SUGGESTIONS_ENABLED_KEY) === "true";
  toggleSuggestionsEl.checked = isEnabled; // resolve permission if it is enabled already
  toggleSuggestionsEl.addEventListener("change", async (e) => {
    const checked = e.target.checked;
    localStorage.setItem(SUGGESTIONS_ENABLED_KEY, checked);
    if (checked) getSuggestionApiPermission();
    else suggestionsContainer.classList.remove("active");
    resetState();
  });

  /**
   * Resets the suggestion state
   */
  function resetState() {
    selectedIndex = -1;
    originalQuery = null;
    isNavigating = false;
  }

  /**
   * Fetches search suggestions from Google
   * @param {string} query - The search query
   */
  async function fetchSuggestions(query) {
    resetState();
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
        `https://suggestqueries.google.com/complete/search?client=chrome&q=${encodeURIComponent(query)}`,
      );
      const data = await response.json();
      suggestions = data[1] || [];
      renderSuggestions();
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      suggestionsContainer.classList.remove("active");
    }
  }

  /**
   * Renders the suggestion list
   */
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
    `,
      )
      .join("");

    suggestionsContainer.classList.add("active");

    const items = suggestionsContainer.querySelectorAll(".suggestion-item");

    // Click handlers
    items.forEach((item) => {
      item.addEventListener("click", () => {
        const index = parseInt(item.dataset.index);
        searchInputEl.value = suggestions[index];
        suggestionsContainer.classList.remove("active");
        resetState();
        engineFormEl.submit();
      });
    });
  }

  /**
   * Updates visual selection without re-rendering entire list
   */
  function updateVisualSelection() {
    const items = suggestionsContainer.querySelectorAll(".suggestion-item");
    items.forEach((item, index) => {
      if (index === selectedIndex) {
        item.classList.add("selected");
      } else {
        item.classList.remove("selected");
      }
    });
  }

  /**
   * Handles suggestion navigation and updates input value
   * @param {number} newIndex - The new selected index
   */
  function navigateToSuggestion(newIndex) {
    // Store original query on first navigation
    if (originalQuery === null) {
      originalQuery = searchInputEl.value;
    }

    isNavigating = true;
    selectedIndex = newIndex;
    searchInputEl.value = suggestions[selectedIndex];
    updateVisualSelection();
    scrollIntoView(suggestionsContainer.querySelectorAll(".suggestion-item")[selectedIndex]);

    // Reset navigation flag after a short delay
    setTimeout(() => {
      isNavigating = false;
    }, 50);
  }

  // Input event - debounced suggestion fetching
  searchInputEl.addEventListener("input", (e) => {
    const query = e.target.value.trim();

    // Skip if we're navigating with keyboard
    if (isNavigating) {
      return;
    }

    // Reset state when user types new characters
    resetState();

    // Clear existing timer
    clearTimeout(debounceTimer);

    // Don't set timer for empty queries
    if (!query) {
      suggestionsContainer.classList.remove("active");
      return;
    }

    // Set debounce timer
    debounceTimer = setTimeout(() => {
      fetchSuggestions(query);
    }, DEBOUNCE_DELAY);
  });

  // Keydown event - navigation and submission
  searchInputEl.addEventListener("keydown", (e) => {
    const hasActiveSuggestions = suggestions.length > 0 && suggestionsContainer.classList.contains("active");

    // Arrow Up navigation
    if (e.key === "ArrowUp") {
      if (!hasActiveSuggestions) return;

      e.preventDefault();
      const newIndex = selectedIndex <= 0 ? suggestions.length - 1 : selectedIndex - 1;
      navigateToSuggestion(newIndex);
    }
    // Arrow Down navigation
    else if (e.key === "ArrowDown") {
      if (!hasActiveSuggestions) return;

      e.preventDefault();
      const newIndex = selectedIndex >= suggestions.length - 1 ? 0 : selectedIndex + 1;
      navigateToSuggestion(newIndex);
    }
    // Tab key - cycle through suggestions (only when active)
    else if (e.key === "Tab" && hasActiveSuggestions) {
      e.preventDefault();
      if (e.shiftKey) {
        // Tab + Shift - navigate backwards
        const newIndex = selectedIndex <= 0 ? suggestions.length - 1 : selectedIndex - 1;
        navigateToSuggestion(newIndex);
      } else {
        // Tab - navigate forwards
        const newIndex = selectedIndex >= suggestions.length - 1 ? 0 : selectedIndex + 1;
        navigateToSuggestion(newIndex);
      }
    }
    // Enter key - submit selected or search directly
    else if (e.key === "Enter") {
      if (hasActiveSuggestions && selectedIndex > -1) {
        // Use selected suggestion
        e.preventDefault();
        searchInputEl.value = suggestions[selectedIndex];
        suggestionsContainer.classList.remove("active");
        resetState();
        engineFormEl.submit();
      }
      // Otherwise let the form submit naturally with current input value
    }
    // Escape key - restore original query or just close suggestions
    else if (e.key === "Escape") {
      if (hasActiveSuggestions) {
        e.preventDefault();
        suggestionsContainer.classList.remove("active");

        // Restore original query if we were navigating
        if (originalQuery !== null) {
          searchInputEl.value = originalQuery;
        }

        resetState();
      }
    }
  });

  /**
   * Scrolls the selected element into view
   * @param {HTMLElement} element - The element to scroll to
   */
  function scrollIntoView(element) {
    if (!element) return;
    element.scrollIntoView({ block: "nearest" });
  }

  // Close suggestions when clicking outside
  document.addEventListener("click", (e) => {
    if (!engineFormEl.contains(e.target)) {
      suggestionsContainer.classList.remove("active");
      resetState();
    }
  });

  // Show suggestions again on focus if we have data
  searchInputEl.addEventListener("focus", () => {
    if (suggestions.length !== 0 && searchInputEl.value.trim() !== "") {
      suggestionsContainer.classList.add("active");
    }
  });
}

/**
 * Try to get `https://suggestqueries.google.com/*` api permission.
 * Automatically handles Granted and denied task
 */
export async function getSuggestionApiPermission() {
  const suggestionsContainer = document.getElementById("suggestions");
  const toggleSuggestionsEl = document.getElementById("toggleSuggestions");

  if (typeof chrome !== "undefined" && chrome.permissions) {
    try {
      const granted = await new Promise((resolve) =>
        chrome.permissions.request({ origins: ["https://suggestqueries.google.com/*"] }, (result) =>
          resolve(result),
        ),
      );

      toggleSuggestionsEl.checked = granted;
      localStorage.setItem(SUGGESTIONS_ENABLED_KEY, granted);

      if (granted) suggestionsContainer.classList.add("active");
      else suggestionsContainer.classList.remove("active");
    } catch (error) {
      console.error("Search suggestions permission failed: ", error);
      suggestionsContainer.classList.remove("active");
    }
  }
}
