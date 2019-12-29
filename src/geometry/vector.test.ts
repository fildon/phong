import { Vector } from "./vector";

describe("Rotation", () => {
    test("around the origin", () => {
        const testVector = new Vector(10, 0, 20);

        const actual = testVector.rotateInYAround(
            new Vector(0, 0, 0), 0.5 * Math.PI,
        );

        const expected = new Vector(-20, 0, 10);
        expect(actual.distanceBetween(expected) < 0.01).toBeTruthy();
    });

    test("around arbitrary point", () => {
        const testVector = new Vector(30, 20, 10);
        const rotationCentre = new Vector(40, 50, 60);

        const actual = testVector.rotateInYAround(rotationCentre, Math.PI);

        const expected = new Vector(50, 20, 110);
        expect(actual.distanceBetween(expected) < 0.01).toBeTruthy();
    });
});
