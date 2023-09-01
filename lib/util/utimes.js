

import { open, futimes, close, openSync, futimesSync, closeSync } from 'graceful-fs';

export function utimesMillis(path, atime, mtime, callback) {
    // if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)
    open(path, 'r+', (err, fd) => {
        if (err) return callback(err);
        futimes(fd, atime, mtime, futimesErr => {
            close(fd, closeErr => {
                if (callback) callback(futimesErr || closeErr);
            });
        });
    });
}

export function utimesMillisSync(path, atime, mtime) {
    const fd = openSync(path, 'r+');
    futimesSync(fd, atime, mtime);
    return closeSync(fd);
}
