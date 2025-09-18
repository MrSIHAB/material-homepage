export type HTMLTagName = keyof HTMLElementTagNameMap;
export interface TagOptions {
    id?: string;
    class?: string | string[];
    childs?: HTMLElement | HTMLElement[];
    attributes?: Record<string, string | string[] | null>;
    title?: string;
    style?: Partial<CSSStyleDeclaration>;
    disabled?: boolean;
    onClick?: EventListenerOrEventListenerObject;
    onChange?: EventListenerOrEventListenerObject;
    onHover?: EventListenerOrEventListenerObject;
    onBlur?: EventListenerOrEventListenerObject;
    onload?: EventListenerOrEventListenerObject;
    eventLinsteners?: Record<string, EventListenerOrEventListenerObject>;
    controller?: (element: HTMLElement) => void;
}
export declare const Tag: (name: HTMLTagName, options?: TagOptions) => HTMLElement;
export declare const createTag: (tag: keyof HTMLElementTagNameMap) => (options?: TagOptions) => HTMLElement;
