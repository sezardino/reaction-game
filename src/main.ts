import "./style.css";

import { Controller } from "./controller";

window.addEventListener("DOMContentLoaded", () => {
  const app = new Controller({
    appSelector: ".app",
    playgroundSelector: "#game",
    startButtonSelector: "#start",
    timeHeader: "#time-header",
    timeIndicatorSelector: "#time",
    timeInputSelector: "#game-time",
    resultsSelector: "#result-header",
    resultsCountSelector: "#result",
  });

  app.init();
});
