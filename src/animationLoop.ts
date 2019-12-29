import { Canvas } from "./canvas";
import { Scene } from "./scene";
import { Colour } from "./colour";
import { Triangle } from "./drawables/triangle";
import { Vector } from "./geometry/vector";

export class AnimationLoop {
    private width: number;
    private height: number;
    private canvas: Canvas;
    private scene: Scene;
    private timestamp: Date;
    private timestampElement: HTMLElement;
    private frameTimes: Date[];
    constructor() {
        this.width = 500;
        this.height = 500;
        this.canvas = new Canvas(this.width, this.height);
        this.scene = new Scene();
        this.timestamp = new Date();
        this.timestampElement = document.getElementById("timestamp") as HTMLElement;
        this.frameTimes = [];
    }

    public start(): void {
        this.tick();
    }

    private tick(): void {
        const newTime = new Date();
        this.frameTimes = this.frameTimes.filter((time) => {
            return newTime.getTime() - time.getTime() < 1000;
        });
        if (this.frameTimes) {
            this.timestampElement.textContent = this.frameTimes.length.toString();
        }
        this.frameTimes.push(newTime);

        this.scene.update();

        const image = this.generateImage();

        this.canvas.paint(image);

        setTimeout(() => {
            this.tick();
        }, 0);
    }

    private generateImage(): Colour[][] {
        const image: Colour[][] = [];
        for (let rowIndex = 0; rowIndex < this.height; rowIndex++) {
            const row = this.generateImageRow(rowIndex);
            image.push(row);
        }
        return image;
    }

    private generateImageRow(rowIndex: number): Colour[] {
        const row: Colour[] = [];
        for (let columnIndex = 0; columnIndex < this.width; columnIndex++) {
            if (rowIndex % 4 !== 0 || columnIndex % 4 !== 0) {
                row.push(new Colour(0, 0, 0, 1));
                continue;
            }
            const colour = this.colourAtPixel(rowIndex, columnIndex);
            row.push(colour);
        }
        return row;
    }

    private colourAtPixel(rowIndex: number, columnIndex: number): Colour {
        const ray = this.scene.camera.getRayAtRelativeXY(rowIndex / this.height, columnIndex / this.width);
        const rayCastResult = ray.getColourOfNearestIntersection(this.scene.getTriangles());
        if (!rayCastResult) {
            return new Colour(0, 0, 0, 1);
        }
        return rayCastResult;
    }
}
