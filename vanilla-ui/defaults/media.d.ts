import { TagOptions } from "../core/tag.js";
export interface ImageInterface extends TagOptions {
    src: string | URL;
    alt?: string;
    srcset?: Record<string, string | URL>;
    sizes?: string;
}
export declare const Image: (options?: ImageInterface) => HTMLImageElement;
export declare const Img: (Option: ImageInterface) => HTMLImageElement;
export interface VideoInterface extends TagOptions {
    src: string | URL;
}
export declare const Video: (options?: VideoInterface) => HTMLVideoElement;
