declare module 'universalify' {
    export function fromCallback(fn: (...args: any[]) => any): (...args: any[]) => Promise<any> | void;

    export function fromPromise<T extends any[], R>(fn: (...args: T) => Promise<R>): {
        (...args: T): Promise<R>;
        (...args: [...args: T, cb: R extends void ? ((err: any) => void) : ((err: any, result?: R) => void)]): void;
    };
}
