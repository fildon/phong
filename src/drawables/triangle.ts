import { Vector } from "../vector";
import { Colour } from "../colour";
import { IDrawable } from "./iDrawable";

export class Triangle implements IDrawable {
    public colour: Colour;
    public update: () => void;
    public readonly point0: Vector;
    public readonly point1: Vector;
    public readonly point2: Vector;

    constructor(point0: Vector, point1: Vector, point2: Vector, colour: Colour, update: () => void = () => {return; }) {
        this.point0 = point0;
        this.point1 = point1;
        this.point2 = point2;
        this.colour = colour;
        this.update = update;
        if (this.getNormal().isTheZeroVector()) {
            throw new Error("This triangle would be degenerate");
        }
    }

    public getTriangles(): Triangle[] {
        return [this];
    }

    public calculateZ(x: number, y: number): number {
        // https://math.stackexchange.com/questions/28043/finding-the-z-value-on-a-plane-with-x-y-values
        const normal = this.getNormal();
        const r = normal.x;
        const s = normal.y;
        const t = normal.z;
        const constant = (1 / t) * (r * this.point0.x + s * this.point0.y) + this.point0.z;
        const xMult = -r / t;
        const yMult = -s / t;
        return constant + xMult * x + yMult * y;
    }

    public defaultAnimation(point: Vector): Triangle {
        return new Triangle(
            this.point0.rotateInYAround(point, 0.01),
            this.point1.rotateInYAround(point, 0.01),
            this.point2.rotateInYAround(point, 0.01),
            this.colour,
            this.update,
        );
    }

    private getNormal(): Vector {
        return (this.point1.subtract(this.point0)).crossProduct((this.point2.subtract(this.point0)));
    }
}
