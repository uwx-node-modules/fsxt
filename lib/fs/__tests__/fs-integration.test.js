import os from 'os';
import fs from 'fs';
import * as fse from '../../index.js';
import path from 'path';
import assert from 'assert';


describe('native fs', () => {
    let TEST_DIR;
    beforeEach(done => {
        TEST_DIR = path.join(os.tmpdir(), 'fs-extra', 'native-fs');
        fse.emptyDir(TEST_DIR, done);
    });
    afterEach(done => fse.remove(TEST_DIR, done));
    it('should use native fs methods', () => {
        const file = path.join(TEST_DIR, 'write.txt');
        fse.writeFileSync(file, 'hello');
        const data = fse.readFileSync(file, 'utf8');
        assert.strictEqual(data, 'hello');
    });
    it('should have native fs constants', () => {
        assert.strictEqual(fse.constants.F_OK, fs.constants.F_OK);
        assert.strictEqual(fse.F_OK, fs.F_OK); // soft deprecated usage, but still available
    });
});
