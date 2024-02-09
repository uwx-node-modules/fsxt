// @ts-check

import fs from 'fs';
import os from 'os';
import * as fse from '../../../index.js';
import { copy as ncp } from '../../index.js';
import path from 'path';
import assert from '@fs/../test-helpers';

describe('ncp broken symlink', () => {
    const TEST_DIR = path.join(os.tmpdir(), 'fs-extra', 'ncp-broken-symlinks');
    const src = path.join(TEST_DIR, 'src');
    const out = path.join(TEST_DIR, 'out');
    beforeEach(done => {
        /** @type {typeof import('assert')} */ const ass = assert(done);
        fse.emptyDir(TEST_DIR, err => {
            ass.ifError(err);
            createFixtures(src, done);
        });
    });
    afterEach(done => fse.remove(TEST_DIR, done));
    it('should not error if symlink is broken', done => {
        /** @type {typeof import('assert')} */ const ass = assert(done);
        ncp(src, out, err => {
            ass.strictEqual(err, null);
            done();
        });
    });
    it('should return an error if symlink is broken and dereference=true', done => {
        /** @type {typeof import('assert')} */ const ass = assert(done);
        ncp(src, out, { dereference: true }, err => {
            ass.strictEqual(err.code, 'ENOENT');
            done();
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
