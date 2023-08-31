'use strict'
import { fromPromise as u } from 'universalify'
import { makeDir as _makeDir } from './make-dir'
export { makeDirSync as mkdirsSync } from './make-dir'
export const mkdirs = u(_makeDir)
