class ColorPoint {
  public r: number;
  public g: number;
  public b: number;
  val: number;
  constructor(red: number, green: number, blue: number, value: number) {
    this.r = red
    this.g = green
    this.b = blue
    this.val = value
  }
}

class ColorGradient {
  private color: Array<ColorPoint> = [];

  constructor() {
    this.createDefaultHeatMapGradient();
  }

  addColorPoint(red: number, green: number, blue: number, value: number) {
    for (let i = 0; i < this.color.length; i++) {
      if (value < this.color[i].val) {
        this.color.splice(i, 0, new ColorPoint(red, green, blue, value));
        return;
      }
    }
    this.color.push(new ColorPoint(red, green, blue, value));
  }

  createDefaultHeatMapGradient() {
    this.color = [];
    this.color.push(new ColorPoint(0, 0, 1, 0.0));      // Blue.
    this.color.push(new ColorPoint(0, 1, 1, 0.34));     // Cyan.
    this.color.push(new ColorPoint(0, 1, 0, 0.5));      // Green.
    this.color.push(new ColorPoint(1, 1, 0, 0.66));     // Yellow.
    this.color.push(new ColorPoint(1, 0, 0, 1.0));      // Red.
  }

  //-- Inputs a (value) between 0 and 1 and outputs the (red), (green) and (blue)
  //-- values representing that position in the gradient.
  getColorAtValue(value: number): { red: number, green: number, blue: number } {
    let red, green, blue;
    red = green = blue = 0;

    if (this.color.length === 0)
      return { red, green, blue };

    for (let i = 0; i < this.color.length; i++) {
      let currC = this.color[i];
      if (value < currC.val) {
        let prevC = this.color[Math.max(0, i - 1)];
        let valueDiff = (prevC.val - currC.val);
        let fractBetween = (valueDiff == 0) ? 0 : (value - currC.val) / valueDiff;
        red = (prevC.r - currC.r) * fractBetween + currC.r;
        green = (prevC.g - currC.g) * fractBetween + currC.g;
        blue = (prevC.b - currC.b) * fractBetween + currC.b;
        return { red, green, blue }
      }
    }
    red = this.color.slice(-1)[0].r;
    green = this.color.slice(-1)[0].g;
    blue = this.color.slice(-1)[0].b;
    return { red, green, blue };
  }
};

export default ColorGradient;