// @ts-check

import { rename as _rename } from '@fs/index';
import { dirname, parse } from 'path';
import { copy } from '../copy';
import { remove } from '../remove';
import { mkdirs } from '../mkdirs';
import { exists as pathExists } from '@fs/exists';
import * as stat from '../util/stat';
import { fromPromise } from 'universalify';

const move = fromPromise(
    /**
     * @param {string} src
     * @param {string} dest
     * @param {import('fs-extra').MoveOptions} opts
     */
    async (src, dest, opts = {}) => {
        const overwrite = opts.overwrite || /** @type {any} */ (opts).clobber || false;

        const stats = await stat.checkPaths(src, dest, 'move', opts);

        const { srcStat, isChangingCase = false } = stats;
        await stat.checkParentPaths(src, srcStat, dest, 'move');

        if (isParentRoot(dest)) return await doRename(src, dest, overwrite, isChangingCase);
        await mkdirs(dirname(dest));

        return await doRename(src, dest, overwrite, isChangingCase);
    }
);

export default move;

/**
 *
 * @param {string} dest
 * @returns
 */
function isParentRoot(dest) {
    const parent = dirname(dest);
    const parsedPath = parse(parent);
    return parsedPath.root === parent;
}

/**
 *
 * @param {string} src
 * @param {string} dest
 * @param {boolean} overwrite
 * @param {boolean} isChangingCase
 * @returns
 */
async function doRename(src, dest, overwrite, isChangingCase) {
    if (isChangingCase) return rename(src, dest, overwrite);
    if (overwrite) {
        await remove(dest);
        await rename(src, dest, overwrite);
    }
    const destExists = await pathExists(dest);
    if (destExists) throw new Error('dest already exists.');
    await rename(src, dest, overwrite);
}

/**
 * @param {string} src
 * @param {string} dest
 * @param {boolean} overwrite
 * @returns
 */
async function rename(src, dest, overwrite) {
    try {
        await _rename(src, dest);
    } catch (err) {
        if (/** @type {NodeJS.ErrnoException} */ (err).code !== 'EXDEV') throw err;
        return await moveAcrossDevice(src, dest, overwrite);
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
    return await remove(src);
}

