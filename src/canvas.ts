import { Colour } from "./colour";

export class Canvas {
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
    }

    public paint(image: Colour[][]): void {
        for (let i = 0; i < image.length; i++) {
            for (let j = 0; j < image[i].length; j++) {
                const colour = image[i][j];
                this.ctx.fillStyle = "rgba(" + colour.r + "," + colour.g + "," + colour.b + "," + colour.a + ")";
                this.ctx.fillRect(i, j, 1, 1);
            }
        }
    }
}
