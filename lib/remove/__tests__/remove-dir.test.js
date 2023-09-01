import fs from 'fs';
import os from 'os';
import fse from '../../index.js';
import path from 'path';
import assert from 'assert';

/* global beforeEach, describe, it */
describe('remove / async / dir', () => {
    let TEST_DIR;
    beforeEach(done => {
        TEST_DIR = path.join(os.tmpdir(), 'fs-extra', 'remove-async-dir');
        fse.emptyDir(TEST_DIR, done);
    });
    describe('> when dir does not exist', () => {
        it('should not throw an error', done => {
            const someDir = path.join(TEST_DIR, 'some-dir/');
            assert.strictEqual(fs.existsSync(someDir), false);
            fse.remove(someDir, err => {
                assert.ifError(err);
                done();
            });
        });
    });
});
