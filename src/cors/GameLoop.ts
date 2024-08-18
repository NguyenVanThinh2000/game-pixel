import { FPS } from "../constants/game";

export class GameLoop {
  lastFrameTime: number;
  accumulatedTime: number;
  timeStep: number;
  update: (timeStep: number) => void;
  render: () => void;
  rafId: number | null;
  isRunning: boolean;

  constructor(update: (timeStep: number) => void, render: () => void) {
    this.lastFrameTime = 0;
    this.accumulatedTime = 0;
    this.timeStep = FPS;

    this.update = update;
    this.render = render;

    this.rafId = null;
    this.isRunning = false;
  }

  mainLoop = (timestamp: number) => {
    if (!this.isRunning) return;
    const deltaTime = timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;

    // Accumulate all the time since the last frame
    this.accumulatedTime += deltaTime;

    while (this.accumulatedTime >= this.timeStep) {
      this.update(this.timeStep);
      this.accumulatedTime -= this.timeStep;
    }

    this.render();

    this.rafId = requestAnimationFrame(this.mainLoop);
  };

  start = () => {
    this.isRunning = true;
    this.rafId = requestAnimationFrame(this.mainLoop);
  };

  stop = () => {
    this.isRunning = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  };
}
