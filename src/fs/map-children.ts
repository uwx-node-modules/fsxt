// eslint-disable-next-line camelcase
import { Array_fromAsync } from '../helpers';
import type { MapChildrenFunction } from '../types';
import * as fs from './index';
import { isDirectory } from './is-directory';

async function* _asyncFilter<T>(iterable: Iterable<T> | (ArrayLike<T> & Iterable<T>), condition: (value: T, index: number, iterable: Iterable<T> | (ArrayLike<T> & Iterable<T>)) => boolean | Promise<boolean>) {
    let i = 0;
    for (const value of iterable) {
        if (await condition(value, i++, iterable)) {
            yield value;
        }
    }
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
export async function mapChildren(
    path: string,
    mapper: MapChildrenFunction<string>,
    readOptions: { encoding: BufferEncoding } | BufferEncoding,
    writeOptions?: fs.WriteFileOptions | BufferEncoding
): Promise<string[]>;
export async function mapChildren(
    path: string,
    mapper: MapChildrenFunction<Buffer>,
    readOptions?: { encoding?: null | 'buffer' } | 'buffer' | null | undefined,
    writeOptions?: fs.WriteFileOptions | BufferEncoding
): Promise<string[]>;
export async function mapChildren(
    path: string,
    mapper: MapChildrenFunction<string> | MapChildrenFunction<Buffer>,
    readOptions?: { encoding: BufferEncoding } | BufferEncoding | { encoding?: null | 'buffer' } | 'buffer' | null | undefined,
    writeOptions?: fs.WriteFileOptions | BufferEncoding
): Promise<string[]> {
    const children = await Array_fromAsync(_asyncFilter((await fs.readdir(path)).map(child => path + '/' + child), async e => !await isDirectory(e)));
    for (const e of children) {
        const contents = await (fs.readFile as any)(e, readOptions);
        const filename = e.slice(e.lastIndexOf('/') + 1);
        let result = mapper(contents, filename, path, e);
        if (result instanceof Promise) {
            result = await result;
        }
        if (result != contents) {
            await fs.writeFile(e, result, writeOptions);
        }
    }
    return children;
}
