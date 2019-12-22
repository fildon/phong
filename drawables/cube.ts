import { IDrawable } from "./iDrawable";
import { Point } from "../src/point";
import { Poly } from "./poly";
import { Colour } from "../src/colour";

export class Cube implements IDrawable {
    private p0: Point;
    private p1: Point;
    private p2: Point;
    private p3: Point;
    private p12: Point;
    private p13: Point;
    private p23: Point;
    private p123: Point;
    public update: () => void;

    // We define a cube by a point, and its three neighbouring points
    constructor(p0: Point, p1: Point, p2: Point, p3: Point, update: () => void = () => {}) {
        // TODO test for degeneracy
        // This will happen if the neighbour vectors are coplanar

        this.p0 = p0;
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;

        // defining vectors
        const v1 = p1.subtract(p0);
        const v2 = p2.subtract(p0);
        const v3 = p3.subtract(p0);

        // the set of points that are two edges from the first point
        this.p12 = p0.add(v1).add(v2);
        this.p13 = p0.add(v1).add(v3);
        this.p23 = p0.add(v2).add(v3);

        // the one point that is opposite the first point
        this.p123 = p0.add(v1).add(v2).add(v3);

        this.update = update;
    }

    public getPolys() {
        return [
            new Poly([this.p0, this.p1, this.p12, this.p2], new Colour(255, 0, 0, 1)),
            new Poly([this.p0, this.p1, this.p13, this.p3], new Colour(0, 255, 0, 1)),
            new Poly([this.p0, this.p2, this.p23, this.p3], new Colour(0, 0, 255, 1)),
            new Poly([this.p3, this.p13, this.p123, this.p23], new Colour(0, 255, 255, 1)),
            new Poly([this.p2, this.p12, this.p123, this.p23], new Colour(255, 0, 255, 1)),
            new Poly([this.p1, this.p12, this.p123, this.p13], new Colour(255, 255, 0, 1)),
        ];
    }

    public rotate() {
        this.p0 = this.p0.rotateInYAround(this.p0, 0.01);
        this.p1 = this.p1.rotateInYAround(this.p0, 0.01);
        this.p2 = this.p2.rotateInYAround(this.p0, 0.01);
        this.p3 = this.p3.rotateInYAround(this.p0, 0.01);
        this.p12 = this.p12.rotateInYAround(this.p0, 0.01);
        this.p13 = this.p13.rotateInYAround(this.p0, 0.01);
        this.p23 = this.p23.rotateInYAround(this.p0, 0.01);
        this.p123 = this.p123.rotateInYAround(this.p0, 0.01);
    }
}
