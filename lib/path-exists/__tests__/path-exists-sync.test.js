import * as fs from '../../index.js';
import path from 'path';
import os from 'os';
import assert from 'assert';

describe('pathExists()', () => {
    let TEST_DIR;
    beforeEach(done => {
        TEST_DIR = path.join(os.tmpdir(), 'fs-extra', 'path-exists');
        fs.emptyDir(TEST_DIR, done);
    });
    afterEach(done => fs.remove(TEST_DIR, done));
    it('should return false if file does not exist', () => {
        assert(!fs.pathExistsSync(path.join(TEST_DIR, 'somefile')));
    });
    it('should return true if file does exist', () => {
        const file = path.join(TEST_DIR, 'exists');
        fs.ensureFileSync(file);
        assert(fs.pathExistsSync(file));
    });
});
