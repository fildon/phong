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

    public getPolys() {
        return [this];
    }

    public calculateZ(x: number, y: number): number {
        // https://math.stackexchange.com/questions/28043/finding-the-z-value-on-a-plane-with-x-y-values
        const v1 = [
            this.point0.x - this.point1.x,
            this.point0.y - this.point1.y,
            this.point0.z - this.point1.z,
        ];
        const v2 = [
            this.point0.x - this.point2.x,
            this.point0.y - this.point2.y,
            this.point0.z - this.point2.z,
        ];
        const r = v1[1] * v2[2] - v1[2] * v2[1];
        const s = v1[2] * v2[0] - v1[0] * v2[2];
        const t = v1[0] * v2[1] - v1[1] * v2[0];
        const constant = (1 / t) * (r * this.point0.x + s * this.point0.y) + this.point0.z;
        const xMult = -r / t;
        const yMult = -s / t;
        return constant + xMult * x + yMult * y;
    }
}
