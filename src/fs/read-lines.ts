import type { ReadFileOptions, MapStructureResult, ErrorCallback, DiveActionCallback, DiveActionPromise, DiveOptions, MapChildrenFunction, MapStructureFunction } from '../types';
import * as fs from './index';

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
    const data = fs.readFileSync(path, encoding);
    if (data.indexOf('\r\n') > -1) {
        return data.split('\r\n');
    }
    if (data.indexOf('\n') > -1) {
        return data.split('\n');
    }
    return [data];
}
