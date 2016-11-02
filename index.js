'use strict';
/* globals module, exports, require */
/* exported module, exports, require */
const fs = require('fs');

const vacuum = require("fs-vacuum");
const diveSync = require("diveSync");
const dive = require("dive");
const crs = require('create-readdir-stream');
const xml2js = require('xml2js');

const copy = require('./lib/copy');
const copySync = require('./lib/copy-sync');
const empty = require('./lib/empty');
const ensure = require('./lib/ensure');
const json = require('./lib/json');
const mkdirs = require('./lib/mkdirs');
const move = require('./lib/move');
const output = require('./lib/output');
const remove = require('./lib/remove');
const walk = require('./lib/walk');

exports.access = fs.access;
exports.accessSync = fs.accessSync;
exports.appendFile = fs.appendFile;
exports.appendFileSync = fs.appendFileSync;
exports.chmod = fs.chmod;
exports.chmodSync = fs.chmodSync;
exports.chown = fs.chown;
exports.chownSync = fs.chownSync;
exports.close = fs.close;
exports.closeSync = fs.closeSync;
exports.createReadStream = fs.createReadStream;
exports.createWriteStream = fs.createWriteStream;
exports.exists = fs.exists;
exports.existsSync = fs.existsSync;
exports.fchmod = fs.fchmod;
exports.fchmodSync = fs.fchmodSync;
exports.fchown = fs.fchown;
exports.fchownSync = fs.fchownSync;
exports.fdatasync = fs.fdatasync;
exports.fdatasyncSync = fs.fdatasyncSync;
exports.fstat = fs.fstat;
exports.fstatSync = fs.fstatSync;
exports.fsync = fs.fsync;
exports.fsyncSync = fs.fsyncSync;
exports.ftruncate = fs.ftruncate;
exports.ftruncateSync = fs.ftruncateSync;
exports.futimes = fs.futimes;
exports.futimesSync = fs.futimesSync;
exports.lchmod = fs.lchmod         || (() => { throw new Error('lchmod is unsupported on this OS.'); });
exports.lchmodSync = fs.lchmodSync || (() => { throw new Error('lchmodSync is unsupported on this OS.'); });
exports.lchown = fs.lchown         || (() => { throw new Error('lchown is unsupported on this OS.'); });
exports.lchownSync = fs.lchownSync || (() => { throw new Error('lchownSync is unsupported on this OS.'); });
exports.link = fs.link;
exports.linkSync = fs.linkSync;
exports.lstat = fs.lstat;
exports.lstatSync = fs.lstatSync;
exports.mkdir = fs.mkdir;
exports.mkdirSync = fs.mkdirSync;
exports.mkdtemp = fs.mkdtemp;
exports.mkdtempSync = fs.mkdtempSync;
exports.open = fs.open;
exports.openSync = fs.openSync;
exports.read = fs.read;
exports.readdir = fs.readdir;
exports.readdirSync = fs.readdirSync;
exports.readFile = fs.readFile;
exports.readFileSync = fs.readFileSync;
exports.readlink = fs.readlink;
exports.readlinkSync = fs.readlinkSync;
exports.readSync = fs.readSync;
exports.realpath = fs.realpath;
exports.realpathSync = fs.realpathSync;
exports.rename = fs.rename;
exports.renameSync = fs.renameSync;
exports.rmdir = fs.rmdir;
exports.rmdirSync = fs.rmdirSync;
exports.stat = fs.stat;
exports.statSync = fs.statSync;
exports.symlink = fs.symlink;
exports.symlinkSync = fs.symlinkSync;
exports.truncate = fs.truncate;
exports.truncateSync = fs.truncateSync;
exports.unlink = fs.unlink;
exports.unlinkSync = fs.unlinkSync;
exports.unwatchFile = fs.unwatchFile;
exports.utimes = fs.utimes;
exports.utimesSync = fs.utimesSync;
exports.watch = fs.watch;
exports.watchFile = fs.watchFile;
exports.write = fs.write;
exports.writeFile = fs.writeFile;
exports.writeFileSync = fs.writeFileSync;
exports.writeSync = fs.writeSync;

exports.copy = copy.copy;
exports.copySync = copySync.copySync;
exports.emptyDir = empty.emptyDir;
exports.emptyDirSync = empty.emptyDirSync;

exports.createFile = ensure.createFile;
exports.createFileSync = ensure.createFileSync;
exports.ensureFile = ensure.ensureFile;
exports.ensureFileSync = ensure.ensureFileSync;
exports.createLink = ensure.createLink;
exports.createLinkSync = ensure.createLinkSync;
exports.ensureLink = ensure.ensureLink;
exports.ensureLinkSync = ensure.ensureLinkSync;
exports.createSymlink = ensure.createSymlink;
exports.createSymlinkSync = ensure.createSymlinkSync;
exports.ensureSymlink = ensure.ensureSymlink;
exports.ensureSymlinkSync = ensure.ensureSymlinkSync;

exports.mkdirs = mkdirs.mkdirs;
exports.mkdirsSync = mkdirs.mkdirsSync;
exports.move = move.move;
exports.outputFile = output.outputFile;
exports.outputFileSync = output.outputFileSync;
exports.outputJson = json.outputJson;
exports.outputJsonSync = json.outputJsonSync;
exports.readJson = json.readJson;
exports.readJsonSync = json.readJsonSync;
exports.writeJson = json.writeJson;
exports.writeJsonSync = json.writeJsonSync;
exports.remove = remove.remove;
exports.removeSync = remove.removeSync;
exports.walk = walk.walk;

// async fs exists
exports.exists = function(path, callback) {
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
      xml2js.parseString(data, { async: true }, callback); 
    }
  });
};

// readXMLSync()
exports.readXMLSync = function(path) {
  const fdata = fs.readFileSync(path, 'utf8');
  let err = null;
  let data;

  xml2js.parseString(fdata, { async: false }, (aerr, adata) => {
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


// maintain backwards compatibility for awhile
const jsonfile = {};
Object.defineProperty(jsonfile, 'spaces', {
  get: function () {
    return fs.spaces; // found in ./json
  },
  set: function (val) {
    fs.spaces = val;
  }
});

exports.jsonfile = jsonfile; // so users of fs-extra can modify jsonFile.spaces
