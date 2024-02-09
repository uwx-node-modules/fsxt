import { fromPromise } from 'universalify';
import { dirname } from 'path';
import { link, lstat, lstatSync, existsSync, linkSync } from '../fs';
import { mkdirs, mkdirsSync } from '../mkdirs';
import { exists as pathExists } from '@fs/exists';
import { areIdentical } from '../util/stat';

async function _createLink(srcpath, dstpath) {
    let dstStat;
    try {
        dstStat = await lstat(dstpath);
    } catch {
        // ignore error
    }

    let srcStat;
    try {
        srcStat = await lstat(srcpath);
    } catch (err) {
        err.message = err.message.replace('lstat', 'ensureLink');
        throw err;
    }

    if (dstStat && areIdentical(srcStat, dstStat)) return;

    const dir = dirname(dstpath);

    const dirExists = await pathExists(dir);

    if (!dirExists) {
        await mkdirs(dir);
    }

    await link(srcpath, dstpath);
}

export const createLink = fromPromise(_createLink);

export function createLinkSync(srcpath, dstpath) {
    let dstStat;
    try {
        dstStat = lstatSync(dstpath);
    } catch { }

    try {
        const srcStat = lstatSync(srcpath);
        if (dstStat && areIdentical(srcStat, dstStat)) return;
    } catch (err) {
        err.message = err.message.replace('lstat', 'ensureLink');
        throw err;
    }

    const dir = dirname(dstpath);
    const dirExists = existsSync(dir);
    if (dirExists) return linkSync(srcpath, dstpath);
    mkdirsSync(dir);

    return linkSync(srcpath, dstpath);
}
