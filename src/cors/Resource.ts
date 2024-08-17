import { resourcesImage } from '../constants/resources';

export type ResourceType = {
  img: HTMLImageElement;
  isLoaded: boolean;
};

class Resources {
  toLoad: Record<string, string>;
  images: Record<string, ResourceType>;

  constructor() {
    this.toLoad = {
      sky: resourcesImage.sky,
      ground: resourcesImage.ground,
      hero: resourcesImage.hero,
      shadow: resourcesImage.shadow,
    };

    this.images = {};

    Object.keys(this.toLoad).forEach(key => {
      const img = new Image();
      img.src = this.toLoad[key];

      this.images[key] = {
        img,
        isLoaded: false,
      };
      img.onload = () => {
        this.images[key].isLoaded = true;
      };
    });
  }
}

export const resources = new Resources();
