import { Div, Button, Text } from "vanilla-ui";

export const SettingsButton = () => {
  return Div({
    style: {
      position: "absolute",
      top: 0,
      right: 0,
    },
    children: [
      Button({
        style: {
          height: "37px",
          padding: "7px 5px",
          outline: "1px solid #fffa",
          borderRadius: "3px",
          border: "none",
          background: "var(--themColor)",
          color: "white",
          fontWeight: "bold",
        },
        children: Text("<"),
      }),
    ],
  });
};

// ?  Settings page that will show after clicking the settings button.
export const settingsPage = () => {
  return Div({
    style: {
      position: "absolute",
      height: "100vh",
      top: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
      background: "var(--themColor)",
    },
    children: [Text("Settings page")],
  });
};
