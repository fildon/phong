import { Triangle } from "./triangle";

export interface IDrawable {
    getTriangles: () => Triangle[];
    update: () => void;
}
