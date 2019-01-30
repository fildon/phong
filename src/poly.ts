import { Point } from "./point";
import { Colour } from "./colour";

export class Poly {
    public points: Point[];
    public colour: Colour;
    constructor(points: Point[], colour: Colour) {
        this.points = points;
        this.colour = colour;
    }
}
