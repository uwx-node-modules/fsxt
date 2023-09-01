// @ts-check

import assert from "assert";
import fs from "../../index.js";

'use strict';

describe('fs', () => {
    it('.stat()', done => {
        fs.stat(__filename).then(stats => {
            assert.strictEqual(typeof stats.size, 'number');
            done();
        }).catch(done);
    });
    it('.statSync()', () => {
        const stats = fs.statSync(__filename);
        assert.strictEqual(typeof stats.size, 'number');
    });
    it('.exists()', done => {
        fs.exists(__filename).then(exists => {
            assert(exists);
            done();
        }).catch(done);
    });
    it('.existsSync()', () => {
        const exists = fs.existsSync(__filename);
        assert(exists);
    });
    describe('callback support', () => {
        it('.stat()', done => {
            fs.stat(__filename, (err, stats) => {
                assert(!err);
                assert.strictEqual(typeof stats.size, 'number');
                done();
            });
        });
        // This test is different from mz/fs, since we are a drop-in replacement for native fs
        it('.exists()', done => {
            fs.exists(__filename, exists => {
                assert(exists);
                done();
            });
        });
    });
});
