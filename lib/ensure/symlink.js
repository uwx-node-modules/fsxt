import { fromPromise } from 'universalify';
import { dirname } from 'path';
import { lstat, stat, symlink, lstatSync, statSync, existsSync, symlinkSync } from '@fs/index';
import { mkdirs, mkdirsSync } from '../mkdirs';

import { symlinkPaths, symlinkPathsSync } from './symlink-paths';

import { symlinkType, symlinkTypeSync } from './symlink-type';

import { exists as pathExists } from '@fs/exists';

import { areIdentical } from '../util/stat';

async function _createSymlink(srcpath, dstpath, type) {
    let stats;
    try {
        stats = await lstat(dstpath);
    } catch { }

    if (stats && stats.isSymbolicLink()) {
        const [srcStat, dstStat] = await Promise.all([
            stat(srcpath),
            stat(dstpath)
        ]);

        if (areIdentical(srcStat, dstStat)) return;
    }

    const relative = await symlinkPaths(srcpath, dstpath);
    srcpath = relative.toDst;
    const toType = await symlinkType(relative.toCwd, type);
    const dir = dirname(dstpath);

    if (!(await pathExists(dir))) {
        await mkdirs(dir);
    }

    return symlink(srcpath, dstpath, toType);
}

export const createSymlink = fromPromise(_createSymlink);

export function createSymlinkSync(srcpath, dstpath, type) {
    let stats;
    try {
        stats = lstatSync(dstpath);
    } catch { }
    if (stats && stats.isSymbolicLink()) {
        const srcStat = statSync(srcpath);
        const dstStat = statSync(dstpath);
        if (areIdentical(srcStat, dstStat)) return;
    }
    const relative = symlinkPathsSync(srcpath, dstpath);
    srcpath = relative.toDst;
    type = symlinkTypeSync(relative.toCwd, type);
    const dir = dirname(dstpath);
    const exists = existsSync(dir);
    if (exists) return symlinkSync(srcpath, dstpath, type);
    mkdirsSync(dir);
    return symlinkSync(srcpath, dstpath, type);
}

