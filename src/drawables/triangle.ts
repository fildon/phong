import { Vector } from "../vector";
import { Colour } from "../colour";
import { IDrawable } from "./iDrawable";

export class Triangle implements IDrawable {
    public point0: Vector;
    public point1: Vector;
    public point2: Vector;
    public colour: Colour;
    public update: () => void;
    public normal: Vector;

    constructor(point0: Vector, point1: Vector, point2: Vector, colour: Colour, update: () => void = () => {return; }) {
        this.point0 = point0;
        this.point1 = point1;
        this.point2 = point2;
        this.colour = colour;
        this.update = update;
        this.normal = (point1.subtract(point0)).crossProduct((point2.subtract(point0)));
        if (this.normal.isTheZeroVector()) {
            throw new Error("This triangle would be degenerate");
        }
    }

    public getTriangles(): Triangle[] {
        return [this];
    }

    public calculateZ(x: number, y: number): number {
        // https://math.stackexchange.com/questions/28043/finding-the-z-value-on-a-plane-with-x-y-values
        const r = this.normal.x;
        const s = this.normal.y;
        const t = this.normal.z;
        const constant = (1 / t) * (r * this.point0.x + s * this.point0.y) + this.point0.z;
        const xMult = -r / t;
        const yMult = -s / t;
        return constant + xMult * x + yMult * y;
    }

    public rotateAround(point: Vector): void {
        this.point0 = this.point0.rotateInYAround(point, 0.01);
        this.point1 = this.point1.rotateInYAround(point, 0.01);
        this.point2 = this.point2.rotateInYAround(point, 0.01);
    }
}
