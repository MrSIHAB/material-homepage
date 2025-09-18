export const Run = (element) => {
    const body = document.body;
    body.style.margin = "0";
    body.style.padding = "0";
    body.style.boxSizing = "border-box";
    if (Array.isArray(element)) {
        element.forEach((elem) => {
            document.body.appendChild(elem);
        });
    }
    else {
        document.body.appendChild(element);
    }
};
