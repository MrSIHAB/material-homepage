"use-strict";
import { Div, Text, Input } from "../vanilla-ui/main.js";

export const colorSettings = () => {
  const colorThemes = {
    skyblue: "#2acdf5",
    red: "#d40909",
    green: "#08cf61",
    yellow: "#ece807",
    purple: "#800080",
  };

  return Div({
    childs: [
      Text("Themes: ", { style: { fontWeight: "bold" } }),
      Div({
        style: {
          display: "flex",
          gap: "10px",
          margin: "10px 0",
        },
        childs: Object.entries(colorThemes).map(([key, value]) =>
          Input({
            type: "radio",
            class: "themes",
            name: "theme",
            value: key,
            style: {
              position: "relative",
              listStyle: "none",
              height: "37px",
              width: "37px",
              flexWrap: "wrap",
              backgroundColor: value,
              borderRadius: "50%",
              cursor: "pointer",
              appearance: "none",
              webkitAppearance: "none",
            },
            controller: (element) => {
              element.addEventListener(
                "click",
                () => (document.body.classList = key)
              );
            },
          })
        ),
      }),
    ],
  });
};
