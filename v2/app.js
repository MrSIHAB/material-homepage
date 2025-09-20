import { Div } from "./vanilla-ui/main.js";
import { SettingsButton, settingsPage } from "./settings/settings.js";

export const App = () => {
  return Div({
    id: "root",
    childs: [SettingsButton, settingsPage],
  });
};
