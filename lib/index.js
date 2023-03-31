import ColorGradient from './fancy.js';
import getHeatMapColor from './simple.js';
var Style;
(function (Style) {
    Style[Style["SIMPLE"] = 0] = "SIMPLE";
    Style[Style["FANCY"] = 1] = "FANCY";
})(Style || (Style = {}));
class Sterno {
    constructor(headings, rows) {
        this.headings = headings;
        this.rows = rows;
    }
    getData(options) {
        const { headings } = this;
        let high = 0;
        let low = Number.MAX_SAFE_INTEGER;
        const rows = this.rows.map(r => {
            const [label, values, extra] = r;
            high = Math.max(...values, high);
            low = Math.min(...values, low);
            if (low < 0)
                throw Error("negative input encountered");
            return { label, cells: { values, colors: [], scales: [], extra } };
        });
        const heatMapGradient = new ColorGradient(); // Used to create a nice array of different colors.
        heatMapGradient.createDefaultHeatMapGradient();
        const adjust = (v) => {
            if (options && options.logn) {
                return Math.log(v);
            }
            return v;
        };
        rows.forEach(row => {
            row.cells.values.forEach((value, i) => {
                let scale = adjust(value - low) / adjust(high - low);
                if (options && options.style === Style.SIMPLE) {
                    var color = getHeatMapColor(scale);
                }
                else {
                    var color = heatMapGradient.getColorAtValue(scale);
                }
                row.cells.colors[i] = color;
                row.cells.scales[i] = scale;
            });
        });
        return { headings, high, low, rows };
    }
}
export { Style, Sterno as default };
