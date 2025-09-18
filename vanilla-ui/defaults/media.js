import { Tag } from "../core/tag.js";
//  ====================    ImageTag =============
export const Image = (options) => {
    const element = Tag("img", options);
    if (!options)
        return element;
    // setting options
    if (options.src)
        element.src = options.src.toString();
    if (options.sizes)
        element.sizes = options.sizes;
    if (options.alt)
        element.alt = options.alt;
    if (options.srcset) {
        const srcset = Object.entries(options.srcset).map((key, value) => `${value.toString()} ${key}`).join(" ");
        element.srcset = srcset;
    }
    return element;
};
export const Img = (Option) => Image(Option);
export const Video = (options) => {
    const element = Tag("video", options);
    if (!options)
        return element;
    if (options.src)
        element.src = options.src.toString();
    return element;
};
