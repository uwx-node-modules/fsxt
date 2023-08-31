'use strict'

import { universalify as u } from '@fs/universalify'
import { dirname } from 'path'
import { writeFile, stat, readdir, statSync, readdirSync, writeFileSync } from 'graceful-fs'
import { mkdirs, mkdirsSync } from '../mkdirs'

export const createFile = u(function createFile (file, callback) {
  function makeFile () {
    writeFile(file, '', err => {
      if (err) return callback(err)
      callback()
    })
  }

  stat(file, (err, stats) => { // eslint-disable-line handle-callback-err
    if (!err && stats.isFile()) return callback()
    const dir = dirname(file)
    stat(dir, (err, stats) => {
      if (err) {
        // if the directory doesn't exist, make it
        if (err.code === 'ENOENT') {
          return mkdirs(dir, err => {
            if (err) return callback(err)
            makeFile()
          })
        }
        return callback(err)
      }

      if (stats.isDirectory()) makeFile()
      else {
        // parent is not a directory
        // This is just to cause an internal ENOTDIR error to be thrown
        readdir(dir, err => {
          if (err) return callback(err)
        })
      }
    })
  })
});

export function createFileSync (file) {
  let stats
  try {
    stats = statSync(file)
  } catch {}
  if (stats && stats.isFile()) return

  const dir = dirname(file)
  try {
    if (!statSync(dir).isDirectory()) {
      // parent is not a directory
      // This is just to cause an internal ENOTDIR error to be thrown
      readdirSync(dir)
    }
  } catch (err) {
    // If the stat call above failed because the directory doesn't exist, create it
    if (err && err.code === 'ENOENT') mkdirsSync(dir)
    else throw err
  }

  writeFileSync(file, '')
}
