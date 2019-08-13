import Sterno from '../src';
import chai from 'chai';
const should = chai.should();

describe('sterno tests', () => {

  it('good input', () => {
    const map = new Sterno(['a', 'b'], [
      ["flum", [0, 5, 10]],
      ["floop", [10, 5, 0]]
    ]);

    map.should.be.ok;
    should.exist(map)

    const data = map.getData();
    should.exist(data)
    // console.dir(data, { depth: 5 })
    const [row0] = data.rows;
    const { cells: { colors, scales } } = row0;

    row0.label.should.eq("flum")
    colors[0].should.eql({ red: 0, green: 0, blue: 1 })
    scales.should.eql([-0.5, 0, 0.5])
  })

  it('bad input', () => {
    const map = new Sterno(['a', 'b'], [
      ["flum", [0, -50, 10]],
      ["floop", [10, 5, 0]]
    ]);

    map.should.be.ok;
    (() => map.getData()).should.throw('negative input encountered')
  })
})


