"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fancy_1 = __importDefault(require("./fancy"));
var simple_1 = __importDefault(require("./simple"));
var Style;
(function (Style) {
    Style[Style["SIMPLE"] = 0] = "SIMPLE";
    Style[Style["FANCY"] = 1] = "FANCY";
})(Style || (Style = {}));
exports.Style = Style;
var Sterno = /** @class */ (function () {
    function Sterno(headings, rows) {
        this.headings = headings;
        this.rows = rows;
    }
    Sterno.prototype.getData = function (options) {
        var headings = this.headings;
        var high = 0;
        var low = Number.MAX_SAFE_INTEGER;
        var rows = this.rows.map(function (r) {
            var label = r[0];
            var values = r[1];
            high = Math.max.apply(Math, values.concat([high]));
            low = Math.min.apply(Math, values.concat([low]));
            if (low < 0)
                throw Error("negative input encountered");
            return { label: label, cells: { values: values, colors: [], scales: [] } };
        });
        var heatMapGradient = new fancy_1.default(); // Used to create a nice array of different colors.
        heatMapGradient.createDefaultHeatMapGradient();
        var adjust = function (v) {
            if (options && typeof options.logn) {
                return Math.log(v);
            }
            return v;
        };
        rows.forEach(function (row) {
            row.cells.values.forEach(function (value, i) {
                var scale = adjust(value - low) / adjust(high - low);
                if (options && options.style === Style.SIMPLE) {
                    var color = simple_1.default(scale);
                }
                else {
                    var color = heatMapGradient.getColorAtValue(scale);
                }
                row.cells.colors[i] = color;
                row.cells.scales[i] = scale;
            });
        });
        return { headings: headings, high: high, low: low, rows: rows };
    };
    return Sterno;
}());
exports.default = Sterno;
