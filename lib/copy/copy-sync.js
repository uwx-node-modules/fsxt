// @ts-check

import { existsSync, statSync as _statSync, lstatSync, unlinkSync, copyFileSync, chmodSync, mkdirSync, readdirSync, readlinkSync, symlinkSync } from 'graceful-fs';
import { dirname, join, resolve } from 'path';
import { mkdirsSync } from '../mkdirs';
import { utimesMillisSync } from '../util/utimes';
import { checkPathsSync, checkParentPathsSync, isSrcSubdir } from '../util/stat';

/**
 * @param {string} src
 * @param {string} dest
 * @param {import('fs-extra').CopyOptions & { clobber?: boolean }} opts
 */
function copySync(src, dest, opts) {
    if (typeof opts === 'function') {
        opts = { filter: opts };
    }

    opts = opts || {};
    opts.clobber = 'clobber' in opts ? !!opts.clobber : true; // default to true for now
    opts.overwrite = 'overwrite' in opts ? !!opts.overwrite : opts.clobber; // overwrite falls back to clobber

    // Warn about using preserveTimestamps on 32-bit node
    if (opts.preserveTimestamps && process.arch === 'ia32') {
        process.emitWarning(
            'Using the preserveTimestamps option in 32-bit node is not recommended;\n\n'
            + '\tsee https://github.com/jprichardson/node-fs-extra/issues/269',
            'Warning', 'fs-extra-WARN0002'
        );
    }

    const { srcStat, destStat } = checkPathsSync(src, dest, 'copy', opts);
    checkParentPathsSync(src, srcStat, dest, 'copy');
    if (opts.filter && !opts.filter(src, dest)) return;
    const destParent = dirname(dest);
    if (!existsSync(destParent)) mkdirsSync(destParent);
    return getStats(destStat, src, dest, opts);
}

/**
 * @param {import("fs").BigIntStats | null} destStat
 * @param {string} src
 * @param {string} dest
 * @param {import("fs-extra").CopyOptions & { clobber?: boolean | undefined; }} opts
 */
function getStats(destStat, src, dest, opts) {
    const statSync = opts.dereference ? _statSync : lstatSync;
    const srcStat = statSync(src);

    if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts);
    else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts);
    else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts);
    else if (srcStat.isSocket()) throw new Error(`Cannot copy a socket file: ${src}`);
    else if (srcStat.isFIFO()) throw new Error(`Cannot copy a FIFO pipe: ${src}`);
    throw new Error(`Unknown file: ${src}`);
}

/**
 * @param {import("fs").Stats} srcStat
 * @param {import("fs").BigIntStats | null} destStat
 * @param {import("fs").PathLike} src
 * @param {string} dest
 * @param {import("fs-extra").CopyOptions & { clobber?: boolean | undefined; }} opts
 */
function onFile(srcStat, destStat, src, dest, opts) {
    if (!destStat) return copyFile(srcStat, src, dest, opts);
    return mayCopyFile(srcStat, src, dest, opts);
}

/**
 * @param {any} srcStat
 * @param {any} src
 * @param {import("fs").PathLike} dest
 * @param {import("fs-extra").CopyOptions & { clobber?: boolean | undefined; }} opts
 */
function mayCopyFile(srcStat, src, dest, opts) {
    if (opts.overwrite) {
        unlinkSync(dest);
        return copyFile(srcStat, src, dest, opts);
    } else if (opts.errorOnExist) {
        throw new Error(`'${dest}' already exists`);
    }
}

/**
 * @param {{ mode: any; }} srcStat
 * @param {import("fs").PathLike} src
 * @param {import("fs").PathLike} dest
 * @param {{ preserveTimestamps?: boolean; }} opts
 */
function copyFile(srcStat, src, dest, opts) {
    copyFileSync(src, dest);
    if (opts.preserveTimestamps) handleTimestamps(srcStat.mode, src, dest);
    return setDestMode(dest, srcStat.mode);
}

/**
 * @param {any} srcMode
 * @param {any} src
 * @param {any} dest
 */
function handleTimestamps(srcMode, src, dest) {
    // Make sure the file is writable before setting the timestamp
    // otherwise open fails with EPERM when invoked with 'r+'
    // (through utimes call)
    if (fileIsNotWritable(srcMode)) makeFileWritable(dest, srcMode);
    return setDestTimestamps(src, dest);
}

/**
 * @param {number} srcMode
 */
function fileIsNotWritable(srcMode) {
    return (srcMode & 0o200) === 0;
}

/**
 * @param {any} dest
 * @param {number} srcMode
 */
function makeFileWritable(dest, srcMode) {
    return setDestMode(dest, srcMode | 0o200);
}

/**
 * @param {import("fs").PathLike} dest
 * @param {import("fs").Mode} srcMode
 */
function setDestMode(dest, srcMode) {
    return chmodSync(dest, srcMode);
}

/**
 * @param {import("fs").PathLike} src
 * @param {import("fs").PathLike} dest
 */
function setDestTimestamps(src, dest) {
    // The initial srcStat.atime cannot be trusted
    // because it is modified by the read(2) system call
    // (See https://nodejs.org/api/fs.html#fs_stat_time_values)
    const updatedSrcStat = _statSync(src);
    return utimesMillisSync(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
}

/**
 * @param {import("fs").Stats} srcStat
 * @param {import("fs").BigIntStats | null} destStat
 * @param {string} src
 * @param {string} dest
 * @param {import("fs-extra").CopyOptions & { clobber?: boolean | undefined; }} opts
 */
function onDir(srcStat, destStat, src, dest, opts) {
    if (!destStat) return mkDirAndCopy(srcStat.mode, src, dest, opts);
    return copyDir(src, dest, opts);
}

/**
 * @param {import("fs").Mode} srcMode
 * @param {string} src
 * @param {string} dest
 * @param {import("fs-extra").CopyOptions & { clobber?: boolean | undefined; }} opts
 */
function mkDirAndCopy(srcMode, src, dest, opts) {
    mkdirSync(dest);
    copyDir(src, dest, opts);
    return setDestMode(dest, srcMode);
}

/**
 * @param {string} src
 * @param {string} dest
 * @param {import("fs-extra").CopyOptions & { clobber?: boolean | undefined; }} opts
 */
function copyDir(src, dest, opts) {
    readdirSync(src).forEach(item => copyDirItem(item, src, dest, opts));
}

/**
 * @param {string} item
 * @param {string} src
 * @param {string} dest
 * @param {import("fs-extra").CopyOptions & { clobber?: boolean | undefined; }} opts
 */
function copyDirItem(item, src, dest, opts) {
    const srcItem = join(src, item);
    const destItem = join(dest, item);
    if (opts.filter && !opts.filter(srcItem, destItem)) return;
    const { destStat } = checkPathsSync(srcItem, destItem, 'copy', opts);
    return getStats(destStat, srcItem, destItem, opts);
}

/**
 * @param {import("fs").BigIntStats | null} destStat
 * @param {import("fs").PathLike} src
 * @param {import("fs").PathLike} dest
 * @param {import("fs-extra").CopyOptions & { clobber?: boolean | undefined; }} opts
 */
function onLink(destStat, src, dest, opts) {
    let resolvedSrc = readlinkSync(src);
    if (opts.dereference) {
        resolvedSrc = resolve(process.cwd(), resolvedSrc);
    }

    if (!destStat) {
        return symlinkSync(resolvedSrc, dest);
    } else {
        let resolvedDest;
        try {
            resolvedDest = readlinkSync(dest);
        } catch (err) {
            // dest exists and is a regular file or directory,
            // Windows may throw UNKNOWN error. If dest already exists,
            // fs throws error anyway, so no need to guard against it here.
            if (/** @type {NodeJS.ErrnoException} */ (err).code === 'EINVAL' || /** @type {NodeJS.ErrnoException} */ (err).code === 'UNKNOWN') return symlinkSync(resolvedSrc, dest);
            throw err;
        }
        if (opts.dereference) {
            resolvedDest = resolve(process.cwd(), resolvedDest);
        }
        if (isSrcSubdir(resolvedSrc, resolvedDest)) {
            throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`);
        }

        // prevent copy if src is a subdir of dest since unlinking
        // dest in this case would result in removing src contents
        // and therefore a broken symlink would be created.
        if (isSrcSubdir(resolvedDest, resolvedSrc)) {
            throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`);
        }
        return copyLink(resolvedSrc, dest);
    }
}

/**
 * @param {import("fs").PathLike} resolvedSrc
 * @param {import("fs").PathLike} dest
 */
function copyLink(resolvedSrc, dest) {
    unlinkSync(dest);
    return symlinkSync(resolvedSrc, dest);
}

export default copySync;
