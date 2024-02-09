import { ReadableStream } from 'stream/web';
import type * as fs from './index';
import { Readable, isReadable } from 'stream';
import { fromPromise } from 'universalify';
import { finished } from 'stream/promises';
import type * as streamWeb from 'stream/web';
import { createWriteStream, writeFile as _writeFile } from 'graceful-fs';
import { universalify } from './universalify';

const backingWriteFile = universalify(_writeFile);

const _writeFileStreamHelper = fromPromise(async (
    path: fs.PathOrFileDescriptor,
    data: NodeJS.ReadableStream,
    options?: fs.WriteFileOptions
) => {
    interface CreateWriteStreamFSImplementation {
        open?: (...args: any[]) => any;
        close?: (...args: any[]) => any;
        write: (...args: any[]) => any;
        writev?: (...args: any[]) => any;
    }
    interface StreamOptions {
        flags?: string | undefined;
        encoding?: BufferEncoding | undefined;
        fd?: number | import('fs/promises').FileHandle | undefined;
        mode?: number | undefined;
        autoClose?: boolean | undefined;
        emitClose?: boolean | undefined;
        start?: number | undefined;
        signal?: AbortSignal | null | undefined;
        highWaterMark?: number | undefined;

        fs?: CreateWriteStreamFSImplementation | null | undefined;
        flush?: boolean | undefined;
    }

    function getOptions(options?: fs.WriteFileOptions): StreamOptions | undefined {
        return options ? typeof options === 'string' ? { encoding: options } : {
            encoding: options.encoding || undefined,
            mode: typeof options.mode === 'string' ? parseInt(options.mode, 8) : options.mode,
            flush: options.flush,
        } : undefined;
    }

    let stream: fs.WriteStream;
    if (typeof path === 'number') {
        stream = createWriteStream('', {...getOptions(options), fd: path});
    } else {
        stream = createWriteStream(path, getOptions(options));
    }
    await finished(data.pipe(stream));
});

/**
 * When `file` is a filename, asynchronously writes data to the file, replacing the
 * file if it already exists. `data` can be a string or a buffer.
 *
 * When `file` is a file descriptor, the behavior is similar to calling`fs.write()` directly (which is recommended). See the notes below on using
 * a file descriptor.
 *
 * The `encoding` option is ignored if `data` is a buffer.
 *
 * The `mode` option only affects the newly created file. See {@link open} for more details.
 *
 * ```js
 * import { writeFile } from 'node:fs';
 * import { Buffer } from 'node:buffer';
 *
 * const data = new Uint8Array(Buffer.from('Hello Node.js'));
 * writeFile('message.txt', data, (err) => {
 *   if (err) throw err;
 *   console.log('The file has been saved!');
 * });
 * ```
 *
 * If `options` is a string, then it specifies the encoding:
 *
 * ```js
 * import { writeFile } from 'node:fs';
 *
 * writeFile('message.txt', 'Hello Node.js', 'utf8', callback);
 * ```
 *
 * It is unsafe to use `fs.writeFile()` multiple times on the same file without
 * waiting for the callback. For this scenario, {@link createWriteStream} is
 * recommended.
 *
 * Similarly to `fs.readFile` \- `fs.writeFile` is a convenience method that
 * performs multiple `write` calls internally to write the buffer passed to it.
 * For performance sensitive code consider using {@link createWriteStream}.
 *
 * It is possible to use an `AbortSignal` to cancel an `fs.writeFile()`.
 * Cancelation is "best effort", and some amount of data is likely still
 * to be written.
 *
 * ```js
 * import { writeFile } from 'node:fs';
 * import { Buffer } from 'node:buffer';
 *
 * const controller = new AbortController();
 * const { signal } = controller;
 * const data = new Uint8Array(Buffer.from('Hello Node.js'));
 * writeFile('message.txt', data, { signal }, (err) => {
 *   // When a request is aborted - the callback is called with an AbortError
 * });
 * // When the request should be aborted
 * controller.abort();
 * ```
 *
 * Aborting an ongoing request does not abort individual operating
 * system requests but rather the internal buffering `fs.writeFile` performs.
 * @since v0.1.29
 * @param file filename or file descriptor
 * @param data The data to write. If a stream is provided, it will be read to completion.
 * @param options Either the encoding for the file, or an object optionally specifying the encoding, file mode, and flag.
 * If `encoding` is not supplied, the default of `'utf8'` is used.
 * If `mode` is not supplied, the default of `0o666` is used.
 * If `mode` is a string, it is parsed as an octal integer.
 * If `flag` is not supplied, the default of `'w'` is used.
 * @since Web Streams API support since Node v17.0.0
 */
export function writeFile(
    file: fs.PathOrFileDescriptor,
    data: string | NodeJS.ArrayBufferView | ArrayBuffer | SharedArrayBuffer | NodeJS.ReadableStream | streamWeb.ReadableStream,
    options: fs.WriteFileOptions,
    callback: fs.NoParamCallback,
): void;
/**
 * Asynchronously writes data to a file, replacing the file if it already exists.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
 * @param data The data to write. If a stream is provided, it will be read to completion.
 * @since Web Streams API support since Node v17.0.0
 */
export function writeFile(
    path: fs.PathOrFileDescriptor,
    data: string | NodeJS.ArrayBufferView | ArrayBuffer | SharedArrayBuffer | NodeJS.ReadableStream | streamWeb.ReadableStream,
    callback: fs.NoParamCallback,
): void;

/**
 * Asynchronously writes data to a file, replacing the file if it already exists.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
 * @param data The data to write. If a stream is provided, it will be read to completion.
 * @param options Either the encoding for the file, or an object optionally specifying the encoding, file mode, and flag.
 * If `encoding` is not supplied, the default of `'utf8'` is used.
 * If `mode` is not supplied, the default of `0o666` is used.
 * If `mode` is a string, it is parsed as an octal integer.
 * If `flag` is not supplied, the default of `'w'` is used.
 * @since Web Streams API support since Node v17.0.0
 */
export function writeFile(
    path: fs.PathOrFileDescriptor,
    data: string | NodeJS.ArrayBufferView | ArrayBuffer | SharedArrayBuffer | NodeJS.ReadableStream | streamWeb.ReadableStream,
    options?: fs.WriteFileOptions,
): Promise<void>;

export function writeFile(
    path: fs.PathOrFileDescriptor,
    data: string | NodeJS.ArrayBufferView | ArrayBuffer | SharedArrayBuffer | NodeJS.ReadableStream | streamWeb.ReadableStream,
    optionsOrCallback?: fs.WriteFileOptions | fs.NoParamCallback,
    optionalCallback?: fs.NoParamCallback
): void | Promise<void> {
    const options = typeof optionsOrCallback !== 'function' ? optionsOrCallback : undefined;
    const callback: fs.NoParamCallback | undefined = optionalCallback ?? (typeof optionsOrCallback === 'function' ? optionsOrCallback : undefined);

    if (data instanceof ReadableStream) {
        data = Readable.fromWeb(data);
    }

    if (isNodeReadableStream(data)) {
        return _writeFileStreamHelper(path, data, options, callback!);
    }

    if (data instanceof SharedArrayBuffer || data instanceof ArrayBuffer) {
        data = new Uint8Array(data);
    }

    // @ts-expect-error
    return backingWriteFile(path, data as string | NodeJS.ArrayBufferView, optionsOrCallback, optionalCallback);
}

function isNodeReadableStream(stream: string | NodeJS.ArrayBufferView | ArrayBuffer | SharedArrayBuffer | NodeJS.ReadableStream | streamWeb.ReadableStream): stream is NodeJS.ReadableStream {
    return typeof stream === 'object' && 'readable' in stream && isReadable(stream);
}
