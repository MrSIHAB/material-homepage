export interface TagOptions {
    id?: string;
    class?: string | string[];
    childs?: HTMLElement | HTMLElement[];
    attributes?: Record<string, string | string[] | null>;
    title?: string;
    style?: Partial<CSSStyleDeclaration>;
    onClick?: (event: MouseEvent) => void;
}
export declare const Tag: (name: string, options: TagOptions) => HTMLElement;
