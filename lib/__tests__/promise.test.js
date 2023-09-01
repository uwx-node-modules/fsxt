import assert from "assert";
import fse from "../index.js";
'use strict';
const methods = [
    'emptyDir',
    'ensureFile',
    'ensureDir',
    'mkdirs',
    'readJson',
    'readJSON',
    'remove'
];
describe('promise support', () => {
    methods.forEach(method => {
        it(method, done => {
            fse[method]().catch(() => done());
        });
    });
    it('provides fse.promises API', () => {
        assert.ok(fse.promises);
        assert.strictEqual(typeof fse.promises.writeFile, 'function');
    });
});
