

class Sterno {
  headings: Array<string>
  rows: Array<[string, number[]]>

  constructor(headings: string[], rows: Array<[string, number[]]>) {
    this.headings = headings;
    this.rows = rows;
  }

  getData(options: object = {}): {
    headings: string[],
    high: number, low: number, mid: number,
    rows: { label: string, cells: { values: number[], scales: number[], colors: object[] } }[]
  } {
    const { headings } = this;
    let high = 0;
    let low = Number.MAX_SAFE_INTEGER;

    const rows = this.rows.map(r => {
      const label = r[0]
      const values = r[1]
      high = Math.max(...values, high)
      low = Math.min(...values, low)
      if (low < 0) throw Error("negative input encountered")
      return { label, cells: { values, colors: [] as object[], scales: [] as number[] } }
    })


    // const mid = (high - low) / 2 + low;
    // const diff = high - mid;

    rows.forEach(row => {
      row.cells.values.forEach((value, i) => {
        const scale = (value - low) / (high - low);
        const color = Sterno.getHeatMapColor(scale);
        row.cells.colors[i] = color;
        row.cells.scales[i] = scale;
      })
    });

    return { headings, high, low, mid: 0, rows };
  }

  static getHeatMapColor(value: number) {
    const NUM_COLORS = 4;
    const color = [[0, 0, 1], [0, 1, 0], [1, 1, 0], [1, 0, 0]];

    let idx1 = 0,
      idx2 = 0;

    let fractBetween = 0;

    if (value <= 0) {
      idx1 = idx2 = 0
    } else if (value >= 1) {
      idx1 = idx2 = NUM_COLORS - 1;
    } else {
      const v = value * (NUM_COLORS - 1);
      idx1 = Math.floor(v);
      idx2 = idx1 + 1;
      fractBetween = v - idx1;
    }

    const rgb = {
      red: (color[idx2][0] - color[idx1][0]) * fractBetween + color[idx1][0],
      green: (color[idx2][1] - color[idx1][1]) * fractBetween + color[idx1][1],
      blue: (color[idx2][2] - color[idx1][2]) * fractBetween + color[idx1][2]
    };

    return rgb;
  }
}

export default Sterno;