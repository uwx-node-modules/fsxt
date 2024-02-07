import type * as fs from 'fs';

/**
 * Mapper function signature for [[mapChildren]] (sync).
 * @param contents returned value of [[readFile]]. Varies depending on `readOptions`
 * @param filename file name including extension (not including full path)
 * @param pathOnly path not including file name
 * @param pathWithFilename full path, including file name
 * @returns the value to pass to [[writeFile]], or a [[Promise]] resolving to the value to pass to [[writeFile]].
 */
export type MapChildrenFunction<T> = (contents: T, filename: string, pathOnly: string, pathWithFilename: string) => string | Buffer | Promise<string | Buffer>;

/**
 * Mapper function signature for [[mapStructure]] (async).
 * @param contents returned value of [[readFile]]. Varies depending on `readOptions`
 * @param fullPath the full path to the file **relative to the current working directory, NOT `path`**
 * @param stats a [[Stats]] object.
 * @returns the value to pass to [[writeFile]], or a [[Promise]] resolving to the value to pass to [[writeFile]].
 */
export type MapStructureFunction<T> = (contents: T, fullPath: string, stat: fs.Stats) => Promise<string | Buffer> | string | Buffer;

/**
 * A standard node.js callback with an error parameter, null means the operation completed successfully
 */
export type ErrorCallback = (err?: NodeJS.ErrnoException | null) => void;

/**
 * Action function for the overload of [[dive]] that takes a `complete` callback.
 * @param err an error or `null`
 * @param file the **full relative** pathname of a file (relative to `process.cwd`, not relative to `directory`)
 * @param stat a [[Stats]] object.
 */
export type DiveActionCallback = (err: Error | null, file?: string, stat?: fs.Stats) => void;
/**
 * Action function for the overload of [[dive]] that doesn't take a `complete` callback.
 * @param file the **full relative** pathname of a file (relative to `process.cwd`, not relative to `directory`)
 * @param stat a [[Stats]] object.
 */
export type DiveActionPromise = (file: string, stat: fs.Stats) => void | Promise<void>;

/**
 * Options for [[readFile]] calls in [[mapChildren]]. Not to be confused with the [[ReadOptions]] interface which is
 * misleadingly named but is only used for [[readJson]]/[[readJsonSync]]
 */
export interface ReadFileOptions {
    encoding?: BufferEncoding;
    flag?: string;
}

/**
 * An entry in the resolved value of the promise returned by [[mapStructure]].
 */
export interface MapStructureResult {
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
export interface VacuumOptions {
    /** No directories at or above this level of the filesystem will be removed. */
    base?: string;
    /** If set, nuke the whole leaf directory, including its contents. */
    purge?: boolean;
    /** A logging function that takes `npmlog`-compatible argument lists. */
    log?: (prefix: string | undefined, message?: string, ...args: any[]) => void;
}

/**
 * Options for [[dive]].
 */
export interface DiveOptions {
    /** If set to false, this will ignore subdirectories. */
    recursive?: boolean;
    /** If set to true, this will show "dot files" and files in "dot directories", e.g. ".gitignore" or ".git/HEAD". */
    all?: boolean;
    /** If set to true, this will call `action` on directories, too. */
    directories?: boolean;
    /** If set to false, this won't call `action` on files any more. */
    files?: boolean;
    /** If set to a string or RegExp, all files and directories that match will be ignored. */
    ignore?: false | string | RegExp;
}

export type JsonReadOptions =
    | {
        encoding?: BufferEncoding | null;
        flag?: string;
        throws?: boolean;
        fs?: typeof import('fs');
        reviver?: (key: any, value: any) => any;
    }
    | BufferEncoding
    | null
    | undefined;

export type JsonWriteOptions =
    | {
        encoding?: BufferEncoding | null;
        mode?: string | number;
        flag?: string;
        fs?: typeof import('fs');
        EOL?: string;
        finalEOL?: boolean;
        spaces?: string | number;
        replacer?: ((key: string, value: any) => any);
    }
    | BufferEncoding
    | null
    | undefined;
