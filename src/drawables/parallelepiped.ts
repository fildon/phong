import { IDrawable } from "./iDrawable";
import { Vector } from "../geometry/vector";
import { Triangle } from "./triangle";
import { Colour } from "../colour";
import { Parallelogram } from "./parallelogram";

export class Parallelepiped implements IDrawable {
    public update: () => void;
    private parallelograms: Parallelogram[];

    // We define a parallelepiped by a vertex, and its three neighbouring vertices
    constructor(point0: Vector, point1: Vector, point2: Vector, point3: Vector, update: () => void = () => {return; }) {
        // TODO test for degeneracy
        // This will happen if all four points are coplanar

        // defining edges
        const edge1 = point1.subtract(point0);
        const edge2 = point2.subtract(point0);
        const edge3 = point3.subtract(point0);

        // the set of vertices that are two edges from the first vertex
        const point12 = point0.add(edge1).add(edge2);
        const point13 = point0.add(edge1).add(edge3);
        const point23 = point0.add(edge2).add(edge3);

        this.parallelograms = [
            new Parallelogram(point0, point1, point2, new Colour(255, 0, 0, 1)),
            new Parallelogram(point0, point3, point1, new Colour(0, 255, 0, 1)),
            new Parallelogram(point0, point2, point3, new Colour(0, 0, 255, 1)),
            new Parallelogram(point3, point23, point13, new Colour(0, 255, 255, 1)),
            new Parallelogram(point2, point12, point23, new Colour(255, 0, 255, 1)),
            new Parallelogram(point1, point13, point12, new Colour(255, 255, 0, 1)),
        ];

        this.update = update;
    }

    public getTriangles(): Triangle[] {
        return this.parallelograms.map(
            (p) => p.getTriangles(),
        ).reduce(
            (prev, curr) => prev.concat(curr),
            [],
        );
    }

    public defaultAnimation(): void {
        const peak = this.parallelograms[0].getTriangles()[0].point0;
        this.parallelograms.forEach((p) => p.defaultAnimation(peak));
    }
}
