// export class Tag {
//     constructor(
//         private name: string,
//         private options: TagOptions,
//     ) {
//         this.name = name;
//         this.options = options;
//     }
//     private createElement(): HTMLElement {
//         const { id, class: className, childs, attributes, title, style } =
//             this.options;
//         const classAttr = Array.isArray(className)
//             ? className.join(" ")
//             : className;
//         // create tag
//         const tag = document.createElement(this.name);
//         // set all attributes
//         if (id) tag.id = id;
//         if (classAttr) tag.className = classAttr;
//         if (title) tag.title = title;
//         if (attributes) {
//             for (const [key, value] of Object.entries(attributes)) {
//                 if (value) {
//                     if (Array.isArray(value)) {
//                         tag.setAttribute(key, value.join(" "));
//                     } else {
//                         tag.setAttribute(key, value);
//                     }
//                 }
//             }
//         }
//         // set all childs
//         if (childs) {
//             if (Array.isArray(childs)) {
//                 childs.forEach((child) => tag.appendChild(child));
//             } else {
//                 tag.appendChild(childs);
//             }
//         }
//         // set style
//         if (style) {
//             for (const [key, value] of Object.entries(style)) {
//                 tag.style[key as any] = value as string;
//             }
//         }
//         // set onclick event
//         if (this.options.onClick) {
//             tag.addEventListener("click", this.options.onClick);
//         }
//         return tag;
//     }
//     get getElement() {
//         return this.createElement();
//     }
// }
export const Tag = (name, options) => {
    const { id, class: className, childs, attributes, title, style } = options ?? {};
    const classAttr = Array.isArray(className)
        ? className.join(" ")
        : className;
    // create tag
    const tag = document.createElement(name);
    // set all attributes
    if (id)
        tag.id = id;
    if (classAttr)
        tag.className = classAttr;
    if (title)
        tag.title = title;
    if (attributes) {
        for (const [key, value] of Object.entries(attributes)) {
            if (value) {
                if (Array.isArray(value)) {
                    tag.setAttribute(key, value.join(" "));
                }
                else {
                    tag.setAttribute(key, value);
                }
            }
        }
    }
    // set all childs
    if (childs) {
        if (Array.isArray(childs)) {
            childs.forEach((child) => tag.appendChild(child));
        }
        else {
            tag.appendChild(childs);
        }
    }
    // set style
    if (style) {
        for (const [key, value] of Object.entries(style)) {
            tag.style[key] = value;
        }
    }
    // set disabled
    if (options?.disabled) {
        tag.setAttribute("disabled", "true");
    }
    // set onclick event
    if (options?.onClick) {
        tag.addEventListener("click", options.onClick);
    }
    // set onChange event
    if (options?.onChange) {
        tag.addEventListener("change", options.onChange);
    }
    // set onHover event
    if (options?.onHover) {
        tag.addEventListener("mouseover", options.onHover);
    }
    // set onBlur event
    if (options?.onBlur) {
        tag.addEventListener("blur", options.onBlur);
    }
    // set onload event
    if (options?.onload) {
        tag.addEventListener("load", options.onload);
    }
    // set all event listeners
    if (options?.eventLinsteners) {
        for (const [key, value] of Object.entries(options.eventLinsteners)) {
            tag.addEventListener(key, value);
        }
    }
    //  ? Letting user having more control over the tag
    if (options?.controller) {
        options?.controller(tag);
    }
    return tag;
};
export const createTag = (tag) => (options) => Tag(tag, options);
