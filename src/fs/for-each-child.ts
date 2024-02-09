// eslint-disable-next-line camelcase
import * as fs from './index';
import type { ErrorCallback } from '../types';

async function _forEachChildHelper(path: string, options: (({ encoding: BufferEncoding | null } | BufferEncoding | null | undefined) & ({ encoding: 'buffer' } | 'buffer')) | undefined, func: (filename: string | Buffer) => void | Promise<void>) {
    const children: string[] | Buffer[] = await fs.readdir(path, options);
    for (const child of children) {
        const ret = func(child);
        if (ret instanceof Promise) {
            await ret;
        }
    }
}

// forEachChild(path[, options], function(file)[, callback])
/**
 * Iterate through every child of a folder, asynchronously. This function will not recurse into subdirectories.
 * @param path folder path to iterate through
 * @param options options to pass through to [[readdir]]
 * @param func iterate function, called for every child
 * @param callback function to call after the operation finishes
 */
export function forEachChild(path: string, options: { encoding: BufferEncoding | null } | BufferEncoding | null | undefined | Record<string, never>, func: (filename: string) => void | Promise<void>): Promise<void>;
export function forEachChild(path: string, options: { encoding: 'buffer' } | 'buffer', func: (filename: Buffer) => void | Promise<void>): Promise<void>;
export function forEachChild(path: string, func: (filename: string) => void | Promise<void>): Promise<void>;
export function forEachChild(path: string, options: { encoding: BufferEncoding | null } | BufferEncoding | null | undefined | Record<string, never>, func: (filename: string) => void, callback: ErrorCallback): void;
export function forEachChild(path: string, options: { encoding: 'buffer' } | 'buffer', func: (filename: Buffer) => void, callback: ErrorCallback): void;
export function forEachChild(path: string, func: (filename: string) => void, callback: ErrorCallback): void;
export function forEachChild(
    path: string,
    o1: (
        | ({ encoding: BufferEncoding | null } | BufferEncoding | null | undefined | Record<string, never>)
        | ({ encoding: 'buffer' } | 'buffer')
        | ((filename: string) => void | Promise<void>)
        | ((filename: Buffer) => void | Promise<void>)
    ),
    o2?: (
        | ((filename: string) => void | Promise<void>)
        | ((filename: Buffer) => void | Promise<void>)
        | ErrorCallback
    ),
    o3?: ErrorCallback,
): void | Promise<void> {
    const options = typeof o1 == 'object' ? (o1 as ({ encoding: BufferEncoding | null } | BufferEncoding | null | undefined) & ({ encoding: 'buffer' } | 'buffer')) : undefined;
    const func = (!options ? o1 : o2) as (filename: string | Buffer) => void | Promise<void>;
    const callback = (!options ? o2 : o3) as ErrorCallback | undefined;

    // promise
    if (!callback) {
        return _forEachChildHelper(path, options, func);
    }
    // legacy
    fs.readdir(path, options, (err, children) => {
        if (err) {
            callback(err);
        } else {
            for (const child of children) {
                (func as (filename: string | Buffer) => void)(child);
            }
            callback();
        }
    });
}

// forEachChildSync(function(file)[, options])
/**
 * Iterate through every child of a folder, synchronously. This function will not recurse into subdirectories.
 * @param path folder path to iterate through
 * @param func iterate function, called for every child
 * @param options options to pass through to [[readdirSync]]
 */
export function forEachChildSync(path: string, func: (filename: string) => void, options: { encoding: BufferEncoding | null } | BufferEncoding | null | undefined | Record<string, never>): void;
export function forEachChildSync(path: string, func: (filename: Buffer) => void, options?: { encoding: 'buffer' } | 'buffer'): void;
export function forEachChildSync(
    path: string,
    func: (filename: string & Buffer) => void,
    options?: (
        | ({ encoding: 'buffer' } | 'buffer')
        | ({ encoding: BufferEncoding | null } | BufferEncoding | null | undefined | Record<string, never>)
    )
) {
    const children: string[] | Buffer[] = fs.readdirSync(path, options as (({ encoding: 'buffer' } | 'buffer') & ({ encoding: BufferEncoding | null } | BufferEncoding | null | undefined)) | undefined);
    for (const child of children) {
        (func as (filename: string | Buffer) => void)(child);
    }
}
