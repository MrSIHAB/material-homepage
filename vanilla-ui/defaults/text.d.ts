import { TagOptions } from "../core/tag.js";
export interface TextOption extends TagOptions {
    childs: undefined;
}
export declare const Text: (text: string, options?: TextOption) => HTMLElement;
export declare const Span: (text: string, option?: TextOption) => HTMLElement;
export declare const Mark: (options: TagOptions) => HTMLElement;
