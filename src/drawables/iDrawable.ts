import { Triangle } from "./triangle";

export interface IDrawable {
    getPolys: () => Triangle[];
    update: () => void;
}
