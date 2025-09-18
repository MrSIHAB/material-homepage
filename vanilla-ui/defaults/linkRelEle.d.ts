import { TagOptions } from "../core/tag.js";
export interface AnchorelOptions extends TagOptions {
    href: string | URL | URLSearchParams;
    target?: "_self" | "_blank" | "_parent" | "_top" | string;
    rel?: string;
    download?: string | boolean;
    type?: string;
    ping?: string;
    hreflang?: string;
    referrerpolicy?: string;
}
export declare const A: (option: AnchorelOptions) => HTMLElement;
export declare const Anchor: (option: AnchorelOptions) => HTMLElement;
export interface LinkTagOptions {
    href?: string | URL | URLSearchParams;
    rel?: string;
    type?: string;
    sizes?: string;
    media?: string;
    hreflang?: string;
}
export declare const Link: (option: LinkTagOptions) => HTMLLinkElement;
export interface MetaTagOptions extends TagOptions {
    name?: string;
    content?: string;
    charset?: string;
    httpEquiv?: string;
    scheme?: string;
    property?: string;
    itemprop?: string;
    lang?: string;
    dir?: "ltr" | "rtl" | "auto";
}
export declare const Meta: (option: MetaTagOptions) => HTMLElement;
export declare const MetaTag: (option: MetaTagOptions) => HTMLElement;
