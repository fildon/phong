(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("./canvas");
const scene_1 = require("./scene");
const colour_1 = require("./colour");
const point_1 = require("./point");
class AnimationLoop {
    constructor() {
        this.width = 500;
        this.height = 500;
        this.canvas = new canvas_1.Canvas(this.width, this.height);
        this.scene = new scene_1.Scene();
        this.timestamp = new Date();
        this.timestampElement = document.getElementById('timestamp');
    }
    start() {
        this.tick();
    }
    tick() {
        let newTime = new Date();
        let timeDiff = newTime.getTime() - this.timestamp.getTime();
        let fps = 1000 / timeDiff;
        fps = Math.floor(100 * fps) / 100; // 2 decimal places
        this.timestampElement.textContent = fps.toString();
        this.timestamp = newTime;
        this.scene.update();
        const image = this.generateImage();
        this.canvas.paint(image);
        setTimeout(() => {
            this.tick();
        }, 0);
    }
    generateImage() {
        let image = [];
        for (let rowIndex = 0; rowIndex < this.height; rowIndex++) {
            let row = this.generateImageRow(rowIndex);
            image.push(row);
        }
        return image;
    }
    generateImageRow(rowIndex) {
        let row = [];
        for (let columnIndex = 0; columnIndex < this.width; columnIndex++) {
            let colour = this.generateColourAt(rowIndex, columnIndex);
            row.push(colour);
        }
        return row;
    }
    generateColourAt(rowIndex, columnIndex) {
        let result = new colour_1.Colour(0, 0, 0, 1);
        let shortest = Infinity;
        this.scene.polys.forEach(poly => {
            let windingResult = this.getWindingResult(rowIndex, columnIndex, poly);
            if (windingResult) {
                if (windingResult < shortest) {
                    result = poly.colour;
                    shortest = windingResult;
                }
            }
        });
        return result;
    }
    getWindingResult(row, column, poly) {
        let windingNumber = 0;
        let n = poly.points.length;
        for (let i = 0; i < n; i++) {
            let vertexCurrent = poly.points[i];
            let vertexNext = poly.points[(i + 1) % n];
            if (vertexCurrent.y <= column) {
                if (vertexNext.y > column) {
                    if (this.isLeft(vertexCurrent, vertexNext, new point_1.Point(row, column, 0)) > 0) {
                        windingNumber++;
                    }
                }
            }
            else {
                if (vertexNext.y <= column) {
                    if (this.isLeft(vertexCurrent, vertexNext, new point_1.Point(row, column, 0)) < 0) {
                        windingNumber--;
                    }
                }
            }
        }
        if (!windingNumber) {
            return null;
        }
        return poly.calculateZ(row, column);
    }
    isLeft(P0, P1, P2) {
        return ((P1.x - P0.x) * (P2.y - P0.y)
            - (P2.x - P0.x) * (P1.y - P0.y));
    }
}
exports.AnimationLoop = AnimationLoop;

},{"./canvas":3,"./colour":4,"./point":5,"./scene":7}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const animationLoop_1 = require("./animationLoop");
document.addEventListener("DOMContentLoaded", () => {
    new animationLoop_1.AnimationLoop().start();
}, false);

},{"./animationLoop":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Canvas {
    constructor(width, height) {
        const canvas = document.getElementById("canvas");
        if (!canvas) {
            throw new Error("couldn't find 'canvas' on document");
        }
        this.canvas = canvas;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error("could not get canvas context");
        }
        this.ctx = ctx;
        this.canvas.width = width;
        this.canvas.height = height;
    }
    paint(image) {
        for (let i = 0; i < image.length; i++) {
            for (let j = 0; j < image[i].length; j++) {
                const colour = image[i][j];
                this.ctx.fillStyle = "rgba(" + colour.r + "," + colour.g + "," + colour.b + "," + colour.a + ")";
                this.ctx.fillRect(i, j, 1, 1);
            }
        }
    }
}
exports.Canvas = Canvas;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Colour {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}
exports.Colour = Colour;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Point {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
exports.Point = Point;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Poly {
    constructor(points, colour) {
        if (points.length < 3) {
            throw new Error("too few points to define poly");
        }
        // TODO test that triangle is not degenerate!
        this.points = points;
        this.colour = colour;
    }
    calculateZ(x, y) {
        // https://math.stackexchange.com/questions/28043/finding-the-z-value-on-a-plane-with-x-y-values
        let v1 = [this.points[0].x - this.points[1].x, this.points[0].y - this.points[1].y, this.points[0].z - this.points[1].z];
        let v2 = [this.points[0].x - this.points[2].x, this.points[0].y - this.points[2].y, this.points[0].z - this.points[2].z];
        let r = v1[1] * v2[2] - v1[2] * v2[1];
        let s = v1[2] * v2[0] - v1[0] * v2[2];
        let t = v1[0] * v2[1] - v1[1] * v2[0];
        let constant = (1 / t) * (r * this.points[0].x + s * this.points[0].y) + this.points[0].z;
        let xMult = -r / t;
        let yMult = -s / t;
        return constant + xMult * x + yMult * y;
    }
}
exports.Poly = Poly;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const poly_1 = require("./poly");
const point_1 = require("./point");
const colour_1 = require("./colour");
class Scene {
    constructor() {
        this.polys = [];
        this.polys.push(new poly_1.Poly([new point_1.Point(100, 100, 100), new point_1.Point(200, 300, 80), new point_1.Point(300, 100, 200)], new colour_1.Colour(255, 0, 0, 1)));
        this.polys.push(new poly_1.Poly([new point_1.Point(100, 300, 100), new point_1.Point(200, 100, 100), new point_1.Point(300, 300, 100)], new colour_1.Colour(0, 255, 0, 1)));
    }
    update() {
        this.polys[0].points[0].x = (this.polys[0].points[0].x + 1) % 500;
        this.polys[0].points[0].y = (this.polys[0].points[0].y + 1) % 500;
        this.polys[0].points[0].z = (this.polys[0].points[0].z + 1) % 500;
    }
}
exports.Scene = Scene;

},{"./colour":4,"./point":5,"./poly":6}]},{},[2]);
