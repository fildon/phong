export class Colour {
    public r: number;
    public g: number;
    public b: number;
    public a: number;
    constructor(r: number, g: number, b: number, a: number) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    public equals(other: Colour) {
        return this.r === other.r && this.g === other.g && this.b === other.b && this.a === other.a;
    }
}
