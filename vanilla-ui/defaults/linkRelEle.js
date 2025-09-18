import { Tag } from "../core/tag.js";
//  =====================   Anchor Tag  =====================
export const A = (option) => {
    const anchorTag = Tag("a", option);
    if (option.href) {
        if (typeof option.href === "string") {
            anchorTag.setAttribute("href", option.href);
        }
        else if (option.href instanceof URL) {
            anchorTag.setAttribute("href", option.href.toString());
        }
        else if (option.href instanceof URLSearchParams) {
            anchorTag.setAttribute("href", option.href.toString());
        }
    }
    if (option.target) {
        anchorTag.setAttribute("target", option.target);
    }
    if (option.rel) {
        anchorTag.setAttribute("rel", option.rel);
    }
    if (option.download) {
        anchorTag.setAttribute("download", option.download === true ? "" : option.download);
    }
    if (option.type) {
        anchorTag.setAttribute("type", option.type);
    }
    if (option.ping) {
        anchorTag.setAttribute("ping", option.ping);
    }
    if (option.hreflang) {
        anchorTag.setAttribute("hreflang", option.hreflang);
    }
    if (option.referrerpolicy) {
        anchorTag.setAttribute("referrerpolicy", option.referrerpolicy);
    }
    return anchorTag;
};
export const Anchor = (option) => A(option);
export const Link = (option) => {
    const linkTag = document.createElement("link");
    if (option.href) {
        if (typeof option.href === "string") {
            linkTag.setAttribute("href", option.href);
        }
        else if (option.href instanceof URL) {
            linkTag.setAttribute("href", option.href.toString());
        }
        else if (option.href instanceof URLSearchParams) {
            linkTag.setAttribute("href", option.href.toString());
        }
    }
    if (option.rel) {
        linkTag.setAttribute("rel", option.rel);
    }
    if (option.type) {
        linkTag.setAttribute("type", option.type);
    }
    if (option.sizes) {
        linkTag.setAttribute("sizes", option.sizes);
    }
    if (option.media) {
        linkTag.setAttribute("media", option.media);
    }
    if (option.hreflang) {
        linkTag.setAttribute("hreflang", option.hreflang);
    }
    return linkTag;
};
export const Meta = (option) => {
    const metaTag = Tag("meta", option);
    if (option.name) {
        metaTag.setAttribute("name", option.name);
    }
    if (option.content) {
        metaTag.setAttribute("content", option.content);
    }
    if (option.charset) {
        metaTag.setAttribute("charset", option.charset);
    }
    if (option.httpEquiv) {
        metaTag.setAttribute("http-equiv", option.httpEquiv);
    }
    if (option.scheme) {
        metaTag.setAttribute("scheme", option.scheme);
    }
    if (option.property) {
        metaTag.setAttribute("property", option.property);
    }
    if (option.itemprop) {
        metaTag.setAttribute("itemprop", option.itemprop);
    }
    if (option.lang) {
        metaTag.setAttribute("lang", option.lang);
    }
    if (option.dir) {
        metaTag.setAttribute("dir", option.dir);
    }
    return metaTag;
};
export const MetaTag = (option) => Meta(option);
