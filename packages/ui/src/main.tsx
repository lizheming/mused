import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import "./i18n";
import "./helpers/polyfill";
import "highlight.js/styles/github.css";
import "./less/global.less";
import "./css/tailwind.css";

(function () {
  const container = document.getElementById("root");
  if (!container) {
    return;
  }
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
})();
