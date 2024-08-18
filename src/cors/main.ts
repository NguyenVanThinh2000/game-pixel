import { useEffect } from "react";
import { resources } from "./Resource";
import {
  BLOCK_SIZE,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  FPS,
} from "../constants/game";
import { Sprite } from "./Sprite";
import { Vector2 } from "./Vector2";
import { GameLoop } from "./GameLoop";

export const useCanvas = () => {
  useEffect(() => {
    const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const skySprite = new Sprite({
      resources: resources.images.sky,
      frameSize: new Vector2(CANVAS_WIDTH, CANVAS_HEIGHT),
    });

    const groundSprite = new Sprite({
      resources: resources.images.ground,
      frameSize: new Vector2(CANVAS_WIDTH, CANVAS_HEIGHT),
    });

    const shadowSprite = new Sprite({
      resources: resources.images.shadow,
      frameSize: new Vector2(BLOCK_SIZE * 2, BLOCK_SIZE * 2),
    });

    const heroSprite = new Sprite({
      resources: resources.images.hero,
      frameSize: new Vector2(BLOCK_SIZE * 2, BLOCK_SIZE * 2),
      hFrames: 3,
      vFrames: 8,
      frame: 1,
    });

    const heroPosition = new Vector2(BLOCK_SIZE * 6, BLOCK_SIZE * 5);

    const draw = () => {
      skySprite.drawImage(ctx, 0, 0);
      groundSprite.drawImage(ctx, 0, 0);

      // Center the Hero in the cell
      const heroOffset = new Vector2(-8, -21);
      const heroPosX = heroPosition.x + heroOffset.x;
      const heroPosY = heroPosition.y + 1 + heroOffset.y;
      shadowSprite.drawImage(ctx, heroPosX, heroPosY);
      heroSprite.drawImage(ctx, heroPosX, heroPosY);
    };

    const update = () => {
      // Updating entities in the game
      heroPosition.x += 1;
    };

    const gameLoop = new GameLoop(update, draw);
    gameLoop.start();
    // gameLoop.stop();
  });
};
