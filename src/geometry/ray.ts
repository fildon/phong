import { Vector } from "./vector";
import { Colour } from "../colour";
import { Triangle } from "../drawables/triangle";

export class Ray {
  public readonly origin: Vector;
  public readonly destination: Vector;
  public readonly direction: Vector;
  constructor(origin: Vector, destination: Vector) {
    this.origin = origin;
    this.destination = destination;
    this.direction = this.destination.subtract(this.origin);
  }

  public interpolate(other: Ray, proportion: number): Ray {
    if (!this.origin.equals(other.origin)) {
      throw new Error("Cannot interpolate between rays with different origins");
    }

    const vectorTo = other.destination.subtract(this.destination);

    return new Ray(
      this.origin,
      this.destination.add(vectorTo.scaleBy(proportion))
    );
  }

  public getColourOfNearestIntersection(triangles: Triangle[]): Colour | null {
    let nearestDistance = Infinity;
    let result = null;
    triangles.forEach((tri) => {
      const intersection = this.getIntersection(tri);
      if (intersection) {
        const currentDistance = intersection.distanceBetween(this.origin);
        if (currentDistance < nearestDistance) {
          nearestDistance = currentDistance;
          result = tri.colour;
        }
      }
    });
    return result;
  }

  private getIntersection(triangle: Triangle): Vector | null {
    // http://geomalgorithms.com/a06-_intersect-2.html#intersect3D_RayTriangle()
    const w0 = this.origin.subtract(triangle.point0);
    const a = -triangle.normal.dot(w0);

    if (a < 0) {
      return null; // ray goes away from triangle
    }

    const b = this.direction.dot(triangle.normal);
    if (Math.abs(b) < 0.00000001) {
      return null; // ray is parallel to triangle
    }

    const r = a / b;

    const i = this.origin.add(this.direction.scaleBy(r));

    const u = triangle.point1.subtract(triangle.point0);
    const v = triangle.point2.subtract(triangle.point0);
    const uu = u.dot(u);
    const uv = u.dot(v);
    const vv = v.dot(v);
    const w = i.subtract(triangle.point0);
    const wu = w.dot(u);
    const wv = w.dot(v);
    const d = uv * uv - uu * vv;

    const s = (uv * wv - vv * wu) / d;
    if (s < 0 || s > 1) {
      return null; // intersection with plane is outside triangle
    }
    const t = (uv * wu - uu * wv) / d;
    if (t < 0 || s + t > 1) {
      return null; // intersection with plane is outside triangle
    }

    return i;
  }
}
