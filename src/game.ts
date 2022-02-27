import { GameProps, IGame } from "./types";
import { colors } from "./const";

export class Game implements IGame {
  private count: number;
  private isPlaying: boolean;
  private polygon: Element;
  private gameOverHandler: (index: number) => void;

  constructor(props: GameProps) {
    if (!props.playground) {
      throw new Error("Polygon not assign");
    }

    this.polygon = props.playground;
    this.count = 0;
    this.isPlaying = false;
    this.gameOverHandler = props.gameOverHandler;

    this.clickHandler = this.clickHandler.bind(this);
    this.generateItem = this.generateItem.bind(this);

    this.init();
  }

  private generateItem() {
    const item = document.createElement("div");
    item.classList.add("item");

    const size = Math.floor(Math.random() * 85 + 15);

    const polygonHeight = this.polygon.clientHeight - size;
    const polygonWidth = this.polygon.clientWidth - size;

    const coordinateX = Math.floor(Math.random() * polygonWidth);
    const coordinateY = Math.floor(Math.random() * polygonHeight);

    const color = colors[Math.floor(Math.random() * colors.length)];

    item.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      transform: translate(${coordinateY}px, ${coordinateX}px);
      background-color: ${color};
    `;

    this.polygon.appendChild(item);
  }

  private clearPolygon() {
    this.polygon.innerHTML = "";
  }

  private clickHandler(evt: MouseEvent) {
    const target = evt.target as Element;

    if (!target.classList.contains("item")) {
      return;
    }

    target.remove();

    this.count += 1;
    this.generateItem();
  }

  private addListeners() {
    (this.polygon as HTMLDivElement).addEventListener(
      "click",
      this.clickHandler
    );
  }

  private resetGame() {
    this.count = 0;
  }

  private init() {
    this.addListeners();
  }

  start(time: number) {
    this.isPlaying = true;
    this.generateItem();
    setTimeout(() => {
      this.endGame();
    }, time * 1000);
  }

  private endGame() {
    this.isPlaying = false;
    this.clearPolygon();
    this.gameOverHandler(this.count);
    this.resetGame();
  }
}
