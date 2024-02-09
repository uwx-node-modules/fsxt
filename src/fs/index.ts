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

    type promises as fsPromises,
} from 'graceful-fs';

import type * as fs from 'fs';

export * from 'graceful-fs';

import { universalify } from './universalify';

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
 * @see {@link fsPromises.rename}
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
 * @see {@link fsPromises.truncate}
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
 * @see {@link fsPromises.ftruncate}
 */
export const ftruncate: typeof fs.ftruncate & typeof fs.ftruncate.__promisify__ = universalify(_ftruncate);
/**
 * Asynchronously changes owner and group of a file. No arguments other than a
 * possible exception are given to the completion callback.
 *
 * See the POSIX [`chown(2)`](http://man7.org/linux/man-pages/man2/chown.2.html) documentation for more detail.
 * @since v0.1.97
 * @see {@link fs.chown}
 * @see {@link fsPromises.chown}
 */
export const chown: typeof fs.chown & typeof fs.chown.__promisify__ = universalify(_chown);
/**
 * Sets the owner of the file. No arguments other than a possible exception are
 * given to the completion callback.
 *
 * See the POSIX [`fchown(2)`](http://man7.org/linux/man-pages/man2/fchown.2.html) documentation for more detail.
 * @since v0.4.7
 * @see {@link fs.fchown}
 * @see {@link fsPromises.fchown}
 */
export const fchown: typeof fs.fchown & typeof fs.fchown.__promisify__ = universalify(_fchown);
/**
 * Set the owner of the symbolic link. No arguments other than a possible
 * exception are given to the completion callback.
 *
 * See the POSIX [`lchown(2)`](http://man7.org/linux/man-pages/man2/lchown.2.html) documentation for more detail.
 * @see {@link fs.lchown}
 * @see {@link fsPromises.lchown}
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
 * @see {@link fsPromises.lutimes}
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
 * @see {@link fsPromises.chmod}
 */
export const chmod: typeof fs.chmod & typeof fs.chmod.__promisify__ = universalify(_chmod);
/**
 * Sets the permissions on the file. No arguments other than a possible exception
 * are given to the completion callback.
 *
 * See the POSIX [`fchmod(2)`](http://man7.org/linux/man-pages/man2/fchmod.2.html) documentation for more detail.
 * @since v0.4.7
 * @see {@link fs.fchmod}
 * @see {@link fsPromises.fchmod}
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
 * @see {@link fsPromises.lchmod}
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
 * @see {@link fsPromises.stat}
 */
export const stat: typeof fs.stat & typeof fs.stat.__promisify__ = universalify(_stat);
/**
 * Invokes the callback with the `fs.Stats` for the file descriptor.
 *
 * See the POSIX [`fstat(2)`](http://man7.org/linux/man-pages/man2/fstat.2.html) documentation for more detail.
 * @since v0.1.95
 * @see {@link fs.fstat}
 * @see {@link fsPromises.fstat}
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
 * @see {@link fsPromises.lstat}
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
 * @see {@link fsPromises.statfs}
 */
export const statfs: typeof fs.statfs & typeof fs.statfs.__promisify__ = universalify(_statfs);
/**
 * Creates a new link from the `existingPath` to the `newPath`. See the POSIX [`link(2)`](http://man7.org/linux/man-pages/man2/link.2.html) documentation for more detail. No arguments other than
 * a possible
 * exception are given to the completion callback.
 * @since v0.1.31
 * @see {@link fs.link}
 * @see {@link fsPromises.link}
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
 * @see {@link fsPromises.symlink}
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
 * @see {@link fsPromises.readlink}
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
 * @see {@link fsPromises.realpath}
 */
export const realpath: typeof fs.realpath & typeof fs.realpath.__promisify__ & {
    native: {
        (path: fs.PathLike, options: fs.EncodingOption): Promise<string>;
        (path: fs.PathLike, options: fs.BufferEncodingOption): Promise<Buffer>;
        (path: fs.PathLike, options: fs.EncodingOption): Promise<string | Buffer>;
        (path: fs.PathLike): Promise<string>;
    }
} = universalify(_realpath) as any;
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
 * @see {@link fsPromises.unlink}
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
 * @see {@link fsPromises.rmdir}
 */
export const rmdir: typeof fs.rmdir & typeof fs.rmdir.__promisify__ = universalify(_rmdir);
/**
 * Asynchronously removes files and directories (modeled on the standard POSIX `rm`utility). No arguments other than a possible exception are given to the
 * completion callback.
 * @since v14.14.0
 * @see {@link fs.rm}
 * @see {@link fsPromises.rm}
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
 * @see {@link fsPromises.mkdir}
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
 * @see {@link fsPromises.mkdtemp}
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
 * @see {@link fsPromises.readdir}
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
 * @see {@link fsPromises.close}
 */
export const close: typeof fs.close.__promisify__ & typeof fs.close = universalify(_close); // NB: the order of __promisify__ is reversed here because the callback to fs.close() is marked optional.
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
 * @see {@link fsPromises.open}
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
 * @see {@link fsPromises.utimes}
 */
export const utimes: typeof fs.utimes & typeof fs.utimes.__promisify__ = universalify(_utimes);
/**
 * Change the file system timestamps of the object referenced by the supplied file
 * descriptor. See {@link utimes}.
 * @since v0.4.2
 * @see {@link fs.futimes}
 * @see {@link fsPromises.futimes}
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
 * @see {@link fsPromises.write}
 */
export const write: typeof fs.write & typeof fs.write.__promisify__ = universalify(_write, (bytesWritten, buffer) => ({bytesWritten, buffer}));
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
 * @see {@link fsPromises.read}
 */
export const read: typeof fs.read & typeof fs.read.__promisify__ = universalify(_read, (bytesRead, buffer) => ({bytesRead, buffer}));
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
 * When the path is a directory, the behavior of `fs.readFile()` and {@link fs.readFileSync} is platform-specific. On macOS, Linux, and Windows, an
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
 * @see {@link fsPromises.readFile}
 */
export const readFile: typeof fs.readFile & typeof fs.readFile.__promisify__ = universalify(_readFile);

export { writeFile } from './write-file';

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
 * @see {@link fsPromises.appendFile}
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
 * @see {@link fsPromises.access}
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
 * @see {@link fsPromises.copyFile}
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
 * @see {@link fsPromises.writev}
 */
export const writev: typeof fs.writev & typeof fs.writev.__promisify__ = universalify(_writev, (bytesWritten, buffers) => ({bytesWritten, buffers}));
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
 * @see {@link fsPromises.readv}
 */
export const readv: typeof fs.readv & typeof fs.readv.__promisify__ = universalify(_readv, (bytesRead, buffers) => ({bytesRead, buffers}));
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
 * @see {@link fsPromises.opendir}
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

if (typeof _realpath.native === 'function') {
    realpath.native = universalify(_realpath.native) as any;
} else {
    process.emitWarning(
        'fs.realpath.native is not a function. Is fs being monkey-patched?',
        'Warning', 'fs-extra-WARN0003'
    );
}
