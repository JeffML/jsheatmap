

class Sterno {
  constructor(headings: string[], rows: Array<[string, number[]]>) {
    console.log("howsa!")
  }

  static getHeatMapColor(value: number) {
    const NUM_COLORS = 4;
    // const color = new Array(NUM_COLORS);
    // color.fill([[0, 0, 1], [0, 1, 0], [1, 1, 0], [1, 0, 0]]);
    const color = [[0, 0, 1], [0, 1, 0], [1, 1, 0], [1, 0, 0]];

    let idx1 = 0,
      idx2 = 0;

    let fractBetween = 0;

    if (value <= 0) {
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