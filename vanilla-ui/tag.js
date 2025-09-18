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
    return tag;
};
