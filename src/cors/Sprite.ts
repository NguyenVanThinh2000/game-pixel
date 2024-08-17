import { BLOCK_SIZE } from '../constants/game';
import { ResourceType } from './Resource';
import { Vector2 } from './Vector2';

export class Sprite {
  resources: ResourceType;
  frameSize: Vector2;
  hFrames: number;
  vFrames: number;
  frame: number;
  frameMap: Map<number, Vector2>;
  scale: number;
  position: Vector2;

  constructor({
    resources,
    frameSize,
    hFrames,
    vFrames,
    frame,
    scale,
    position,
  }: {
    resources: ResourceType;
    frameSize?: Vector2;
    hFrames?: number;
    vFrames?: number;
    frame?: number;
    scale?: number;
    position?: Vector2;
  }) {
    this.resources = resources;
    this.frameSize = frameSize ?? new Vector2(BLOCK_SIZE, BLOCK_SIZE);
    this.hFrames = hFrames ?? 1;
    this.vFrames = vFrames ?? 1;
    this.frame = frame ?? 0;
    this.frameMap = new Map();
    this.scale = scale ?? 1;
    this.position = position ?? new Vector2(0, 0);
    this.buildFrameMap();
  }

  buildFrameMap() {
    let frameCount = 0;
    for (let v = 0; v < this.vFrames; v++) {
      for (let h = 0; h < this.hFrames; h++) {
        this.frameMap.set(
          frameCount,
          new Vector2(this.frameSize.x * h, this.frameSize.y * v)
        );
        frameCount++;
      }
    }
  }

  drawImage(ctx: CanvasRenderingContext2D, x: number, y: number) {
    if (!this.resources.isLoaded) return;

    let frameCoordX = 0;
    let frameCoordY = 0;
    const frame = this.frameMap.get(this.frame);
    if (frame) {
      frameCoordX = frame.x;
      frameCoordY = frame.y;
    }
    const frameSizeX = this.frameSize.x;
    const frameSizeY = this.frameSize.y;

    ctx.drawImage(
      this.resources.img,
      frameCoordX,
      frameCoordY,
      frameSizeX,
      frameSizeY,
      x,
      y,
      frameSizeX * this.scale,
      frameSizeY * this.scale
    );
  }
}
