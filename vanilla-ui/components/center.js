import { Div } from "../main.js";
export const Center = ({ childs }) => {
    return Div({
        style: {
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        childs: Div({
            childs: childs,
        }),
    });
};
