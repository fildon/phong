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
    }
    start() {
        this.tick();
    }
    tick() {
        // 16 ms is just over 60fps
        setTimeout(() => {
            this.tick();
        }, 16);
        this.scene.update();
        const image = this.generateImage();
        this.canvas.paint(image);
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
        this.scene.polys.forEach(poly => {
            if (this.pointInPoly(rowIndex, columnIndex, poly)) {
                result = poly.colour;
            }
        });
        return result;
    }
    pointInPoly(row, column, poly) {
        let windingNumber = 0;
        let n = poly.points.length;
        for (let i = 0; i < n; i++) {
            let vertexCurrent = poly.points[i];
            let vertexNext = poly.points[(i + 1) % n];
            if (vertexCurrent.y <= column) {
                if (vertexNext.y > column) {
                    if (this.isLeft(vertexCurrent, vertexNext, new point_1.Point(column, row, 0)) > 0) {
                        windingNumber++;
                    }
                }
            }
            else {
                if (vertexNext.y <= column) {
                    if (this.isLeft(vertexCurrent, vertexNext, new point_1.Point(column, row, 0)) < 0) {
                        windingNumber--;
                    }
                }
            }
        }
        return windingNumber != 0;
    }
    // TODO have some selfrespect and rename these arguments
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
        this.points = points;
        this.colour = colour;
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
        // TODO just a test scene for now
        this.polys.push(new poly_1.Poly([new point_1.Point(100, 100, 10), new point_1.Point(200, 300, 10), new point_1.Point(300, 100, 10)], new colour_1.Colour(255, 0, 0, 1)));
        this.polys.push(new poly_1.Poly([new point_1.Point(100, 300, 20), new point_1.Point(200, 100, 20), new point_1.Point(300, 300, 20)], new colour_1.Colour(0, 255, 0, 1)));
    }
    update() {
        // TODO
    }
}
exports.Scene = Scene;

},{"./colour":4,"./point":5,"./poly":6}]},{},[2]);
