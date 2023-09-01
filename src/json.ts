import type { JsonReadOptions, JsonWriteOptions } from './types';
import type { ReadCallback, WriteCallback } from 'jsonfile';
import type { JsonOutputOptions } from 'fs-extra';

import { outputFile, outputFileSync } from '../lib/output-file';
import { universalify } from './fs/universalify';
import * as fs from './fs';
import {
    readFileSync, writeFileSync,
} from 'graceful-fs';

async function _readJson<T>(file: fs.PathOrFileDescriptor, options: JsonReadOptions): Promise<T | null> {
    if (typeof options === 'string') {
        options = { encoding: options };
    }

    const _readFile = options?.fs?.readFile ? universalify(options.fs.readFile) : fs.readFile;

    const data = stripBom(await _readFile(file, options));

    let obj: T;
    try {
        obj = JSON.parse(data, options?.reviver);
    } catch (err) {
        const shouldThrow = options?.throws ?? true;

        if (shouldThrow) {
            if (err instanceof Error) {
                (err as { message: string }).message = `${file}: ${err.message}`;
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
 * Reads a JSON file and then parses it into an object.
 *
 * @example
 * import * as fs from 'fs-extra'
 *
 * // With a callback:
 * fs.readJson('./package.json', (err, packageObj) => {
 *   if (err) console.error(err)
 *   console.log(packageObj.version) // => 0.1.3
 * })
 *
 * // With Promises:
 * fs.readJson('./package.json')
 *   .then(packageObj => {
 *     console.log(packageObj.version) // => 0.1.3
 *   })
 *   .catch(err => {
 *     console.error(err)
 *   })
 *
 * // With async/await:
 * async function asyncAwait () {
 *   try {
 *     const packageObj = await fs.readJson('./package.json')
 *     console.log(packageObj.version) // => 0.1.3
 *   } catch (err) {
 *     console.error(err)
 *   }
 * }
 *
 * asyncAwait()
 *
 * // `readJsonSync()` can take a `throws` option set to `false` and it won't throw if the JSON is invalid. Example:
 * const file = '/tmp/some-invalid.json'
 * const data = '{not valid JSON'
 * fs.writeFileSync(file, data)
 *
 * // With a callback:
 * fs.readJson(file, { throws: false }, (err, obj) => {
 *   if (err) console.error(err)
 *   console.log(obj) // => null
 * })
 *
 * // With Promises:
 * fs.readJson(file, { throws: false })
 *   .then(obj => {
 *     console.log(obj) // => null
 *   })
 *   .catch(err => {
 *     console.error(err) // Not called
 *   })
 *
 * // With async/await:
 * async function asyncAwaitThrows () {
 *   const obj = await fs.readJson(file, { throws: false })
 *   console.log(obj) // => null
 * }
 *
 * asyncAwaitThrows()
 *
 * @see {@link https://github.com/jprichardson/node-jsonfile#readfilefilename-options-callback}
 */
export function readJson(file: fs.PathOrFileDescriptor, options: JsonReadOptions, callback: ReadCallback): void;
export function readJson(file: fs.PathOrFileDescriptor, callback: ReadCallback): void;
export function readJson(file: fs.PathOrFileDescriptor, options?: JsonReadOptions): Promise<any>;
export function readJson(file: fs.PathOrFileDescriptor, o1?: JsonReadOptions | ReadCallback, o2?: ReadCallback): void | Promise<any> {
    const options = (o2 ?? (typeof o1 !== 'function' ? o1 : undefined)) as JsonReadOptions;
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
    if (Buffer.isBuffer(content)) content = content.toString('utf8');
    return content.replace(/^\uFEFF/, '');
}

/**
 * Reads a JSON file and then parses it into an object.
 *
 * @example
 * import * as fs from 'fs-extra'
 *
 * const packageObj = fs.readJsonSync('./package.json')
 * console.log(packageObj.version) // => 2.0.0
 *
 * // `readJsonSync()` can take a `throws` option set to `false` and it won't throw if the JSON is invalid. Example:
 * const file = '/tmp/some-invalid.json'
 * const data = '{not valid JSON'
 * fs.writeFileSync(file, data)
 *
 * const obj = fs.readJsonSync(file, { throws: false })
 * console.log(obj) // => null
 *
 * @see {@link https://github.com/jprichardson/node-jsonfile#readfilesyncfilename-options}
 */
export function readJsonSync(file: fs.PathOrFileDescriptor, options?: JsonReadOptions): any {
    if (typeof options === 'string') {
        options = { encoding: options };
    }

    const _readFileSync = options?.fs?.readFileSync ?? readFileSync;

    try {
        const content = stripBom(_readFileSync(file, options));
        return JSON.parse(content, options?.reviver);
    } catch (err) {
        const shouldThrow = options?.throws ?? true;

        if (shouldThrow) {
            if (err instanceof Error) {
                (err as { message: string }).message = `${file}: ${err.message}`;
                throw err;
            } else {
                throw new Error(`${file}: ${err}`);
            }
        } else {
            return null;
        }
    }
}

async function _writeJson(file: fs.PathOrFileDescriptor, obj: any, options?: JsonWriteOptions) {
    if (typeof options === 'string') {
        options = { encoding: options };
    }

    const _writeFile = options?.fs?.writeFile ? universalify(options.fs.writeFile) : fs.writeFile;

    const str = stringify(obj, options ?? {});

    await _writeFile(file, str, options);
}

/**
 * Writes an object to a JSON file.
 *
 * @example
 * import * as fs from 'fs-extra'
 *
 * // With a callback:
 * fs.writeJson('./package.json', {name: 'fs-extra'}, err => {
 *   if (err) return console.error(err)
 *   console.log('success!')
 * })
 *
 * // With Promises:
 * fs.writeJson('./package.json', {name: 'fs-extra'})
 *   .then(() => {
 *     console.log('success!')
 *   })
 *   .catch(err => {
 *     console.error(err)
 *   })
 *
 * // With async/await:
 * async function asyncAwait () {
 *   try {
 *     await fs.writeJson('./package.json', {name: 'fs-extra'})
 *     console.log('success!')
 *   } catch (err) {
 *     console.error(err)
 *   }
 * }
 *
 * asyncAwait()
 *
 * @see {@link https://github.com/jprichardson/node-jsonfile#writefilefilename-obj-options-callback}
 */
export function writeJson(file: fs.PathOrFileDescriptor, obj: any, options: JsonWriteOptions, callback: WriteCallback): void;
export function writeJson(file: fs.PathOrFileDescriptor, obj: any, callback: WriteCallback): void;
export function writeJson(file: fs.PathOrFileDescriptor, obj: any, options?: JsonWriteOptions): Promise<void>;
export function writeJson(file: fs.PathOrFileDescriptor, obj: any, o1?: WriteCallback | JsonWriteOptions, o2?: WriteCallback): Promise<void> {
    const options = (o2 ?? (typeof o1 !== 'function' ? o1 : undefined)) as JsonWriteOptions;
    const callback = (o2 ?? (options === undefined ? o1 : undefined)) as WriteCallback | undefined;

    if (!callback) {
        return _writeJson(file, obj, options);
    }

    return _writeJson(file, obj, options)
        .then(() => callback(null), error => callback(error));
}

/**
 * Writes an object to a JSON file.
 *
 * @example
 * import * as fs from 'fs-extra'
 *
 * fs.writeJsonSync('./package.json', {name: 'fs-extra'})
 *
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

/**
 * Almost the same as `writeJson`, except that if the directory does not exist, it's created.
 *
 * @example
 * import * as fs from 'fs-extra'
 *
 * const file = '/tmp/this/path/does/not/exist/file.json'
 *
 * // With a callback:
 * fs.outputJson(file, {name: 'JP'}, err => {
 *   console.log(err) // => null
 *
 *   fs.readJson(file, (err, data) => {
 *     if (err) return console.error(err)
 *     console.log(data.name) // => JP
 *   })
 * })
 *
 * // With Promises:
 * fs.outputJson(file, {name: 'JP'})
 *   .then(() => fs.readJson(file))
 *   .then(data => {
 *     console.log(data.name) // => JP
 *   })
 *   .catch(err => {
 *     console.error(err)
 *   })
 *
 * // With async/await:
 * async function asyncAwait () {
 *   try {
 *     await fs.outputJson(file, {name: 'JP'})
 *
 *     const data = await fs.readJson(file)
 *
 *     console.log(data.name) // => JP
 *   } catch (err) {
 *     console.error(err)
 *   }
 * }
 *
 * asyncAwait()
 */
export function outputJson(file: string, data: any, options?: JsonOutputOptions): Promise<void>;
export function outputJson(file: string, data: any, options: JsonOutputOptions, callback: fs.NoParamCallback): void;
export function outputJson(file: string, data: any, callback: fs.NoParamCallback): void;
export function outputJson(file: string, data: any, optionsOrCallback?: JsonOutputOptions | fs.NoParamCallback, callback?: fs.NoParamCallback): void | Promise<void> {
    callback = callback ?? (typeof optionsOrCallback === 'function' ? optionsOrCallback : undefined);
    const options = typeof optionsOrCallback === 'object' ? optionsOrCallback : {};

    if (!callback) {
        return new Promise((resolve, reject) => {
            outputJson(file, data, options, err => err ? reject(err) : resolve());
        });
    }

    const str = stringify(data, options);
    outputFile(file, str, options, callback);
}

/**
 * Almost the same as `writeJsonSync`, except that if the directory does not exist, it's created.
 *
 * @example
 * import * as fs from 'fs-extra'
 *
 * const file = '/tmp/this/path/does/not/exist/file.json'
 * fs.outputJsonSync(file, {name: 'JP'})
 *
 * const data = fs.readJsonSync(file)
 * console.log(data.name) // => JP
 */
export function outputJsonSync(file: string, data: any, options: JsonOutputOptions = {}): void {
    const str = stringify(data, options);
    outputFileSync(file, str, options);
}
