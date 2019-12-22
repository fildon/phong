import { Point } from "./point";
import { IDrawable } from "../drawables/iDrawable";
import { Cube } from "../drawables/cube";

export class Scene {
    public drawables: IDrawable[];
    constructor() {
        this.drawables = [];
        const top = new Point(250, 100, 100);
        const a = new Point(250, 200, 200);
        const b = a.rotateInYAround(top, (2 * Math.PI) / 3);
        const c = b.rotateInYAround(top, (2 * Math.PI) / 3);
        this.drawables.push(
            new Cube(
                top, a, b, c,
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
