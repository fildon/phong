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

    public crossProduct(other: Point) {
        return new Point(
            this.y * other.z - this.z * other.y,
            this.z * other.x - this.x * other.z,
            this.x * other.y - this.y * other.x,
        );
    }

    public dotProduct(other: Point) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }

    public rotateInYAround(p: Point, radians: number): Point {
        const translation = new Point(p.x, p.y, p.z);
        const translated = this.subtract(translation);
        const rotated = new Point(
            translated.x * Math.cos(radians) - translated.z * Math.sin(radians),
            translated.y,
            translated.z * Math.cos(radians) + translated.x * Math.sin(radians),
        );
        return rotated.add(translation);
    }
}
