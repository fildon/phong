import { Poly } from "./poly";
import { Point } from "./point";
import { Colour } from "./colour";

export class Scene {
    public polys: Poly[];
    constructor() {
        this.polys = [];
        // TODO just a test scene for now
        this.polys.push(new Poly([new Point(100, 100, 10), new Point(200, 300, 10), new Point(300, 100, 10)], new Colour(255, 0, 0, 1)));
        this.polys.push(new Poly([new Point(100, 300, 20), new Point(200, 100, 20), new Point(300, 300, 20)], new Colour(0, 255, 0, 1)));
    }

    update() {
        // TODO
    }
}
