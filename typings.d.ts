/**
 * Improved fork of fs-extra with extra [sic] features (and semicolons!)
 *
 * `fsxt` is a drop in replacement for native [[fs]]. All methods in [[fs]] are unmodified and attached to `fsxt`.
 *
 * @module fsxt
 * @preferred
 * @internal
 */

import * as fs from 'fs';

export * from './fs-extra';

/**
 * Alias to [[ensureDir]]
 * @param path Path to the folder to ensure
 */
export function ensureFolder(path: string): Promise<void>;
/**
 * Alias to [[ensureDir]]
 * @param path Path to the folder to ensure
 * @param callback Callback to be called when the operation finishes
 */
export function ensureFolder(path: string, callback: (err: Error) => void): void;
/**
 * Alias to [[ensureDirSync]]
 * @param path Path to the folder to ensure
 */
export function ensureFolderSync(path: string): void;

/**
 * Resolve a child file of a folder.
 * @param path The parent folder path
 * @param child The child filesystem entry path (can be a file or folder)
 * @returns `path` and `child` concatenated, delimited by whatever path separator is already used in the string,
 * defaulting to `/`; a delimiter is never added if it's not necessary.
 */
export function resolve(path: string, child: string): string;

/**
 * @param contents returned value of [[readFile]]. Varies depending on `readOptions`
 * @param filename file name including extension (not including full path)
 * @param pathOnly path not including file name
 * @param pathWithFilename full path, including file name
 * @returns the value or a [[Promise]] resolving to the value to pass to [[writeFile]].
 */
type MapChildrenFunctionSync = (contents: string | any, filename: string, pathOnly: string, pathWithFilename: string) => Promise<string | Buffer>;
type MapChildrenFunctionAsync = (contents: string | any, filename: string, pathOnly: string, pathWithFilename: string) => string | Buffer;
type Maybe<T> = T | null | undefined;
type ReadOptions = Maybe<{ encoding?: Maybe<string>; flag?: Maybe<string>; }> | string;
type WriteOptions = Maybe<{ encoding?: Maybe<string>; mode?: Maybe<number | string>; flag?: Maybe<string>; }> | string;

/**
 * Iterate through every file child of a folder, call a mapper function with each file's contents and write the returned
 * value of the mapper to the files. This will not recurse into subdirectories.
 * @param path folder path to iterate through
 * @param mapper mapping function to call on each file
 * @param readOptions options to pass to [[readFile]]
 * @param writeOptions options to pass to [[writeFile]]
 * @returns a Promise resolving to an array of the children files, once the mapping is finished.
 */
export function mapChildren(path: string, mapper: MapChildrenFunctionSync, readOptions?: ReadOptions, writeOptions?: WriteOptions): Promise<string[]>;
