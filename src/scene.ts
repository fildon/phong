import { Vector } from "./geometry/vector";
import { IDrawable } from "./drawables/iDrawable";
import { Parallelepiped } from "./drawables/parallelepiped";
import { Triangle } from "./drawables/triangle";
import { Camera } from "./camera";
import { Ray } from "./geometry/ray";

export class Scene {
    public drawables: IDrawable[];
    public camera: Camera;
    constructor() {
        const cameraPosition = new Vector(250, 250, -200);
        const topLeft = new Vector(100, 100, 100);
        const topRight = new Vector(400, 100, 100);
        const bottomLeft = new Vector(100, 400, 100);
        this.camera = new Camera(
            cameraPosition,
            topLeft,
            topRight,
            bottomLeft,
        );
        this.drawables = [];
        const top = new Vector(250, 100, 100);
        const a = new Vector(250, 200, 200);
        const b = a.rotateInYAround(top, -(2 * Math.PI) / 3);
        const c = b.rotateInYAround(top, -(2 * Math.PI) / 3);
        this.drawables.push(
            new Parallelepiped(
                top, a, b, c,
                function(this: Parallelepiped): void {
                    this.defaultAnimation();
                },
            ),
        );
    }

    public getTriangles(): Triangle[] {
        return this.drawables
            .map((d) => d.getTriangles())
            .reduce((prev, curr) => prev.concat(curr), []);
    }

    public update(): void {
        this.drawables.forEach((d) => d.update());
    }
}
