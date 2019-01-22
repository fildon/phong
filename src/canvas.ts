export class Canvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    constructor() {
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
        this.canvas.height = 200;
        this.canvas.height = 200;
    }

    public drawCircle(): void {
        this.ctx.beginPath();
        this.ctx.arc(
            100,
            100,
            20,
            0, 2 * Math.PI);
        this.ctx.fillStyle = 'black';
        this.ctx.fill();
    }
}
