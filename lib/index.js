"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sterno = /** @class */ (function () {
    headings,
        rows,

        function Sterno(headings, rows) {
            console.log("howsa!");
        }

    Sterno.getHeatMapColor = function (value) {
        var NUM_COLORS = 4;
        var color = [[0, 0, 1], [0, 1, 0], [1, 1, 0], [1, 0, 0]];
        var idx1 = 0, idx2 = 0;
        var fractBetween = 0;
        if (value <= 0) {
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
