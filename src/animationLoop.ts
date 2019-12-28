import { Canvas } from "./canvas";
import { Scene } from "./scene";
import { Colour } from "./colour";
import { Poly } from "./drawables/poly";
import { Vector } from "./vector";

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
        this.timestampElement = document.getElementById("timestamp") as HTMLElement;
    }

    public start() {
        this.tick();
    }

    private tick() {
        const newTime = new Date();
        const timeDiff = newTime.getTime() - this.timestamp.getTime();
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
            const colour = this.colourAtEndOfRay(rowIndex, columnIndex);
            row.push(colour);
        }
        return row;
    }

    private colourAtEndOfRay(rowIndex: number, columnIndex: number): Colour {
        let result = new Colour(0, 0, 0, 1);
        let shortest = Infinity;
        this.scene.getPolys().forEach((poly) => {
            const windingResult = this.getWindingNumber(rowIndex, columnIndex, poly);
            if (windingResult) {
                if (windingResult < shortest) {
                    result = poly.colour;
                    shortest = windingResult;
                }
            }
        });
        return result;
    }

    private getWindingNumber(row: number, column: number, poly: Poly): number | null {
        let windingNumber = 0;
        const n = poly.vertices.length;
        for (let i = 0; i < n; i++) {
            const vertexCurrent = poly.vertices[i];
            const vertexNext = poly.vertices[(i + 1) % n];
            if (vertexCurrent.y <= column) {
                if (vertexNext.y > column) {
                    if (this.isLeft(vertexCurrent, vertexNext, new Vector(row, column, 0)) > 0) {
                        windingNumber++;
                    }
                }
            } else {
                if (vertexNext.y <= column) {
                    if (this.isLeft(vertexCurrent, vertexNext, new Vector(row, column, 0)) < 0) {
                        windingNumber--;
                    }
                }
            }
        }
        if (!windingNumber) {
            return null;
        }
        return poly.calculateZ(row, column);
    }

    private isLeft(P0: Vector, P1: Vector, P2: Vector): number {
        return ((P1.x - P0.x) * (P2.y - P0.y)
            - (P2.x - P0.x) * (P1.y - P0.y));
    }
}
