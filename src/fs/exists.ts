import { access } from './index';

/**
 * Test whether or not the given path exists by checking with the file system. Like
 * [`fs.exists`](https://nodejs.org/api/fs.html#fs_fs_exists_path_callback), but with a normal
 * callback signature (err, exists). Uses `fs.access` under the hood.
 *
 * @example
 * import * as fs from 'fs-extra'
 *
 * const file = '/tmp/this/path/does/not/exist/file.txt'
 *
 * // With a callback:
 * fs.pathExists(file, (err, exists) => {
 *   console.log(err) // => null
 *   console.log(exists) // => false
 * })
 *
 * // Promise usage:
 * fs.pathExists(file)
 *   .then(exists => console.log(exists)) // => false
 *
 * // With async/await:
 * async function asyncAwait () {
 *   const exists = await fs.pathExists(file)
 *
 *   console.log(exists) // => false
 * }
 *
 * asyncAwait()
 */
export function exists(path: string): Promise<boolean>;
export function exists(path: string, callback: (err: NodeJS.ErrnoException | null, exists: boolean) => void): void;
export function exists(path: string, callback?: (err: NodeJS.ErrnoException | null, exists: boolean) => void): void | Promise<boolean> {
    if (callback) {
        return access(path, err => callback(null, !err));
    }
    return access(path).then(() => true, () => false);
}
