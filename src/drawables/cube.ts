import { IDrawable } from "./iDrawable";
import { Vector } from "../vector";
import { Poly } from "./poly";
import { Colour } from "../colour";

export class Cube implements IDrawable {
    public update: () => void;
    private v0: Vector;
    private v1: Vector;
    private v2: Vector;
    private v3: Vector;
    private v12: Vector;
    private v13: Vector;
    private v23: Vector;
    private v123: Vector;

    // We define a cube by a vertex, and its three neighbouring vertices
    constructor(v0: Vector, v1: Vector, v2: Vector, v3: Vector, update: () => void = () => {return; }) {
        // TODO test for degeneracy
        // This will happen if the neighbour vectors are coplanar

        this.v0 = v0;
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;

        // defining edges
        const e1 = v1.subtract(v0);
        const e2 = v2.subtract(v0);
        const e3 = v3.subtract(v0);

        // the set of vertices that are two edges from the first vertex
        this.v12 = v0.add(e1).add(e2);
        this.v13 = v0.add(e1).add(e3);
        this.v23 = v0.add(e2).add(e3);

        // the one vertex that is opposite the first vertex
        this.v123 = v0.add(e1).add(e2).add(e3);

        this.update = update;
    }

    public getPolys() {
        return [
            new Poly([this.v0, this.v1, this.v12, this.v2], new Colour(255, 0, 0, 1)),
            new Poly([this.v0, this.v1, this.v13, this.v3], new Colour(0, 255, 0, 1)),
            new Poly([this.v0, this.v2, this.v23, this.v3], new Colour(0, 0, 255, 1)),
            new Poly([this.v3, this.v13, this.v123, this.v23], new Colour(0, 255, 255, 1)),
            new Poly([this.v2, this.v12, this.v123, this.v23], new Colour(255, 0, 255, 1)),
            new Poly([this.v1, this.v12, this.v123, this.v13], new Colour(255, 255, 0, 1)),
        ];
    }

    public rotate() {
        this.v0 = this.v0.rotateInYAround(this.v0, 0.01);
        this.v1 = this.v1.rotateInYAround(this.v0, 0.01);
        this.v2 = this.v2.rotateInYAround(this.v0, 0.01);
        this.v3 = this.v3.rotateInYAround(this.v0, 0.01);
        this.v12 = this.v12.rotateInYAround(this.v0, 0.01);
        this.v13 = this.v13.rotateInYAround(this.v0, 0.01);
        this.v23 = this.v23.rotateInYAround(this.v0, 0.01);
        this.v123 = this.v123.rotateInYAround(this.v0, 0.01);
    }
}
