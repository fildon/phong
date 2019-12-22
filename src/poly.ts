import { Point } from "./point";
import { Colour } from "./colour";

export class Poly {
    public points: Point[];
    public colour: Colour;
    constructor(points: Point[], colour: Colour) {
        if (points.length < 3) {
            throw new Error("too few points to define poly");
        }
        // TODO test that triangle is not degenerate!
        
        this.points = points;
        this.colour = colour;
    }

    calculateZ(x: number, y: number): number {
        // https://math.stackexchange.com/questions/28043/finding-the-z-value-on-a-plane-with-x-y-values
        let v1 = [this.points[0].x-this.points[1].x, this.points[0].y-this.points[1].y, this.points[0].z-this.points[1].z]
        let v2 = [this.points[0].x-this.points[2].x, this.points[0].y-this.points[2].y, this.points[0].z-this.points[2].z]
        let r = v1[1]*v2[2] - v1[2]*v2[1]
        let s = v1[2]*v2[0] - v1[0]*v2[2]
        let t = v1[0]*v2[1] - v1[1]*v2[0]
        let constant = (1/t)*(r*this.points[0].x + s*this.points[0].y) + this.points[0].z;
        let xMult = -r / t;
        let yMult = -s / t;
        return constant + xMult * x + yMult * y;
    }
}
