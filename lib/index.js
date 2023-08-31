'use strict'

// Delegate to rollup'd module. This file is only used for tests.
const ex = require('..');
module.exports = Object.assign({
  pathExists: module.exports.exists,
  pathExistsSync: module.exports.existsSync,
  readJSON: module.exports.readJson,
  readJSONSync: module.exports.readJsonSync,

  // file
  createFile: module.exports.ensureFile,
  createFileSync: module.exports.ensureFileSync,
  // link
  createLink: module.exports.ensureLink,
  createLinkSync: module.exports.ensureLinkSync,
  // symlink
  createSymlink: module.exports.ensureSymlink,
  createSymlinkSync: module.exports.ensureSymlinkSync,
}, ex);