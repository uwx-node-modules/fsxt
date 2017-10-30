'use strict';
/* globals module, exports, require */
/* exported module, exports, require */
const fs = require('fs');

const vacuum = require('fs-vacuum');
const diveSync = require('diveSync');
const dive = require('dive');
const crs = require('create-readdir-stream');
const xml2js = require('xml2js');
const assign = require('./lib/util/assign');

assign(exports, require('./lib'));

// async fs exists
exports.exists = function(path, callback) {
  if (!callback) {
    return new Promise((resolve, reject) => {
      fs.stat(path, function(err) {
        if (!err) {
          resolve(true); // file exists
        } else if (err.code == 'ENOENT') {
          resolve(false); // file does not exist
        } else {
          reject(err); // unknown error
        }
      });
    });
  }
  // legacy (not promise)
  fs.stat(path, function(err) {
    if (err === null) {
      callback(true); // file exists
    } else if (err.code == 'ENOENT') {
      callback(false); // file does not exist
    } else {
      callback(err); // unknown error
    }
  });
};

// get a child file of this file
exports.resolve = function(path, child) {
  const stat = fs.lstatSync(path);
  if (stat.isDirectory()) {
    let f;
    if (path.endsWith('/') || path.endsWith('\\')) {
      f = path + child;
    } else if (path.indexOf('/') > -1) {
      f = path + '/' + child;
    } else if (path.indexOf('\\') > -1) {
      f = path + '\\' + child;
    } else {
      f = path + '/' + child;
    }
    return f;
  }
};

// forEachChildSync(function(file), options])
exports.forEachChildSync = function(path, func, options) {
  const children = fs.readdirSync(path, options);
  for (let i = 0, len = children.length; i < len; i++) {
    func(children[i]);
  }
};

// forEachChild(function(error, file)[, options], callback)
exports.forEachChild = function(path, func, options) {
  fs.readdir(path, options, function(err, children) {
    if (err) {
      func(err);
    } else {
      for (let i = 0, len = children.length; i < len; i++) {
        func(null, children[i]);
      }
      func(null);
    }
  });
};

// vacuum(directory, options, callback)
exports.vacuum = vacuum;

// dive(directory[, options], action[, complete]);
exports.dive = dive;

// diveSync(dir[, opt], action)
exports.diveSync = function(path, opt) {
  let files = [];
  function action(err, file) {
    if (err) throw err;
    files.push(file);
  }
  diveSync(path, opt || action, !opt ? action : undefined);
  return files;
};

// createReaddirStream(dir[, options])
exports.createReaddirStream = crs.createReaddirStream;

// readXML(function(err, parsedObject))
exports.readXML = function(path, callback) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      callback(err);
    } else {
      xml2js.parseString(data, {async: true}, callback);
    }
  });
};

// readXMLSync()
exports.readXMLSync = function(path) {
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

// readLinesSync([encoding])
exports.readLinesSync = function(path, encoding = 'utf8') {
  const data = fs.readFileSync(path, encoding);
  if (data.indexOf('\r\n') > -1) {
    return data.split('\r\n');
  } else if (data.indexOf('\n') > -1) {
    return data.split('\n');
  } else {
    return [data];
  }
};

exports.readSync = function(path, encoding = 'utf8') {
  return fs.readFileSync(path, encoding);
};

// check if file path is directory, from https://github.com/overlookmotel/fs-extra-promise
exports.isDirectory = function(path, callback) {
  fs.stat(path, function(err, stats) {
    if (err) return callback(err);

    callback(null, stats.isDirectory());
  });
};

// sync check if file path is directory
exports.isDirectorySync = function(path) {
  return fs.statSync(path).isDirectory();
};

// maintain backwards compatibility for awhile
const jsonfile = {};
Object.defineProperty(jsonfile, 'spaces', {
  get: function() {
    return fs.spaces; // found in ./json
  },
  set: function(val) {
    fs.spaces = val;
  },
});

exports.jsonfile = jsonfile; // so users of fs-extra can modify jsonFile.spaces
