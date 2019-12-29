import { Ray } from "./geometry/ray";
import { Vector } from "./geometry/vector";

export class Camera {
    public readonly position: Vector;
    public readonly topLeft: Vector;
    public readonly topRight: Vector;
    public readonly bottomLeft: Vector;
    public readonly bottomRight: Vector;
    private readonly xEdge: Vector;
    private readonly yEdge: Vector;
    constructor(position: Vector, topLeft: Vector, topRight: Vector, bottomLeft: Vector) {
        this.position = position;
        this.topLeft = topLeft;
        this.topRight = topRight;
        this.bottomLeft = bottomLeft;
        this.xEdge = this.topRight.subtract(this.topLeft);
        this.yEdge = this.bottomLeft.subtract(this.topLeft);
        this.bottomRight = this.topLeft.add(this.xEdge).add(this.yEdge);
    }

    public getRayAtRelativeXY(xInterpolation: number, yInterpolation: number): Ray {
        return new Ray(
            this.position,
            this.topLeft.add(
                this.xEdge.scaleBy(xInterpolation),
            ).add(
                this.yEdge.scaleBy(yInterpolation),
            ),
        );
    }
}
