import Sterno from '../src';
import chai from 'chai';
const should = chai.should();

describe('sterno tests', () => {
  let map: Sterno;

  it('ctor test', () => {
    map = new Sterno(['a', 'b'], [
      ["flum", [1, 5, 10]],
      ["flum", [10, 5, 1]]
    ]);

    map.should.be.ok;
    should.exist(map)
  });

  it('data test', () => {
    const data = map.getData();
    should.exist(data)
    console.dir(data, { depth: 5 })
  })
})


