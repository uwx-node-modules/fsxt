import * as fs from './index';

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
    return fs.readFileSync(path, 'utf8');
}
