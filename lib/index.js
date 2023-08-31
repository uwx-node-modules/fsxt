// @ts-check

'use strict'

// Delegate to rollup'd module. This file is only used for tests.
module.exports = Object.assign({}, require('..'));
Object.assign(module.exports, {
  pathExists: module.exports.exists,
  pathExistsSync: module.exports.existsSync,
  readJSON: module.exports.readJson,
  readJSONSync: module.exports.readJsonSync,
});