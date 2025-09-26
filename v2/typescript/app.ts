import { Div } from "vanilla-ui";
import { SettingsButton, settingsPage } from "./components/settings.ts";

export const App = () => {
  return Div({
    id: "root",
    children: [SettingsButton(), settingsPage()],
  });
};
