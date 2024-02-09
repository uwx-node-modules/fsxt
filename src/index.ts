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
export { dive, diveSync } from './fs/dive';
export { forEachChild, forEachChildSync } from './fs/for-each-child';
export { isDirectory, isDirectorySync } from './fs/is-directory';
export { mapChildren } from './fs/map-children';
export { mapStructure, mapStructureOrdered } from './fs/map-structure';
export { readLines, readLinesSync } from './fs/read-lines';
export { readText, readTextSync } from './fs/read-text';
export { writeFile } from './fs/write-file';

import * as fs from './fs';

export * from './json';

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
