export class Vector {
    public x: number;
    public y: number;
    public z: number;
    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public subtract(other: Vector) {
        return new Vector(this.x - other.x, this.y - other.y, this.z - other.z);
    }

    public add(other: Vector) {
        return new Vector(this.x + other.x, this.y + other.y, this.z + other.z);
    }

    public crossProduct(other: Vector) {
        return new Vector(
            this.y * other.z - this.z * other.y,
            this.z * other.x - this.x * other.z,
            this.x * other.y - this.y * other.x,
        );
    }

    public dotProduct(other: Vector) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }

    public rotateInYAround(p: Vector, radians: number): Vector {
        const translation = new Vector(p.x, p.y, p.z);
        const translated = this.subtract(translation);
        const rotated = new Vector(
            translated.x * Math.cos(radians) - translated.z * Math.sin(radians),
            translated.y,
            translated.z * Math.cos(radians) + translated.x * Math.sin(radians),
        );
        return rotated.add(translation);
    }
}
