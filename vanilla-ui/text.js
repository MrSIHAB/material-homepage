import { Tag } from "./tag.js";
export const Text = (textContent, options) => {
    const element = Tag("span", options);
    element.textContent = textContent;
    return element;
};
export const Mark = (options) => {
    const element = Tag("mark", options);
    return element;
};
