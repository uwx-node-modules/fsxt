'use strict';

const assert = require('assert');
const util = require('util');
const t = './test/hansen_tmp';
const timeout = ms => new Promise(res => setTimeout(res, ms));

describe('fs', () => {
  const fs = require('../');
  fs.removeSync(t);

  describe('xt', () => {
    it('should have no undefined properties', () => {
      for (let key in fs) {
        assert(fs[key] !== undefined, key + ' is not defined: ' + util.inspect(fs[key]));
        assert(fs[key] !== null, key + ' is null: ' + util.inspect(fs[key]));
        assert.ok(typeof fs[key] == 'number' || fs[key], key + ' is N/A: ' + util.inspect(fs[key]));
      }
    });
    it('.exists Promise', async () => {
      assert(await fs.exists(__filename));
    });
    describe('.resolve', () => {
      it('should use forward slash by default (a,b to a/b)', () => {
        assert.equal(fs.resolve('a', 'b'), 'a/b');
      });
      it('should pick up existing folders (a/b/c,d to a/b/c/d)', () => {
        assert.equal(fs.resolve('a/b/c', 'd'), 'a/b/c/d');
      });
      it('should ignore file extensions (a.txt,b to a.txt/b)', () => {
        assert.equal(fs.resolve('a.txt', 'b'), 'a.txt/b');
      });
      it('should pick up existing pattetn (a\\b\\c,d to a\\b\\c\\d)', () => {
        assert.equal(fs.resolve('a\\b\\c', 'd'), 'a\\b\\c\\d');
      });
      it('should ignore file extensions (a,b.txt to a/b.txt)', () => {
        assert.equal(fs.resolve('a', 'b.txt'), 'a/b.txt');
      });
      it('should pick up forward slash in case of mixed separators (a\\b/c,d to a\\b/c/d)', () => {
        assert.equal(fs.resolve('a\\b/c', 'd'), 'a\\b/c/d');
      });
    });
    describe('.mapChildren', () => {
      beforeEach(async () => {
        await fs.mkdir(t);
        for (let i = 0; i < 50; i++) await fs.writeFile(t + '/file' + i + '.txt', 'Before: ' + i);
      });
      afterEach(async () => {
        await fs.remove(t);
      });

      it('no changes', async () => {
        await fs.mapChildren(t, e => e);

        for (let i = 0; i < 50; i++) assert.ok(await fs.exists(t + '/file' + i + '.txt'));
        for (let i = 0; i < 50; i++) assert.equal(await fs.readFile(t + '/file' + i + '.txt', 'utf8'), 'Before: ' + i);
      });
      it('all changed', async () => {
        await fs.mapChildren(t, e => e.replace('Before', 'After'));

        for (let i = 0; i < 50; i++) assert.ok(await fs.exists(t + '/file' + i + '.txt'));
        for (let i = 0; i < 50; i++) assert.equal(await fs.readFile(t + '/file' + i + '.txt', 'utf8'), 'After: ' + i);
      });
      it('some changed', async () => {
        await fs.mapChildren(t, e => parseInt(e.slice('Before: '.length)) % 2 == 0 ? e.replace('Before', 'Even') : e.replace('Before', 'Odd'));

        for (let i = 0; i < 50; i++) assert.ok(await fs.exists(t + '/file' + i + '.txt'));
        for (let i = 0; i < 50; i++) assert.equal(await fs.readFile(t + '/file' + i + '.txt', 'utf8'), i % 2 == 0 ? 'Even: ' + i : 'Odd: ' + i);
      });
    });
    describe('.mapStructure', () => {
      beforeEach(async () => {
        await fs.mkdir(t);
        await fs.ensureFile(t + '/brap/brap.txt');
        await fs.ensureFile(t + '/brap/b/brap1.txt');
        await fs.ensureFile(t + '/brap/b/brap.avi');
        await fs.ensureFile(t + '/brap/c/brap.avi');
        await fs.ensureFile(t + '/brap/d/brap.avi');
        await fs.ensureFolder(t + '/brap/e.avi');
        await fs.ensureFolder(t + '/brap/e');
        await fs.writeFile(t + '/brap/brap.txt', 'Brapp!');
        await fs.writeFile(t + '/brap/b/brap1.txt', 'Brap2!');
        await fs.writeFile(t + '/brap/b/brap.avi', 'Brap3!');
        await fs.writeFile(t + '/brap/c/brap.avi', 'Brap4!');
        await fs.writeFile(t + '/brap/d/brap.avi', 'Brap5!');
        for (let i = 0; i < 50; i++) await fs.writeFile(t + '/file' + i + '.txt', 'Before: ' + i);
      });
      afterEach(async () => {
        await fs.remove(t);
      });

      it('no changes', async () => {
        await fs.mapStructure(t, e => e);

        for (let i = 0; i < 50; i++) assert.ok(await fs.exists(t + '/file' + i + '.txt'));
        for (let i = 0; i < 50; i++) assert.equal(await fs.readFile(t + '/file' + i + '.txt', 'utf8'), 'Before: ' + i);

        assert.equal(await fs.readFile(t + '/brap/brap.txt', 'utf8'), 'Brapp!');
        assert.equal(await fs.readFile(t + '/brap/b/brap1.txt', 'utf8'), 'Brap2!');
        assert.equal(await fs.readFile(t + '/brap/b/brap.avi', 'utf8'), 'Brap3!');
        assert.equal(await fs.readFile(t + '/brap/c/brap.avi', 'utf8'), 'Brap4!');
        assert.equal(await fs.readFile(t + '/brap/d/brap.avi', 'utf8'), 'Brap5!');
      });
      it('some changed (Before => After)', async () => {
        await fs.mapStructure(t, e => e.replace('Before', 'After'));

        for (let i = 0; i < 50; i++) assert.ok(await fs.exists(t + '/file' + i + '.txt'));
        for (let i = 0; i < 50; i++) assert.equal(await fs.readFile(t + '/file' + i + '.txt', 'utf8'), 'After: ' + i);

        assert.equal(await fs.readFile(t + '/brap/brap.txt', 'utf8'), 'Brapp!');
        assert.equal(await fs.readFile(t + '/brap/b/brap1.txt', 'utf8'), 'Brap2!');
        assert.equal(await fs.readFile(t + '/brap/b/brap.avi', 'utf8'), 'Brap3!');
        assert.equal(await fs.readFile(t + '/brap/c/brap.avi', 'utf8'), 'Brap4!');
        assert.equal(await fs.readFile(t + '/brap/d/brap.avi', 'utf8'), 'Brap5!');
      });
      it('some changed (Before => Even/Odd)', async () => {
        await fs.mapChildren(t, e => parseInt(e.slice('Before: '.length)) % 2 == 0 ? e.replace('Before', 'Even') : e.replace('Before', 'Odd'));

        for (let i = 0; i < 50; i++) assert.ok(await fs.exists(t + '/file' + i + '.txt'));
        for (let i = 0; i < 50; i++) assert.equal(await fs.readFile(t + '/file' + i + '.txt', 'utf8'), i % 2 == 0 ? 'Even: ' + i : 'Odd: ' + i);

        assert.equal(await fs.readFile(t + '/brap/brap.txt', 'utf8'), 'Brapp!');
        assert.equal(await fs.readFile(t + '/brap/b/brap1.txt', 'utf8'), 'Brap2!');
        assert.equal(await fs.readFile(t + '/brap/b/brap.avi', 'utf8'), 'Brap3!');
        assert.equal(await fs.readFile(t + '/brap/c/brap.avi', 'utf8'), 'Brap4!');
        assert.equal(await fs.readFile(t + '/brap/d/brap.avi', 'utf8'), 'Brap5!');
      });
      it('some changed (Brap => Skrrap)', async () => {
        await fs.mapStructure(t, e => e.replace('Brap', 'Skrrap'));

        for (let i = 0; i < 50; i++) assert.ok(await fs.exists(t + '/file' + i + '.txt'));
        for (let i = 0; i < 50; i++) assert.equal(await fs.readFile(t + '/file' + i + '.txt', 'utf8'), 'Before: ' + i);

        assert.equal(await fs.readFile(t + '/brap/brap.txt', 'utf8'), 'Skrrapp!');
        assert.equal(await fs.readFile(t + '/brap/b/brap1.txt', 'utf8'), 'Skrrap2!');
        assert.equal(await fs.readFile(t + '/brap/b/brap.avi', 'utf8'), 'Skrrap3!');
        assert.equal(await fs.readFile(t + '/brap/c/brap.avi', 'utf8'), 'Skrrap4!');
        assert.equal(await fs.readFile(t + '/brap/d/brap.avi', 'utf8'), 'Skrrap5!');
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
        });

        for (let i = 0; i < 50; i++) assert.ok(await fs.exists(t + '/file' + i + '.txt'));
        for (let i = 0; i < 50; i++) assert.equal(await fs.readFile(t + '/file' + i + '.txt', 'utf8'), i % 2 == 0 ? 'Even: ' + i : 'Odd: ' + i);

        assert.equal(await fs.readFile(t + '/brap/brap.txt', 'utf8'), 'Skrrapp!');
        assert.equal(await fs.readFile(t + '/brap/b/brap1.txt', 'utf8'), 'Skrrap2!');
        assert.equal(await fs.readFile(t + '/brap/b/brap.avi', 'utf8'), 'Skrrap3!');
        assert.equal(await fs.readFile(t + '/brap/c/brap.avi', 'utf8'), 'Skrrap4!');
        assert.equal(await fs.readFile(t + '/brap/d/brap.avi', 'utf8'), 'Skrrap5!');
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
        await fs.ensureFolder(t + '/brap2/');
      });
      afterEach(async () => {
        await fs.remove(t);
      });
      it('should pick up folders', done => {
        let i = 0;
        fs.forEachChildSync(t, file => {
          switch (i) {
            case 0:
              assert.equal(file, 'brap');
              break;
            case 1:
              assert.equal(file, 'brap2');
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
              assert.equal(file, '1.txt');
              break;
            case 1:
              assert.equal(file, '2.txt');
              break;
            case 2:
              assert.equal(file, '3.avi');
              break;
            case 3:
              assert.equal(file, '4.avi');
              break;
            case 4:
              assert.equal(file, '5.avi');
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
        await fs.ensureFolder(t + '/brap2/');
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
                assert.equal(file, 'brap');
                break;
              case 1:
                assert.equal(file, 'brap2');
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
                assert.equal(file, '1.txt');
                break;
              case 1:
                assert.equal(file, '2.txt');
                break;
              case 2:
                assert.equal(file, '3.avi');
                break;
              case 3:
                assert.equal(file, '4.avi');
                break;
              case 4:
                assert.equal(file, '5.avi');
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
                assert.equal(file, '1.txt'); await timeout(50);
                break;
              case 1:
                assert.equal(file, '2.txt'); await timeout(50);
                break;
              case 2:
                assert.equal(file, '3.avi'); await timeout(50);
                break;
              case 3:
                assert.equal(file, '4.avi'); await timeout(50);
                break;
              case 4:
                assert.equal(file, '5.avi'); await timeout(50);
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
                assert.equal(file, 'brap');
                break;
              case 1:
                assert.equal(file, 'brap2');
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
                assert.equal(file, '1.txt');
                break;
              case 1:
                assert.equal(file, '2.txt');
                break;
              case 2:
                assert.equal(file, '3.avi');
                break;
              case 3:
                assert.equal(file, '4.avi');
                break;
              case 4:
                assert.equal(file, '5.avi');
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
                assert.equal(file, '1.txt'); await timeout(50);
                break;
              case 1:
                assert.equal(file, '2.txt'); await timeout(50);
                break;
              case 2:
                assert.equal(file, '3.avi'); await timeout(50);
                break;
              case 3:
                assert.equal(file, '4.avi'); await timeout(50);
                break;
              case 4:
                assert.equal(file, '5.avi'); await timeout(50);
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
                assert.equal(file, 'brap');
                break;
              case 1:
                assert.equal(file, 'brap2');
                break;
              default:
                assert(false, 'should never happen!');
            }
            i++;
          }, err => {
            assert.ok(!err, 'forEachChild threw error');
            done();
          });
        });
        it('should work', done => {
          let i = 0;
          fs.forEachChild(t + '/brap/', file => {
            switch (i) {
              case 0:
                assert.equal(file, '1.txt');
                break;
              case 1:
                assert.equal(file, '2.txt');
                break;
              case 2:
                assert.equal(file, '3.avi');
                break;
              case 3:
                assert.equal(file, '4.avi');
                break;
              case 4:
                assert.equal(file, '5.avi');
                break;
              default:
                assert(false, 'should never happen!');
            }
            i++;
          }, err => {
            assert.ok(!err, 'forEachChild threw error');
            done();
          });
        });
        it('should pick up empty folders', done => {
          fs.forEachChild(t + '/brap2/', () => {
            assert(false, 'should never happen!');
          }, err => {
            assert.ok(!err, 'forEachChild threw error');
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
                assert.equal(file, 'brap');
                break;
              case 1:
                assert.equal(file, 'brap2');
                break;
              default:
                assert(false, 'should never happen!');
            }
            i++;
          }, err => {
            assert.ok(!err, 'forEachChild threw error');
            done();
          });
        });
        it('should work', done => {
          let i = 0;
          fs.forEachChild(t + '/brap/', {}, file => {
            switch (i) {
              case 0:
                assert.equal(file, '1.txt');
                break;
              case 1:
                assert.equal(file, '2.txt');
                break;
              case 2:
                assert.equal(file, '3.avi');
                break;
              case 3:
                assert.equal(file, '4.avi');
                break;
              case 4:
                assert.equal(file, '5.avi');
                break;
              default:
                assert(false, 'should never happen!');
            }
            i++;
          }, err => {
            assert.ok(!err, 'forEachChild threw error');
            done();
          });
        });
        it('should pick up empty folders', done => {
          fs.forEachChild(t + '/brap2/', {}, () => {
            assert(false, 'should never happen!');
          }, err => {
            assert.ok(!err, 'forEachChild threw error');
            done();
          });
        });
      });
    });
    describe('.vacuum', () => {
      beforeEach(async () => {
        await fs.mkdir(t);
        await fs.ensureFolder(t + '/brap/');
        await fs.ensureFolder(t + '/brap2/');
        await fs.ensureFolder(t + '/brap2/a/b/c/d');
        await fs.ensureFolder(t + '/brap2/a/b/d/e');
        await fs.ensureFolder(t + '/brap3/');
        await fs.ensureFolder(t + '/brap3/zz/41');
        await fs.ensureFolder(t + '/brap4/');
        await fs.ensureFolder(t + '/brap5/');
        await fs.ensureFolder(t + '/brap6/');
        await fs.ensureFolder(t + '/brap6/7');
        await fs.ensureFolder(t + '/brap6/8/9');
        await fs.ensureFolder(t + '/brap6/1/2/3');
        await fs.ensureFolder(t + '/brap6/1/4/5');
        await fs.ensureFolder(t + '/brap6/1/4/6');
        await fs.ensureFolder(t + '/brap6/2/4/7');
        await fs.ensureFolder(t + '/brap6/2/4/8/9');
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
          assert(!err, err);

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
      //require('path').resolve('.')
      const path = require('path');
      const paths = [
        path.resolve(t + '/brap6/8/9'),
        path.resolve(t + '/brap6/1/2/3'),
        path.resolve(t + '/brap6/1/4/5'),
        path.resolve(t + '/brap6/1/4/6'),
        path.resolve(t + '/brap6/2/4/7'),
        path.resolve(t + '/brap6/2/4/8/9'),
      ];
      const relativePaths = [
        t + '/brap6/8/9',
        t + '/brap6/1/2/3',
        t + '/brap6/1/4/5',
        t + '/brap6/1/4/6',
        t + '/brap6/2/4/7',
        t + '/brap6/2/4/8/9',
      ];

      beforeEach(async () => {
        await fs.mkdir(t);
        await fs.ensureFolder(t + '/brap/');
        await fs.ensureFolder(t + '/brap2/');
        await fs.ensureFolder(t + '/brap2/a/b/c/d');
        await fs.ensureFolder(t + '/brap2/a/b/d/e');
        await fs.ensureFolder(t + '/brap3/');
        await fs.ensureFolder(t + '/brap3/zz/41');
        await fs.ensureFolder(t + '/brap4/');
        await fs.ensureFolder(t + '/brap5/');
        await fs.ensureFolder(t + '/brap6/');
        await fs.ensureFolder(t + '/brap6/7');
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
          assert.equal(fs.diveSync(t + '/brap').length, 0);
        });
        it('no entries, trailing slash', async () => {
          assert.equal(fs.diveSync(t + '/brap/').length, 0);
        });
        it('normal functionality', async () => {
          assert.deepEqual(fs.diveSync(t).sort(), relativePaths.sort());
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
      it('normal functionality, callback', done => {
        const visited = [];
        fs.dive(t, (err, e) => {
          if (err)
            throw err;
          if (visited.indexOf(e) > -1) {
            throw new Error('Visited contains ' + e + ' twice');
          }
          if (paths.indexOf(e) > -1) {
            visited.push(e);
          } else {
            throw new Error('No ' + e + ' in paths.');
          }
        }, err => {
          if (err) done(err);
          else done();
        });
      });
    });
    describe('createReaddirStream', () => {
      it('should `.createReaddirStream` throw TypeError if `dir` not a string or buffer', done => {
        function fixture() {
          fs.createReaddirStream(123);
        }
        assert.throws(fixture, TypeError);
        assert.throws(fixture, /expect `dir` to be a string or Buffer/);
        done();
      });

      it('should `.createReaddirStream` emit `error` event if fs.readdir fails', done => {
        var stream = fs.createReaddirStream('./not-existing-dir');
        stream.once('error', err => {
          assert.ifError(!err);
          assert.ok(/no such file or directory/.test(err.message));
          done();
        });
      });
    });

    it('.exists Promise', async () => {
    });
    it('.exists Promise', async () => {
    });
  });
});
