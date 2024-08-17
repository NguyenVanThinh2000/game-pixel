import { useEffect } from 'react';
import { resources } from './Resource';
import { CANVAS_HEIGHT, CANVAS_WIDTH, FPS } from '../constants/game';
import { Sprite } from './Sprite';
import { Vector2 } from './Vector2';

export const useCanvas = () => {
  useEffect(() => {
    const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const skySprite = new Sprite({
      resources: resources.images.sky,
      frameSize: new Vector2(CANVAS_WIDTH, CANVAS_HEIGHT),
    });

    const draw = () => {
      skySprite.drawImage(ctx, 0, 0);
    };

    const interval = setInterval(() => {
      draw();
    }, FPS);

    return () => {
      clearInterval(interval);
    };
  });
};
