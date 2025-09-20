"use-strict";

import { Div, Button, Text, H2 } from "../vanilla-ui/main.js";
import { colorSettings } from "./colorSettings.js";

export const SettingsButton = Div({
  style: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  childs: [
    Button({
      style: {
        height: "37px",
        padding: "7px 5px",
        outline: "1px solid #fffa",
        borderRadius: "3px",
        border: "none",
        background: "var(--themecolor)",
        color: "white",
        fontWeight: "bold",
      },
      onClick: (e) => {
        settingsPage.style.right = 0; // opening the settings tab
      },
      childs: Text("<"),
    }),
  ],
});

// ?  Settings page that will show after clicking the settings button.

const maxWidth = 400; // in pixel
export const settingsPage = Div({
  style: {
    padding: "10px 30px",
    height: "100vh",
    maxWidth: `${maxWidth}px`,
    background: "var(--themecolor)",
    position: "absolute",
    top: 0,
    right: `${-maxWidth}px`,
    bottom: 0,
    zIndex: 1,
    transition: "all ease 500ms",
  },
  childs: [
    // Head section
    Div({
      style: {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        margin: "1rem 0",
      },
      childs: [
        // Exit / close button
        Button({
          style: {
            padding: "7px 5px",
            outline: "1px solid #fffa",
            borderRadius: "3px",
            border: "none",
            background: "var(--themecolor)",
            color: "white",
            fontWeight: "bold",
          },
          onClick: (e) => {
            settingsPage.style.right = `${-maxWidth}px`; // closing the settings bar
          },
          childs: Text(">"),
        }),

        // Heading
        H2({ childs: Text("Settings") }),
      ],
    }),

    // * Theme related settings
    colorSettings(),
  ],
});
