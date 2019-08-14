"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sterno = /** @class */ (function () {
    function Sterno(headings, rows) {
        this.headings = headings;
        this.rows = rows;
    }
    Sterno.prototype.getData = function (options) {
        if (options === void 0) { options = {}; }
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
        // const mid = (high - low) / 2 + low;
        // const diff = high - mid;
        rows.forEach(function (row) {
            row.cells.values.forEach(function (value, i) {
                var scale = (value - low) / (high - low);
                var color = Sterno.getHeatMapColor(scale);
                row.cells.colors[i] = color;
                row.cells.scales[i] = scale;
            });
        });
        return { headings: headings, high: high, low: low, mid: 0, rows: rows };
    };
    Sterno.getHeatMapColor = function (value) {
        var NUM_COLORS = 4;
        var color = [[0, 0, 1], [0, 1, 0], [1, 1, 0], [1, 0, 0]];
        var idx1 = 0, idx2 = 0;
        var fractBetween = 0;
        if (value <= 0) {
            idx1 = idx2 = 0;
        }
        else if (value >= 1) {
            idx1 = idx2 = NUM_COLORS - 1;
        }
        else {
            var v = value * (NUM_COLORS - 1);
            idx1 = Math.floor(v);
            idx2 = idx1 + 1;
            fractBetween = v - idx1;
        }
        var rgb = {
            red: (color[idx2][0] - color[idx1][0]) * fractBetween + color[idx1][0],
            green: (color[idx2][1] - color[idx1][1]) * fractBetween + color[idx1][1],
            blue: (color[idx2][2] - color[idx1][2]) * fractBetween + color[idx1][2]
        };
        return rgb;
    };
    return Sterno;
}());
exports.default = Sterno;
