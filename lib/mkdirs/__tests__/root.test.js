import fs from 'fs';
import * as fse from '../../index.js';
import path from 'path';
import assert from 'assert';


describe('mkdirp / root', () => {
    // '/' on unix
    const dir = path.normalize(path.resolve(path.sep)).toLowerCase();
    // Windows does not have permission to mkdir on root
    if (process.platform === 'win32')
        return;
    it('should', done => {
        fse.mkdirp(dir, 0o755, err => {
            if (err)
                return done(err);
            fs.stat(dir, (er, stat) => {
                if (er)
                    return done(er);
                assert.ok(stat.isDirectory(), 'target is a directory');
                done();
            });
        });
    });
});
