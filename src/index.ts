import { resolve as pathResolve } from 'path';
import type { ReadFileOptions, MapStructureResult, ErrorCallback, DiveActionCallback, DiveActionPromise, DiveOptions, MapChildrenFunction, MapStructureFunction } from './types';

// export types
export type * from './types';
export type { CopyOptions, CopyOptionsSync, EnsureDirOptions, SymlinkType, MoveOptions, JsonOutputOptions } from 'fs-extra';
export * from './fs';

// export other stuff
export { default as vacuum } from './external/vacuum';
export { copy, copySync } from '../lib/copy';
export { emptyDir, emptyDirSync } from '../lib/empty';
export { ensureFile, ensureFileSync, ensureLink, ensureLinkSync, ensureSymlink, ensureSymlinkSync } from '../lib/ensure';
export { mkdirs, mkdirsSync, mkdirs as ensureDir, mkdirsSync as ensureDirSync } from '../lib/mkdirs';
export { move, moveSync } from '../lib/move';
export { outputFile, outputFileSync } from '../lib/output-file';
export { remove, removeSync } from '../lib/remove';
export { exists } from './fs/exists';

import * as fs from './fs';

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

    readdirSync, readFileSync, statSync,
} from 'graceful-fs';
import { inspect } from 'util';

export * from './json';

// eslint-disable-next-line @typescript-eslint/unbound-method, camelcase
const Array_fromAsync = Array.fromAsync ?? async function fromAsync<T, U>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>> | ArrayLike<T | PromiseLike<T>>, mapperFn: (value: Awaited<T>) => U | PromiseLike<U>): Promise<Awaited<U | T>[]> {
    const items: Awaited<U | T>[] = [];
    if (mapperFn) {
        if (Symbol.asyncIterator in iterableOrArrayLike) {
            for await (const item of iterableOrArrayLike) {
                items.push(await mapperFn(item));
            }
        } else if (Symbol.iterator in iterableOrArrayLike) {
            for (const item of iterableOrArrayLike) {
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
        return `${path}/${child}`;
    }
    if (path.indexOf('\\') > -1) {
        return `${path}\\${child}`;
    }
    return `${path}/${child}`;
}

async function* _asyncFilter<T>(iterable: Iterable<T> | (ArrayLike<T> & Iterable<T>), condition: (value: T, index: number, iterable: Iterable<T> | (ArrayLike<T> & Iterable<T>)) => boolean | Promise<boolean>) {
    let i = 0;
    for (const value of iterable) {
        if (await condition(value, i++, iterable)) {
            yield value;
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
    const children = await Array_fromAsync(_asyncFilter((await fs.readdir(path)).map(child => path + '/' + child), async e => !await isDirectory(e)));
    for (const e of children) {
        const contents = await (fs.readFile as any)(e, readOptions);
        const filename = e.slice(e.lastIndexOf('/') + 1);
        let result = mapper(contents, filename, path, e);
        if (result instanceof Promise) {
            result = await result;
        }
        if (result != contents) {
            await fs.writeFile(e, result, writeOptions);
        }
    }
    return children;
}

async function _mapStructureProcessFile(file: string, stat: fs.Stats, mapper: MapStructureFunction<string> | MapStructureFunction<Buffer>, readOptions: ReadFileOptions | BufferEncoding | undefined, writeOptions: fs.WriteFileOptions | BufferEncoding | undefined) {
    const contents = await fs.readFile(file, readOptions);
    let result = mapper(contents as any, file, stat);
    if (result instanceof Promise) {
        result = await result;
    }
    if (result != contents) {
        await fs.writeFile(file, result, writeOptions);
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
    const children: string[] | Buffer[] = await fs.readdir(path, options);
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
    fs.readdir(path, options, (err, children) => {
        if (err) {
            callback(err);
        } else {
            for (const child of children) {
                (func as (filename: string | Buffer) => void)(child);
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
    const children = await fs.readdir(directory, { withFileTypes: true });

    if (children.length === 0) {
        if (options.directories) {
            yield [directory, await fs.stat(directory)];
        }
    }

    for (const item of children) {
        if (!options.all && item.name.startsWith('.')) {
            continue;
        }

        const path = pathResolve(item.path ?? directory, item.name);
        if (item.isDirectory()) {
            if (options.recursive) {
                yield* _diveWorker(path, options);
            } else if (options.directories) {
                if (!options.ignore || !matches(path, options.ignore)) {
                    yield [path, await fs.stat(path)];
                }
            }
        } else if (options.files) {
            if (!options.ignore || !matches(path, options.ignore)) {
                yield [path, await fs.stat(path)];
            }
        }
    }
}

async function _diveHelper(directory: string, action: DiveActionPromise, options: DiveOptions = {}) {
    for await (const [file, stat] of _diveWorker(directory, options)) {
        await action(file, stat);
    }
}

async function _diveWorkerCallback(directory: string, action: DiveActionCallback, options: DiveOptions = {}) {
    let children: fs.Dirent[] | undefined;
    let err: Error | undefined;
    try {
        children = await fs.readdir(directory, { withFileTypes: true });
    } catch (err1) {
        err = err1 as Error;
    }

    if (!children || children.length === 0) {
        if (options.directories) {
            action(null, directory, await fs.stat(directory));
        }
    }

    if (err) {
        action(err);
        return;
    }

    for (const item of children!) {
        if (!options.all && item.name.startsWith('.')) {
            continue;
        }

        try {
            const path = pathResolve(item.path ?? directory, item.name);
            if (item.isDirectory()) {
                if (options.recursive) {
                    await _diveWorkerCallback(path, action, options);
                } else if (options.directories) {
                    if (!options.ignore || !matches(path, options.ignore)) {
                        action(null, path, await fs.stat(path));
                    }
                }
            } else if (options.files) {
                if (!options.ignore || !matches(path, options.ignore)) {
                    action(null, path, await fs.stat(path));
                }
            }
        } catch (err) {
            action(err as Error);
        }
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

    options = {
        recursive: true,
        all: true,
        files: true,
        ...options
    };

    if (!complete) {
        return _diveHelper(directory, action as DiveActionPromise, options);
    }

    void _diveWorkerCallback(directory, action as DiveActionCallback, options)
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

        const path = pathResolve(item.path ?? directory, item.name);
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
    options = {
        recursive: true,
        all: true,
        files: true,

        ...options
    };

    return [..._diveSyncWorker(directory, options)];
}

function _readLinesHelper(path: fs.PathOrFileDescriptor, encoding: BufferEncoding, resolve: (data: string[]) => void, reject: (err: NodeJS.ErrnoException | null) => void) {
    fs.readFile(path, encoding, (err, data) => {
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
        return fs.readFile(path, 'utf8');
    }
    // legacy (non-promise)
    fs.readFile(path, 'utf8', callback);
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
    return (await fs.stat(path)).isDirectory();
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
    fs.stat(path, (err, stats) => {
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
        ? fs.lstat(file, (err, stats) => err ? callback(err) : callback(null, stats.isSymbolicLink()))
        : fs.lstat(file).then(stats => stats.isSymbolicLink());
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
