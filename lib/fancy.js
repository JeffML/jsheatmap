"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ColorPoint = /** @class */ (function () {
    function ColorPoint(red, green, blue, value) {
        this.r = red;
        this.g = green;
        this.b = blue;
        this.val = value;
    }
    return ColorPoint;
}());
var ColorGradient = /** @class */ (function () {
    function ColorGradient() {
        this.color = [];
        this.createDefaultHeatMapGradient();
    }
    ColorGradient.prototype.addColorPoint = function (red, green, blue, value) {
        for (var i = 0; i < this.color.length; i++) {
            if (value < this.color[i].val) {
                this.color.splice(i, 0, new ColorPoint(red, green, blue, value));
                return;
            }
        }
        this.color.push(new ColorPoint(red, green, blue, value));
    };
    ColorGradient.prototype.createDefaultHeatMapGradient = function () {
        this.color = [];
        this.color.push(new ColorPoint(0, 0, 1, 0.0)); // Blue.
        this.color.push(new ColorPoint(0, 1, 1, 0.35)); // Cyan.
        this.color.push(new ColorPoint(0, 1, 0, 0.5)); // Green.
        this.color.push(new ColorPoint(1, 1, 0, 0.65)); // Yellow.
        this.color.push(new ColorPoint(1, 0, 0, 1.0)); // Red.
    };
    //-- Inputs a (value) between 0 and 1 and outputs the (red), (green) and (blue)
    //-- values representing that position in the gradient.
    ColorGradient.prototype.getColorAtValue = function (value) {
        var red, green, blue;
        red = green = blue = 0;
        if (this.color.length === 0)
            return { red: red, green: green, blue: blue };
        for (var i = 0; i < this.color.length; i++) {
            var currC = this.color[i];
            if (value < currC.val) {
                var prevC = this.color[Math.max(0, i - 1)];
                var valueDiff = (prevC.val - currC.val);
                var fractBetween = (valueDiff == 0) ? 0 : (value - currC.val) / valueDiff;
                red = (prevC.r - currC.r) * fractBetween + currC.r;
                green = (prevC.g - currC.g) * fractBetween + currC.g;
                blue = (prevC.b - currC.b) * fractBetween + currC.b;
                return { red: red, green: green, blue: blue };
            }
        }
        red = this.color.slice(-1)[0].r;
        green = this.color.slice(-1)[0].g;
        blue = this.color.slice(-1)[0].b;
        return { red: red, green: green, blue: blue };
    };
    return ColorGradient;
}());
;
exports.default = ColorGradient;
