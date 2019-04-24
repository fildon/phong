import { Poly } from "./poly";
import { Point } from "./point";
import { Colour } from "./colour";

export class Scene {
    public polys: Poly[];
    constructor() {
        this.polys = [];
        // TODO just a test scene for now
        this.polys.push(new Poly([new Point(100, 100, 100), new Point(200, 300, 80), new Point(300, 100, 200)], new Colour(255, 0, 0, 1)));
        this.polys.push(new Poly([new Point(100, 300, 100), new Point(200, 100, 100), new Point(300, 300, 100)], new Colour(0, 255, 0, 1)));
    }

    update() {
        // an arbitrary movement
        this.polys[0].points[0].x = (this.polys[0].points[0].x + 1) % 500;
        this.polys[0].points[0].y = (this.polys[0].points[0].y + 1) % 500;
        this.polys[0].points[0].z = (this.polys[0].points[0].z + 1) % 500;
    }
}
