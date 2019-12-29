import { Vector } from "../geometry/vector";
import { Colour } from "../colour";
import { IDrawable } from "./iDrawable";

export class Triangle implements IDrawable {
    public colour: Colour;
    public update: () => void;
    public readonly point0: Vector;
    public readonly point1: Vector;
    public readonly point2: Vector;
    public readonly normal: Vector;

    constructor(point0: Vector, point1: Vector, point2: Vector, colour: Colour, update: () => void = () => {return; }) {
        this.point0 = point0;
        this.point1 = point1;
        this.point2 = point2;
        this.colour = colour;
        this.update = update;
        this.normal = this.getNormal();
        if (this.normal.isTheZeroVector()) {
            throw new Error("This triangle would be degenerate");
        }
    }

    public getTriangles(): Triangle[] {
        return [this];
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
