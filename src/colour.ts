export class Colour {
    public static average(colours: Colour[]): Colour {
        const sumColour = colours.reduce((prev, curr) => {
            return new Colour(
                prev.r + curr.r,
                prev.g + curr.g,
                prev.b + curr.b,
                prev.a + curr.a,
            );
        }, new Colour(0, 0, 0, 0));
        return new Colour(
            sumColour.r / colours.length,
            sumColour.g / colours.length,
            sumColour.b / colours.length,
            sumColour.a / colours.length,
        );
    }

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

    public equals(other: Colour): boolean {
        return this.r === other.r && this.g === other.g && this.b === other.b && this.a === other.a;
    }
}
