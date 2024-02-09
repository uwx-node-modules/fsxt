import * as fs from './index';

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
    return fs.statSync(path).isDirectory();
}
