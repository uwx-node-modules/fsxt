import fse from "../../index.js";
import os from "os";
import path from "path";
import assert from "assert";
'use strict';
/* eslint-env mocha */
describe('fs.rm', () => {
    let TEST_FILE;
    beforeEach(done => {
        TEST_FILE = path.join(os.tmpdir(), 'fs-extra', 'fs-rm');
        fse.remove(TEST_FILE, done);
    });
    afterEach(done => fse.remove(TEST_FILE, done));
    it('supports promises', () => {
        fse.writeFileSync(TEST_FILE, 'hello');
        return fse.rm(TEST_FILE).then(() => {
            assert(!fse.pathExistsSync(TEST_FILE));
        });
    });
});
