// @ts-check

'use strict'

// Delegate to rollup'd module. This file is only used for tests.
import * as ex from '..';
export default Object.assign({
  pathExists: ex.exists,
  pathExistsSync: ex.existsSync,
  readJSON: ex.readJson,
  readJSONSync: ex.readJsonSync,
  writeJSON: ex.writeJson,
  writeJSONSync: ex.writeJsonSync,
  outputJSON: ex.outputJson,

  mkdirp: ex.mkdirs,
  mkdirpSync: ex.mkdirsSync,
  ensureDir: ex.mkdirs,
  ensureDirSync: ex.mkdirsSync,

  // file
  createFile: ex.ensureFile,
  createFileSync: ex.ensureFileSync,
  // link
  createLink: ex.ensureLink,
  createLinkSync: ex.ensureLinkSync,
  // symlink
  createSymlink: ex.ensureSymlink,
  createSymlinkSync: ex.ensureSymlinkSync,
}, ex);