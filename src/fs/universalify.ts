import { type CustomPromisify, promisify } from 'util';

// https://www.reddit.com/r/typescript/comments/10ibwi4/get_last_item_type_of_a_tuple/j5dogh8/
type LastElement<Arr extends any[]> = Arr extends [...any[], infer B] ? B : never

type CallbackArgs<T extends (...args: any) => any> = LastElement<Parameters<T>> extends (err: any, ...cbArgs: infer CbArgs) => void
    ? CbArgs
    : never;

const universalifiedSymbol = Symbol();

// fallbackObjectCreator overloads
export function universalify<TFunction extends CustomPromisify<TCustom> & ((...args: any) => any), TCustom extends (...args: any) => any>(
    fn: TFunction & CustomPromisify<TCustom>,
    fallbackMultiResultObjectCreator: (...args: CallbackArgs<TFunction>) => Awaited<ReturnType<TCustom>>
): TFunction & TCustom;
export function universalify<A extends unknown[], X extends (...args: any[]) => any, R extends any[], F>(
    fn: X & ((...args: [...A, (err: any, ...cbArgs: R) => void]) => void),
    fallbackMultiResultObjectCreator: (...args: R) => F
): {
    (...args: Parameters<X>): void;
    (...args: A): Promise<F>;
}

// no fallback overloads
export function universalify<TFunction extends CustomPromisify<TCustom>, TCustom extends (...args: any) => any>(fn: TFunction & CustomPromisify<TCustom>): TFunction & TCustom;
export function universalify<A extends unknown[], X extends (...args: any[]) => any, R>(fn: X & ((...args: [...A, (err: any, result: R) => void]) => void)): {
    (...args: Parameters<X>): void;
    (...args: A): Promise<R>;
}
export function universalify<A extends unknown[], X extends (...args: any[]) => any, R>(fn: X & ((...args: [...A, (err?: any) => void]) => void)): {
    (...args: Parameters<X>): void;
    (...args: A): Promise<void>;
}

// implementation
export function universalify<A extends unknown[], X extends (...args: any[]) => any, R>(
    fn: X & ((...args: [...A, (err?: any, result?: R) => void]) => void),
    fallbackMultiResultObjectCreator?: (...args: any[]) => any
): {
    (...args: Parameters<X>): void;
    (...args: A): Promise<R>;
} {
    if (!fn) return fn;

    if (universalifiedSymbol in fn) {
        return fn[universalifiedSymbol] as any;
    }

    const promisified = fallbackMultiResultObjectCreator ? promisifyFallback(fn, fallbackMultiResultObjectCreator) : promisify(fn);

    const f = function(...args: ([...A, (err: any, result: R) => void][0] | A[0])[]) {
        const cb = args[args.length - 1];
        if (typeof cb === 'function') {
            return fn(...args as Parameters<typeof fn>);
        }
        return promisified(...args);
    };

    const attr = {
        value: f, enumerable: false, writable: false, configurable: true
    };
    Object.defineProperty(fn, universalifiedSymbol, attr);
    Object.defineProperty(f, universalifiedSymbol, attr);

    return f;
}

function promisifyFallback<T extends any[], TResults extends any[], TFallback>(
    fn: (...args: [...args: T, callback: (err: any, ...results: TResults) => void]) => void,
    fallbackObjectCreator: (...args: TResults) => TFallback
): (...args: T) => Promise<TFallback> {
    // Return the existing util.promisified implementation if one exists. We expect that the util.promisified version has the same return signature, but this is not enforced except by TypeScript.
    if ('__promisify__' in fn || promisify.custom in fn) {
        return promisify(fn) as any;
    }

    return (...args) => {
        return new Promise((resolve, reject) => {
            fn(...args, (err: any, ...results: TResults) => {
                if (err) reject(err);
                resolve(fallbackObjectCreator(...results));
            });
        });
    };
}

