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
import * as fsExtra from './fs-extra';

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
 * Mapper function signature for [[mapChildren]] (async).
 * @param contents returned value of [[readFile]]. Varies depending on `readOptions`
 * @param filename file name including extension (not including full path)
 * @param pathOnly path not including file name
 * @param pathWithFilename full path, including file name
 * @returns a [[Promise]] resolving to the value to pass to [[writeFile]].
 */
type MapChildrenFunctionAsync = (contents: string | any, filename: string, pathOnly: string, pathWithFilename: string) => Promise<string | Buffer>;

/**
 * Mapper function signature for [[mapChildren]] (sync).
 * @param contents returned value of [[readFile]]. Varies depending on `readOptions`
 * @param filename file name including extension (not including full path)
 * @param pathOnly path not including file name
 * @param pathWithFilename full path, including file name
 * @returns the value to pass to [[writeFile]].
 */
type MapChildrenFunctionSync = (contents: string | any, filename: string, pathOnly: string, pathWithFilename: string) => string | Buffer;

/**
 * Mapper function signature for [[mapStructure]] (async).
 * @param contents returned value of [[readFile]]. Varies depending on `readOptions`
 * @param fullPath the full path to the file **relative to the current working directory, NOT `path`**
 * @param stats a [[Stats]] object.
 * @returns a [[Promise]] resolving to the value to pass to [[writeFile]].
 */
type MapStructureFunctionAsync = (contents: string | any, fullPath: string, stat: fs.Stats) => Promise<string | Buffer>;

/**
 * Mapper function signature for [[mapStructure]] (sync).
 * @param contents returned value of [[readFile]]. Varies depending on `readOptions`
 * @param fullPath the full path to the file **relative to the current working directory, NOT `path`**
 * @param stats a [[Stats]] object.
 * @returns the value to pass to [[writeFile]].
 */
type MapStructureFunctionSync = (contents: string | any, fullPath: string, stat: fs.Stats) => string | Buffer;

/**
 * A standard node.js callback with an error parameter, null means the operation completed successfully
 */
type ErrorCallback = (err?: NodeJS.ErrnoException | null) => void;

/**
 * Callback for [[forEachChildSync]] and [[forEachChild]], compatible with [[ReaddirOptionsString]] and
 * [[ReaddirOptionsStringAsync]] respectively (readdir options are optional)
 * @param filename the file's name without the path, an element from the output of [[readdirSync]]/[[readdir]]
 */
type ForEachCallbackString = (filename: string) => void;
/**
 * Options for [[readdir]] for [[forEachChildSync]] that are compatible with
 * [[ForEachCallbackString]]
 */
// tslint:disable-next-line:interface-over-type-literal
type ReaddirOptionsString = { encoding: BufferEncoding | null };
/**
 * Callback for [[forEachChildSync]] and [[forEachChild]], compatible with [[ReaddirOptionsBuffer]] and
 * [[ReaddirOptionsBufferAsync]] respectively
 * @param filename the file's name without the path, an element from the output of [[readdirSync]]/[[readdir]]
 */
type ForEachCallbackBuffer = (filename: Buffer) => void;
/**
 * Options for [[readdir]] for [[forEachChildSync]] that are compatible with [[ForEachCallbackBuffer]]
 */
type ReaddirOptionsBuffer = { encoding: 'buffer' } | 'buffer';
/**
 * Callback for [[forEachChildSync]] and [[forEachChild]], compatible with [[ReaddirOptionsEither]] and
 * [[ReaddirOptionsEitherAsync]] respectively
 * @param filename the file's name without the path, an element from the output of [[readdirSync]]/[[readdir]]
 */
type ForEachCallbackEither = (filename: string | Buffer) => void;
/**
 * Options for [[readdir]] for [[forEachChildSync]] that are compatible with [[ForEachCallbackEither]]
 */
type ReaddirOptionsEither = { encoding?: string | null } | string | null;

/**
 * Callback for [[forEachChild]], compatible with [[ReaddirOptionsStringAsync]] (optionally)
 * @param filename the file's name without the path, an element from the output of [[readdir]]
 */
type ForEachCallbackStringAsync = (filename: string) => void | Promise<void>;
/**
 * Options for [[forEachChild]], compatible with [[ForEachCallbackStringAsync]] and [[ForEachCallbackString]]
 */
type ReaddirOptionsStringAsync = { encoding: BufferEncoding | null } | BufferEncoding | undefined | null;
/**
 * Callback for [[forEachChild]], compatible with [[ReaddirOptionsBufferAsync]]
 * @param filename the file's name without the path, an element from the output of [[readdir]]
 */
type ForEachCallbackBufferAsync = (filename: Buffer) => void | Promise<void>;
/**
 * Options for [[forEachChild]], compatible with [[ForEachCallbackBufferAsync]] and [[ForEachCallbackBuffer]]
 */
type ReaddirOptionsBufferAsync = { encoding: 'buffer' } | 'buffer';
/**
 * Callback for [[forEachChild]], compatible with [[ReaddirOptionsEitherAsync]]
 * @param filename the file's name without the path, an element from the output of [[readdir]]
 */
type ForEachCallbackEitherAsync = (filename: string | Buffer) => void | Promise<void>;
/**
 * Options for [[forEachChild]], compatible with [[ForEachCallbackEitherAsync]] and [[ForEachCallbackEither]]
 */
type ReaddirOptionsEitherAsync = { encoding?: string | null } | string | undefined | null;

/**
 * Action function for the overload of [[dive]] that takes a `complete` callback.
 * @param err an error or `null`
 * @param file the **full relative** pathname of a file (relative to `process.cwd`, not relative to `directory`)
 * @param stat a [[Stats]] object.
 */
type DiveActionCallback = (err: NodeJS.ErrnoException | null, file: string, stat: fs.Stats) => void;
/**
 * Action function for the overload of [[dive]] that doesn't take a `complete` callback.
 * @param file the **full relative** pathname of a file (relative to `process.cwd`, not relative to `directory`)
 * @param stat a [[Stats]] object.
 */
type DiveActionPromise = (file: string, stat: fs.Stats) => void;

/**
 * Options for [[readFile]] calls in [[mapChildren]]. Not to be confused with the [[ReadOptions]] interface which is
 * misleadingly named but is only used for [[readJson]]/[[readJsonSync]]
 */
interface ReadFileOptions {
  encoding?: string;
  flag?: string;
}

/**
 * An entry in the resolved value of the promise returned by [[mapStructure]].
 */
interface MapStructureResult {
  /**
   * The full path to the file **relative to the current working directory, NOT `path`**
   */
  file: string;
  /**
   * A [[Stats]] object.
   */
  stat: fs.Stats;
}

/**
 * Options for [[vacuum]].
 */
interface VacuumOptions {
  /** No directories at or above this level of the filesystem will be removed. */
  base?: string;
  /** If set, nuke the whole leaf directory, including its contents. */
  purge?: boolean;
  /** A logging function that takes `npmlog`-compatible argument lists. */
  log?: (prefix: string, message: string, ...args: any[]) => void;
}

/**
 * Options for [[dive]].
 */
interface DiveOptions {
  /** If set to false, this will ignore subdirectories. */
  recursive?: boolean;
  /** If set to true, this will show "dot files" and files in "dot directories", e.g. ".gitignore" or ".git/HEAD". */
  all?: boolean;
  /** If set to true, this will call `action` on directories, too. */
  directories?: boolean;
  /** If set to false, this won't call `action` on files any more. */
  files?: boolean;
  /** If set to a string or RegExp, all files and directories that match will be ignored. */
  ignore?: boolean | string | RegExp;
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
export function mapChildren(
  path: string,
  mapper: MapChildrenFunctionSync | MapChildrenFunctionAsync,
  readOptions?: ReadFileOptions | string,
  writeOptions?: fsExtra.WriteFileOptions | string
): Promise<string[]>;

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
export function mapStructure(
  path: string,
  mapper: MapStructureFunctionSync | MapStructureFunctionAsync,
  readOptions?: ReadFileOptions | string,
  writeOptions?: fsExtra.WriteFileOptions | string
): Promise<MapStructureResult[]>; // TODO tests for return value

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
export function mapStructureOrdered(
  path: string,
  mapper: MapStructureFunctionAsync,
  readOptions?: ReadFileOptions | string,
  writeOptions?: fsExtra.WriteFileOptions | string
): Promise<MapStructureResult[]>; // TODO tests for this

//#region forEachChild promise
/**
 * Iterate through every child of a folder, asynchronously. This function will not recurse into subdirectories.
 * @param path folder path to iterate through
 * @param options options to pass through to [[readdir]]
 * @param func iterate function, called for every child
 */
export function forEachChild(path: string, options: ReaddirOptionsStringAsync, func: ForEachCallbackStringAsync): Promise<void>;
/**
 * Iterate through every child of a folder, asynchronously. This function will not recurse into subdirectories.
 * @param path folder path to iterate through
 * @param options options to pass through to [[readdir]]
 * @param func iterate function, called for every child
 */
export function forEachChild(path: string, options: ReaddirOptionsBufferAsync, func: ForEachCallbackBufferAsync): Promise<void>;
/**
 * Iterate through every child of a folder, asynchronously. This function will not recurse into subdirectories.
 * @param path folder path to iterate through
 * @param options options to pass through to [[readdir]]
 * @param func iterate function, called for every child
 */
export function forEachChild(path: string, options: ReaddirOptionsEitherAsync, func: ForEachCallbackEitherAsync): Promise<void>;
/**
 * Iterate through every child of a folder, asynchronously. This function will not recurse into subdirectories.
 * @param path folder path to iterate through
 * @param func iterate function, called for every child
 */
export function forEachChild(path: string, func: ForEachCallbackStringAsync): Promise<void>;
//#endregion

//#region forEachChild callback
/**
 * Iterate through every child of a folder, asynchronously. This function will not recurse into subdirectories.
 * @param path folder path to iterate through
 * @param options options to pass through to [[readdir]]
 * @param func iterate function, called for every child
 * @param callback function to call after the operation finishes
 */
export function forEachChild(path: string, options: ReaddirOptionsStringAsync, func: ForEachCallbackString, callback: ErrorCallback): void;
/**
 * Iterate through every child of a folder, asynchronously. This function will not recurse into subdirectories.
 * @param path folder path to iterate through
 * @param options options to pass through to [[readdir]]
 * @param func iterate function, called for every child
 * @param callback function to call after the operation finishes
 */
export function forEachChild(path: string, options: ReaddirOptionsBufferAsync, func: ForEachCallbackBuffer, callback: ErrorCallback): void;
/**
 * Iterate through every child of a folder, asynchronously. This function will not recurse into subdirectories.
 * @param path folder path to iterate through
 * @param options options to pass through to [[readdir]]
 * @param func iterate function, called for every child
 * @param callback function to call after the operation finishes
 */
export function forEachChild(path: string, options: ReaddirOptionsEitherAsync, func: ForEachCallbackEither, callback: ErrorCallback): void;
/**
 * Iterate through every child of a folder, asynchronously. This function will not recurse into subdirectories.
 * @param path folder path to iterate through
 * @param func iterate function, called for every child
 * @param callback function to call after the operation finishes
 */
export function forEachChild(path: string, func: ForEachCallbackString, callback: ErrorCallback): void;
//#endregion

//#region forEachChildSync
/**
 * Iterate through every child of a folder, synchronously. This function will not recurse into subdirectories.
 * @param path folder path to iterate through
 * @param func iterate function, called for every child
 * @param options options to pass through to [[readdirSync]]
 */
export function forEachChildSync(path: string, func: ForEachCallbackString, options: ReaddirOptionsString): void;
/**
 * Iterate through every child of a folder, synchronously. This function will not recurse into subdirectories.
 * @param path folder path to iterate through
 * @param func iterate function, called for every child
 * @param options options to pass through to [[readdirSync]]
 */
export function forEachChildSync(path: string, func: ForEachCallbackBuffer, options: ReaddirOptionsBuffer): void;
/**
 * Iterate through every child of a folder, synchronously. This function will not recurse into subdirectories.
 * @param path folder path to iterate through
 * @param func iterate function, called for every child
 * @param options options to pass through to [[readdirSync]]
 */
export function forEachChildSync(path: string, func: ForEachCallbackEither, options?: ReaddirOptionsEither): void;
//#endregion

//#region vacuum
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
export function vacuum(directory: string, options?: VacuumOptions): Promise<void>;
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
export function vacuum(directory: string, options?: VacuumOptions, callback?: ErrorCallback): void;
//#endregion

//#region dive
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
/**
 * Recursively walk (“dive”) a directory tree.
 * @param directory the pathname of a readable directory
 * @param options an object that defines some of the properties
 * @param action function that is called on each file
 * @returns [[Promise]] that resolves when the operation finishes
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
export function dive(directory: string, options: DiveOptions, action: DiveActionPromise): Promise<void>;
/**
 * Recursively walk (“dive”) a directory tree.
 * @param directory the pathname of a readable directory
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
export function dive(directory: string, action: DiveActionCallback, complete: () => void): void;
/**
 * Recursively walk (“dive”) a directory tree.
 * @param directory the pathname of a readable directory
 * @param action function that is called on each file
 * @returns [[Promise]] that resolves when the operation finishes
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
export function dive(directory: string, action: DiveActionPromise): Promise<void>;
//#endregion

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
export function diveSync(path: string, options?: DiveOptions): string[];

/**
 * Read a file containing XML to an object using `xml2js`.
 * @param path the path to the XML file
 * @param callback callback function to call with the parsed object, or a value for `err` if the operation fails
 */
export function readXML(path: string, callback: (err: NodeJS.ErrnoException | null, parsedObject: any) => void): void;
/**
 * Read a file containing XML to an object using `xml2js`.
 * @param path the path to the XML file
 * @returns [[Promise]] that resolves to the parsed object
 */
export function readXML(path: string): Promise<any>;

/**
 * Synchronously read a file containing XML to an object.
 * @param path the path to the XML file
 * @returns the parsed object
 */
export function readXMLSync(path: string): any;

/**
 * Read a file into a string array of its lines.
 * @param path the path to the file to read
 * @param encoding the encoding to use to read the file
 * @param callback callback function to call with the file's lines, or a value for `err` if the operation fails
 */
export function readLines(path: string, encoding: string, callback: (err: NodeJS.ErrnoException | null, lines: string[]) => void): void;
/**
 * Read a file into a string array of its lines using UTF-8 encoding.
 * @param path the path to the file to read
 * @param callback callback function to call with the file's lines, or a value for `err` if the operation fails
 */
export function readLines(path: string, callback: (err: NodeJS.ErrnoException | null, lines: string[]) => void): void;
/**
 * Read a file into a string array of its lines.
 * @param path the path to the file to read
 * @param encoding the encoding to use to read the file, default is UTF-8
 * @returns [[Promise]] that resolves to the file's lines
 */
export function readLines(path: string, encoding?: string): Promise<string[]>;

/**
 * Synchronously read a file into a string array of its lines.
 * @param path the path to the file to read
 * @param encoding the encoding to use to read the file, default is UTF-8
 * @returns the file's lines
 */
export function readLinesSync(path: string, encoding?: string): string[];

/**
 * Shorter version of [[readFile]] where the encoding is UTF-8.
 * @param path the path to the file to read
 * @param callback callback function to call with the file's text contents, or a value for `err` if the operation fails
 */
export function readText(path: string, callback: (err: NodeJS.ErrnoException | null, text: string) => void): void;
/**
 * Shorter version of [[readFile]] where the encoding is UTF-8.
 * @param path the path to the file to read
 * @returns [[Promise]] that resolves to the file's text contents
 */
export function readText(path: string): Promise<string>;

/**
 * Shorter version of [[readFileSync]] where the encoding is UTF-8.
 * @param path the path to the file to read
 * @returns the file's text contents
 */
export function readTextSync(path: string): string;

/**
 * Check if the file at a path is a directory.
 * @param path the path to the file to check
 * @param callback callback function to call with whether or not the file is a directory, or a value for `err` if the
 * operation fails
 */
export function isDirectory(path: string, callback: (err: NodeJS.ErrnoException | null, text: boolean) => void): void;
/**
 * Check if the file at a path is a directory.
 * @param path the path to the file to check
 * @returns [[Promise]] that resolves with whether or not the file is a directory
 */
export function isDirectory(path: string): Promise<boolean>;
/**
 * Check if the file at a path is a directory.
 * @param path the path to the file to check
 * @returns whether or not the file is a directory
 */
export function isDirectorySync(path: string): boolean;
