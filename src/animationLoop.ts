import { Canvas } from "./canvas";
import { Scene } from "./scene";
import { Colour } from "./colour";

export class AnimationLoop {
  private width: number;
  private height: number;
  private canvas: Canvas;
  private scene: Scene;
  private timestampElement: HTMLElement;
  private memoElement: HTMLElement;
  private frameTimes: Date[];
  private frameMemo: Colour[][][];
  private frameIndex: number;
  constructor() {
    this.width = 500;
    this.height = 500;
    this.canvas = new Canvas(this.width, this.height);
    this.scene = new Scene();
    this.timestampElement = document.getElementById("timestamp") as HTMLElement;
    this.memoElement = document.getElementById("memo") as HTMLElement;
    this.frameTimes = [];
    this.frameMemo = [];
    this.frameIndex = 0;
  }

  public start(): void {
    this.tick();
  }

  private tick(): void {
    const newTime = new Date();
    this.frameTimes = this.frameTimes.filter(
      (time) => newTime.getTime() - time.getTime() < 1000
    );
    this.timestampElement.textContent = this.frameTimes.length.toString();
    this.frameTimes.push(newTime);

    this.scene.update();

    const image = this.generateImage(this.frameIndex);

    this.canvas.paint(image);

    this.frameIndex = (this.frameIndex + 1) % 100;

    setTimeout(() => {
      this.tick();
    }, 0);
  }

  private generateImage(frameIndex: number): Colour[][] {
    if (this.frameMemo[frameIndex]) {
      return this.frameMemo[frameIndex];
    }
    const image: Colour[][] = [];
    for (let rowIndex = 0; rowIndex < this.height; rowIndex++) {
      const row = this.generateImageRow(rowIndex);
      image.push(row);
    }
    this.frameMemo[frameIndex] = image;
    this.memoElement.textContent = this.frameMemo.length.toString();
    return image;
  }

  private generateImageRow(rowIndex: number): Colour[] {
    const row: Colour[] = [];
    for (let columnIndex = 0; columnIndex < this.width; columnIndex++) {
      if (rowIndex % 2 !== 0 || columnIndex % 2 !== 0) {
        row.push(new Colour(0, 0, 0, 1));
        continue;
      }
      const colour = this.colourAtPixel(rowIndex, columnIndex);
      row.push(colour);
    }
    return row;
  }

  private colourAtPixel(rowIndex: number, columnIndex: number): Colour {
    const ray = this.scene.camera.getRayAtRelativeXY(
      rowIndex / this.height,
      columnIndex / this.width
    );
    const rayCastResult = ray.getColourOfNearestIntersection(
      this.scene.getTriangles()
    );
    if (!rayCastResult) {
      return new Colour(0, 0, 0, 1);
    }
    return rayCastResult;
  }
}
