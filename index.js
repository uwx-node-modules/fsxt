'use strict';
/* globals module, exports, require */
/* exported module, exports, require */
const fs = require('fs');

const vacuum = require('./external/vacuum');
const diveSync = require('./external/diveSync');
const dive = require('./external/dive');
const xml2js = require('xml2js');

// converts an object's properties into an ES class' static members
function asStatic(object) {
  return Object.assign(class {}, object);
}

module.exports = class FSXT extends asStatic(require('./lib')) {
  // for fs-extra backwards compatibility
  // so users of fsxt can modify jsonFile.spaces
  static jsonfile = {
    get spaces() {
      return fs.spaces;
    },
    set spaces(val) {
      fs.spaces = val;
    },
  };

  // alias ensureFolder => ensureDir
  static ensureFolder = FSXT.ensureDir;
  static ensureFolderSync = FSXT.ensureDirSync;

  static exists(...args) {
    console.warn('fsxt.exists has been removed, use pathExists instead');
    return FSXT.pathExists(...args);
  }

  // get a child file of this file
  static resolve(path, child) {
    if (path.endsWith('/') || path.endsWith('\\')) {
      return path + child;
    }
    if (path.indexOf('/') > -1) {
      return path + '/' + child;
    }
    if (path.indexOf('\\') > -1) {
      return path + '\\' + child;
    }
    return path + '/' + child;
  }

  static async _asyncFilter(iterable, condition) {
    const output = [];
    let e;
    if ('length' in iterable) {
      for (let i = 0; i < iterable.length; i++) {
        e = iterable[i];
        if (await condition(e, i, iterable)) {
          output.push(e);
        }
      }
    }
    for (const value of iterable) {
      if (await condition(value, null, iterable)) {
        output.push(e);
      }
    }
    return output;
  }

  // map file contents of immediate children
  // mapChildren(path, mapper(contents, filename, pathOnly, pathWithFilename) => toContents[, readOptions[, writeOptions]])
  static async mapChildren(path, mapper, readOptions = 'utf8', writeOptions) {
    const children = await FSXT._asyncFilter((await FSXT.readdir(path)).map(child => path + '/' + child), async e => !await FSXT.isDirectory(e));
    for (const e of children) {
      const contents = await FSXT.readFile(e, readOptions);
      const filename = e.slice(e.lastIndexOf('/')+1);
      let result = mapper(contents, filename, path, e);
      if (result instanceof Promise) {
        result = await result;
      }
      if (result != contents) {
        await FSXT.writeFile(e, result, writeOptions);
      }
    }
    return children;
  }

  static async _mapStructureProcessFile(file, stat, mapper, readOptions, writeOptions) {
    const contents = await FSXT.readFile(file, readOptions);
    let result = mapper(contents, file, stat);
    if (result instanceof Promise) {
      result = await result;
    }
    if (result != contents) {
      await FSXT.writeFile(file, result, writeOptions);
    }
  }

  // mapStructure(path, mapper(contents, fullPath, stat) => toContents[, readOptions[, writeOptions]])
  static async mapStructure(path, mapper, readOptions = 'utf8', writeOptions) {
    const promiseArr = [];
    const results = [];

    await FSXT.dive(path, {all: true}, (file, stat) => {
      promiseArr.push(FSXT._mapStructureProcessFile(file, stat, mapper, readOptions, writeOptions));
      results.push({ file, stat });
    });

    await Promise.all(promiseArr);

    return results;
  }

  // mapStructureOrdered(path, mapper(contents, fullPath, stat) => toContents[, readOptions[, writeOptions]])
  static async mapStructureOrdered(path, mapper, readOptions = 'utf8', writeOptions) {
    const entries = [];

    await FSXT.dive(path, {all: true}, (file, stat) => {
      entries.push({ file, stat });
    });

    for (const { file, stat } of entries) {
      await FSXT._mapStructureProcessFile(file, stat, mapper, readOptions, writeOptions);
    }

    return entries;
  }

  // forEachChild(path[, options], function(file)[, callback])
  static forEachChild(path, o1, o2, o3) {
    const options = typeof o1 == 'object' ? o1 : null;
    const func = !options ? o1 : o2;
    const callback = !options ? o2 : o3;

    // promise
    if (!callback) {
      return (async () => { // TODO does error in this cause unhandled promise rejection? it shouldn't
        const children = await FSXT.readdir(path, options);
        for (let i = 0, len = children.length; i < len; i++) {
          const ret = func(children[i]);
          if (ret instanceof Promise) {
            await ret;
          }
        }
      })();
    }
    // legacy
    FSXT.readdir(path, options, (err, children) => {
      if (err) {
        callback(err);
      } else {
        for (let i = 0, len = children.length; i < len; i++) {
          func(children[i]);
        }
        callback();
      }
    });
  }

  // forEachChildSync(function(file)[, options])
  static forEachChildSync(path, func, options) {
    const children = fs.readdirSync(path, options);
    for (let i = 0, len = children.length; i < len; i++) {
      func(children[i]);
    }
  }

  // vacuum(directory, options[, callback])
  static vacuum(directory, options, callback) {
    if (!callback) {
      return new Promise((resolve, reject) => {
        vacuum(directory, options, err => {
          if (err) reject(err);
          else resolve();
        });
      });
    }
    // legacy (non-promise)
    return vacuum(directory, options, callback);
  }

  // dive(directory[, options], action[, complete]);
  static dive(directory, o1, o2, o3) {
    const options = typeof o1 == 'object' ? o1 : null;
    const action = !options ? o1 : o2;
    const complete = !options ? o2 : o3;
    if (!complete) {
      return new Promise((resolve, reject) => {
        let failed = false;
        dive(directory, options || {}, (err, file, stat) => {
          if (err && !failed) {
            failed = true;
            reject(err);
          } else {
            action(file, stat);
          }
        }, () => {
          if (!failed) resolve();
        });
      });
    }
    // legacy form (no promise)
    return dive(directory, options || {}, action, complete);
  }

  // diveSync(dir[, opt])
  static diveSync(path, opt) {
    const files = [];
    function action(err, file) {
      if (err) throw err;
      files.push(file);
    }
    diveSync(path, opt || action, !opt ? action : undefined);
    return files;
  }

  // readXML(path, function(err, parsedObject))
  static readXML(path, callback) {
    if (!callback) {
      return new Promise((resolve, reject) => {
        FSXT.readFile(path, 'utf8').then(data => {
          xml2js.parseString(data, {async: true}, (err, parsedObject) => {
            if (err) reject(err);
            else resolve(parsedObject);
          });
        }).catch(reject);
      });
    }
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        callback(err);
      } else {
        xml2js.parseString(data, {async: true}, callback);
      }
    });
  }

  // readXMLSync(path)
  static readXMLSync(path) {
    const fdata = fs.readFileSync(path, 'utf8');
    let err = null;
    let data;

    xml2js.parseString(fdata, {async: false}, (aerr, adata) => {
      err = aerr;
      data = adata;
    });

    if (err) throw err;
    return data;
  }

  static _readLinesHelper(path, encoding, resolve, reject) {
    fs.readFile(path, encoding, (err, data) => {
      if (err) {
        reject(err);
      } else if (data.indexOf('\r\n') > -1) {
        resolve(data.split('\r\n'));
      } else if (data.indexOf('\n') > -1) {
        resolve(data.split('\n'));
      } else resolve([data]);
    });
  }

  // readLines(path[, encoding][, callback])
  static readLines(path, o1, o2) {
    const encoding = typeof o1 == 'string' ? o1 : 'utf8';
    const callback = typeof o1 == 'string' ? o2 : o1;
    if (!callback) {
      return new Promise((resolve, reject) => {
        FSXT._readLinesHelper(path, encoding, resolve, reject);
      });
    }
    // legacy (non-promise)
    FSXT._readLinesHelper(path, encoding, e => callback(null, e), callback);
  }

  // readLinesSync(path[, encoding])
  static readLinesSync(path, encoding = 'utf8') {
    const data = fs.readFileSync(path, encoding);
    if (data.indexOf('\r\n') > -1) {
      return data.split('\r\n');
    }
    if (data.indexOf('\n') > -1) {
      return data.split('\n');
    }
    return [data];
  }

  static readText(path, callback) {
    if (!callback) {
      return FSXT.readFile(path, 'utf8');
    }
    // legacy (non-promise)
    fs.readFile(path, 'utf8', callback);
  }

  static readTextSync(path) {
    return fs.readFileSync(path, 'utf8');
  }

  static async _isDirectoryHelper(path) {
    return (await FSXT.stat(path)).isDirectory();
  }

  // check if file path is directory, from https://github.com/overlookmotel/fs-extra-promise
  static isDirectory(path, callback) {
    if (!callback) {
      return FSXT._isDirectoryHelper(path);
    }
    // legacy (non-promise)
    fs.stat(path, (err, stats) => {
      if (err) return callback(err);

      callback(null, stats.isDirectory());
    });
  }

  // sync check if file path is directory
  static isDirectorySync(path) {
    return fs.statSync(path).isDirectory();
  }

  // TODO document
  static isSymlink(file, callback) {
    return callback
      ? fs.lstat(file, (err, stats) => err ? callback(err) : callback(null, stats.isSymbolicLink()))
      : fs.lstat(file).then(stats => stats.isSymbolicLink());
  }
};