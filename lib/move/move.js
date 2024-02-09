// @ts-check

import { rename as _rename } from '@fs/index';
import { dirname, parse } from 'path';
import { copy } from '../copy';
import { remove } from '../remove';
import { mkdirs } from '../mkdirs';
import { exists as pathExists } from '@fs/exists';
import * as stat from '../util/stat';
import { fromPromise } from 'universalify';

/**
 * @param {string} src
 * @param {string} dest
 * @param {import('fs-extra').MoveOptions} opts
 */
async function _move(src, dest, opts = {}) {
    const overwrite = opts.overwrite || opts.clobber || false;

    const { srcStat, isChangingCase = false } = await stat.checkPaths(src, dest, 'move', opts);

    await stat.checkParentPaths(src, srcStat, dest, 'move');

    // If the parent of dest is not root, make sure it exists before proceeding
    const destParent = dirname(dest);
    const parsedParentPath = parse(destParent);
    if (parsedParentPath.root !== destParent) {
        await mkdirs(destParent);
    }

    return doRename(src, dest, overwrite, isChangingCase);
}

export const move = fromPromise(_move);

/**
 * @param {string} src
 * @param {string} dest
 * @param {boolean} overwrite
 * @param {boolean} isChangingCase
 * @returns
 */
async function doRename(src, dest, overwrite, isChangingCase) {
    if (!isChangingCase) {
        if (overwrite) {
            await remove(dest);
        } else if (await pathExists(dest)) {
            throw new Error('dest already exists.');
        }
    }

    try {
        // Try w/ rename first, and try copy + remove if EXDEV
        await _rename(src, dest);
    } catch (err) {
        if (/** @type {NodeJS.ErrnoException} */ (err).code !== 'EXDEV') {
            throw err;
        }
        await moveAcrossDevice(src, dest, overwrite);
    }
}

/**
 * @param {string} src
 * @param {string} dest
 * @param {boolean} overwrite
 */
async function moveAcrossDevice(src, dest, overwrite) {
    const opts = {
        overwrite,
        errorOnExist: true,
        preserveTimestamps: true
    };

    await copy(src, dest, opts);
    return remove(src);
}
