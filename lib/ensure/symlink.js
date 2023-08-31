'use strict'

import { universalify as u } from '@fs/universalify'
import { dirname } from 'path'
import { lstat, stat, symlink, lstatSync, statSync, existsSync, symlinkSync } from '@fs/index'
import { mkdirs, mkdirsSync } from '../mkdirs'

import { symlinkPaths, symlinkPathsSync } from './symlink-paths'

import { symlinkType, symlinkTypeSync } from './symlink-type'

import { exists as pathExists } from '@fs/exists'

import { areIdentical } from '../util/stat'

export const createSymlink = u(function createSymlink (srcpath, dstpath, type, callback) {
  callback = (typeof type === 'function') ? type : callback
  type = (typeof type === 'function') ? false : type

  lstat(dstpath, (err, stats) => {
    if (!err && stats.isSymbolicLink()) {
      Promise.all([
        stat(srcpath),
        stat(dstpath)
      ]).then(([srcStat, dstStat]) => {
        if (areIdentical(srcStat, dstStat)) return callback(null)
        _createSymlink(srcpath, dstpath, type, callback)
      })
    } else _createSymlink(srcpath, dstpath, type, callback)
  })
});

function _createSymlink (srcpath, dstpath, type, callback) {
  symlinkPaths(srcpath, dstpath, (err, relative) => {
    if (err) return callback(err)
    srcpath = relative.toDst
    symlinkType(relative.toCwd, type, (err, type) => {
      if (err) return callback(err)
      const dir = dirname(dstpath)
      pathExists(dir, (err, dirExists) => {
        if (err) return callback(err)
        if (dirExists) return symlink(srcpath, dstpath, type, callback)
        mkdirs(dir, err => {
          if (err) return callback(err)
          symlink(srcpath, dstpath, type, callback)
        })
      })
    })
  })
}

export function createSymlinkSync (srcpath, dstpath, type) {
  let stats
  try {
    stats = lstatSync(dstpath)
  } catch {}
  if (stats && stats.isSymbolicLink()) {
    const srcStat = statSync(srcpath)
    const dstStat = statSync(dstpath)
    if (areIdentical(srcStat, dstStat)) return
  }

  const relative = symlinkPathsSync(srcpath, dstpath)
  srcpath = relative.toDst
  type = symlinkTypeSync(relative.toCwd, type)
  const dir = dirname(dstpath)
  const exists = existsSync(dir)
  if (exists) return symlinkSync(srcpath, dstpath, type)
  mkdirsSync(dir)
  return symlinkSync(srcpath, dstpath, type)
}

