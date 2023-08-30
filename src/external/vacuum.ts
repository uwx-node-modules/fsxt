'use strict';

import assert from 'assert';
import { dirname } from 'path';
import { resolve } from 'path';
import isInside from './path-is-inside';

import { lstat, readdir, unlink, rm, rmdir } from 'graceful-fs';

import type { VacuumOptions, ErrorCallback } from '../types';

const noop = () => {};

/**
 * Remove the empty branches of a directory tree, optionally up to (but not including) a specified base directory.
 * Optionally nukes the leaf directory.
 * @param directory Leaf node to remove. **Must be a directory, symlink, or file.**
 * @param options Options for `fs-vacuum`.
 * @param callback Function to call once vacuuming is complete.
 * @example ```
 * var logger = require("npmlog");
 * var vacuum = require("fs-vacuum");
 *
 * var options = {
 *   base  : "/path/to/my/tree/root",
 *   purge : true,
 *   log   : logger.silly.bind(logger, "myCleanup")
 * };
 *
 * // Assuming there are no other files or directories in "out", "to", or "my",
 * // the final path will just be "/path/to/my/tree/root".
 * vacuum("/path/to/my/tree/root/out/to/my/files", function (error) {
 *   if (error) console.error("Unable to cleanly vacuum:", error.message);
 * });
 * ```
 */
export default function vacuum(directory: string, options?: VacuumOptions): Promise<void>;
export default function vacuum(directory: string, options?: VacuumOptions, callback?: ErrorCallback): void;
export default function vacuum(leaf: string, options: VacuumOptions = {}, cb?: ErrorCallback): void | Promise<void> {
    if (cb === undefined) {
        return new Promise((resolve, reject) => {
            vacuum(leaf, options, err => err ? reject(err) : resolve());
        });
    }

    assert(typeof leaf === 'string', 'must pass in path to remove');
    assert(typeof options === 'object', 'options must be an object');
    assert(typeof cb === 'function', 'must pass in callback');

    const log = options.log ?? noop;

    leaf = leaf && resolve(leaf);
    var base = options.base && resolve(options.base);
    if (base && !isInside(leaf, base)) {
        return cb(new Error(leaf + ' is not a child of ' + base));
    }

    lstat(leaf, (error, stat) => {
        if (error) {
            if (error.code === 'ENOENT') return cb(null);

            log(error.stack);
            return cb(error);
        }

        if (!(stat && (stat.isDirectory() || stat.isSymbolicLink() || stat.isFile()))) {
            log(leaf, 'is not a directory, file, or link');
            return cb(new Error(leaf + ' is not a directory, file, or link'));
        }

        if (options.purge) {
            log('purging', leaf);
            rm(leaf, { recursive: true, force: true }, error => {
                if (error) return cb(error);

                next(dirname(leaf));
            });
        } else if (!stat.isDirectory()) {
            log('removing', leaf);
            unlink(leaf, error => {
                if (error) return cb(error);

                next(dirname(leaf));
            });
        } else {
            next(leaf);
        }
    });

    function next(branch: string) {
        branch = branch && resolve(branch);
        // either we've reached the base or we've reached the root
        if ((base && branch === base) || branch === dirname(branch)) {
            log('finished vacuuming up to', branch);
            return cb!(null);
        }

        readdir(branch, function (error, files) {
            if (error) {
                if (error.code === 'ENOENT') return cb!(null);

                log('unable to check directory', branch, 'due to', error.message);
                return cb!(error);
            }

            if (files.length > 0) {
                log('quitting because other entries in', branch);
                return cb!(null);
            }

            if (branch === process.env.HOME) {
                log('quitting because cannot remove home directory', branch);
                return cb!(null);
            }

            log('removing', branch);
            lstat(branch, (error, stat) => {
                if (error) {
                    if (error.code === 'ENOENT') return cb!(null);

                    log('unable to lstat', branch, 'due to', error.message);
                    return cb!(error);
                }

                var remove = stat.isDirectory() ? rmdir : unlink;
                remove(branch, error => {
                    if (error) {
                        if (error.code === 'ENOENT') {
                            log('quitting because lost the race to remove', branch);
                            return cb!(null);
                        }
                        if (error.code === 'ENOTEMPTY' || error.code === 'EEXIST') {
                            log('quitting because new (racy) entries in', branch);
                            return cb!(null);
                        }

                        log('unable to remove', branch, 'due to', error.message);
                        return cb!(error);
                    }

                    next(dirname(branch));
                });
            });
        });
    }
}
