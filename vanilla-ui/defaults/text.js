import { Tag } from "../core/tag.js";
export const Text = (text, options) => {
    //? handling childs section.
    if (options?.childs)
        options.childs = undefined;
    const element = Tag("span", options);
    element.textContent = text;
    return element;
};
export const Span = (text, option) => Text(text, option);
export const Mark = (options) => {
    const element = Tag("mark", options);
    return element;
};
