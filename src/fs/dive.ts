import { resolve as pathResolve } from 'path';
import type { ReadFileOptions, MapStructureResult, ErrorCallback, DiveActionCallback, DiveActionPromise, DiveOptions, MapChildrenFunction, MapStructureFunction } from '../types';
import * as fs from './index';

function matches(str: string, test: string | RegExp) {
    if (typeof test === 'string') {
        return str.includes(test);
    } else {
        return test.test(str);
    }
}

/**
 * @internal
 * @param directory
 * @param options
 */
export async function* _diveWorker(directory: string, options: DiveOptions = {}): AsyncGenerator<[file: string, stat: fs.Stats]> {
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
    const children = fs.readdirSync(directory, { withFileTypes: true });

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
