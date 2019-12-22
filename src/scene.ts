import { Poly } from "../drawables/poly";
import { Point } from "./point";
import { Colour } from "./colour";
import { IDrawable } from "../drawables/iDrawable";
import { Cube } from "../drawables/cube";

export class Scene {
    public drawables: IDrawable[];
    constructor() {
        this.drawables = [];
        this.drawables.push(
            new Cube(
                new Point(250, 100, 100),
                new Point(250, 200, 200),
                new Point(150, 200, 0),
                new Point(350, 200, 0),
                function(this: Cube) {
                    this.rotate();
                },
            ),
        );
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
