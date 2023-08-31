// @ts-check

'use strict'

// Delegate to rollup'd module. This file is only used for tests.
const ex = require('..');
module.exports = Object.assign({
  pathExists: ex.exists,
  pathExistsSync: ex.existsSync,
  readJSON: ex.readJson,
  readJSONSync: ex.readJsonSync,

  // file
  createFile: ex.ensureFile,
  createFileSync: ex.ensureFileSync,
  // link
  createLink: ex.ensureLink,
  createLinkSync: ex.ensureLinkSync,
  // symlink
  createSymlink: ex.ensureSymlink,
  createSymlinkSync: ex.ensureSymlinkSync,
}, require('..'));