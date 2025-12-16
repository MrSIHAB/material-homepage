// search.js - handles search engine selection, theme, and search submission
export const SEARCH_ENGINE_KEY = "engine";

export function setTheme(body = document.body) {
    const theme = localStorage.getItem("theme");
    if (theme == null) localStorage.setItem("theme", "skyblue");
    body.classList = localStorage.getItem("theme");
}
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

    if (engine === "bing") {
        engineFormEl.action = "https://www.bing.com/search";
        searchInputEl.name = "q";
    } else if (engine === "yahoo") {
        engineFormEl.action = "https://search.yahoo.com/search";
        searchInputEl.name = "p";
    } else if (engine === "youtube") {
        engineFormEl.action = "https://www.youtube.com/results";
        searchInputEl.name = "search_query";
    } else {
        engineFormEl.action = "https://www.google.com/search";
        searchInputEl.name = "q";
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
    const urlPattern =
        /^(?:(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/[\w-]*)*\/? )$/;
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

export function initSearch(
    { searchEngineEl, engineFormEl, searchInputEl, submitBtn },
) {
    setTheme(); // setting theme
    // setting engine name, form action and input name (q, p)
    setSearchEngine(searchEngineEl, engineFormEl, searchInputEl);

    // Setting up search engine when user change it form select element
    searchEngineEl.addEventListener("change", () => {
        localStorage.setItem(SEARCH_ENGINE_KEY, searchEngineEl.value);
        setSearchEngine(searchEngineEl, engineFormEl, searchInputEl);
    });

    const search = searchHandler(engineFormEl, searchInputEl);
    // if (submitBtn) submitBtn.addEventListener("click", search);
    if (engineFormEl) engineFormEl.addEventListener("submit", search);
}
