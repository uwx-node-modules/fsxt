import { type CustomPromisify, promisify } from 'util';

const universalifiedSymbol = Symbol();
export function universalify<TFunction extends CustomPromisify<TCustom>, TCustom extends (...args: any) => any>(fn: TFunction & CustomPromisify<TCustom>): TFunction & TCustom;
export function universalify<A extends unknown[], X extends (...args: any[]) => any, R>(fn: X & ((...args: [...A, (err: any, result: R) => void]) => void)): {
    (...args: Parameters<X>): void;
    (...args: A): Promise<R>;
}
export function universalify<A extends unknown[], X extends (...args: any[]) => any, R>(fn: X & ((...args: [...A, (err?: any) => void]) => void)): {
    (...args: Parameters<X>): void;
    (...args: A): Promise<void>;
}
export function universalify<A extends unknown[], X extends (...args: any[]) => any, R>(fn: X & ((...args: [...A, (err?: any, result?: R) => void]) => void)): {
    (...args: Parameters<X>): void;
    (...args: A): Promise<R>;
} {
    if (!fn) return fn;

    if (universalifiedSymbol in fn) {
        return fn[universalifiedSymbol] as any;
    }

    const promisified = promisify(fn);

    const f = function (...args: ([...A, (err: any, result: R) => void][0] | A[0])[]) {
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
