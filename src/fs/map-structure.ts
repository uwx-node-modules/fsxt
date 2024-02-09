// eslint-disable-next-line camelcase
import * as fs from './index';
import type { ReadFileOptions, MapStructureResult, MapStructureFunction } from '../types';
import { _diveWorker, dive } from './dive';

async function _mapStructureProcessFile(file: string, stat: fs.Stats, mapper: MapStructureFunction<string> | MapStructureFunction<Buffer>, readOptions: ReadFileOptions | BufferEncoding | undefined, writeOptions: fs.WriteFileOptions | BufferEncoding | undefined) {
    const contents = await fs.readFile(file, readOptions);
    let result = mapper(contents as any, file, stat);
    if (result instanceof Promise) {
        result = await result;
    }
    if (result != contents) {
        await fs.writeFile(file, result, writeOptions);
    }
}

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
export async function mapStructure(
    path: string,
    mapper: MapStructureFunction<string>,
    readOptions: { encoding: BufferEncoding } | BufferEncoding,
    writeOptions?: fs.WriteFileOptions | BufferEncoding
): Promise<MapStructureResult[]>;
export async function mapStructure(
    path: string,
    mapper: MapStructureFunction<Buffer>,
    readOptions?: { encoding?: null | 'buffer' } | 'buffer' | null | undefined,
    writeOptions?: fs.WriteFileOptions | BufferEncoding
): Promise<MapStructureResult[]>;
export async function mapStructure(
    path: string,
    mapper: MapStructureFunction<string> | MapStructureFunction<Buffer>,
    readOptions?: { encoding: BufferEncoding } | BufferEncoding | { encoding?: null | 'buffer' } | 'buffer' | null | undefined,
    writeOptions?: fs.WriteFileOptions | BufferEncoding
): Promise<MapStructureResult[]> {
    const promiseArr: Promise<void>[] = [];
    const results: { file: string, stat: fs.Stats }[] = [];

    await dive(path, { all: true }, (file, stat) => {
        promiseArr.push(_mapStructureProcessFile(file, stat, mapper, readOptions as any, writeOptions));
        results.push({ file, stat });
    });

    await Promise.all(promiseArr);

    return results;
}

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
export async function mapStructureOrdered(
    path: string,
    mapper: MapStructureFunction<string>,
    readOptions: { encoding: BufferEncoding } | BufferEncoding,
    writeOptions?: fs.WriteFileOptions | BufferEncoding
): Promise<MapStructureResult[]>;
export async function mapStructureOrdered(
    path: string,
    mapper: MapStructureFunction<Buffer>,
    readOptions?: { encoding?: null | 'buffer' } | 'buffer' | null | undefined,
    writeOptions?: fs.WriteFileOptions | BufferEncoding
): Promise<MapStructureResult[]>;
export async function mapStructureOrdered(
    path: string,
    mapper: MapStructureFunction<string> | MapStructureFunction<Buffer>,
    readOptions?: { encoding: BufferEncoding } | BufferEncoding | { encoding?: null | 'buffer' } | 'buffer' | null | undefined,
    writeOptions?: fs.WriteFileOptions | BufferEncoding
): Promise<MapStructureResult[]> {
    const entries: { file: string, stat: fs.Stats }[] = [];

    for await (const [file, stat] of _diveWorker(path)) {
        entries.push({ file, stat });
        await _mapStructureProcessFile(file, stat, mapper, readOptions as any, writeOptions);
    }

    return entries;
}
