import { Poly } from "./poly";

export interface IDrawable {
    getPolys: () => Poly[]
    update: () => void
}
