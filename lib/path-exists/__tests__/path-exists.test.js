import fs from "../../index.js";
import path from "path";
import os from "os";
import assert from "assert";
'use strict';
describe('pathExists()', () => {
    let TEST_DIR;
    beforeEach(done => {
        TEST_DIR = path.join(os.tmpdir(), 'fs-extra', 'path-exists');
        fs.emptyDir(TEST_DIR, done);
    });
    afterEach(done => fs.remove(TEST_DIR, done));
    it('should return false if file does not exist', () => {
        return fs.pathExists(path.join(TEST_DIR, 'somefile'))
            .then(exists => assert(!exists));
    });
    it('should return true if file does exist', () => {
        const file = path.join(TEST_DIR, 'exists');
        fs.ensureFileSync(file);
        return fs.pathExists(file)
            .then(exists => assert(exists));
    });
    it('should pass an empty error parameter to the callback', done => {
        const file = path.join(TEST_DIR, 'exists');
        fs.ensureFileSync(file);
        fs.pathExists(file, (err, exists) => {
            assert.ifError(err);
            assert(exists);
            done();
        });
    });
});
