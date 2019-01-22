(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("./canvas");
document.addEventListener("DOMContentLoaded", () => {
    const canvas = new canvas_1.Canvas();
    canvas.drawCircle();
}, false);

},{"./canvas":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Canvas {
    constructor() {
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
        this.canvas.height = 200;
        this.canvas.height = 200;
    }
    drawCircle() {
        this.ctx.beginPath();
        this.ctx.arc(100, 100, 20, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'black';
        this.ctx.fill();
    }
}
exports.Canvas = Canvas;

},{}]},{},[1]);
