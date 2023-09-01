import fs from 'fs';
import os from 'os';
import * as fse from '../../index.js';
import path from 'path';
import assert from 'assert';


describe('mkdirs / opts-undef', () => {
    let TEST_DIR;
    beforeEach(done => {
        TEST_DIR = path.join(os.tmpdir(), 'fs-extra', 'mkdirs');
        fse.emptyDir(TEST_DIR, done);
    });
    // https://github.com/substack/node-mkdirp/issues/45
    it('should not hang', done => {
        const newDir = path.join(TEST_DIR, 'doest', 'not', 'exist');
        assert(!fs.existsSync(newDir));
        fse.mkdirs(newDir, undefined, err => {
            assert.ifError(err);
            assert(fs.existsSync(newDir));
            done();
        });
    });
});
