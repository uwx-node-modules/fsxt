

import { universalify as u } from '@fs/universalify';
import { dirname } from 'path';
import { link, lstat, lstatSync, existsSync, linkSync } from 'graceful-fs';
import { mkdirs, mkdirsSync } from '../mkdirs';
import { exists as pathExists } from '@fs/exists';
import { areIdentical } from '../util/stat';

export const createLink = u(function createLink(srcpath, dstpath, callback) {
    function makeLink(srcpath, dstpath) {
        link(srcpath, dstpath, err => {
            if (err) return callback(err);
            callback(null);
        });
    }

    lstat(dstpath, (_, dstStat) => {
        lstat(srcpath, (err, srcStat) => {
            if (err) {
                err.message = err.message.replace('lstat', 'ensureLink');
                return callback(err);
            }
            if (dstStat && areIdentical(srcStat, dstStat)) return callback(null);

            const dir = dirname(dstpath);
            pathExists(dir, (err, dirExists) => {
                if (err) return callback(err);
                if (dirExists) return makeLink(srcpath, dstpath);
                mkdirs(dir, err => {
                    if (err) return callback(err);
                    makeLink(srcpath, dstpath);
                });
            });
        });
    });
});

export function createLinkSync(srcpath, dstpath) {
    let dstStat;
    try {
        dstStat = lstatSync(dstpath);
    } catch {}

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
