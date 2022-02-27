export interface IController {
  init: () => void;
  destroy: () => void;
}

export interface ControllerProps {
  appSelector: string;
  playgroundSelector: string;
  startButtonSelector: string;
  timeHeader: string;
  timeInputSelector: string;
  timeIndicatorSelector: string;
  resultsSelector: string;
  resultsCountSelector: string;
}

export interface IGame {
  start: (time: number) => void;
}

export interface GameProps {
  playground: Element | null;
  gameOverHandler: (index: number) => void;
}
