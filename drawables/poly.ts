import { Vector } from "../src/vector";
import { Colour } from "../src/colour";
import { IDrawable } from "./iDrawable"

export class Poly implements IDrawable {
    public vertices: Vector[];
    public colour: Colour;
    public update: () => void;
    constructor(vertices: Vector[], colour: Colour, update: () => void = () => {}) {
        if (vertices.length < 3) {
            throw new Error("too few vertices to define poly");
        }
        
        if (vertices.length == 4 && !Poly.coplanar(vertices)) {
            throw new Error("these vertices are not coplanar");
        }
        
        this.vertices = vertices;
        this.colour = colour;
        this.update = update
    }

    static coplanar(vertices: Vector[]): boolean {
        // vertices are coplanar iff:
        // p1p2 . (p1p3 x p1p4) = 0
        return vertices[1].subtract(vertices[0]).dotProduct(
            vertices[2].subtract(vertices[0]).crossProduct(
                vertices[3].subtract(vertices[0])
            )
        ) < 0.01 // Allow for rounding errors
    }

    getPolys() {
        return [this]
    }

    calculateZ(x: number, y: number): number {
        // https://math.stackexchange.com/questions/28043/finding-the-z-value-on-a-plane-with-x-y-values
        let v1 = [this.vertices[0].x-this.vertices[1].x, this.vertices[0].y-this.vertices[1].y, this.vertices[0].z-this.vertices[1].z]
        let v2 = [this.vertices[0].x-this.vertices[2].x, this.vertices[0].y-this.vertices[2].y, this.vertices[0].z-this.vertices[2].z]
        let r = v1[1]*v2[2] - v1[2]*v2[1]
        let s = v1[2]*v2[0] - v1[0]*v2[2]
        let t = v1[0]*v2[1] - v1[1]*v2[0]
        let constant = (1/t)*(r*this.vertices[0].x + s*this.vertices[0].y) + this.vertices[0].z;
        let xMult = -r / t;
        let yMult = -s / t;
        return constant + xMult * x + yMult * y;
    }
}
