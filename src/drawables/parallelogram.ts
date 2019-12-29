import { IDrawable } from "./iDrawable";
import { Triangle } from "./triangle";
import { Vector } from "../vector";
import { Colour } from "../colour";

export class Parallelogram implements IDrawable {
    public triangles: Triangle[];
    public update: () => void;
    constructor(point0: Vector, point1: Vector, point2: Vector, colour: Colour, update: () => void = () => {return; }) {
        const edge1 = point1.subtract(point0);
        const edge2 = point2.subtract(point0);
        const point12 = point0.add(edge1).add(edge2);
        this.triangles = [
            new Triangle(point0, point12, point2, colour),
            new Triangle(point0, point1, point12, colour),
        ];
        this.update = update;
    }

    public getTriangles(): Triangle[] {
        return this.triangles;
    }

    public rotateAround(point: Vector): void {
        this.triangles.forEach((t) => t.rotateAround(point));
    }
}
