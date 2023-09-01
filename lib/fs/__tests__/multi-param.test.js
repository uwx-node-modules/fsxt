// @ts-check

import assert from 'assert';
import path from 'path';
import crypto from 'crypto';
import os from 'os';
import * as fs from '../../index.js';

const SIZE = 1000;
describe('fs.read()', () => {
    /** @type {string} */ let TEST_FILE;
    /** @type {Buffer} */ let TEST_DATA;
    /** @type {number} */ let TEST_FD;
    beforeEach(() => {
        TEST_FILE = path.join(os.tmpdir(), 'fs-extra', 'read-test-file');
        TEST_DATA = crypto.randomBytes(SIZE);
        fs.writeFileSync(TEST_FILE, TEST_DATA);
        TEST_FD = fs.openSync(TEST_FILE, 'r');
    });
    afterEach(() => {
        return fs.close(TEST_FD)
            .then(() => fs.remove(TEST_FILE));
    });
    describe('with promises', () => {
        it('returns an object', () => {
            return fs.read(TEST_FD, Buffer.alloc(SIZE), 0, SIZE, 0)
                .then(results => {
                    const bytesRead = results.bytesRead;
                    const buffer = results.buffer;
                    assert.strictEqual(bytesRead, SIZE, 'bytesRead is correct');
                    assert(buffer.equals(TEST_DATA), 'data is correct');
                });
        });
        it('returns an object when position is not set', () => {
            return fs.read(TEST_FD, Buffer.alloc(SIZE), 0, SIZE, null)
                .then(results => {
                    const bytesRead = results.bytesRead;
                    const buffer = results.buffer;
                    assert.strictEqual(bytesRead, SIZE, 'bytesRead is correct');
                    assert(buffer.equals(TEST_DATA), 'data is correct');
                });
        });
    });
    describe('with callbacks', () => {
        it('works', done => {
            fs.read(TEST_FD, Buffer.alloc(SIZE), 0, SIZE, 0, (err, bytesRead, buffer) => {
                assert.ifError(err);
                assert.strictEqual(bytesRead, SIZE, 'bytesRead is correct');
                assert(buffer.equals(TEST_DATA), 'data is correct');
                done();
            });
        });
        it('works when position is null', done => {
            fs.read(TEST_FD, Buffer.alloc(SIZE), 0, SIZE, null, (err, bytesRead, buffer) => {
                assert.ifError(err);
                assert.strictEqual(bytesRead, SIZE, 'bytesRead is correct');
                assert(buffer.equals(TEST_DATA), 'data is correct');
                done();
            });
        });
    });
});
describe('fs.write()', () => {
    /** @type {string} */ let TEST_FILE;
    /** @type {Buffer} */ let TEST_DATA;
    /** @type {number} */ let TEST_FD;
    beforeEach(() => {
        TEST_FILE = path.join(os.tmpdir(), 'fs-extra', 'write-test-file');
        TEST_DATA = crypto.randomBytes(SIZE);
        fs.ensureDirSync(path.dirname(TEST_FILE));
        TEST_FD = fs.openSync(TEST_FILE, 'w');
    });
    afterEach(() => {
        return fs.close(TEST_FD)
            .then(() => fs.remove(TEST_FILE));
    });
    describe('with promises', () => {
        it('returns an object', () => {
            return fs.write(TEST_FD, TEST_DATA, 0, SIZE, 0)
                .then(results => {
                    const bytesWritten = results.bytesWritten;
                    const buffer = results.buffer;
                    assert.strictEqual(bytesWritten, SIZE, 'bytesWritten is correct');
                    assert(buffer.equals(TEST_DATA), 'data is correct');
                });
        });
        it('returns an object when minimal arguments are passed', () => {
            return fs.write(TEST_FD, TEST_DATA)
                .then(results => {
                    const bytesWritten = results.bytesWritten;
                    const buffer = results.buffer;
                    assert.strictEqual(bytesWritten, SIZE, 'bytesWritten is correct');
                    assert(buffer.equals(TEST_DATA), 'data is correct');
                });
        });
        it('returns an object when writing a string', () => {
            const message = 'Hello World!';
            return fs.write(TEST_FD, message)
                .then(results => {
                    const bytesWritten = results.bytesWritten;
                    const buffer = results.buffer;
                    assert.strictEqual(bytesWritten, message.length, 'bytesWritten is correct');
                    assert.strictEqual(buffer, message, 'data is correct');
                });
        });
    });
    describe('with callbacks', () => {
        it('works', done => {
            fs.write(TEST_FD, TEST_DATA, 0, SIZE, 0, (err, bytesWritten, buffer) => {
                assert.ifError(err);
                assert.strictEqual(bytesWritten, SIZE, 'bytesWritten is correct');
                assert(buffer.equals(TEST_DATA), 'data is correct');
                done();
            });
        });
        it('works when minimal arguments are passed', done => {
            fs.write(TEST_FD, TEST_DATA, (err, bytesWritten, buffer) => {
                assert.ifError(err);
                assert.strictEqual(bytesWritten, SIZE, 'bytesWritten is correct');
                assert(buffer.equals(TEST_DATA), 'data is correct');
                done();
            });
        });
        it('works when writing a string', done => {
            const message = 'Hello World!';
            return fs.write(TEST_FD, message, (err, bytesWritten, buffer) => {
                assert.ifError(err);
                assert.strictEqual(bytesWritten, message.length, 'bytesWritten is correct');
                assert.strictEqual(buffer, message, 'data is correct');
                done();
            });
        });
    });
});
describe('fs.readv()', () => {
    /** @type {string} */ let TEST_FILE;
    /** @type {Buffer} */ let TEST_DATA;
    /** @type {number} */ let TEST_FD;
    beforeEach(() => {
        TEST_FILE = path.join(os.tmpdir(), 'fs-extra', 'readv-test-file');
        TEST_DATA = crypto.randomBytes(SIZE);
        fs.writeFileSync(TEST_FILE, TEST_DATA);
        TEST_FD = fs.openSync(TEST_FILE, 'r');
    });
    afterEach(() => {
        return fs.close(TEST_FD)
            .then(() => fs.remove(TEST_FILE));
    });
    describe('with promises', () => {
        it('returns an object', () => {
            const bufferArray = [Buffer.alloc(SIZE / 2), Buffer.alloc(SIZE / 2)];
            return fs.readv(TEST_FD, bufferArray, 0)
                .then(({ bytesRead, buffers }) => {
                    assert.strictEqual(bytesRead, SIZE, 'bytesRead is correct');
                    assert.deepStrictEqual(buffers, bufferArray, 'returned data matches mutated input param');
                    assert.deepStrictEqual(Buffer.concat(buffers), TEST_DATA, 'data is correct');
                });
        });
        it('returns an object when minimal arguments are passed', () => {
            const bufferArray = [Buffer.alloc(SIZE / 2), Buffer.alloc(SIZE / 2)];
            return fs.readv(TEST_FD, bufferArray)
                .then(({ bytesRead, buffers }) => {
                    assert.strictEqual(bytesRead, SIZE, 'bytesRead is correct');
                    assert.deepStrictEqual(buffers, bufferArray, 'returned data matches mutated input param');
                    assert.deepStrictEqual(Buffer.concat(buffers), TEST_DATA, 'data is correct');
                });
        });
    });
    describe('with callbacks', () => {
        it('works', done => {
            const bufferArray = [Buffer.alloc(SIZE / 2), Buffer.alloc(SIZE / 2)];
            fs.readv(TEST_FD, bufferArray, 0, (err, bytesRead, buffers) => {
                assert.ifError(err);
                assert.strictEqual(bytesRead, SIZE, 'bytesRead is correct');
                assert.deepStrictEqual(buffers, bufferArray, 'returned data matches mutated input param');
                assert.deepStrictEqual(Buffer.concat(buffers), TEST_DATA, 'data is correct');
                done();
            });
        });
        it('works when minimal arguments are passed', done => {
            const bufferArray = [Buffer.alloc(SIZE / 2), Buffer.alloc(SIZE / 2)];
            fs.readv(TEST_FD, bufferArray, (err, bytesRead, buffers) => {
                assert.ifError(err);
                assert.strictEqual(bytesRead, SIZE, 'bytesRead is correct');
                assert.deepStrictEqual(buffers, bufferArray, 'returned data matches mutated input param');
                assert.deepStrictEqual(Buffer.concat(buffers), TEST_DATA, 'data is correct');
                done();
            });
        });
    });
});
describe('fs.writev()', () => {
    /** @type {string} */ let TEST_FILE;
    /** @type {Buffer[]} */ let TEST_DATA;
    /** @type {number} */ let TEST_FD;
    beforeEach(() => {
        TEST_FILE = path.join(os.tmpdir(), 'fs-extra', 'writev-test-file');
        TEST_DATA = [crypto.randomBytes(SIZE / 2), crypto.randomBytes(SIZE / 2)];
        fs.ensureDirSync(path.dirname(TEST_FILE));
        TEST_FD = fs.openSync(TEST_FILE, 'w');
    });
    afterEach(() => {
        return fs.close(TEST_FD)
            .then(() => fs.remove(TEST_FILE));
    });
    describe('with promises', () => {
        it('returns an object', () => {
            return fs.writev(TEST_FD, TEST_DATA, 0)
                .then(({ bytesWritten, buffers }) => {
                    assert.strictEqual(bytesWritten, SIZE, 'bytesWritten is correct');
                    for (let i = 0; i < Math.max(buffers.length, TEST_DATA.length); i++) {
                        assert.strictEqual(buffers[i], TEST_DATA[i], `data[${i}] is correct`);
                    }
                });
        });
        it('returns an object when minimal arguments are passed', () => {
            return fs.writev(TEST_FD, TEST_DATA)
                .then(({ bytesWritten, buffers }) => {
                    assert.strictEqual(bytesWritten, SIZE, 'bytesWritten is correct');
                    for (let i = 0; i < Math.max(buffers.length, TEST_DATA.length); i++) {
                        assert.strictEqual(buffers[i], TEST_DATA[i], `data[${i}] is correct`);
                    }
                });
        });
    });
    describe('with callbacks', () => {
        it('works', done => {
            fs.writev(TEST_FD, TEST_DATA, 0, (err, bytesWritten, buffers) => {
                assert.ifError(err);
                assert.strictEqual(bytesWritten, SIZE, 'bytesWritten is correct');
                for (let i = 0; i < Math.max(buffers.length, TEST_DATA.length); i++) {
                    assert.strictEqual(buffers[i], TEST_DATA[i], `data[${i}] is correct`);
                }
                done();
            });
        });
        it('works when minimal arguments are passed', done => {
            fs.writev(TEST_FD, TEST_DATA, (err, bytesWritten, buffers) => {
                assert.ifError(err);
                assert.strictEqual(bytesWritten, SIZE, 'bytesWritten is correct');
                for (let i = 0; i < Math.max(buffers.length, TEST_DATA.length); i++) {
                    assert.strictEqual(buffers[i], TEST_DATA[i], `data[${i}] is correct`);
                }
                done();
            });
        });
    });
});
