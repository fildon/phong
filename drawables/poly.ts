import { Point } from "../src/point";
import { Colour } from "../src/colour";
import { IDrawable } from "./iDrawable"

export class Poly implements IDrawable {
    public points: Point[];
    public colour: Colour;
    public update: () => void;
    constructor(points: Point[], colour: Colour, update: () => void = () => {}) {
        if (points.length < 3) {
            throw new Error("too few points to define poly");
        }
        
        if (points.length == 4 && !Poly.coplanar(points)) {
            throw new Error("these points are not coplanar");
        }
        
        this.points = points;
        this.colour = colour;
        this.update = update
    }

    static coplanar(points: Point[]): boolean {
        // points are coplanar iff:
        // p1p2 . (p1p3 x p1p4) = 0
        return points[1].subtract(points[0]).dotProduct(
            points[2].subtract(points[0]).crossProduct(
                points[3].subtract(points[0])
            )
        ) < 0.01 // Allow for rounding errors
    }

    getPolys() {
        return [this]
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
