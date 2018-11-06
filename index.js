'use strict';
/* globals module, exports, require */
/* exported module, exports, require */
const fs = require('fs');

const vacuum = require('./external/vacuum');
const diveSync = require('./external/diveSync');
const dive = require('./external/dive');
const xml2js = require('xml2js');
const assign = require('./lib/util/assign');

assign(exports, require('./lib'));

exports.exists = (...args) => {
  console.warn('fsxt.exists has been removed, use pathExists instead');
  return exports.pathExists(...args);
};

const ex = new Proxy(exports, {
  set: (obj, prop, value) => {
    if (prop in obj) {
      throw new Error(`Attempted to export existing function '${prop}', this is a library error`);
    } else {
      obj[prop] = value;
    }
    return true;
  }
})

async function asyncFilter(iterable, condition) {
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
  for (let value of iterable) {
    if (await condition(value, null, iterable)) {
      output.push(e);
    }
  }
  return output;
}

function existsHelper(path, resolve, reject) {
  fs.stat(path, err => {
    if (!err) {
      resolve(true); // file exists
    } else if (err.code == 'ENOENT') {
      resolve(false); // file does not exist
    } else {
      reject(err); // unknown error
    }
  });
}

// alias ensureFolder => ensureDir
ex.ensureFolder = exports.ensureDir;
ex.ensureFolderSync = exports.ensureDirSync;

// get a child file of this file
ex.resolve = (path, child) => {
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
};

// map file contents of immediate children
// mapChildren(path, mapper(contents, filename, pathOnly, pathWithFilename) => toContents[, readOptions[, writeOptions]])
ex.mapChildren = async function(path, mapper, readOptions = 'utf8', writeOptions) {
  const children = await asyncFilter((await exports.readdir(path)).map(child => path + '/' + child), async e => !await exports.isDirectory(e));
  for (let e of children) {
    let c;
    const f = await exports.readFile(e, readOptions);
    let ret = mapper(f, e.slice(c = e.lastIndexOf('/')+1), e.slice(0, c), e);
    if (ret instanceof Promise) {
      ret = await ret;
    }
    if (ret != f) {
      await exports.writeFile(e, ret, writeOptions);
    }
  }
  return children;
};

function storeAndExec(arr, f) {
  return (...args) => arr.push(f(...args));
}

// mapStructure(path, mapper(contents, fullPath, stat) => toContents[, readOptions[, writeOptions]])
ex.mapStructure = async function(path, mapper, readOptions = 'utf8', writeOptions) {
  const arr = [];

  await exports.dive(path, {all: true}, storeAndExec(arr, async (file, stat) => {
    const f = await exports.readFile(file, readOptions);
    let ret = mapper(f, file, stat);
    if (ret instanceof Promise) {
      ret = await ret;
    }
    if (ret != f) {
      await exports.writeFile(file, ret, writeOptions);
    }
  }));

  return await Promise.all(arr);
};

// forEachChildSync(function(file)[, options])
ex.forEachChildSync = (path, func, options) => {
  const children = fs.readdirSync(path, options);
  for (let i = 0, len = children.length; i < len; i++) {
    func(children[i]);
  }
};

// forEachChild(path[, options], function(file)[, callback])
ex.forEachChild = (path, o1, o2, o3) => {
  const options = typeof o1 == 'object' ? o1 : null;
  const func = !options ? o1 : o2;
  const callback = !options ? o2 : o3;

  // promise
  if (!callback) {
    return (async resolve => { // TODO does error in this cause unhandled promise rejection? it shouldn't
      const children = await exports.readdir(path, options);
      for (let i = 0, len = children.length; i < len; i++) {
        const ret = func(children[i]);
        if (ret instanceof Promise) {
          await ret;
        }
      }
    })();
  }
  // legacy
  exports.readdir(path, options, (err, children) => {
    if (err) {
      callback(err);
    } else {
      for (let i = 0, len = children.length; i < len; i++) {
        func(children[i]);
      }
      callback();
    }
  });
};

// vacuum(directory, options[, callback])
ex.vacuum = (directory, options, callback) => {
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
};

// dive(directory[, options], action[, complete]);
ex.dive = (directory, o1, o2, o3) => {
  const options = typeof o1 == 'object' ? o1 : null;
  const action = !options ? o1 : o2;
  const complete = !options ? o2 : o3;
  if (!complete) {
    return new Promise((resolve, reject) => {
      let failed = false;
      dive(directory, options || {}, (err, file, stat) => {
        if (err && !failed) {
          failed = true;
          reject();
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
};

// diveSync(dir[, opt])
ex.diveSync = (path, opt) => {
  let files = [];
  function action(err, file) {
    if (err) throw err;
    files.push(file);
  }
  diveSync(path, opt || action, !opt ? action : undefined);
  return files;
};

// readXML(path, function(err, parsedObject))
ex.readXML = function(path, callback) {
  if (!callback) {
    return new Promise((resolve, reject) => {
      exports.readFile(path, 'utf8').then(data => {
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
};

// readXMLSync(path)
ex.readXMLSync = path => {
  const fdata = fs.readFileSync(path, 'utf8');
  let err = null;
  let data;

  xml2js.parseString(fdata, {async: false}, (aerr, adata) => {
    err = aerr;
    data = adata;
  });

  if (err) throw err;
  return data;
};

function readLinesHelper(path, encoding, resolve, reject) {
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
ex.readLines = (path, o1, o2) => {
  const encoding = typeof o1 == 'string' ? o1 : 'utf8';
  const callback = typeof o1 == 'string' ? o2 : o1;
  if (!callback) {
    return new Promise((resolve, reject) => {
      readLinesHelper(path, encoding, resolve, reject);
    });
  }
  // legacy (non-promise)
  readLinesHelper(path, encoding, e => callback(null, e), callback);
};

// readLinesSync(path[, encoding])
ex.readLinesSync = (path, encoding = 'utf8') => {
  const data = fs.readFileSync(path, encoding);
  if (data.indexOf('\r\n') > -1) {
    return data.split('\r\n');
  }
  if (data.indexOf('\n') > -1) {
    return data.split('\n');
  }
  return [data];
};

ex.readText = (path, o1, o2) => {
  const encoding = typeof o1 == 'string' ? o1 : 'utf8';
  const callback = typeof o1 == 'function' ? o1 : o2;
  if (!callback) {
    return exports.readFile(path, encoding);
  }
  // legacy (non-promise)
  fs.readFile(path, encoding, callback);
};

ex.readTextSync = (path, encoding = 'utf8') => {
  return fs.readFileSync(path, encoding);
};

async function isDirectoryHelper(path) {
  return (await exports.stat(path)).isDirectory();
}

// check if file path is directory, from https://github.com/overlookmotel/fs-extra-promise
ex.isDirectory = (path, callback) => {
  if (!callback) {
    return isDirectoryHelper(path);
  }
  // legacy (non-promise)
  fs.stat(path, (err, stats) => {
    if (err) return callback(err);

    callback(null, stats.isDirectory());
  });
};

// sync check if file path is directory
ex.isDirectorySync = function(path) {
  return fs.statSync(path).isDirectory();
};

// for fs-extra backwards compatibility
// so users of fsxt can modify jsonFile.spaces
ex.jsonfile = {
  get spaces() {
    return fs.spaces;
  },
  set spaces(val) {
    fs.spaces = val;
  },
};
