import Sterno from '../src';
import mocha from 'mocha';
import { should } from 'chai';

describe('sterno tests', () => {

  it('ctor test', () => {
    const map = new Sterno(['a', 'b'], [
      ["flum", [1, 2, 3.1]],
      ["flum", [3, 2, 1.1]]
    ]);

    const results = map.heatMap();
  })
})


