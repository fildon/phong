export class Point {
    public x: number;
    public y: number;
    public z: number;
    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public subtract(other: Point) {
        return new Point(this.x - other.x, this.y - other.y, this.z - other.z);
    }

    public add(other: Point) {
        return new Point(this.x + other.x, this.y + other.y, this.z + other.z);
    }
}
