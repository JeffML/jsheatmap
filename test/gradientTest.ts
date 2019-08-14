import ColorGradient from '../src/fancy';
import chai from 'chai';
const should = chai.should();

describe('sterno tests', () => {
  it("test 1", () => {
    const heatMapGradient = new ColorGradient();    // Used to create a nice array of different colors.
    heatMapGradient.createDefaultHeatMapGradient();

    let rgb = heatMapGradient.getColorAtValue(0);
    rgb.should.eql({ blue: 1, green: 0, red: 0 })
  })
});

