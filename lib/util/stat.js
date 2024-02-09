// @ts-check

import { stat, lstat, statSync, lstatSync } from '@fs/index';
import { fromPromise } from 'universalify';
import { basename, resolve, dirname, parse, sep } from 'path';

/**
 * @typedef {import('fs').PathOrFileDescriptor} PathOrFileDescriptor
 * @typedef {import('fs').PathLike} PathLike
 */

/**
 * @param {PathLike} src
 * @param {PathLike} dest
 * @param {{ dereference?: boolean }} opts
 * @returns
 */
async function getStats(src, dest, opts) {
    /**
     * @type {(file: PathLike) => Promise<import('fs').BigIntStats>}
     */
    const statFunc = opts.dereference
        ? file => stat(file, { bigint: true })
        : file => lstat(file, { bigint: true });
    const [srcStat, destStat] = await Promise.all([
        statFunc(src),
        statFunc(dest).catch(err => {
            if (err.code === 'ENOENT') return null;
            throw err;
        })
    ]);
    return { srcStat, destStat };
}

/**
 * @param {PathLike} src
 * @param {PathLike} dest
 * @param {{ dereference?: boolean }} opts
 * @returns
 */
function getStatsSync(src, dest, opts) {
    let destStat;
    /**
     * @type {(file: PathLike) => import('fs').BigIntStats}
     */
    const statFunc = opts.dereference
        ? file => statSync(file, { bigint: true })
        : file => lstatSync(file, { bigint: true });
    const srcStat = statFunc(src);
    try {
        destStat = statFunc(dest);
    } catch (err) {
        if (/** @type {NodeJS.ErrnoException} */ (err).code === 'ENOENT') return { srcStat, destStat: null };
        throw err;
    }
    return { srcStat, destStat };
}

/**
 * @param {string} src
 * @param {string} dest
 * @param {string} funcName
 * @param {{ dereference?: boolean }} opts
 * @returns {Promise<{ srcStat: import('fs').BigIntStats, destStat: import('fs').BigIntStats | null, isChangingCase?: boolean }>}
 */
async function _checkPaths(src, dest, funcName, opts) {
    const { srcStat, destStat } = await getStats(src, dest, opts);
    if (destStat) {
        if (areIdentical(srcStat, destStat)) {
            const srcBaseName = basename(src);
            const destBaseName = basename(dest);
            if (funcName === 'move' && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
                return { srcStat, destStat, isChangingCase: true };
            }
            throw new Error('Source and destination must not be the same.');
        }
        if (srcStat.isDirectory() && !destStat.isDirectory()) {
            throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
        }
        if (!srcStat.isDirectory() && destStat.isDirectory()) {
            throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`);
        }
    }

    if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
        throw new Error(errMsg(src, dest, funcName));
    }

    return { srcStat, destStat };
}

/**
 * @param {string} src
 * @param {string} dest
 * @param {string} funcName
 * @param {{ dereference?: boolean }} opts
 */
export function checkPathsSync(src, dest, funcName, opts) {
    const { srcStat, destStat } = getStatsSync(src, dest, opts);

    if (destStat) {
        if (areIdentical(srcStat, destStat)) {
            const srcBaseName = basename(src);
            const destBaseName = basename(dest);
            if (funcName === 'move'
                && srcBaseName !== destBaseName
                && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
                return { srcStat, destStat, isChangingCase: true };
            }
            throw new Error('Source and destination must not be the same.');
        }
        if (srcStat.isDirectory() && !destStat.isDirectory()) {
            throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
        }
        if (!srcStat.isDirectory() && destStat.isDirectory()) {
            throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`);
        }
    }

    if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
        throw new Error(errMsg(src, dest, funcName));
    }
    return { srcStat, destStat };
}

// recursively check if dest parent is a subdirectory of src.
// It works for all file types including symlinks since it
// checks the src and dest inodes. It starts from the deepest
// parent and stops once it reaches the src parent or the root path.
/**
 *
 * @param {string} src
 * @param {import('fs').BigIntStats} srcStat
 * @param {string} dest
 * @param {string} funcName
 * @returns {Promise<void>}
 */
async function _checkParentPaths(src, srcStat, dest, funcName) {
    const srcParent = resolve(dirname(src));
    const destParent = resolve(dirname(dest));
    if (destParent === srcParent || destParent === parse(destParent).root) return;

    let destStat;
    try {
        destStat = await stat(destParent, { bigint: true });
    } catch (err) {
        if (/** @type {NodeJS.ErrnoException} */ (err).code === 'ENOENT') return;
        throw err;
    }

    if (areIdentical(srcStat, destStat)) {
        throw new Error(errMsg(src, dest, funcName));
    }

    return checkParentPaths(src, srcStat, destParent, funcName);
}

/**
 *
 * @param {string} src
 * @param {import('fs').BigIntStats} srcStat
 * @param {string} dest
 * @param {string} funcName
 * @returns
 */
export function checkParentPathsSync(src, srcStat, dest, funcName) {
    const srcParent = resolve(dirname(src));
    const destParent = resolve(dirname(dest));
    if (destParent === srcParent || destParent === parse(destParent).root) return;
    let destStat;
    try {
        destStat = statSync(destParent, { bigint: true });
    } catch (err) {
        if (/** @type {NodeJS.ErrnoException} */ (err).code === 'ENOENT') return;
        throw err;
    }
    if (areIdentical(srcStat, destStat)) {
        throw new Error(errMsg(src, dest, funcName));
    }
    return checkParentPathsSync(src, srcStat, destParent, funcName);
}

/**
 *
 * @param {import('fs').BigIntStats} srcStat
 * @param {import('fs').BigIntStats} destStat
 * @returns {boolean}
 */
export function areIdentical(srcStat, destStat) {
    return !!destStat.ino && !!destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev;
}

// return true if dest is a subdir of src, otherwise false.
// It only checks the path strings.
/**
 * @param {string} src
 * @param {string} dest
 * @returns
 */
export function isSrcSubdir(src, dest) {
    const srcArr = resolve(src).split(sep).filter(i => i);
    const destArr = resolve(dest).split(sep).filter(i => i);
    return srcArr.every((cur, i) => destArr[i] === cur);
}

/**
 *
 * @param {string} src
 * @param {string} dest
 * @param {string} funcName
 * @returns
 */
function errMsg(src, dest, funcName) {
    return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`;
}

// checkPaths
export const checkPaths = fromPromise(_checkPaths);
// checkParent
export const checkParentPaths = fromPromise(_checkParentPaths);