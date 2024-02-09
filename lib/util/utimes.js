import { open, futimes, close, openSync, futimesSync, closeSync } from '../fs';
import { fromPromise } from 'universalify';

async function _utimesMillis(path, atime, mtime) {
    // if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)
    const fd = await open(path, 'r+');

    let closeErr = null;

    try {
        await futimes(fd, atime, mtime);
    } finally {
        try {
            await close(fd);
        } catch (e) {
            closeErr = e;
        }
    }

    if (closeErr) {
        throw closeErr;
    }
}

export function utimesMillisSync(path, atime, mtime) {
    const fd = openSync(path, 'r+');
    futimesSync(fd, atime, mtime);
    return closeSync(fd);
}

export const utimesMillis = fromPromise(_utimesMillis);
