import fs from 'fs';
import os from 'os';
import * as fse from '../../../index.js';
import ncp from '../../copy.js';
import path from 'path';
import assert from 'assert';


// skip test for windows
// eslint-disable globalReturn */
// if (os.platform().indexOf('win') === 0) return
// eslint-enable globalReturn */
describe('ncp / error / dest-permission', () => {
    const TEST_DIR = path.join(os.tmpdir(), 'fs-extra', 'ncp-error-dest-perm');
    const src = path.join(TEST_DIR, 'src');
    const dest = path.join(TEST_DIR, 'dest');
    // when we are root, then we will be able to create the subdirectory even if
    // we don't have the permissions to do so, so no point in running this test
    if (os.platform().indexOf('win') === 0 || os.userInfo().uid === 0)
        return;
    beforeEach(done => {
        fse.emptyDir(TEST_DIR, err => {
            assert.ifError(err);
            done();
        });
    });
    afterEach(done => fse.remove(TEST_DIR, done));
    it('should return an error', done => {
        const someFile = path.join(src, 'some-file');
        fse.outputFileSync(someFile, 'hello');
        fse.mkdirsSync(dest);
        fs.chmodSync(dest, 0o444);
        const subdest = path.join(dest, 'another-dir');
        ncp(src, subdest, err => {
            assert(err);
            assert.strictEqual(err.code, 'EACCES');
            done();
        });
    });
});
