import { Poly } from "../drawables/poly";
import { Point } from "./point";
import { Colour } from "./colour";
import { IDrawable } from "../drawables/iDrawable";

export class Scene {
    public drawables: IDrawable[];
    constructor() {
        this.drawables = [];
        this.drawables.push(
            new Poly(
                [new Point(100, 100, 100), new Point(200, 300, 80), new Point(300, 100, 200)],
                new Colour(255, 0, 0, 1),
                function(this: Poly) {
                    this.points[0].x = (this.points[0].x + 1) % 500;
                    this.points[0].y = (this.points[0].y + 1) % 500;
                    this.points[0].z = (this.points[0].z + 1) % 500;
                },
            ));
        this.drawables.push(
            new Poly(
                [new Point(100, 300, 100), new Point(200, 100, 100), new Point(300, 300, 100)],
                new Colour(0, 255, 0, 1),
            ));
    }

    public getPolys() {
        return this.drawables
            .map((d) => d.getPolys())
            .reduce((prev, curr) => prev.concat(curr), []);
    }

    public update() {
        this.drawables.forEach((d) => d.update());
    }
}
