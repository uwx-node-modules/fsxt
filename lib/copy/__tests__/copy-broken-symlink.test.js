import fs from 'fs';
import os from 'os';
import fse from '../../index.js';
import path from 'path';
import assert from 'assert';
import copy from '../copy.js';


describe('copy / broken symlink', () => {
    const TEST_DIR = path.join(os.tmpdir(), 'fs-extra', 'copy-broken-symlink');
    const src = path.join(TEST_DIR, 'src');
    const dest = path.join(TEST_DIR, 'dest');
    beforeEach(done => {
        fse.emptyDir(TEST_DIR, err => {
            assert.ifError(err);
            createFixtures(src, done);
        });
    });
    afterEach(done => fse.remove(TEST_DIR, done));
    describe('when symlink is broken', () => {
        it('should not throw error if dereference is false', done => {
            copy(src, dest, err => {
                assert.strictEqual(err, null);
                done();
            });
        });
        it('should throw error if dereference is true', done => {
            copy(src, dest, { dereference: true }, err => {
                assert.strictEqual(err.code, 'ENOENT');
                done();
            });
        });
    });
});
function createFixtures(srcDir, callback) {
    fs.mkdir(srcDir, err => {
        let brokenFile;
        let brokenFileLink;
        if (err)
            return callback(err);
        try {
            brokenFile = path.join(srcDir, 'does-not-exist');
            brokenFileLink = path.join(srcDir, 'broken-symlink');
            fs.writeFileSync(brokenFile, 'does not matter');
            fs.symlinkSync(brokenFile, brokenFileLink, 'file');
        } catch (err) {
            callback(err);
        }
        // break the symlink now
        fse.remove(brokenFile, callback);
    });
}
