import { FPS } from "../constants/game";

export class GameLoop {
  lastFrameTime: number;
  accumulatedTime: number;
  timeStep: number;
  update: () => void;
  render: () => void;
  rafId: number | null;
  isRunning: boolean;

  constructor(update: () => void, render: () => void) {
    this.lastFrameTime = 0;
    this.accumulatedTime = 0;
    this.timeStep = FPS;

    this.update = update;
    this.render = render;

    this.rafId = null;
    this.isRunning = false;
  }
}
