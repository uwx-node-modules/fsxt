// @ts-check

import assert, { ok, equal, deepEqual } from 'assert';
import VError from 'verror';
import path from 'path';

const t = './test/fsxt_temp';
const timeout = (/** @type {number | undefined} */ ms) => new Promise(res => setTimeout(res, ms));

import * as fs from '@fsxt/index';

describe('fs', () => {
    fs.removeSync(t);

    describe('xt', () => {
        // This test is useless except on the most recent Node version and TypeScript largely does away with the need for it anyway
        //it('should have no undefined properties', () => {
        //    for (const key of Object.keys(fs)) {
        //        assert(fs[key] !== undefined, `${key} is not defined: ${inspect(fs[key])}`);
        //        assert(fs[key] !== null, key + ' is null: ' + inspect(fs[key]));
        //        ok(typeof fs[key] == 'number' || fs[key], key + ' is N/A: ' + inspect(fs[key]));
        //    }
        //});
        describe('.resolve', () => {
            it('should use forward slash by default (a,b to a/b)', () => {
                equal(fs.resolve('a', 'b'), 'a/b');
            });
            it('should pick up existing folders (a/b/c,d to a/b/c/d)', () => {
                equal(fs.resolve('a/b/c', 'd'), 'a/b/c/d');
            });
            it('should ignore file extensions (a.txt,b to a.txt/b)', () => {
                equal(fs.resolve('a.txt', 'b'), 'a.txt/b');
            });
            it('should pick up existing pattetn (a\\b\\c,d to a\\b\\c\\d)', () => {
                equal(fs.resolve('a\\b\\c', 'd'), 'a\\b\\c\\d');
            });
            it('should ignore file extensions (a,b.txt to a/b.txt)', () => {
                equal(fs.resolve('a', 'b.txt'), 'a/b.txt');
            });
            it('should pick up forward slash in case of mixed separators (a\\b/c,d to a\\b/c/d)', () => {
                equal(fs.resolve('a\\b/c', 'd'), 'a\\b/c/d');
            });
        });
        describe('.mapChildren', () => {
            beforeEach(done => {
                fs.mkdirSync(t);
                for (let i = 0; i < 50; i++) fs.writeFileSync(t + '/file' + i + '.txt', 'Before: ' + i);
                done();
            });
            afterEach(done => {
                fs.removeSync(t);
                done();
            });

            it('no changes', async () => {
                await fs.mapChildren(t, e => e);

                for (let i = 0; i < 50; i++) ok(await fs.exists(t + '/file' + i + '.txt'));
                for (let i = 0; i < 50; i++) equal(await fs.readFile(t + '/file' + i + '.txt', 'utf8'), 'Before: ' + i);
            });
            it('all changed', async () => {
                await fs.mapChildren(t, e => e.replace('Before', 'After'), 'utf8');

                for (let i = 0; i < 50; i++) ok(await fs.exists(t + '/file' + i + '.txt'));
                for (let i = 0; i < 50; i++) equal(await fs.readFile(t + '/file' + i + '.txt', 'utf8'), 'After: ' + i);
            });
            it('some changed', async () => {
                await fs.mapChildren(t, e => parseInt(e.slice('Before: '.length)) % 2 == 0 ? e.replace('Before', 'Even') : e.replace('Before', 'Odd'), 'utf8');

                for (let i = 0; i < 50; i++) ok(await fs.exists(t + '/file' + i + '.txt'));
                for (let i = 0; i < 50; i++) equal(await fs.readFile(t + '/file' + i + '.txt', 'utf8'), i % 2 == 0 ? 'Even: ' + i : 'Odd: ' + i);
            });
        });
        describe('.mapStructure', () => {
            beforeEach(done => {
                fs.mkdirSync(t);
                fs.ensureFileSync(t + '/brap/brap.txt');
                fs.ensureFileSync(t + '/brap/b/brap1.txt');
                fs.ensureFileSync(t + '/brap/b/brap.avi');
                fs.ensureFileSync(t + '/brap/c/brap.avi');
                fs.ensureFileSync(t + '/brap/d/brap.avi');
                fs.mkdirsSync(t + '/brap/e.avi');
                fs.mkdirsSync(t + '/brap/e');
                fs.writeFileSync(t + '/brap/brap.txt', 'Brapp!');
                fs.writeFileSync(t + '/brap/b/brap1.txt', 'Brap2!');
                fs.writeFileSync(t + '/brap/b/brap.avi', 'Brap3!');
                fs.writeFileSync(t + '/brap/c/brap.avi', 'Brap4!');
                fs.writeFileSync(t + '/brap/d/brap.avi', 'Brap5!');
                for (let i = 0; i < 50; i++) fs.writeFileSync(t + '/file' + i + '.txt', 'Before: ' + i);
                done();
            });
            afterEach(done => {
                fs.removeSync(t);
                done();
            });

            it('no changes', async () => {
                await fs.mapStructure(t, e => e);

                for (let i = 0; i < 50; i++) ok(await fs.exists(t + '/file' + i + '.txt'));
                for (let i = 0; i < 50; i++) equal(await fs.readFile(t + '/file' + i + '.txt', 'utf8'), 'Before: ' + i);

                equal(await fs.readFile(t + '/brap/brap.txt', 'utf8'), 'Brapp!');
                equal(await fs.readFile(t + '/brap/b/brap1.txt', 'utf8'), 'Brap2!');
                equal(await fs.readFile(t + '/brap/b/brap.avi', 'utf8'), 'Brap3!');
                equal(await fs.readFile(t + '/brap/c/brap.avi', 'utf8'), 'Brap4!');
                equal(await fs.readFile(t + '/brap/d/brap.avi', 'utf8'), 'Brap5!');
            });
            it('some changed (Before => After)', async () => {
                await fs.mapStructure(t, e => e.replace('Before', 'After'), 'utf8');

                for (let i = 0; i < 50; i++) ok(await fs.exists(t + '/file' + i + '.txt'));
                for (let i = 0; i < 50; i++) equal(await fs.readFile(t + '/file' + i + '.txt', 'utf8'), 'After: ' + i);

                equal(await fs.readFile(t + '/brap/brap.txt', 'utf8'), 'Brapp!');
                equal(await fs.readFile(t + '/brap/b/brap1.txt', 'utf8'), 'Brap2!');
                equal(await fs.readFile(t + '/brap/b/brap.avi', 'utf8'), 'Brap3!');
                equal(await fs.readFile(t + '/brap/c/brap.avi', 'utf8'), 'Brap4!');
                equal(await fs.readFile(t + '/brap/d/brap.avi', 'utf8'), 'Brap5!');
            });
            it('some changed (Before => Even/Odd)', async () => {
                await fs.mapChildren(t, e => parseInt(e.slice('Before: '.length)) % 2 == 0 ? e.replace('Before', 'Even') : e.replace('Before', 'Odd'), 'utf8');

                for (let i = 0; i < 50; i++) ok(await fs.exists(t + '/file' + i + '.txt'));
                for (let i = 0; i < 50; i++) equal(await fs.readFile(t + '/file' + i + '.txt', 'utf8'), i % 2 == 0 ? 'Even: ' + i : 'Odd: ' + i);

                equal(await fs.readFile(t + '/brap/brap.txt', 'utf8'), 'Brapp!');
                equal(await fs.readFile(t + '/brap/b/brap1.txt', 'utf8'), 'Brap2!');
                equal(await fs.readFile(t + '/brap/b/brap.avi', 'utf8'), 'Brap3!');
                equal(await fs.readFile(t + '/brap/c/brap.avi', 'utf8'), 'Brap4!');
                equal(await fs.readFile(t + '/brap/d/brap.avi', 'utf8'), 'Brap5!');
            });
            it('some changed (Brap => Skrrap)', async () => {
                await fs.mapStructure(t, e => e.replace('Brap', 'Skrrap'), 'utf8');

                for (let i = 0; i < 50; i++) ok(await fs.exists(t + '/file' + i + '.txt'));
                for (let i = 0; i < 50; i++) equal(await fs.readFile(t + '/file' + i + '.txt', 'utf8'), 'Before: ' + i);

                equal(await fs.readFile(t + '/brap/brap.txt', 'utf8'), 'Skrrapp!');
                equal(await fs.readFile(t + '/brap/b/brap1.txt', 'utf8'), 'Skrrap2!');
                equal(await fs.readFile(t + '/brap/b/brap.avi', 'utf8'), 'Skrrap3!');
                equal(await fs.readFile(t + '/brap/c/brap.avi', 'utf8'), 'Skrrap4!');
                equal(await fs.readFile(t + '/brap/d/brap.avi', 'utf8'), 'Skrrap5!');
            });
            it('all changed (Before => Even/Odd, Brap => Skrrap)', async () => {
                await fs.mapStructure(t, e => {
                    const i = parseInt(e.slice('Before: '.length));
                    if (isNaN(i)) {
                        return e.replace('Brap', 'Skrrap');
                    } else if (i % 2 == 0) {
                        return e.replace('Before', 'Even');
                    } // else
                    return e.replace('Before', 'Odd');
                }, 'utf8');

                for (let i = 0; i < 50; i++) ok(await fs.exists(t + '/file' + i + '.txt'));
                for (let i = 0; i < 50; i++) equal(await fs.readFile(t + '/file' + i + '.txt', 'utf8'), i % 2 == 0 ? 'Even: ' + i : 'Odd: ' + i);

                equal(await fs.readFile(t + '/brap/brap.txt', 'utf8'), 'Skrrapp!');
                equal(await fs.readFile(t + '/brap/b/brap1.txt', 'utf8'), 'Skrrap2!');
                equal(await fs.readFile(t + '/brap/b/brap.avi', 'utf8'), 'Skrrap3!');
                equal(await fs.readFile(t + '/brap/c/brap.avi', 'utf8'), 'Skrrap4!');
                equal(await fs.readFile(t + '/brap/d/brap.avi', 'utf8'), 'Skrrap5!');
            });
        });
        describe('.forEachChildSync', () => {
            beforeEach(async () => {
                await fs.mkdir(t);
                await fs.ensureFile(t + '/brap/1.txt');
                await fs.ensureFile(t + '/brap/2.txt');
                await fs.ensureFile(t + '/brap/3.avi');
                await fs.ensureFile(t + '/brap/4.avi');
                await fs.ensureFile(t + '/brap/5.avi');
                await fs.mkdirs(t + '/brap2/');
            });
            afterEach(async () => {
                await fs.remove(t);
            });
            it('should pick up folders', done => {
                let i = 0;
                fs.forEachChildSync(t, file => {
                    switch (i) {
                        case 0:
                            equal(file, 'brap');
                            break;
                        case 1:
                            equal(file, 'brap2');
                            break;
                        default:
                            assert(false, 'should never happen!');
                    }
                    i++;
                });
                done();
            });
            it('should work', done => {
                let i = 0;
                fs.forEachChildSync(t + '/brap/', file => {
                    switch (i) {
                        case 0:
                            equal(file, '1.txt');
                            break;
                        case 1:
                            equal(file, '2.txt');
                            break;
                        case 2:
                            equal(file, '3.avi');
                            break;
                        case 3:
                            equal(file, '4.avi');
                            break;
                        case 4:
                            equal(file, '5.avi');
                            break;
                        default:
                            assert(false, 'should never happen!');
                    }
                    i++;
                });
                done();
            });
            it('should pick up empty folders', done => {
                fs.forEachChildSync(t + '/brap2/', () => {
                    assert(false, 'should never happen!');
                });
                done();
            });
        });
        describe('.forEachChild', () => {
            beforeEach(async () => {
                await fs.mkdir(t);
                await fs.ensureFile(t + '/brap/1.txt');
                await fs.ensureFile(t + '/brap/2.txt');
                await fs.ensureFile(t + '/brap/3.avi');
                await fs.ensureFile(t + '/brap/4.avi');
                await fs.ensureFile(t + '/brap/5.avi');
                await fs.mkdirs(t + '/brap2/');
            });
            afterEach(async () => {
                await fs.remove(t);
            });
            describe('w/o [options]', () => {
                it('should pick up folders', async () => {
                    let i = 0;
                    await fs.forEachChild(t, file => {
                        switch (i) {
                            case 0:
                                equal(file, 'brap');
                                break;
                            case 1:
                                equal(file, 'brap2');
                                break;
                            default:
                                assert(false, 'should never happen!');
                        }
                        i++;
                    });
                });
                it('should work', async () => {
                    let i = 0;
                    await fs.forEachChild(t + '/brap/', file => {
                        switch (i) {
                            case 0:
                                equal(file, '1.txt');
                                break;
                            case 1:
                                equal(file, '2.txt');
                                break;
                            case 2:
                                equal(file, '3.avi');
                                break;
                            case 3:
                                equal(file, '4.avi');
                                break;
                            case 4:
                                equal(file, '5.avi');
                                break;
                            default:
                                assert(false, 'should never happen!');
                        }
                        i++;
                    });
                });
                it('should await promise', async () => {
                    let i = 0;
                    await fs.forEachChild(t + '/brap/', async file => {
                        switch (i) {
                            case 0:
                                equal(file, '1.txt'); await timeout(50);
                                break;
                            case 1:
                                equal(file, '2.txt'); await timeout(50);
                                break;
                            case 2:
                                equal(file, '3.avi'); await timeout(50);
                                break;
                            case 3:
                                equal(file, '4.avi'); await timeout(50);
                                break;
                            case 4:
                                equal(file, '5.avi'); await timeout(50);
                                break;
                            default:
                                assert(false, 'should never happen!');
                        }
                        i++;
                    });
                });
                it('should pick up empty folders', async () => {
                    await fs.forEachChild(t + '/brap2/', () => {
                        assert(false, 'should never happen!');
                    });
                });
            });
            describe('w/ [options]', () => {
                it('should pick up folders', async () => {
                    let i = 0;
                    await fs.forEachChild(t, {}, file => {
                        switch (i) {
                            case 0:
                                equal(file, 'brap');
                                break;
                            case 1:
                                equal(file, 'brap2');
                                break;
                            default:
                                assert(false, 'should never happen!');
                        }
                        i++;
                    });
                });
                it('should work', async () => {
                    let i = 0;
                    await fs.forEachChild(t + '/brap/', {}, file => {
                        switch (i) {
                            case 0:
                                equal(file, '1.txt');
                                break;
                            case 1:
                                equal(file, '2.txt');
                                break;
                            case 2:
                                equal(file, '3.avi');
                                break;
                            case 3:
                                equal(file, '4.avi');
                                break;
                            case 4:
                                equal(file, '5.avi');
                                break;
                            default:
                                assert(false, 'should never happen!');
                        }
                        i++;
                    });
                });
                it('should await promise', async () => {
                    let i = 0;
                    await fs.forEachChild(t + '/brap/', {}, async file => {
                        switch (i) {
                            case 0:
                                equal(file, '1.txt'); await timeout(50);
                                break;
                            case 1:
                                equal(file, '2.txt'); await timeout(50);
                                break;
                            case 2:
                                equal(file, '3.avi'); await timeout(50);
                                break;
                            case 3:
                                equal(file, '4.avi'); await timeout(50);
                                break;
                            case 4:
                                equal(file, '5.avi'); await timeout(50);
                                break;
                            default:
                                assert(false, 'should never happen!');
                        }
                        i++;
                    });
                });
                it('should pick up empty folders', async () => {
                    await fs.forEachChild(t + '/brap2/', {}, () => {
                        assert(false, 'should never happen!');
                    });
                });
            });
            describe('w/o [options], w/ callback', () => {
                it('should pick up folders', done => {
                    let i = 0;
                    fs.forEachChild(t, file => {
                        switch (i) {
                            case 0:
                                equal(file, 'brap');
                                break;
                            case 1:
                                equal(file, 'brap2');
                                break;
                            default:
                                assert(false, 'should never happen!');
                        }
                        i++;
                    }, err => {
                        ok(!err, 'forEachChild threw error');
                        done();
                    });
                });
                it('should work', done => {
                    let i = 0;
                    fs.forEachChild(t + '/brap/', file => {
                        switch (i) {
                            case 0:
                                equal(file, '1.txt');
                                break;
                            case 1:
                                equal(file, '2.txt');
                                break;
                            case 2:
                                equal(file, '3.avi');
                                break;
                            case 3:
                                equal(file, '4.avi');
                                break;
                            case 4:
                                equal(file, '5.avi');
                                break;
                            default:
                                assert(false, 'should never happen!');
                        }
                        i++;
                    }, err => {
                        ok(!err, 'forEachChild threw error');
                        done();
                    });
                });
                it('should pick up empty folders', done => {
                    fs.forEachChild(t + '/brap2/', () => {
                        assert(false, 'should never happen!');
                    }, err => {
                        ok(!err, 'forEachChild threw error');
                        done();
                    });
                });
            });
            describe('w/ [options], w/ callback', () => {
                it('should pick up folders', done => {
                    let i = 0;
                    fs.forEachChild(t, {}, file => {
                        switch (i) {
                            case 0:
                                equal(file, 'brap');
                                break;
                            case 1:
                                equal(file, 'brap2');
                                break;
                            default:
                                assert(false, 'should never happen!');
                        }
                        i++;
                    }, err => {
                        ok(!err, 'forEachChild threw error');
                        done();
                    });
                });
                it('should work', done => {
                    let i = 0;
                    fs.forEachChild(t + '/brap/', {}, file => {
                        switch (i) {
                            case 0:
                                equal(file, '1.txt');
                                break;
                            case 1:
                                equal(file, '2.txt');
                                break;
                            case 2:
                                equal(file, '3.avi');
                                break;
                            case 3:
                                equal(file, '4.avi');
                                break;
                            case 4:
                                equal(file, '5.avi');
                                break;
                            default:
                                assert(false, 'should never happen!');
                        }
                        i++;
                    }, err => {
                        ok(!err, 'forEachChild threw error');
                        done();
                    });
                });
                it('should pick up empty folders', done => {
                    fs.forEachChild(t + '/brap2/', {}, () => {
                        assert(false, 'should never happen!');
                    }, err => {
                        ok(!err, 'forEachChild threw error');
                        done();
                    });
                });
            });
        });
        describe('.vacuum', () => {
            beforeEach(async () => {
                await fs.mkdir(t);
                await fs.mkdirs(t + '/brap/');
                await fs.mkdirs(t + '/brap2/');
                await fs.mkdirs(t + '/brap2/a/b/c/d');
                await fs.mkdirs(t + '/brap2/a/b/d/e');
                await fs.mkdirs(t + '/brap3/');
                await fs.mkdirs(t + '/brap3/zz/41');
                await fs.mkdirs(t + '/brap4/');
                await fs.mkdirs(t + '/brap5/');
                await fs.mkdirs(t + '/brap6/');
                await fs.mkdirs(t + '/brap6/7');
                await fs.mkdirs(t + '/brap6/8/9');
                await fs.mkdirs(t + '/brap6/1/2/3');
                await fs.mkdirs(t + '/brap6/1/4/5');
                await fs.mkdirs(t + '/brap6/1/4/6');
                await fs.mkdirs(t + '/brap6/2/4/7');
                await fs.mkdirs(t + '/brap6/2/4/8/9');
            });
            afterEach(async () => {
                await fs.remove(t);
            });
            it('normal functionality, Promise', async () => {
                await fs.vacuum(t, {
                    purge: true
                });
                assert(!(await fs.exists(t + '/brap/')));
                assert(!(await fs.exists(t + '/brap2/')));
                assert(!(await fs.exists(t + '/brap2/a/b/c/d')));
                assert(!(await fs.exists(t + '/brap2/a/b/d/e')));
                assert(!(await fs.exists(t + '/brap3/')));
                assert(!(await fs.exists(t + '/brap3/zz/41')));
                assert(!(await fs.exists(t + '/brap4/')));
                assert(!(await fs.exists(t + '/brap5/')));
                assert(!(await fs.exists(t + '/brap6/')));
                assert(!(await fs.exists(t + '/brap6/7')));
                assert(!(await fs.exists(t + '/brap6/8/9')));
                assert(!(await fs.exists(t + '/brap6/1/2/3')));
                assert(!(await fs.exists(t + '/brap6/1/4/5')));
                assert(!(await fs.exists(t + '/brap6/1/4/6')));
                assert(!(await fs.exists(t + '/brap6/2/4/7')));
                assert(!(await fs.exists(t + '/brap6/2/4/8/9')));
            });
            it('normal functionality, callback', done => {
                fs.vacuum(t, {
                    purge: true
                }, async err => {
                    assert(!err, ''+err);

                    assert(!(await fs.exists(t + '/brap/')));
                    assert(!(await fs.exists(t + '/brap2/')));
                    assert(!(await fs.exists(t + '/brap2/a/b/c/d')));
                    assert(!(await fs.exists(t + '/brap2/a/b/d/e')));
                    assert(!(await fs.exists(t + '/brap3/')));
                    assert(!(await fs.exists(t + '/brap3/zz/41')));
                    assert(!(await fs.exists(t + '/brap4/')));
                    assert(!(await fs.exists(t + '/brap5/')));
                    assert(!(await fs.exists(t + '/brap6/')));
                    assert(!(await fs.exists(t + '/brap6/7')));
                    assert(!(await fs.exists(t + '/brap6/8/9')));
                    assert(!(await fs.exists(t + '/brap6/1/2/3')));
                    assert(!(await fs.exists(t + '/brap6/1/4/5')));
                    assert(!(await fs.exists(t + '/brap6/1/4/6')));
                    assert(!(await fs.exists(t + '/brap6/2/4/7')));
                    assert(!(await fs.exists(t + '/brap6/2/4/8/9')));

                    done();
                });
            });
        });
        describe('.dive', () => {
            const paths = [
                path.resolve(t + '/brap6/8/9'),
                path.resolve(t + '/brap6/1/2/3'),
                path.resolve(t + '/brap6/1/4/5'),
                path.resolve(t + '/brap6/1/4/6'),
                path.resolve(t + '/brap6/2/4/7'),
                path.resolve(t + '/brap6/2/4/8/9'),
            ];

            beforeEach(async () => {
                await fs.mkdir(t);
                await fs.mkdirs(t + '/brap/');
                await fs.mkdirs(t + '/brap2/');
                await fs.mkdirs(t + '/brap2/a/b/c/d');
                await fs.mkdirs(t + '/brap2/a/b/d/e');
                await fs.mkdirs(t + '/brap3/');
                await fs.mkdirs(t + '/brap3/zz/41');
                await fs.mkdirs(t + '/brap4/');
                await fs.mkdirs(t + '/brap5/');
                await fs.mkdirs(t + '/brap6/');
                await fs.mkdirs(t + '/brap6/7');
                await fs.ensureFile(t + '/brap6/8/9');
                await fs.ensureFile(t + '/brap6/1/2/3');
                await fs.ensureFile(t + '/brap6/1/4/5');
                await fs.ensureFile(t + '/brap6/1/4/6');
                await fs.ensureFile(t + '/brap6/2/4/7');
                await fs.ensureFile(t + '/brap6/2/4/8/9');
            });
            afterEach(async () => {
                await fs.remove(t);
            });
            describe('sync', () => {
                it('no entries', async () => {
                    equal(fs.diveSync(t + '/brap').length, 0);
                });
                it('no entries, trailing slash', async () => {
                    equal(fs.diveSync(t + '/brap/').length, 0);
                });
                it('normal functionality', async () => {
                    deepEqual(fs.diveSync(t).sort(), paths.sort());
                });
            });
            it('no entries, Promise', async () => {
                await fs.dive(t + '/brap', () => {
                    throw new Error('Should have no entries!');
                });
            });
            it('no entries, callback', async () => {
                await fs.dive(t + '/brap', () => {
                    throw new Error('Should have no entries!');
                });
            });
            it('no entries, trailing slash, Promise', async () => {
                await fs.dive(t + '/brap/', () => {
                    throw new Error('Should have no entries!');
                });
            });
            it('no entries, trailing slash, callback', async () => {
                await fs.dive(t + '/brap/', () => {
                    throw new Error('Should have no entries!');
                });
            });
            it('normal functionality, Promise', async () => {
                /** @type {string[]} */
                const visited = [];
                await fs.dive(t, e => {
                    if (visited.indexOf(e) > -1) {
                        throw new Error('Visited contains ' + e + ' twice');
                    }
                    if (paths.indexOf(e) > -1) {
                        visited.push(e);
                    } else {
                        throw new Error('No ' + e + ' in paths.');
                    }
                });
                if (visited.length < paths.length) {
                    throw new Error('' + visited);
                }
            });
            it('normal functionality, callback', () => new Promise((resolve, reject) => {
                /** @type {string[]} */
                const visited = [];

                /** @type {Error[]} */
                const errors = [];
                fs.dive(t, (err, e) => {
                    if (err) {
                        errors.push(err);
                        return;
                    }
                    if (visited.indexOf(/** @type {string} */ (e)) > -1) {
                        errors.push(new VError('Visited contains ' + e + ' twice'));
                        return;
                    }
                    if (paths.indexOf(/** @type {string} */ (e)) > -1) {
                        visited.push(/** @type {string} */ (e));
                    } else {
                        errors.push(new VError('No ' + e + ' in paths.'));
                        return;
                    }
                }, () => {
                    if (errors.length > 0) {
                        reject(new VError.MultiError(errors));
                    } else {
                        resolve(undefined);
                    }
                });
            }));
        });
        describe('.readLines', () => {
            it('normal functionality, Promise', async () => {
                equal((await fs.readLines(__filename)).join('\n'), (await fs.readFile(__filename, 'utf8')).replace(/\r\n/g, '\n'));
            });
            it('normal functionality, callback', done => {
                fs.readLines(__filename, (err, lines) => {
                    try {
                        equal(/** @type {string[]} */ (lines).join('\n'), fs.readFileSync(__filename, 'utf8').replace(/\r\n/g, '\n'));
                        done();
                    } catch (e) {
                        done(e);
                    }
                });
            });
        });
        describe('.readLinesSync', () => {
            it('normal functionality', done => {
                try {
                    equal(fs.readLinesSync(__filename).join('\n'), fs.readFileSync(__filename, 'utf8').replace(/\r\n/g, '\n'));
                    done();
                } catch (e) {
                    done(e);
                }
            });
        });
        describe('.readText', () => {
            it('normal functionality, Promise', async () => {
                equal(await fs.readText(__filename), await fs.readFile(__filename, 'utf8'));
            });
            it('normal functionality, callback', done => {
                fs.readText(__filename, (err, data) => {
                    try {
                        equal(data, fs.readFileSync(__filename, 'utf8'));
                        done();
                    } catch (e) {
                        done(e);
                    }
                });
            });
        });
        describe('.readTextSync', () => {
            it('normal functionality', async () => {
                equal(fs.readTextSync(__filename), await fs.readFile(__filename, 'utf8'));
            });
        });
        describe('.isDirectory', () => {
            it('normal functionality, Promise', async () => {
                equal(await fs.isDirectory(__dirname), true);
            });
            it('normal functionality, callback', done => {
                fs.isDirectory(__dirname, (err, is) => {
                    try {
                        equal(is, true);
                        done();
                    } catch (e) {
                        done(e);
                    }
                });
            });
            it('normal functionality, inverse, Promise', async () => {
                equal(await fs.isDirectory(__filename), false);
            });
            it('normal functionality, inverse, callback', done => {
                fs.isDirectory(__filename, (err, is) => {
                    try {
                        equal(is, false);
                        done();
                    } catch (e) {
                        done(e);
                    }
                });
            });
        });
        describe('.isDirectorySync', () => {
            it('normal functionality', () => {
                equal(fs.isDirectorySync(__dirname), true);
            });
            it('normal functionality, inverse', () => {
                equal(fs.isDirectorySync(__filename), false);
            });
        });
    // describe('createReaddirStream', () => {
    //   it('should `.createReaddirStream` throw TypeError if `dir` not a string or buffer', done => {
    //     function fixture() {
    //       fs.createReaddirStream(123);
    //     }
    //     assert.throws(fixture, TypeError);
    //     assert.throws(fixture, /expect `dir` to be a string or Buffer/);
    //     done();
    //   });
    //
    //   it('should `.createReaddirStream` emit `error` event if fs.readdir fails', done => {
    //     var stream = fs.createReaddirStream('./not-existing-dir');
    //     stream.once('error', err => {
    //       assert.ifError(!err);
    //       assert.ok(/no such file or directory/.test(err.message));
    //       done();
    //     });
    //   });
    // });
    });
});
