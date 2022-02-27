import { Game } from "./game";
import { ControllerProps, IController } from "./types";

const DEFAULT_TIME = 5;

export class Controller implements IController {
  private game: Game;
  private playground: Element;
  private startButton: Element;
  private timeHeader: Element;
  private timeInput: Element;
  private timeIndicator: Element;
  private results: Element;
  private resultsCount: Element;
  private time: number;

  constructor(props: ControllerProps) {
    const app = document.querySelector(props.appSelector);

    if (!app) {
      throw new Error(`Can't found ${props.appSelector}`);
    }

    const playground = app.querySelector(props.playgroundSelector);
    const startButton = app.querySelector(props.startButtonSelector);
    const timeHeader = app.querySelector(props.timeHeader);
    const timeIndicator = app.querySelector(props.timeIndicatorSelector);
    const timeInput = app.querySelector(props.timeInputSelector);
    const results = app.querySelector(props.resultsSelector);
    const resultsCount = app.querySelector(props.resultsCountSelector);

    if (
      !playground ||
      !startButton ||
      !timeHeader ||
      !timeIndicator ||
      !timeInput ||
      !results ||
      !resultsCount
    ) {
      throw new Error(`Some node are not found`);
    }

    this.time = DEFAULT_TIME;
    this.playground = playground;
    this.startButton = startButton;
    this.timeHeader = timeHeader;
    this.timeIndicator = timeIndicator;
    this.timeInput = timeInput;
    this.results = results;
    this.resultsCount = resultsCount;

    this.timeChangeHandler = this.timeChangeHandler.bind(this);
    this.startGameHandler = this.startGameHandler.bind(this);
    this.endGameHandler = this.endGameHandler.bind(this);

    this.game = new Game({
      playground: this.playground,
      gameOverHandler: this.endGameHandler,
    });
  }

  private toggleVisibility(element: Element[] | Element) {
    if (Array.isArray(element)) {
      element.forEach((item) => item.classList.toggle("hide"));
      return;
    }

    element.classList.toggle("hide");
  }

  private gameTimeChange() {
    let leftTime = this.time;

    const interval = setInterval(() => {
      if (leftTime <= 0) {
        clearInterval(interval);
      }

      leftTime = leftTime - 0.1;
      this.timeIndicator.textContent = leftTime.toFixed(1);
    }, 100);
  }

  private startGameHandler() {
    this.toggleVisibility(this.startButton);
    this.timeInput.setAttribute("disabled", "true");
    this.results.classList.add("hide");
    this.game.start(this.time);
    this.gameTimeChange();
  }

  private endGameHandler(results: number) {
    this.toggleVisibility([this.timeHeader, this.results]);
    this.resultsCount.textContent = results.toString();

    setTimeout(() => {
      this.timeInput.removeAttribute("disabled");
      this.toggleVisibility([this.timeHeader, this.startButton, this.results]);
    }, 3000);
  }

  private timeChangeHandler(event: Event) {
    const target = event.target as HTMLInputElement;

    if (!target || !this.timeIndicator) {
      return;
    }

    this.time = +target.value;

    this.timeIndicator.textContent = this.time.toFixed(1);
  }

  private addListeners() {
    this.startButton.addEventListener("click", this.startGameHandler);
    this.timeInput.addEventListener("change", this.timeChangeHandler);
  }

  private deleteListeners() {
    this.startButton.removeEventListener("click", this.startGameHandler);
    this.timeInput.removeEventListener("change", this.timeChangeHandler);
  }

  init() {
    this.addListeners();
  }

  destroy() {
    this.deleteListeners();
  }
}
