"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = __importDefault(require("../src"));
var chai_1 = __importDefault(require("chai"));
var should = chai_1.default.should();
describe('sterno tests', function () {
    it('good input', function () {
        var map = new src_1.default(['a', 'b'], [
            ["flum", [0, 5, 10]],
            ["floop", [10, 5, 0]]
        ]);
        map.should.be.ok;
        should.exist(map);
        var data = map.getData();
        should.exist(data);
        // console.dir(data, { depth: 5 })
        var row0 = data.rows[0];
        var _a = row0.cells, colors = _a.colors, scales = _a.scales;
        row0.label.should.eq("flum");
        colors[0].should.eql({ red: 0, green: 0, blue: 1 });
        scales.should.eql([-0.5, 0, 0.5]);
    });
    it('bad input', function () {
        var map = new src_1.default(['a', 'b'], [
            ["flum", [0, -50, 10]],
            ["floop", [10, 5, 0]]
        ]);
        map.should.be.ok;
        (function () { return map.getData(); }).should.throw('negative input encountered');
    });
});
