import { createRoot } from "react-dom/client";

(function () {
  const container = document.getElementById("root");
  if (!container) {
    return;
  }
  const root = createRoot(container);
  root.render(<div>Hello World!</div>);
})();
