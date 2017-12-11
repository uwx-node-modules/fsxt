const assert = require('assert');
const util = require('util');

describe('fs', () => {
  const fs = require('../');

  describe('hansen', () => {
    it('should have no undefined properties', done => {
      for (let key in fs) {
        assert(fs[key] !== undefined, key + ' is not defined: ' + util.inspect(fs[key]));
        assert(fs[key] !== null, key + ' is null: ' + util.inspect(fs[key]));
        assert.ok(typeof fs[key] == 'number' || fs[key], key + ' is N/A: ' + util.inspect(fs[key]));
      }
      done();
    });
  });
});
