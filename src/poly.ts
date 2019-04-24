import { Point } from "./point";
import { Colour } from "./colour";

export class Poly {
    public points: Point[];
    public colour: Colour;
    // We're going to precalculate some properties using the following
    // https://math.stackexchange.com/questions/28043/finding-the-z-value-on-a-plane-with-x-y-values
    public calculateZ: (x: number, y: number) => number;
    constructor(points: Point[], colour: Colour) {
        if (points.length < 3) {
            throw new Error("too few points to define poly");
        }
        // TODO test that triangle is not degenerate!
        
        this.points = points;
        this.colour = colour;

        let v1 = [points[0].x-points[1].x, points[0].y-points[1].y, points[0].z-points[1].z]
        let v2 = [points[0].x-points[2].x, points[0].y-points[2].y, points[0].z-points[2].z]
        let r = v1[1]*v2[2] - v1[2]*v2[1]
        let s = v1[2]*v2[0] - v1[0]*v2[2]
        let t = v1[0]*v2[1] - v1[1]*v2[0]
        let constant = (1/t)*(r*points[0].x + s*points[0].y) + points[0].z;
        let xMult = -r / t;
        let yMult = -s / t;

        this.calculateZ = (x, y) =>  {
            return constant + xMult * x + yMult * y;
        }
    }
}
