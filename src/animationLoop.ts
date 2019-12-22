import { Canvas } from "./canvas";
import { Scene } from "./scene";
import { Colour } from "./colour";
import { Poly } from "../drawables/poly";
import { Point } from "./point";

export class AnimationLoop {
    private width: number;
    private height: number;
    private canvas: Canvas;
    private scene: Scene;
    private timestamp: Date;
    private timestampElement: HTMLElement;
    constructor() {
        this.width = 500;
        this.height = 500;
        this.canvas = new Canvas(this.width, this.height);
        this.scene = new Scene();
        this.timestamp = new Date();
        this.timestampElement = document.getElementById('timestamp') as HTMLElement
    }

    start() {
        this.tick();
    }

    tick() {
        let newTime = new Date();
        let timeDiff = newTime.getTime() - this.timestamp.getTime();
        let fps = 1000 / timeDiff;
        fps = Math.floor(100 * fps) / 100; // 2 decimal places
        this.timestampElement.textContent = fps.toString();
        this.timestamp = newTime;

        this.scene.update();

        const image = this.generateImage();

        this.canvas.paint(image);

        setTimeout(() => {
            this.tick();
        }, 0);
    }

    generateImage(): Colour[][] {
        let image: Colour[][] = [];
        for (let rowIndex = 0; rowIndex < this.height; rowIndex++) {
            let row = this.generateImageRow(rowIndex);
            image.push(row);
        }
        return image;
    }

    generateImageRow(rowIndex: number): Colour[] {
        let row: Colour[] = [];
        for (let columnIndex = 0; columnIndex < this.width; columnIndex++) {
            let colour = this.generateColourAt(rowIndex, columnIndex);
            row.push(colour);
        }
        return row;
    }

    generateColourAt(rowIndex: number, columnIndex: number): Colour {
        let result = new Colour(0, 0, 0, 1);
        let shortest = Infinity;
        this.scene.getPolys().forEach(poly => {
            let windingResult = this.getWindingResult(rowIndex, columnIndex, poly);
            if (windingResult) {
                if (windingResult < shortest) {
                    result = poly.colour;
                    shortest = windingResult;
                }
            }
        });
        return result;
    }

    getWindingResult(row: number, column: number, poly: Poly): number | null {
        let windingNumber = 0;
        let n = poly.points.length;
        for (let i = 0; i < n; i++) {
            let vertexCurrent = poly.points[i];
            let vertexNext = poly.points[(i + 1) % n];
            if (vertexCurrent.y <= column) {
                if (vertexNext.y > column) {
                    if (this.isLeft(vertexCurrent, vertexNext, new Point(row, column, 0)) > 0) {
                        windingNumber++;
                    }
                }
            }
            else {
                if (vertexNext.y <= column) {
                    if (this.isLeft(vertexCurrent, vertexNext, new Point(row, column, 0)) < 0) {
                        windingNumber--;
                    }
                }
            }
        }
        if (!windingNumber) {
            return null
        }
        return poly.calculateZ(row, column)
    }

    isLeft(P0: Point, P1: Point, P2: Point): number {
        return ((P1.x - P0.x) * (P2.y - P0.y)
            - (P2.x - P0.x) * (P1.y - P0.y));
    }
}
