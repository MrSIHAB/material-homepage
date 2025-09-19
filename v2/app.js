import { Div, Nav, Span } from "./vanilla-ui/main.js";
import { logo } from "./components/logo.js";
import { Settings } from "./components/settings.js";

export const App = () => {
    return Div({
        id: "root",
        childs: [logo(), Settings()],
    });
};
