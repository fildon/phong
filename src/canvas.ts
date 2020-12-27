import { Colour } from "./colour";

export class Canvas {
  public previousImage: Colour[][];
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  constructor(width: number, height: number) {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) {
      throw new Error("couldn't find 'canvas' on document");
    }
    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("could not get canvas context");
    }
    this.ctx = ctx;
    this.canvas.width = width;
    this.canvas.height = height;

    this.previousImage = [];
    for (let i = 0; i < this.canvas.width; i++) {
      const row = [];
      for (let j = 0; j < this.canvas.height; j++) {
        row.push(new Colour(0, 0, 0, 0));
      }
      this.previousImage.push(row);
    }
  }

  public paint(image: Colour[][]): void {
    for (let i = 0; i < image.length; i++) {
      for (let j = 0; j < image[i].length; j++) {
        if (this.previousImage[i][j].equals(image[i][j])) {
          continue;
        }
        const colour = image[i][j];
        this.ctx.fillStyle =
          "rgba(" +
          colour.r +
          "," +
          colour.g +
          "," +
          colour.b +
          "," +
          colour.a +
          ")";
        this.ctx.fillRect(i, j, 1, 1);
      }
    }
    this.previousImage = image;
  }
}
