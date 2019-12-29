import { IDrawable } from "./iDrawable";
import { Vector } from "../vector";
import { Triangle } from "./triangle";
import { Colour } from "../colour";
import { Parallelogram } from "./parallelogram";

export class Parallelepiped implements IDrawable {
    public update: () => void;
    private parallelograms: Parallelogram[];
    private point0: Vector;
    private point1: Vector;
    private point2: Vector;
    private point3: Vector;
    private point12: Vector;
    private point13: Vector;
    private point23: Vector;
    private point123: Vector;

    // We define a parallelepiped by a vertex, and its three neighbouring vertices
    constructor(point0: Vector, point1: Vector, point2: Vector, point3: Vector, update: () => void = () => {return; }) {
        // TODO test for degeneracy
        // This will happen if all four points are coplanar

        this.point0 = point0;
        this.point1 = point1;
        this.point2 = point2;
        this.point3 = point3;

        // defining edges
        const edge1 = point1.subtract(point0);
        const edge2 = point2.subtract(point0);
        const edge3 = point3.subtract(point0);

        // the set of vertices that are two edges from the first vertex
        this.point12 = point0.add(edge1).add(edge2);
        this.point13 = point0.add(edge1).add(edge3);
        this.point23 = point0.add(edge2).add(edge3);

        // the one vertex that is opposite the first vertex
        this.point123 = point0.add(edge1).add(edge2).add(edge3);

        this.parallelograms = [
            new Parallelogram(this.point0, this.point1, this.point2, new Colour(255, 0, 0, 1)),
            new Parallelogram(this.point0, this.point3, this.point1, new Colour(0, 255, 0, 1)),
            new Parallelogram(this.point0, this.point2, this.point3, new Colour(0, 0, 255, 1)),
            new Parallelogram(this.point3, this.point23, this.point13, new Colour(0, 255, 255, 1)),
            new Parallelogram(this.point2, this.point12, this.point23, new Colour(255, 0, 255, 1)),
            new Parallelogram(this.point1, this.point13, this.point12, new Colour(255, 255, 0, 1)),
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
