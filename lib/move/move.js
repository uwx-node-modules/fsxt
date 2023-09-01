

import { rename as _rename } from 'graceful-fs';
import { dirname, parse } from 'path';
import { copy } from '../copy';
import { remove } from '../remove';
import { mkdirs } from '../mkdirs';
import { exists as pathExists } from '@fs/exists';
import * as stat from '../util/stat';

export default function move(src, dest, opts, cb) {
    if (typeof opts === 'function') {
        cb = opts;
        opts = {};
    }

    opts = opts || {};

    const overwrite = opts.overwrite || opts.clobber || false;

    stat.checkPaths(src, dest, 'move', opts, (err, stats) => {
        if (err) return cb(err);
        const { srcStat, isChangingCase = false } = stats;
        stat.checkParentPaths(src, srcStat, dest, 'move', err => {
            if (err) return cb(err);
            if (isParentRoot(dest)) return doRename(src, dest, overwrite, isChangingCase, cb);
            mkdirs(dirname(dest), err => {
                if (err) return cb(err);
                return doRename(src, dest, overwrite, isChangingCase, cb);
            });
        });
    });
}

function isParentRoot(dest) {
    const parent = dirname(dest);
    const parsedPath = parse(parent);
    return parsedPath.root === parent;
}

function doRename(src, dest, overwrite, isChangingCase, cb) {
    if (isChangingCase) return rename(src, dest, overwrite, cb);
    if (overwrite) {
        return remove(dest, err => {
            if (err) return cb(err);
            return rename(src, dest, overwrite, cb);
        });
    }
    pathExists(dest, (err, destExists) => {
        if (err) return cb(err);
        if (destExists) return cb(new Error('dest already exists.'));
        return rename(src, dest, overwrite, cb);
    });
}

function rename(src, dest, overwrite, cb) {
    _rename(src, dest, err => {
        if (!err) return cb();
        if (err.code !== 'EXDEV') return cb(err);
        return moveAcrossDevice(src, dest, overwrite, cb);
    });
}

function moveAcrossDevice(src, dest, overwrite, cb) {
    const opts = {
        overwrite,
        errorOnExist: true,
        preserveTimestamps: true
    };
    copy(src, dest, opts, err => {
        if (err) return cb(err);
        return remove(src, cb);
    });
}

