// https://github.com/microsoft/TypeScript/issues/50803
interface ArrayConstructor {
    fromAsync<T>(
        iterableOrArrayLike: AsyncIterable<T> | Iterable<T | Promise<T>> | ArrayLike<T | Promise<T>>,
    ): Promise<T[]>;

    fromAsync<T, U>(
        iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>,
        mapFn: (value: Awaited<T>) => U,
        thisArg?: any,
    ): Promise<Awaited<U>[]>;
}