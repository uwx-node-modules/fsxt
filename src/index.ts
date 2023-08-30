'use strict';

import { basename, resolve as pathResolve } from 'path';
import { type TransformOptions } from 'stream';
import { type CustomPromisify, promisify } from 'util';
import type { ReadFileOptions, MapStructureResult, ErrorCallback, DiveActionCallback, DiveActionPromise, DiveOptions, MapChildrenFunction, MapStructureFunction } from './types';

// export types
export type * from './types';
export type { CopyOptions, CopyOptionsSync, EnsureDirOptions, SymlinkType, MoveOptions } from 'fs-extra';
export * from 'graceful-fs';

// export other stuff
export { default as vacuum } from './external/vacuum';
export { copy, copySync } from '../lib/copy';
export { emptyDir, emptyDirSync } from '../lib/empty';
export { ensureFile, ensureFileSync, ensureLink, ensureLinkSync, ensureSymlink, ensureSymlinkSync } from '../lib/ensure';
export { ensureDir, ensureDirSync, mkdirp, mkdirpSync, mkdirs, mkdirsSync } from '../lib/mkdirs';
export { move, moveSync } from '../lib/move';
export { outputFile, outputFileSync } from '../lib/output-file';
export { pathExists as exists, pathExistsSync as existsSync } from '../lib/path-exists';
export { remove, removeSync } from '../lib/remove';

import type * as fs from 'fs';

// use fully qualified imports to aid tree-shaking in bundlers
import {
    rename as _rename,
    truncate as _truncate,
    ftruncate as _ftruncate,
    chown as _chown,
    fchown as _fchown,
    lchown as _lchown,
    lutimes as _lutimes,
    chmod as _chmod,
    fchmod as _fchmod,
    lchmod as _lchmod,
    stat as _stat,
    fstat as _fstat,
    lstat as _lstat,
    statfs as _statfs,
    link as _link,
    symlink as _symlink,
    readlink as _readlink,
    realpath as _realpath,
    unlink as _unlink,
    rmdir as _rmdir,
    rm as _rm,
    mkdir as _mkdir,
    mkdtemp as _mkdtemp,
    readdir as _readdir,
    close as _close,
    open as _open,
    utimes as _utimes,
    futimes as _futimes,
    write as _write,
    read as _read,
    readFile as _readFile,
    writeFile as _writeFile,
    appendFile as _appendFile,
    access as _access,
    copyFile as _copyFile,
    writev as _writev,
    readv as _readv,
    opendir as _opendir,
    cp as _cp,

    readdirSync, readFileSync, statSync, writeFileSync
} from 'graceful-fs';
import { ReadCallback, WriteCallback } from 'jsonfile';

const universalifiedSymbol = Symbol();
function universalify<TFunction extends CustomPromisify<TCustom>, TCustom extends (...args: any) => any>(fn: TFunction & CustomPromisify<TCustom>): TFunction & TCustom;
function universalify<A extends unknown[], X extends (...args: any[]) => any, R>(fn: X & ((...args: [...A, (err: any, result: R) => void]) => void)): {
    (...args: Parameters<X>): void;
    (...args: A): Promise<R>;
}
function universalify<A extends unknown[], X extends (...args: any[]) => any, R>(fn: X & ((...args: [...A, (err?: any) => void]) => void)): {
    (...args: Parameters<X>): void;
    (...args: A): Promise<void>;
}
function universalify<A extends unknown[], X extends (...args: any[]) => any, R>(fn: X & ((...args: [...A, (err?: any, result?: R) => void]) => void)): {
    (...args: Parameters<X>): void;
    (...args: A): Promise<R>;
} {
    if (!fn) return fn;

    if (universalifiedSymbol in fn) {
        return fn[universalifiedSymbol] as any;
    }

    const promisified = promisify(fn);

    const f = function (...args: ([...A, (err: any, result: R) => void][0] | A[0])[]) {
        const cb = args[args.length - 1];
        if (typeof cb === 'function') {
            return fn(...args as Parameters<typeof fn>);
        }
        return promisified(...args);
    };

    const attr = {
        value: f, enumerable: false, writable: false, configurable: true
    };
    Object.defineProperty(fn, universalifiedSymbol, attr);
    Object.defineProperty(f, universalifiedSymbol, attr);

    return f;
}


/**
 * Asynchronously rename file at `oldPath` to the pathname provided
 * as `newPath`. In the case that `newPath` already exists, it will
 * be overwritten. If there is a directory at `newPath`, an error will
 * be raised instead. No arguments other than a possible exception are
 * given to the completion callback.
 *
 * See also: [`rename(2)`](http://man7.org/linux/man-pages/man2/rename.2.html).
 *
 * ```js
 * import { rename } from 'node:fs';
 *
 * rename('oldFile.txt', 'newFile.txt', (err) => {
 *   if (err) throw err;
 *   console.log('Rename complete!');
 * });
 * ```
 * @since v0.0.2
 * @see {@link fs.rename}
 * @see {@link fs.promises.rename}
 */
export const rename: typeof fs.rename & typeof fs.rename.__promisify__ = universalify(_rename);
/**
 * Truncates the file. No arguments other than a possible exception are
 * given to the completion callback. A file descriptor can also be passed as the
 * first argument. In this case, `fs.ftruncate()` is called.
 *
 * ```js
 * import { truncate } from 'node:fs';
 * // Assuming that 'path/file.txt' is a regular file.
 * truncate('path/file.txt', (err) => {
 *   if (err) throw err;
 *   console.log('path/file.txt was truncated');
 * });
 * ```
 *
 * Passing a file descriptor is deprecated and may result in an error being thrown
 * in the future.
 *
 * See the POSIX [`truncate(2)`](http://man7.org/linux/man-pages/man2/truncate.2.html) documentation for more details.
 * @since v0.8.6
 * @param [len=0]
 * @see {@link fs.truncate}
 * @see {@link fs.promises.truncate}
 */
export const truncate: typeof fs.truncate & typeof fs.truncate.__promisify__ = universalify(_truncate);
/**
 * Truncates the file descriptor. No arguments other than a possible exception are
 * given to the completion callback.
 *
 * See the POSIX [`ftruncate(2)`](http://man7.org/linux/man-pages/man2/ftruncate.2.html) documentation for more detail.
 *
 * If the file referred to by the file descriptor was larger than `len` bytes, only
 * the first `len` bytes will be retained in the file.
 *
 * For example, the following program retains only the first four bytes of the
 * file:
 *
 * ```js
 * import { open, close, ftruncate } from 'node:fs';
 *
 * function closeFd(fd) {
 *   close(fd, (err) => {
 *     if (err) throw err;
 *   });
 * }
 *
 * open('temp.txt', 'r+', (err, fd) => {
 *   if (err) throw err;
 *
 *   try {
 *     ftruncate(fd, 4, (err) => {
 *       closeFd(fd);
 *       if (err) throw err;
 *     });
 *   } catch (err) {
 *     closeFd(fd);
 *     if (err) throw err;
 *   }
 * });
 * ```
 *
 * If the file previously was shorter than `len` bytes, it is extended, and the
 * extended part is filled with null bytes (`'\0'`):
 *
 * If `len` is negative then `0` will be used.
 * @since v0.8.6
 * @param [len=0]
 * @see {@link fs.ftruncate}
 * @see {@link fs.promises.ftruncate}
 */
export const ftruncate: typeof fs.ftruncate & typeof fs.ftruncate.__promisify__ = universalify(_ftruncate);
/**
 * Asynchronously changes owner and group of a file. No arguments other than a
 * possible exception are given to the completion callback.
 *
 * See the POSIX [`chown(2)`](http://man7.org/linux/man-pages/man2/chown.2.html) documentation for more detail.
 * @since v0.1.97
 * @see {@link fs.chown}
 * @see {@link fs.promises.chown}
 */
export const chown: typeof fs.chown & typeof fs.chown.__promisify__ = universalify(_chown);
/**
 * Sets the owner of the file. No arguments other than a possible exception are
 * given to the completion callback.
 *
 * See the POSIX [`fchown(2)`](http://man7.org/linux/man-pages/man2/fchown.2.html) documentation for more detail.
 * @since v0.4.7
 * @see {@link fs.fchown}
 * @see {@link fs.promises.fchown}
 */
export const fchown: typeof fs.fchown & typeof fs.fchown.__promisify__ = universalify(_fchown);
/**
 * Set the owner of the symbolic link. No arguments other than a possible
 * exception are given to the completion callback.
 *
 * See the POSIX [`lchown(2)`](http://man7.org/linux/man-pages/man2/lchown.2.html) documentation for more detail.
 * @see {@link fs.lchown}
 * @see {@link fs.promises.lchown}
 */
export const lchown: typeof fs.lchown & typeof fs.lchown.__promisify__ = universalify(_lchown);
/**
 * Changes the access and modification times of a file in the same way as {@link utimes}, with the difference that if the path refers to a symbolic
 * link, then the link is not dereferenced: instead, the timestamps of the
 * symbolic link itself are changed.
 *
 * No arguments other than a possible exception are given to the completion
 * callback.
 * @since v14.5.0, v12.19.0
 * @see {@link fs.lutimes}
 * @see {@link fs.promises.lutimes}
 */
export const lutimes: typeof fs.lutimes & typeof fs.lutimes.__promisify__ = universalify(_lutimes);
/**
 * Asynchronously changes the permissions of a file. No arguments other than a
 * possible exception are given to the completion callback.
 *
 * See the POSIX [`chmod(2)`](http://man7.org/linux/man-pages/man2/chmod.2.html) documentation for more detail.
 *
 * ```js
 * import { chmod } from 'node:fs';
 *
 * chmod('my_file.txt', 0o775, (err) => {
 *   if (err) throw err;
 *   console.log('The permissions for file "my_file.txt" have been changed!');
 * });
 * ```
 * @since v0.1.30
 * @see {@link fs.chmod}
 * @see {@link fs.promises.chmod}
 */
export const chmod: typeof fs.chmod & typeof fs.chmod.__promisify__ = universalify(_chmod);
/**
 * Sets the permissions on the file. No arguments other than a possible exception
 * are given to the completion callback.
 *
 * See the POSIX [`fchmod(2)`](http://man7.org/linux/man-pages/man2/fchmod.2.html) documentation for more detail.
 * @since v0.4.7
 * @see {@link fs.fchmod}
 * @see {@link fs.promises.fchmod}
 */
export const fchmod: typeof fs.fchmod & typeof fs.fchmod.__promisify__ = universalify(_fchmod);
/**
 * Changes the permissions on a symbolic link. No arguments other than a possible
 * exception are given to the completion callback.
 *
 * This method is only implemented on macOS.
 *
 * See the POSIX [`lchmod(2)`](https://www.freebsd.org/cgi/man.cgi?query=lchmod&sektion=2) documentation for more detail.
 * @deprecated Since v0.4.7
 * @see {@link fs.lchmod}
 * @see {@link fs.promises.lchmod}
 */
export const lchmod: typeof fs.lchmod & typeof fs.lchmod.__promisify__ = universalify(_lchmod);
/**
 * Asynchronous [`stat(2)`](http://man7.org/linux/man-pages/man2/stat.2.html). The callback gets two arguments `(err, stats)` where`stats` is an `fs.Stats` object.
 *
 * In case of an error, the `err.code` will be one of `Common System Errors`.
 *
 * {@link stat} follows symbolic links. Use {@link lstat} to look at the
 * links themselves.
 *
 * Using `fs.stat()` to check for the existence of a file before calling`fs.open()`, `fs.readFile()`, or `fs.writeFile()` is not recommended.
 * Instead, user code should open/read/write the file directly and handle the
 * error raised if the file is not available.
 *
 * To check if a file exists without manipulating it afterwards, {@link access} is recommended.
 *
 * For example, given the following directory structure:
 *
 * ```text
 * - txtDir
 * -- file.txt
 * - app.js
 * ```
 *
 * The next program will check for the stats of the given paths:
 *
 * ```js
 * import { stat } from 'node:fs';
 *
 * const pathsToCheck = ['./txtDir', './txtDir/file.txt'];
 *
 * for (let i = 0; i < pathsToCheck.length; i++) {
 *   stat(pathsToCheck[i], (err, stats) => {
 *     console.log(stats.isDirectory());
 *     console.log(stats);
 *   });
 * }
 * ```
 *
 * The resulting output will resemble:
 *
 * ```console
 * true
 * Stats {
 *   dev: 16777220,
 *   mode: 16877,
 *   nlink: 3,
 *   uid: 501,
 *   gid: 20,
 *   rdev: 0,
 *   blksize: 4096,
 *   ino: 14214262,
 *   size: 96,
 *   blocks: 0,
 *   atimeMs: 1561174653071.963,
 *   mtimeMs: 1561174614583.3518,
 *   ctimeMs: 1561174626623.5366,
 *   birthtimeMs: 1561174126937.2893,
 *   atime: 2019-06-22T03:37:33.072Z,
 *   mtime: 2019-06-22T03:36:54.583Z,
 *   ctime: 2019-06-22T03:37:06.624Z,
 *   birthtime: 2019-06-22T03:28:46.937Z
 * }
 * false
 * Stats {
 *   dev: 16777220,
 *   mode: 33188,
 *   nlink: 1,
 *   uid: 501,
 *   gid: 20,
 *   rdev: 0,
 *   blksize: 4096,
 *   ino: 14214074,
 *   size: 8,
 *   blocks: 8,
 *   atimeMs: 1561174616618.8555,
 *   mtimeMs: 1561174614584,
 *   ctimeMs: 1561174614583.8145,
 *   birthtimeMs: 1561174007710.7478,
 *   atime: 2019-06-22T03:36:56.619Z,
 *   mtime: 2019-06-22T03:36:54.584Z,
 *   ctime: 2019-06-22T03:36:54.584Z,
 *   birthtime: 2019-06-22T03:26:47.711Z
 * }
 * ```
 * @since v0.0.2
 * @see {@link fs.stat}
 * @see {@link fs.promises.stat}
 */
export const stat: typeof fs.stat & typeof fs.stat.__promisify__ = universalify(_stat);
/**
 * Invokes the callback with the `fs.Stats` for the file descriptor.
 *
 * See the POSIX [`fstat(2)`](http://man7.org/linux/man-pages/man2/fstat.2.html) documentation for more detail.
 * @since v0.1.95
 * @see {@link fs.fstat}
 * @see {@link fs.promises.fstat}
 */
export const fstat: typeof fs.fstat & typeof fs.fstat.__promisify__ = universalify(_fstat);
/**
 * Retrieves the `fs.Stats` for the symbolic link referred to by the path.
 * The callback gets two arguments `(err, stats)` where `stats` is a `fs.Stats` object. `lstat()` is identical to `stat()`, except that if `path` is a symbolic
 * link, then the link itself is stat-ed, not the file that it refers to.
 *
 * See the POSIX [`lstat(2)`](http://man7.org/linux/man-pages/man2/lstat.2.html) documentation for more details.
 * @since v0.1.30
 * @see {@link fs.lstat}
 * @see {@link fs.promises.lstat}
 */
export const lstat: typeof fs.lstat & typeof fs.lstat.__promisify__ = universalify(_lstat);
/**
 * Asynchronous [`statfs(2)`](http://man7.org/linux/man-pages/man2/statfs.2.html). Returns information about the mounted file system which
 * contains `path`. The callback gets two arguments `(err, stats)` where `stats`is an `fs.StatFs` object.
 *
 * In case of an error, the `err.code` will be one of `Common System Errors`.
 * @since v19.6.0, v18.15.0
 * @param path A path to an existing file or directory on the file system to be queried.
 * @see {@link fs.statfs}
 * @see {@link fs.promises.statfs}
 */
export const statfs: typeof fs.statfs & typeof fs.statfs.__promisify__ = universalify(_statfs);
/**
 * Creates a new link from the `existingPath` to the `newPath`. See the POSIX [`link(2)`](http://man7.org/linux/man-pages/man2/link.2.html) documentation for more detail. No arguments other than
 * a possible
 * exception are given to the completion callback.
 * @since v0.1.31
 * @see {@link fs.link}
 * @see {@link fs.promises.link}
 */
export const link: typeof fs.link & typeof fs.link.__promisify__ = universalify(_link);
/**
 * Creates the link called `path` pointing to `target`. No arguments other than a
 * possible exception are given to the completion callback.
 *
 * See the POSIX [`symlink(2)`](http://man7.org/linux/man-pages/man2/symlink.2.html) documentation for more details.
 *
 * The `type` argument is only available on Windows and ignored on other platforms.
 * It can be set to `'dir'`, `'file'`, or `'junction'`. If the `type` argument is
 * not a string, Node.js will autodetect `target` type and use `'file'` or `'dir'`.
 * If the `target` does not exist, `'file'` will be used. Windows junction points
 * require the destination path to be absolute. When using `'junction'`, the`target` argument will automatically be normalized to absolute path. Junction
 * points on NTFS volumes can only point to directories.
 *
 * Relative targets are relative to the link's parent directory.
 *
 * ```js
 * import { symlink } from 'node:fs';
 *
 * symlink('./mew', './mewtwo', callback);
 * ```
 *
 * The above example creates a symbolic link `mewtwo` which points to `mew` in the
 * same directory:
 *
 * ```bash
 * $ tree .
 * .
 * ├── mew
 * └── mewtwo -> ./mew
 * ```
 * @since v0.1.31
 * @param [type='null']
 * @see {@link fs.symlink}
 * @see {@link fs.promises.symlink}
 */
export const symlink: typeof fs.symlink & typeof fs.symlink.__promisify__ = universalify(_symlink);
/**
 * Reads the contents of the symbolic link referred to by `path`. The callback gets
 * two arguments `(err, linkString)`.
 *
 * See the POSIX [`readlink(2)`](http://man7.org/linux/man-pages/man2/readlink.2.html) documentation for more details.
 *
 * The optional `options` argument can be a string specifying an encoding, or an
 * object with an `encoding` property specifying the character encoding to use for
 * the link path passed to the callback. If the `encoding` is set to `'buffer'`,
 * the link path returned will be passed as a `Buffer` object.
 * @since v0.1.31
 * @see {@link fs.readlink}
 * @see {@link fs.promises.readlink}
 */
export const readlink: typeof fs.readlink & typeof fs.readlink.__promisify__ = universalify(_readlink);
/**
 * Asynchronously computes the canonical pathname by resolving `.`, `..`, and
 * symbolic links.
 *
 * A canonical pathname is not necessarily unique. Hard links and bind mounts can
 * expose a file system entity through many pathnames.
 *
 * This function behaves like [`realpath(3)`](http://man7.org/linux/man-pages/man3/realpath.3.html), with some exceptions:
 *
 * 1. No case conversion is performed on case-insensitive file systems.
 * 2. The maximum number of symbolic links is platform-independent and generally
 * (much) higher than what the native [`realpath(3)`](http://man7.org/linux/man-pages/man3/realpath.3.html) implementation supports.
 *
 * The `callback` gets two arguments `(err, resolvedPath)`. May use `process.cwd`to resolve relative paths.
 *
 * Only paths that can be converted to UTF8 strings are supported.
 *
 * The optional `options` argument can be a string specifying an encoding, or an
 * object with an `encoding` property specifying the character encoding to use for
 * the path passed to the callback. If the `encoding` is set to `'buffer'`,
 * the path returned will be passed as a `Buffer` object.
 *
 * If `path` resolves to a socket or a pipe, the function will return a system
 * dependent name for that object.
 * @since v0.1.31
 * @see {@link fs.realpath}
 * @see {@link fs.promises.realpath}
 */
export const realpath: typeof fs.realpath & typeof fs.realpath.__promisify__ = universalify(_realpath);
/**
 * Asynchronously removes a file or symbolic link. No arguments other than a
 * possible exception are given to the completion callback.
 *
 * ```js
 * import { unlink } from 'node:fs';
 * // Assuming that 'path/file.txt' is a regular file.
 * unlink('path/file.txt', (err) => {
 *   if (err) throw err;
 *   console.log('path/file.txt was deleted');
 * });
 * ```
 *
 * `fs.unlink()` will not work on a directory, empty or otherwise. To remove a
 * directory, use {@link rmdir}.
 *
 * See the POSIX [`unlink(2)`](http://man7.org/linux/man-pages/man2/unlink.2.html) documentation for more details.
 * @since v0.0.2
 * @see {@link fs.unlink}
 * @see {@link fs.promises.unlink}
 */
export const unlink: typeof fs.unlink & typeof fs.unlink.__promisify__ = universalify(_unlink);
/**
 * Asynchronous [`rmdir(2)`](http://man7.org/linux/man-pages/man2/rmdir.2.html). No arguments other than a possible exception are given
 * to the completion callback.
 *
 * Using `fs.rmdir()` on a file (not a directory) results in an `ENOENT` error on
 * Windows and an `ENOTDIR` error on POSIX.
 *
 * To get a behavior similar to the `rm -rf` Unix command, use {@link rm} with options `{ recursive: true, force: true }`.
 * @since v0.0.2
 * @see {@link fs.rmdir}
 * @see {@link fs.promises.rmdir}
 */
export const rmdir: typeof fs.rmdir & typeof fs.rmdir.__promisify__ = universalify(_rmdir);
/**
 * Asynchronously removes files and directories (modeled on the standard POSIX `rm`utility). No arguments other than a possible exception are given to the
 * completion callback.
 * @since v14.14.0
 * @see {@link fs.rm}
 * @see {@link fs.promises.rm}
 */
export const rm: typeof fs.rm & typeof fs.rm.__promisify__ = universalify(_rm);
/**
 * Asynchronously creates a directory.
 *
 * The callback is given a possible exception and, if `recursive` is `true`, the
 * first directory path created, `(err[, path])`.`path` can still be `undefined` when `recursive` is `true`, if no directory was
 * created (for instance, if it was previously created).
 *
 * The optional `options` argument can be an integer specifying `mode` (permission
 * and sticky bits), or an object with a `mode` property and a `recursive`property indicating whether parent directories should be created. Calling`fs.mkdir()` when `path` is a directory that
 * exists results in an error only
 * when `recursive` is false. If `recursive` is false and the directory exists,
 * an `EEXIST` error occurs.
 *
 * ```js
 * import { mkdir } from 'node:fs';
 *
 * // Create ./tmp/a/apple, regardless of whether ./tmp and ./tmp/a exist.
 * mkdir('./tmp/a/apple', { recursive: true }, (err) => {
 *   if (err) throw err;
 * });
 * ```
 *
 * On Windows, using `fs.mkdir()` on the root directory even with recursion will
 * result in an error:
 *
 * ```js
 * import { mkdir } from 'node:fs';
 *
 * mkdir('/', { recursive: true }, (err) => {
 *   // => [Error: EPERM: operation not permitted, mkdir 'C:\']
 * });
 * ```
 *
 * See the POSIX [`mkdir(2)`](http://man7.org/linux/man-pages/man2/mkdir.2.html) documentation for more details.
 * @since v0.1.8
 * @see {@link fs.mkdir}
 * @see {@link fs.promises.mkdir}
 */
export const mkdir: typeof fs.mkdir & typeof fs.mkdir.__promisify__ = universalify(_mkdir);
/**
 * Creates a unique temporary directory.
 *
 * Generates six random characters to be appended behind a required`prefix` to create a unique temporary directory. Due to platform
 * inconsistencies, avoid trailing `X` characters in `prefix`. Some platforms,
 * notably the BSDs, can return more than six random characters, and replace
 * trailing `X` characters in `prefix` with random characters.
 *
 * The created directory path is passed as a string to the callback's second
 * parameter.
 *
 * The optional `options` argument can be a string specifying an encoding, or an
 * object with an `encoding` property specifying the character encoding to use.
 *
 * ```js
 * import { mkdtemp } from 'node:fs';
 * import { join } from 'node:path';
 * import { tmpdir } from 'node:os';
 *
 * mkdtemp(join(tmpdir(), 'foo-'), (err, directory) => {
 *   if (err) throw err;
 *   console.log(directory);
 *   // Prints: /tmp/foo-itXde2 or C:\Users\...\AppData\Local\Temp\foo-itXde2
 * });
 * ```
 *
 * The `fs.mkdtemp()` method will append the six randomly selected characters
 * directly to the `prefix` string. For instance, given a directory `/tmp`, if the
 * intention is to create a temporary directory _within_`/tmp`, the `prefix`must end with a trailing platform-specific path separator
 * (`require('node:path').sep`).
 *
 * ```js
 * import { tmpdir } from 'node:os';
 * import { mkdtemp } from 'node:fs';
 *
 * // The parent directory for the new temporary directory
 * const tmpDir = tmpdir();
 *
 * // This method is *INCORRECT*:
 * mkdtemp(tmpDir, (err, directory) => {
 *   if (err) throw err;
 *   console.log(directory);
 *   // Will print something similar to `/tmpabc123`.
 *   // A new temporary directory is created at the file system root
 *   // rather than *within* the /tmp directory.
 * });
 *
 * // This method is *CORRECT*:
 * import { sep } from 'node:path';
 * mkdtemp(`${tmpDir}${sep}`, (err, directory) => {
 *   if (err) throw err;
 *   console.log(directory);
 *   // Will print something similar to `/tmp/abc123`.
 *   // A new temporary directory is created within
 *   // the /tmp directory.
 * });
 * ```
 * @since v5.10.0
 * @see {@link fs.mkdtemp}
 * @see {@link fs.promises.mkdtemp}
 */
export const mkdtemp: typeof fs.mkdtemp & typeof fs.mkdtemp.__promisify__ = universalify(_mkdtemp);
/**
 * Reads the contents of a directory. The callback gets two arguments `(err, files)`where `files` is an array of the names of the files in the directory excluding`'.'` and `'..'`.
 *
 * See the POSIX [`readdir(3)`](http://man7.org/linux/man-pages/man3/readdir.3.html) documentation for more details.
 *
 * The optional `options` argument can be a string specifying an encoding, or an
 * object with an `encoding` property specifying the character encoding to use for
 * the filenames passed to the callback. If the `encoding` is set to `'buffer'`,
 * the filenames returned will be passed as `Buffer` objects.
 *
 * If `options.withFileTypes` is set to `true`, the `files` array will contain `fs.Dirent` objects.
 * @since v0.1.8
 * @see {@link fs.readdir}
 * @see {@link fs.promises.readdir}
 */
export const readdir: typeof fs.readdir & typeof fs.readdir.__promisify__ = universalify(_readdir);
/**
 * Closes the file descriptor. No arguments other than a possible exception are
 * given to the completion callback.
 *
 * Calling `fs.close()` on any file descriptor (`fd`) that is currently in use
 * through any other `fs` operation may lead to undefined behavior.
 *
 * See the POSIX [`close(2)`](http://man7.org/linux/man-pages/man2/close.2.html) documentation for more detail.
 * @since v0.0.2
 * @see {@link fs.close}
 * @see {@link fs.promises.close}
 */
export const close: typeof fs.close & typeof fs.close.__promisify__ = universalify(_close);
/**
 * Asynchronous file open. See the POSIX [`open(2)`](http://man7.org/linux/man-pages/man2/open.2.html) documentation for more details.
 *
 * `mode` sets the file mode (permission and sticky bits), but only if the file was
 * created. On Windows, only the write permission can be manipulated; see {@link chmod}.
 *
 * The callback gets two arguments `(err, fd)`.
 *
 * Some characters (`< > : " / \ | ? *`) are reserved under Windows as documented
 * by [Naming Files, Paths, and Namespaces](https://docs.microsoft.com/en-us/windows/desktop/FileIO/naming-a-file). Under NTFS, if the filename contains
 * a colon, Node.js will open a file system stream, as described by [this MSDN page](https://docs.microsoft.com/en-us/windows/desktop/FileIO/using-streams).
 *
 * Functions based on `fs.open()` exhibit this behavior as well:`fs.writeFile()`, `fs.readFile()`, etc.
 * @since v0.0.2
 * @param [flags='r'] See `support of file system `flags``.
 * @param [mode=0o666]
 * @see {@link fs.open}
 * @see {@link fs.promises.open}
 */
export const open: typeof fs.open & typeof fs.open.__promisify__ = universalify(_open);
/**
 * Change the file system timestamps of the object referenced by `path`.
 *
 * The `atime` and `mtime` arguments follow these rules:
 *
 * * Values can be either numbers representing Unix epoch time in seconds,`Date`s, or a numeric string like `'123456789.0'`.
 * * If the value can not be converted to a number, or is `NaN`, `Infinity`, or`-Infinity`, an `Error` will be thrown.
 * @since v0.4.2
 * @see {@link fs.utimes}
 * @see {@link fs.promises.utimes}
 */
export const utimes: typeof fs.utimes & typeof fs.utimes.__promisify__ = universalify(_utimes);
/**
 * Change the file system timestamps of the object referenced by the supplied file
 * descriptor. See {@link utimes}.
 * @since v0.4.2
 * @see {@link fs.futimes}
 * @see {@link fs.promises.futimes}
 */
export const futimes: typeof fs.futimes & typeof fs.futimes.__promisify__ = universalify(_futimes);
/**
 * Write `buffer` to the file specified by `fd`.
 *
 * `offset` determines the part of the buffer to be written, and `length` is
 * an integer specifying the number of bytes to write.
 *
 * `position` refers to the offset from the beginning of the file where this data
 * should be written. If `typeof position !== 'number'`, the data will be written
 * at the current position. See [`pwrite(2)`](http://man7.org/linux/man-pages/man2/pwrite.2.html).
 *
 * The callback will be given three arguments `(err, bytesWritten, buffer)` where`bytesWritten` specifies how many _bytes_ were written from `buffer`.
 *
 * If this method is invoked as its `util.promisify()` ed version, it returns
 * a promise for an `Object` with `bytesWritten` and `buffer` properties.
 *
 * It is unsafe to use `fs.write()` multiple times on the same file without waiting
 * for the callback. For this scenario, {@link createWriteStream} is
 * recommended.
 *
 * On Linux, positional writes don't work when the file is opened in append mode.
 * The kernel ignores the position argument and always appends the data to
 * the end of the file.
 * @since v0.0.2
 * @param [offset=0]
 * @param [length=buffer.byteLength - offset]
 * @param [position='null']
 * @see {@link fs.write}
 * @see {@link fs.promises.write}
 */
export const write: typeof fs.write & typeof fs.write.__promisify__ = universalify(_write);
/**
 * Read data from the file specified by `fd`.
 *
 * The callback is given the three arguments, `(err, bytesRead, buffer)`.
 *
 * If the file is not modified concurrently, the end-of-file is reached when the
 * number of bytes read is zero.
 *
 * If this method is invoked as its `util.promisify()` ed version, it returns
 * a promise for an `Object` with `bytesRead` and `buffer` properties.
 * @since v0.0.2
 * @param buffer The buffer that the data will be written to.
 * @param offset The position in `buffer` to write the data to.
 * @param length The number of bytes to read.
 * @param position Specifies where to begin reading from in the file. If `position` is `null` or `-1 `, data will be read from the current file position, and the file position will be updated. If
 * `position` is an integer, the file position will be unchanged.
 * @see {@link fs.read}
 * @see {@link fs.promises.read}
 */
export const read: typeof fs.read & typeof fs.read.__promisify__ = universalify(_read);
/**
 * Asynchronously reads the entire contents of a file.
 *
 * ```js
 * import { readFile } from 'node:fs';
 *
 * readFile('/etc/passwd', (err, data) => {
 *   if (err) throw err;
 *   console.log(data);
 * });
 * ```
 *
 * The callback is passed two arguments `(err, data)`, where `data` is the
 * contents of the file.
 *
 * If no encoding is specified, then the raw buffer is returned.
 *
 * If `options` is a string, then it specifies the encoding:
 *
 * ```js
 * import { readFile } from 'node:fs';
 *
 * readFile('/etc/passwd', 'utf8', callback);
 * ```
 *
 * When the path is a directory, the behavior of `fs.readFile()` and {@link readFileSync} is platform-specific. On macOS, Linux, and Windows, an
 * error will be returned. On FreeBSD, a representation of the directory's contents
 * will be returned.
 *
 * ```js
 * import { readFile } from 'node:fs';
 *
 * // macOS, Linux, and Windows
 * readFile('<directory>', (err, data) => {
 *   // => [Error: EISDIR: illegal operation on a directory, read <directory>]
 * });
 *
 * //  FreeBSD
 * readFile('<directory>', (err, data) => {
 *   // => null, <data>
 * });
 * ```
 *
 * It is possible to abort an ongoing request using an `AbortSignal`. If a
 * request is aborted the callback is called with an `AbortError`:
 *
 * ```js
 * import { readFile } from 'node:fs';
 *
 * const controller = new AbortController();
 * const signal = controller.signal;
 * readFile(fileInfo[0].name, { signal }, (err, buf) => {
 *   // ...
 * });
 * // When you want to abort the request
 * controller.abort();
 * ```
 *
 * The `fs.readFile()` function buffers the entire file. To minimize memory costs,
 * when possible prefer streaming via `fs.createReadStream()`.
 *
 * Aborting an ongoing request does not abort individual operating
 * system requests but rather the internal buffering `fs.readFile` performs.
 * @since v0.1.29
 * @param path filename or file descriptor
 * @see {@link fs.readFile}
 * @see {@link fs.promises.readFile}
 */
export const readFile: typeof fs.readFile & typeof fs.readFile.__promisify__ = universalify(_readFile);
/**
 * When `file` is a filename, asynchronously writes data to the file, replacing the
 * file if it already exists. `data` can be a string or a buffer.
 *
 * When `file` is a file descriptor, the behavior is similar to calling`fs.write()` directly (which is recommended). See the notes below on using
 * a file descriptor.
 *
 * The `encoding` option is ignored if `data` is a buffer.
 *
 * The `mode` option only affects the newly created file. See {@link open} for more details.
 *
 * ```js
 * import { writeFile } from 'node:fs';
 * import { Buffer } from 'node:buffer';
 *
 * const data = new Uint8Array(Buffer.from('Hello Node.js'));
 * writeFile('message.txt', data, (err) => {
 *   if (err) throw err;
 *   console.log('The file has been saved!');
 * });
 * ```
 *
 * If `options` is a string, then it specifies the encoding:
 *
 * ```js
 * import { writeFile } from 'node:fs';
 *
 * writeFile('message.txt', 'Hello Node.js', 'utf8', callback);
 * ```
 *
 * It is unsafe to use `fs.writeFile()` multiple times on the same file without
 * waiting for the callback. For this scenario, {@link createWriteStream} is
 * recommended.
 *
 * Similarly to `fs.readFile` \- `fs.writeFile` is a convenience method that
 * performs multiple `write` calls internally to write the buffer passed to it.
 * For performance sensitive code consider using {@link createWriteStream}.
 *
 * It is possible to use an `AbortSignal` to cancel an `fs.writeFile()`.
 * Cancelation is "best effort", and some amount of data is likely still
 * to be written.
 *
 * ```js
 * import { writeFile } from 'node:fs';
 * import { Buffer } from 'node:buffer';
 *
 * const controller = new AbortController();
 * const { signal } = controller;
 * const data = new Uint8Array(Buffer.from('Hello Node.js'));
 * writeFile('message.txt', data, { signal }, (err) => {
 *   // When a request is aborted - the callback is called with an AbortError
 * });
 * // When the request should be aborted
 * controller.abort();
 * ```
 *
 * Aborting an ongoing request does not abort individual operating
 * system requests but rather the internal buffering `fs.writeFile` performs.
 * @since v0.1.29
 * @param file filename or file descriptor
 * @see {@link fs.writeFile}
 * @see {@link fs.promises.writeFile}
 */
export const writeFile: typeof fs.writeFile & typeof fs.writeFile.__promisify__ = universalify(_writeFile);
/**
 * Asynchronously append data to a file, creating the file if it does not yet
 * exist. `data` can be a string or a `Buffer`.
 *
 * The `mode` option only affects the newly created file. See {@link open} for more details.
 *
 * ```js
 * import { appendFile } from 'node:fs';
 *
 * appendFile('message.txt', 'data to append', (err) => {
 *   if (err) throw err;
 *   console.log('The "data to append" was appended to file!');
 * });
 * ```
 *
 * If `options` is a string, then it specifies the encoding:
 *
 * ```js
 * import { appendFile } from 'node:fs';
 *
 * appendFile('message.txt', 'data to append', 'utf8', callback);
 * ```
 *
 * The `path` may be specified as a numeric file descriptor that has been opened
 * for appending (using `fs.open()` or `fs.openSync()`). The file descriptor will
 * not be closed automatically.
 *
 * ```js
 * import { open, close, appendFile } from 'node:fs';
 *
 * function closeFd(fd) {
 *   close(fd, (err) => {
 *     if (err) throw err;
 *   });
 * }
 *
 * open('message.txt', 'a', (err, fd) => {
 *   if (err) throw err;
 *
 *   try {
 *     appendFile(fd, 'data to append', 'utf8', (err) => {
 *       closeFd(fd);
 *       if (err) throw err;
 *     });
 *   } catch (err) {
 *     closeFd(fd);
 *     throw err;
 *   }
 * });
 * ```
 * @since v0.6.7
 * @param path filename or file descriptor
 * @see {@link fs.appendFile}
 * @see {@link fs.promises.appendFile}
 */
export const appendFile: typeof fs.appendFile & typeof fs.appendFile.__promisify__ = universalify(_appendFile);
/**
 * Tests a user's permissions for the file or directory specified by `path`.
 * The `mode` argument is an optional integer that specifies the accessibility
 * checks to be performed. `mode` should be either the value `fs.constants.F_OK`or a mask consisting of the bitwise OR of any of `fs.constants.R_OK`,`fs.constants.W_OK`, and `fs.constants.X_OK`
 * (e.g.`fs.constants.W_OK | fs.constants.R_OK`). Check `File access constants` for
 * possible values of `mode`.
 *
 * The final argument, `callback`, is a callback function that is invoked with
 * a possible error argument. If any of the accessibility checks fail, the error
 * argument will be an `Error` object. The following examples check if`package.json` exists, and if it is readable or writable.
 *
 * ```js
 * import { access, constants } from 'node:fs';
 *
 * const file = 'package.json';
 *
 * // Check if the file exists in the current directory.
 * access(file, constants.F_OK, (err) => {
 *   console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
 * });
 *
 * // Check if the file is readable.
 * access(file, constants.R_OK, (err) => {
 *   console.log(`${file} ${err ? 'is not readable' : 'is readable'}`);
 * });
 *
 * // Check if the file is writable.
 * access(file, constants.W_OK, (err) => {
 *   console.log(`${file} ${err ? 'is not writable' : 'is writable'}`);
 * });
 *
 * // Check if the file is readable and writable.
 * access(file, constants.R_OK | constants.W_OK, (err) => {
 *   console.log(`${file} ${err ? 'is not' : 'is'} readable and writable`);
 * });
 * ```
 *
 * Do not use `fs.access()` to check for the accessibility of a file before calling`fs.open()`, `fs.readFile()`, or `fs.writeFile()`. Doing
 * so introduces a race condition, since other processes may change the file's
 * state between the two calls. Instead, user code should open/read/write the
 * file directly and handle the error raised if the file is not accessible.
 *
 * **write (NOT RECOMMENDED)**
 *
 * ```js
 * import { access, open, close } from 'node:fs';
 *
 * access('myfile', (err) => {
 *   if (!err) {
 *     console.error('myfile already exists');
 *     return;
 *   }
 *
 *   open('myfile', 'wx', (err, fd) => {
 *     if (err) throw err;
 *
 *     try {
 *       writeMyData(fd);
 *     } finally {
 *       close(fd, (err) => {
 *         if (err) throw err;
 *       });
 *     }
 *   });
 * });
 * ```
 *
 * **write (RECOMMENDED)**
 *
 * ```js
 * import { open, close } from 'node:fs';
 *
 * open('myfile', 'wx', (err, fd) => {
 *   if (err) {
 *     if (err.code === 'EEXIST') {
 *       console.error('myfile already exists');
 *       return;
 *     }
 *
 *     throw err;
 *   }
 *
 *   try {
 *     writeMyData(fd);
 *   } finally {
 *     close(fd, (err) => {
 *       if (err) throw err;
 *     });
 *   }
 * });
 * ```
 *
 * **read (NOT RECOMMENDED)**
 *
 * ```js
 * import { access, open, close } from 'node:fs';
 * access('myfile', (err) => {
 *   if (err) {
 *     if (err.code === 'ENOENT') {
 *       console.error('myfile does not exist');
 *       return;
 *     }
 *
 *     throw err;
 *   }
 *
 *   open('myfile', 'r', (err, fd) => {
 *     if (err) throw err;
 *
 *     try {
 *       readMyData(fd);
 *     } finally {
 *       close(fd, (err) => {
 *         if (err) throw err;
 *       });
 *     }
 *   });
 * });
 * ```
 *
 * **read (RECOMMENDED)**
 *
 * ```js
 * import { open, close } from 'node:fs';
 *
 * open('myfile', 'r', (err, fd) => {
 *   if (err) {
 *     if (err.code === 'ENOENT') {
 *       console.error('myfile does not exist');
 *       return;
 *     }
 *
 *     throw err;
 *   }
 *
 *   try {
 *     readMyData(fd);
 *   } finally {
 *     close(fd, (err) => {
 *       if (err) throw err;
 *     });
 *   }
 * });
 * ```
 *
 * The "not recommended" examples above check for accessibility and then use the
 * file; the "recommended" examples are better because they use the file directly
 * and handle the error, if any.
 *
 * In general, check for the accessibility of a file only if the file will not be
 * used directly, for example when its accessibility is a signal from another
 * process.
 *
 * On Windows, access-control policies (ACLs) on a directory may limit access to
 * a file or directory. The `fs.access()` function, however, does not check the
 * ACL and therefore may report that a path is accessible even if the ACL restricts
 * the user from reading or writing to it.
 * @since v0.11.15
 * @param [mode=fs.constants.F_OK]
 * @see {@link fs.access}
 * @see {@link fs.promises.access}
 */
export const access: typeof fs.access & typeof fs.access.__promisify__ = universalify(_access);
/**
 * Asynchronously copies `src` to `dest`. By default, `dest` is overwritten if it
 * already exists. No arguments other than a possible exception are given to the
 * callback function. Node.js makes no guarantees about the atomicity of the copy
 * operation. If an error occurs after the destination file has been opened for
 * writing, Node.js will attempt to remove the destination.
 *
 * `mode` is an optional integer that specifies the behavior
 * of the copy operation. It is possible to create a mask consisting of the bitwise
 * OR of two or more values (e.g.`fs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE`).
 *
 * * `fs.constants.COPYFILE_EXCL`: The copy operation will fail if `dest` already
 * exists.
 * * `fs.constants.COPYFILE_FICLONE`: The copy operation will attempt to create a
 * copy-on-write reflink. If the platform does not support copy-on-write, then a
 * fallback copy mechanism is used.
 * * `fs.constants.COPYFILE_FICLONE_FORCE`: The copy operation will attempt to
 * create a copy-on-write reflink. If the platform does not support
 * copy-on-write, then the operation will fail.
 *
 * ```js
 * import { copyFile, constants } from 'node:fs';
 *
 * function callback(err) {
 *   if (err) throw err;
 *   console.log('source.txt was copied to destination.txt');
 * }
 *
 * // destination.txt will be created or overwritten by default.
 * copyFile('source.txt', 'destination.txt', callback);
 *
 * // By using COPYFILE_EXCL, the operation will fail if destination.txt exists.
 * copyFile('source.txt', 'destination.txt', constants.COPYFILE_EXCL, callback);
 * ```
 * @since v8.5.0
 * @param src source filename to copy
 * @param dest destination filename of the copy operation
 * @param [mode=0] modifiers for copy operation.
 * @see {@link fs.copyFile}
 * @see {@link fs.promises.copyFile}
 */
export const copyFile: typeof fs.copyFile & typeof fs.copyFile.__promisify__ = universalify(_copyFile);
/**
 * Write an array of `ArrayBufferView`s to the file specified by `fd` using`writev()`.
 *
 * `position` is the offset from the beginning of the file where this data
 * should be written. If `typeof position !== 'number'`, the data will be written
 * at the current position.
 *
 * The callback will be given three arguments: `err`, `bytesWritten`, and`buffers`. `bytesWritten` is how many bytes were written from `buffers`.
 *
 * If this method is `util.promisify()` ed, it returns a promise for an`Object` with `bytesWritten` and `buffers` properties.
 *
 * It is unsafe to use `fs.writev()` multiple times on the same file without
 * waiting for the callback. For this scenario, use {@link createWriteStream}.
 *
 * On Linux, positional writes don't work when the file is opened in append mode.
 * The kernel ignores the position argument and always appends the data to
 * the end of the file.
 * @since v12.9.0
 * @param [position='null']
 * @see {@link fs.writev}
 * @see {@link fs.promises.writev}
 */
export const writev: typeof fs.writev & typeof fs.writev.__promisify__ = universalify(_writev);
/**
 * Read from a file specified by `fd` and write to an array of `ArrayBufferView`s
 * using `readv()`.
 *
 * `position` is the offset from the beginning of the file from where data
 * should be read. If `typeof position !== 'number'`, the data will be read
 * from the current position.
 *
 * The callback will be given three arguments: `err`, `bytesRead`, and`buffers`. `bytesRead` is how many bytes were read from the file.
 *
 * If this method is invoked as its `util.promisify()` ed version, it returns
 * a promise for an `Object` with `bytesRead` and `buffers` properties.
 * @since v13.13.0, v12.17.0
 * @param [position='null']
 * @see {@link fs.readv}
 * @see {@link fs.promises.readv}
 */
export const readv: typeof fs.readv & typeof fs.readv.__promisify__ = universalify(_readv);
/**
 * Asynchronously open a directory. See the POSIX [`opendir(3)`](http://man7.org/linux/man-pages/man3/opendir.3.html) documentation for
 * more details.
 *
 * Creates an `fs.Dir`, which contains all further functions for reading from
 * and cleaning up the directory.
 *
 * The `encoding` option sets the encoding for the `path` while opening the
 * directory and subsequent read operations.
 * @since v12.12.0
 * @see {@link fs.opendir}
 * @see {@link fs.promises.opendir}
 */
export const opendir: typeof fs.opendir & typeof fs.opendir.__promisify__ = universalify(_opendir);

/**
 * Asynchronously copies the entire directory structure from `src` to `dest`,
 * including subdirectories and files.
 *
 * When copying a directory to another directory, globs are not supported and
 * behavior is similar to `cp dir1/ dir2/`.
 * @since v16.7.0
 * @experimental
 * @param src source path to copy.
 * @param dest destination path to copy to.
 */
export const cp: typeof fs.cp & {
    cp(source: string | URL, destination: string | URL): Promise<void>;
    cp(source: string | URL, destination: string | URL, opts: fs.CopyOptions): Promise<void>;
} = universalify(_cp) as any;

const Array_fromAsync = Array.fromAsync ?? async function fromAsync<T, U>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>, mapperFn: (value: Awaited<T>) => U): Promise<Awaited<U | T>[]> {
    const items: Awaited<U | T>[] = [];
    if (mapperFn) {
        if (Symbol.asyncIterator in iterableOrArrayLike || Symbol.iterator in iterableOrArrayLike) {
            for await (const item of iterableOrArrayLike) {
                items.push(await mapperFn(item));
            }
        } else if (Symbol.iterator in iterableOrArrayLike) {
            for (const item of iterableOrArrayLike as Iterable<T>) {
                items.push(await mapperFn(await item));
            }
        } else {
            const length = iterableOrArrayLike.length;
            for (let i = 0; i < length; i++) {
                const item = await iterableOrArrayLike[i];
                items.push(await mapperFn(item));
            }
        }
    } else {
        if (Symbol.asyncIterator in iterableOrArrayLike) {
            for await (const item of iterableOrArrayLike) {
                items.push(item);
            }
        } else if (Symbol.iterator in iterableOrArrayLike) {
            for (const item of iterableOrArrayLike) {
                items.push(await item);
            }
        } else {
            const length = iterableOrArrayLike.length;
            for (let i = 0; i < length; i++) {
                const item = await iterableOrArrayLike[i];
                items.push(item);
            }
        }
    }
    return items;
};

/**
 * Resolve a child file of a folder.
 * @param path The parent folder path
 * @param child The child filesystem entry path (can be a file or folder)
 * @returns `path` and `child` concatenated, delimited by whatever path separator is already used in the string,
 * defaulting to `/`; a delimiter is never added if it's not necessary.
 */
export function resolve(path: string, child: string): string {
    if (path.endsWith('/') || path.endsWith('\\')) {
        return path + child;
    }
    if (path.indexOf('/') > -1) {
        return path + '/' + child;
    }
    if (path.indexOf('\\') > -1) {
        return path + '\\' + child;
    }
    return path + '/' + child;
}

async function* _asyncFilter<T>(iterable: Iterable<T> | (ArrayLike<T> & Iterable<T>), condition: (value: T, index: number, iterable: Iterable<T> | (ArrayLike<T> & Iterable<T>)) => boolean | Promise<boolean>) {
    if ('length' in iterable) {
        for (let i = 0; i < iterable.length; i++) {
            let e = iterable[i];
            if (await condition(e, i, iterable)) {
                yield e;
            }
        }
    } else {
        let i = 0;
        for (const value of iterable) {
            if (await condition(value, i++, iterable)) {
                yield value;
            }
        }
    }
}

/**
 * Iterate through every file child of a folder, call a mapper function with each file's contents and write the returned
 * value of the mapper to the files. This will not recurse into subdirectories.
 * @param path folder path to iterate through
 * @param mapper mapping function to call on each file
 * @param readOptions options to pass to [[readFile]]
 * @param writeOptions options to pass to [[writeFile]]
 * @returns a [[Promise]] resolving to an array of the children files, once the mapping is finished.
 */
export async function mapChildren(
    path: string,
    mapper: MapChildrenFunction<string>,
    readOptions: { encoding: BufferEncoding } | BufferEncoding,
    writeOptions?: fs.WriteFileOptions | BufferEncoding
): Promise<string[]>;
export async function mapChildren(
    path: string,
    mapper: MapChildrenFunction<Buffer>,
    readOptions?: { encoding?: null | 'buffer' } | 'buffer' | null | undefined,
    writeOptions?: fs.WriteFileOptions | BufferEncoding
): Promise<string[]>;
export async function mapChildren(
    path: string,
    mapper: MapChildrenFunction<string> | MapChildrenFunction<Buffer>,
    readOptions?: { encoding: BufferEncoding } | BufferEncoding | { encoding?: null | 'buffer' } | 'buffer' | null | undefined,
    writeOptions?: fs.WriteFileOptions | BufferEncoding
): Promise<string[]> {
    const children = await Array_fromAsync(_asyncFilter((await readdir(path)).map(child => path + '/' + child), async e => !await isDirectory(e)));
    for (const e of children) {
        const contents = await (readFile as any)(e, readOptions);
        const filename = e.slice(e.lastIndexOf('/') + 1);
        let result = mapper(contents, filename, path, e);
        if (result instanceof Promise) {
            result = await result;
        }
        if (result != contents) {
            await writeFile(e, result, writeOptions);
        }
    }
    return children;
}

async function _mapStructureProcessFile(file: string, stat: fs.Stats, mapper: MapStructureFunction<string> | MapStructureFunction<Buffer>, readOptions: ReadFileOptions | BufferEncoding | undefined, writeOptions: fs.WriteFileOptions | BufferEncoding | undefined) {
    const contents = await readFile(file, readOptions);
    let result = mapper(contents as any, file, stat);
    if (result instanceof Promise) {
        result = await result;
    }
    if (result != contents) {
        await writeFile(file, result, writeOptions);
    }
}

/**
 * Iterate through every file child of a folder recursively, call a mapper function with each file's contents and write
 * the returned value of the mapper to the files. **when passing [[MapStructureFunctionAsync]] as a parameter,
 * operations are done in parallel; to avoid running out of file handles, or to maintain the order (as provided by
 * `dive`), use [[mapStructureOrdered]].**
 * @param path folder path to iterate through
 * @param mapper mapping function to call on each file
 * @param readOptions options to pass to [[readFile]]
 * @param writeOptions options to pass to [[writeFile]]
 * @returns a [[Promise]] resolving to an array of all processed files
 */
export async function mapStructure(
    path: string,
    mapper: MapStructureFunction<string>,
    readOptions: { encoding: BufferEncoding } | BufferEncoding,
    writeOptions?: fs.WriteFileOptions | BufferEncoding
): Promise<MapStructureResult[]>;
export async function mapStructure(
    path: string,
    mapper: MapStructureFunction<Buffer>,
    readOptions?: { encoding?: null | 'buffer' } | 'buffer' | null | undefined,
    writeOptions?: fs.WriteFileOptions | BufferEncoding
): Promise<MapStructureResult[]>;
export async function mapStructure(
    path: string,
    mapper: MapStructureFunction<string> | MapStructureFunction<Buffer>,
    readOptions?: { encoding: BufferEncoding } | BufferEncoding | { encoding?: null | 'buffer' } | 'buffer' | null | undefined,
    writeOptions?: fs.WriteFileOptions | BufferEncoding
): Promise<MapStructureResult[]> {
    const promiseArr: Promise<void>[] = [];
    const results: { file: string, stat: fs.Stats }[] = [];

    await dive(path, { all: true }, (file, stat) => {
        promiseArr.push(_mapStructureProcessFile(file, stat, mapper, readOptions as any, writeOptions));
        results.push({ file, stat });
    });

    await Promise.all(promiseArr);

    return results;
}

/**
 * Iterate through every file child of a folder recursively, call a mapper function with each file's contents and write
 * the returned value of the mapper to the files. **Mapper functions are invoked one at a time; to run them all at once,
 * use [[mapStructure]].**
 * @param path folder path to iterate through
 * @param mapper mapping function to call on each file
 * @param readOptions options to pass to [[readFile]]
 * @param writeOptions options to pass to [[writeFile]]
 * @returns a [[Promise]] resolving to an array of all processed files
 */
export async function mapStructureOrdered(
    path: string,
    mapper: MapStructureFunction<string>,
    readOptions: { encoding: BufferEncoding } | BufferEncoding,
    writeOptions?: fs.WriteFileOptions | BufferEncoding
): Promise<MapStructureResult[]>;
export async function mapStructureOrdered(
    path: string,
    mapper: MapStructureFunction<Buffer>,
    readOptions?: { encoding?: null | 'buffer' } | 'buffer' | null | undefined,
    writeOptions?: fs.WriteFileOptions | BufferEncoding
): Promise<MapStructureResult[]>;
export async function mapStructureOrdered(
    path: string,
    mapper: MapStructureFunction<string> | MapStructureFunction<Buffer>,
    readOptions?: { encoding: BufferEncoding } | BufferEncoding | { encoding?: null | 'buffer' } | 'buffer' | null | undefined,
    writeOptions?: fs.WriteFileOptions | BufferEncoding
): Promise<MapStructureResult[]> {
    const entries: { file: string, stat: fs.Stats }[] = [];

    for await (const [file, stat] of _diveWorker(path)) {
        entries.push({ file, stat });
        await _mapStructureProcessFile(file, stat, mapper, readOptions as any, writeOptions);
    }

    return entries;
}

async function _forEachChildHelper(path: string, options: (({ encoding: BufferEncoding | null } | BufferEncoding | null | undefined) & ({ encoding: 'buffer' } | 'buffer')) | undefined, func: (filename: string | Buffer) => void | Promise<void>) {
    const children: string[] | Buffer[] = await readdir(path, options);
    for (const child of children) {
        const ret = func(child);
        if (ret instanceof Promise) {
            await ret;
        }
    }
}

// forEachChild(path[, options], function(file)[, callback])
/**
 * Iterate through every child of a folder, asynchronously. This function will not recurse into subdirectories.
 * @param path folder path to iterate through
 * @param options options to pass through to [[readdir]]
 * @param func iterate function, called for every child
 * @param callback function to call after the operation finishes
 */
export function forEachChild(path: string, options: { encoding: BufferEncoding | null } | BufferEncoding | null | undefined | Record<string, never>, func: (filename: string) => void | Promise<void>): Promise<void>;
export function forEachChild(path: string, options: { encoding: 'buffer' } | 'buffer', func: (filename: Buffer) => void | Promise<void>): Promise<void>;
export function forEachChild(path: string, func: (filename: string) => void | Promise<void>): Promise<void>;
export function forEachChild(path: string, options: { encoding: BufferEncoding | null } | BufferEncoding | null | undefined | Record<string, never>, func: (filename: string) => void, callback: ErrorCallback): void;
export function forEachChild(path: string, options: { encoding: 'buffer' } | 'buffer', func: (filename: Buffer) => void, callback: ErrorCallback): void;
export function forEachChild(path: string, func: (filename: string) => void, callback: ErrorCallback): void;
export function forEachChild(
    path: string,
    o1: (
        | ({ encoding: BufferEncoding | null } | BufferEncoding | null | undefined | Record<string, never>)
        | ({ encoding: 'buffer' } | 'buffer')
        | ((filename: string) => void | Promise<void>)
        | ((filename: Buffer) => void | Promise<void>)
    ),
    o2?: (
        | ((filename: string) => void | Promise<void>)
        | ((filename: Buffer) => void | Promise<void>)
        | ErrorCallback
    ),
    o3?: ErrorCallback,
): void | Promise<void> {
    const options = typeof o1 == 'object' ? (o1 as ({ encoding: BufferEncoding | null } | BufferEncoding | null | undefined) & ({ encoding: 'buffer' } | 'buffer')) : undefined;
    const func = (!options ? o1 : o2) as (filename: string | Buffer) => void | Promise<void>;
    const callback = (!options ? o2 : o3) as ErrorCallback | undefined;

    // promise
    if (!callback) {
        return _forEachChildHelper(path, options, func);
    }
    // legacy
    readdir(path, options, (err, children) => {
        if (err) {
            callback(err);
        } else {
            for (const child of children) {
                func(child);
            }
            callback();
        }
    });
}

// forEachChildSync(function(file)[, options])
/**
 * Iterate through every child of a folder, synchronously. This function will not recurse into subdirectories.
 * @param path folder path to iterate through
 * @param func iterate function, called for every child
 * @param options options to pass through to [[readdirSync]]
 */
export function forEachChildSync(path: string, func: (filename: string) => void, options: { encoding: BufferEncoding | null } | BufferEncoding | null | undefined | Record<string, never>): void;
export function forEachChildSync(path: string, func: (filename: Buffer) => void, options?: { encoding: 'buffer' } | 'buffer'): void;
export function forEachChildSync(
    path: string,
    func: (filename: string & Buffer) => void,
    options?: (
        | ({ encoding: 'buffer' } | 'buffer')
        | ({ encoding: BufferEncoding | null } | BufferEncoding | null | undefined | Record<string, never>)
    )
) {
    const children: string[] | Buffer[] = readdirSync(path, options as (({ encoding: 'buffer' } | 'buffer') & ({ encoding: BufferEncoding | null } | BufferEncoding | null | undefined)) | undefined);
    for (const child of children) {
        (func as (filename: string | Buffer) => void)(child);
    }
}

async function* _diveWorker(directory: string, options: DiveOptions = {}): AsyncGenerator<[file: string, stat: fs.Stats]> {
    const children = await readdir(directory, { withFileTypes: true });

    if (children.length === 0) {
        if (options.directories) {
            yield [directory, await stat(directory)];
        }
    }

    for (const item of children) {
        if (!options.all && item.name.startsWith('.')) {
            continue;
        }

        const path = pathResolve(item.path, item.name);
        if (item.isDirectory()) {
            if (options.recursive) {
                yield* _diveWorker(path, options);
            } else if (options.directories) {
                if (!options.ignore || !matches(path, options.ignore)) {
                    yield [path, await stat(path)];
                }
            }
        } else if (options.files) {
            if (!options.ignore || !matches(path, options.ignore)) {
                yield [path, await stat(path)];
            }
        }
    }
}

async function _diveHelper(directory: string, action: DiveActionPromise, options: DiveOptions = {}) {
    for await (const [file, stat] of _diveWorker(directory, options)) {
        action(file, stat);
    }
}

async function _diveHelperCallback(directory: string, action: DiveActionCallback, options: DiveOptions = {}) {
    try {
        for await (const [file, stat] of _diveWorker(directory, options)) {
            action(null, file, stat);
        }
    } catch (err) {
        action(err as Error);
    }
}

function matches(str: string, test: string | RegExp) {
    if (typeof test === 'string') {
        return str.includes(test);
    } else {
        return test.test(str);
    }
}

// dive(directory[, options], action[, complete]);
/**
 * Recursively walk (“dive”) a directory tree.
 * @param directory the pathname of a readable directory
 * @param options an object that defines some of the properties
 * @param action function that is called on each file
 * @param complete defines a second callback, that is called, when all files have been processed. It takes no arguments.
 * @example
 * Default:
 * ```
 * var dive = require('dive');
 *
 * dive(process.cwd(), function(err, file) {
 *
 * });```
 *
 * All files and a callback in the end:
 * ```
 * var dive = require('dive');
 *
 * dive(process.cwd(), { all: true }, function(err, file, stat) {
 *   if (err) throw err;
 *   console.log(file);
 * }, function() {
 *   console.log('complete');
 * });```
 *
 * Directories only:
 * ```
 * var dive = require('dive');
 *
 * dive(process.cwd(), { directories: true, files: false }, function(err, dir) {
 *   if (err) throw err;
 *   console.log(dir);
 * });```
 */
export function dive(directory: string, options: DiveOptions, action: DiveActionCallback, complete: () => void): void;
export function dive(directory: string, options: DiveOptions, action: DiveActionPromise): Promise<void>;
export function dive(directory: string, action: DiveActionCallback, complete: () => void): void;
export function dive(directory: string, action: DiveActionPromise): Promise<void>;
export function dive(directory: string, o1: DiveOptions | DiveActionCallback | DiveActionPromise, o2?: DiveActionCallback | DiveActionPromise | (() => void), o3?: () => void): void | Promise<void> {
    let options = typeof o1 == 'object' ? o1 : undefined;
    const action = (!options ? o1 : o2) as DiveActionCallback | DiveActionPromise;
    const complete = (!options ? o2 : o3) as (() => void) | undefined;

    options = Object.assign({
        recursive: true,
        all: true,
        files: true
    }, options ?? {});

    if (!complete) {
        return _diveHelper(directory, action as DiveActionPromise, options);
    }

    return _diveHelperCallback(directory, action as DiveActionCallback, options)
        .finally(complete);
}

function* _diveSyncWorker(directory: string, options: DiveOptions = {}): Generator<string> {
    const children = readdirSync(directory, { withFileTypes: true });

    if (children.length === 0) {
        if (options.directories) {
            yield directory;
        }
    }

    for (const item of children) {
        if (!options.all && item.name.startsWith('.')) {
            continue;
        }

        const path = pathResolve(item.path, item.name);
        if (item.isDirectory()) {
            if (options.recursive) {
                yield* _diveSyncWorker(path, options);
            } else if (options.directories) {
                if (!options.ignore || !matches(path, options.ignore)) {
                    yield path;
                }
            }
        } else if (options.files) {
            if (!options.ignore || !matches(path, options.ignore)) {
                yield path;
            }
        }
    }
}

// diveSync(dir[, opt])
/**
 * The synchronous version of [[dive]]. Improved version of the `diveSync` module.
 * @param path the pathname of a readable directory
 * @param options an object that defines some of the properties
 * @returns an array of the found file paths
 * @example ```
 * const files = fs.diveSync(process.cwd());
 *
 * for (let i in files) {
 *
 * }
 *
 * for (let file of files) {
 *
 * }
 *
 * files.forEach(function(file, i) {
 *
 * });
 *
 * for (let i = 0; i < files.length; i++) {
 *
 * }
 * ```
 */
export function diveSync(directory: string, options: DiveOptions = {}): string[] {
    options = Object.assign({
        recursive: true,
        all: true,
        files: true
    }, options);
    return [..._diveSyncWorker(directory, options)];
}

function _readLinesHelper(path: fs.PathOrFileDescriptor, encoding: BufferEncoding, resolve: (data: string[]) => void, reject: (err: NodeJS.ErrnoException | null) => void) {
    readFile(path, encoding, (err, data) => {
        if (err) {
            reject(err);
        } else if (data.indexOf('\r\n') > -1) {
            resolve(data.split('\r\n'));
        } else if (data.indexOf('\n') > -1) {
            resolve(data.split('\n'));
        } else resolve([data]);
    });
}

// readLines(path[, encoding][, callback])
/**
 * Read a file into a string array of its lines.
 * @param path the path to the file to read
 * @param encoding the encoding to use to read the file
 * @param callback callback function to call with the file's lines, or a value for `err` if the operation fails
 */
export function readLines(path: string, encoding: BufferEncoding, callback: (err: NodeJS.ErrnoException | null, lines?: string[]) => void): void;
export function readLines(path: string, callback: (err: NodeJS.ErrnoException | null, lines?: string[]) => void): void;
export function readLines(path: string, encoding?: BufferEncoding): Promise<string[]>;
export function readLines(path: string, o1?: BufferEncoding | ((err: NodeJS.ErrnoException | null, lines?: string[]) => void), o2?: (err: NodeJS.ErrnoException | null, lines?: string[]) => void): void | Promise<string[]> {
    const encoding = typeof o1 == 'string' ? o1 : 'utf8';
    const callback = typeof o1 == 'string' ? o2 : o1;
    if (!callback) {
        return new Promise((resolve, reject) => {
            _readLinesHelper(path, encoding, resolve, reject);
        });
    }
    // legacy (non-promise)
    _readLinesHelper(path, encoding, e => callback(null, e), callback);
}

// readLinesSync(path[, encoding])
/**
 * Synchronously read a file into a string array of its lines.
 * @param path the path to the file to read
 * @param encoding the encoding to use to read the file, default is UTF-8
 * @returns the file's lines
 */
export function readLinesSync(path: string, encoding: BufferEncoding = 'utf8'): string[] {
    const data = readFileSync(path, encoding);
    if (data.indexOf('\r\n') > -1) {
        return data.split('\r\n');
    }
    if (data.indexOf('\n') > -1) {
        return data.split('\n');
    }
    return [data];
}

/**
 * Shorter version of [[readFile]] where the encoding is UTF-8.
 * @param path the path to the file to read
 * @param callback callback function to call with the file's text contents, or a value for `err` if the operation fails
 */
export function readText(path: string, callback: (err: NodeJS.ErrnoException | null, text: string) => void): void;
export function readText(path: string): Promise<string>;
export function readText(path: string, callback?: (err: NodeJS.ErrnoException | null, text: string) => void): void | Promise<string> {
    if (!callback) {
        return readFile(path, 'utf8');
    }
    // legacy (non-promise)
    readFile(path, 'utf8', callback);
}

/**
 * Shorter version of [[readFileSync]] where the encoding is UTF-8.
 * @param path the path to the file to read
 * @returns the file's text contents
 */
export function readTextSync(path: string) {
    return readFileSync(path, 'utf8');
}

async function _isDirectoryHelper(path: string) {
    return (await stat(path)).isDirectory();
}

// check if file path is directory, from https://github.com/overlookmotel/fs-extra-promise
/**
 * Check if the file at a path is a directory.
 * @param path the path to the file to check
 * @param callback callback function to call with whether or not the file is a directory, or a value for `err` if the
 * operation fails
 */
export function isDirectory(path: string, callback: (err: NodeJS.ErrnoException | null, text?: boolean) => void): void;
export function isDirectory(path: string): Promise<boolean>;
export function isDirectory(path: string, callback?: (err: NodeJS.ErrnoException | null, text?: boolean) => void): void | Promise<boolean> {
    if (!callback) {
        return _isDirectoryHelper(path);
    }
    // legacy (non-promise)
    stat(path, (err, stats) => {
        if (err) return callback(err);

        callback(null, stats.isDirectory());
    });
}

/**
 * Check if the file at a path is a directory.
 * @param path the path to the file to check
 * @returns whether or not the file is a directory
 */
export function isDirectorySync(path: string): boolean {
    return statSync(path).isDirectory();
}

/**
 * Check if the file at a path is a symbolic link.
 * @param path the path to the file to check
 * @param callback callback function to call with whether or not the file is a symbolic link, or a value for `err` if the
 * operation fails
 */
export function isSymlink(file: string): Promise<boolean>;
export function isSymlink(file: string, callback?: (err: NodeJS.ErrnoException | null, isSymblink?: boolean) => void): void;
export function isSymlink(file: string, callback?: (err: NodeJS.ErrnoException | null, isSymblink?: boolean) => void): Promise<boolean> | void {
    return callback
        ? lstat(file, (err, stats) => err ? callback(err) : callback(null, stats.isSymbolicLink()))
        : lstat(file).then(stats => stats.isSymbolicLink());
}

function combine<T extends unknown[]>(fn1?: (...args: T) => boolean, fn2?: (...args: T) => boolean): (...args: T) => boolean {
    if (fn1) {
        if (fn2) return (...args) => fn1(...args) && fn2(...args);
        return fn1;
    } else {
        if (fn2) return fn2;
        return () => true;
    }
}

export type JsonReadOptions =
    | {
        encoding?: BufferEncoding | null;
        flag?: string;
        throws?: boolean;
        fs?: typeof import('fs');
        reviver?: (key: any, value: any) => any;
    }
    | BufferEncoding
    | null
    | undefined;

export type JsonWriteOptions =
    | {
        encoding?: BufferEncoding | null;
        mode?: string | number;
        flag?: string;
        fs?: typeof import('fs');
        EOL?: string;
        finalEOL?: boolean;
        spaces?: string | number;
        replacer?: ((key: string, value: any) => any);
    }
    | BufferEncoding
    | null
    | undefined;

async function _readJson<T>(file: fs.PathOrFileDescriptor, options: JsonReadOptions): Promise<T | null> {
    if (typeof options === 'string') {
        options = { encoding: options };
    }

    const _readFile = options?.fs?.readFile ? universalify(options.fs.readFile) : readFile;

    const shouldThrow = options?.throws ?? true;

    let data = stripBom(await _readFile(file, options));

    let obj: T;
    try {
        obj = JSON.parse(data, options?.reviver);
    } catch (err) {
        if (shouldThrow) {
            if (err instanceof Error) {
                (err as any).message = `${file}: ${err.message}`;
                throw err;
            } else {
                throw new Error(`${file}: ${err}`);
            }
        } else {
            return null;
        }
    }

    return obj;
}

/**
 * @see {@link https://github.com/jprichardson/node-jsonfile#readfilefilename-options-callback}
 */
export function readJson(file: fs.PathOrFileDescriptor, options: JsonReadOptions, callback: ReadCallback): void;
export function readJson(file: fs.PathOrFileDescriptor, callback: ReadCallback): void;
export function readJson(file: fs.PathOrFileDescriptor, options?: JsonReadOptions): Promise<any>;
export function readJson(file: fs.PathOrFileDescriptor, o1?: JsonReadOptions | ReadCallback, o2?: ReadCallback): void | Promise<any> {
    let options = (o2 ?? (typeof o1 !== 'function' ? o1 : undefined)) as JsonReadOptions;
    const callback = (o2 ?? (options === undefined ? o1 : undefined)) as ReadCallback | undefined;

    if (!callback) {
        return _readJson(file, options);
    }

    return _readJson(file, options)
        .then(result => callback(null, result), error => callback(error, undefined));
}

function stringify(obj: unknown, { EOL = '\n', finalEOL = true, replacer = undefined, spaces = undefined }: Extract<JsonWriteOptions, object>) {
    const EOF = finalEOL ? EOL : '';
    const str = JSON.stringify(obj, replacer, spaces);

    return str.replace(/\n/g, EOL) + EOF;
}

function stripBom(content: string | Buffer): string {
    // we do this because JSON.parse would convert it to a utf8 string if encoding wasn't specified
    if (Buffer.isBuffer(content)) content = content.toString('utf8')
    return content.replace(/^\uFEFF/, '')
}

/**
 * @see {@link https://github.com/jprichardson/node-jsonfile#readfilesyncfilename-options}
 */
export function readJsonSync(file: fs.PathOrFileDescriptor, options?: JsonReadOptions): any {
    if (typeof options === 'string') {
        options = { encoding: options };
    }

    const _readFileSync = options?.fs?.readFileSync ?? readFileSync;

    const shouldThrow = options?.throws ?? true;

    try {
        const content = stripBom(_readFileSync(file, options));
        return JSON.parse(content, options?.reviver);
    } catch (err) {
        if (shouldThrow) {
            if (err instanceof Error) {
                (err as any).message = `${file}: ${err.message}`;
                throw err;
            } else {
                throw new Error(`${file}: ${err}`);
            }
        } else {
            return null;
        }
    }
}

async function _writeJson(file: fs.PathOrFileDescriptor, obj: any, options: JsonWriteOptions) {
    if (typeof options === 'string') {
        options = { encoding: options };
    }

    const _writeFile = options?.fs?.writeFile ? universalify(options.fs.writeFile) : writeFile;

    const str = stringify(obj, options!);

    await _writeFile(file, str, options);
}

/**
 * @see {@link https://github.com/jprichardson/node-jsonfile#writefilefilename-obj-options-callback}
 */
export function writeJson(file: fs.PathOrFileDescriptor, obj: any, options: JsonWriteOptions, callback: WriteCallback): void;
export function writeJson(file: fs.PathOrFileDescriptor, obj: any, callback: WriteCallback): void;
export function writeJson(file: fs.PathOrFileDescriptor, obj: any, options?: JsonWriteOptions): Promise<void>;
export function writeJson(file: fs.PathOrFileDescriptor, obj: any, o1?: WriteCallback | JsonWriteOptions, o2?: WriteCallback): Promise<void> {
    let options = (o2 ?? (typeof o1 !== 'function' ? o1 : undefined)) as JsonWriteOptions;
    const callback = (o2 ?? (options === undefined ? o1 : undefined)) as WriteCallback | undefined;

    if (!callback) {
        return _writeJson(file, obj, options);
    }

    return _writeJson(file, obj, options)
        .then(() => callback(null), error => callback(error));
}

/**
 * @see {@link https://github.com/jprichardson/node-jsonfile#writefilesyncfilename-obj-options}
 */
export function writeJsonSync(file: fs.PathOrFileDescriptor, obj: any, options?: JsonWriteOptions): void {
    if (typeof options === 'string') {
        options = { encoding: options };
    }

    const _writeFileSync = options?.fs?.writeFileSync ?? writeFileSync;

    const str = stringify(obj, options ?? {});
    _writeFileSync(file, str, options);
}