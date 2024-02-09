// eslint-disable-next-line @typescript-eslint/unbound-method, camelcase
export const Array_fromAsync = Array.fromAsync ?? async function fromAsync<T, U>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>> | ArrayLike<T | PromiseLike<T>>, mapperFn: (value: Awaited<T>) => U | PromiseLike<U>): Promise<Awaited<U | T>[]> {
    const items: Awaited<U | T>[] = [];
    if (mapperFn) {
        if (Symbol.asyncIterator in iterableOrArrayLike) {
            for await (const item of iterableOrArrayLike) {
                items.push(await mapperFn(item));
            }
        } else if (Symbol.iterator in iterableOrArrayLike) {
            for (const item of iterableOrArrayLike) {
                items.push(await mapperFn(await item));
            }
        } else {
            const length = iterableOrArrayLike.length;
            for (let i = 0; i < length; i++) {
                const item = await iterableOrArrayLike[i];
                items.push(await mapperFn(item));
            }
        }
    } else {
        if (Symbol.asyncIterator in iterableOrArrayLike) {
            for await (const item of iterableOrArrayLike) {
                items.push(item);
            }
        } else if (Symbol.iterator in iterableOrArrayLike) {
            for (const item of iterableOrArrayLike) {
                items.push(await item);
            }
        } else {
            const length = iterableOrArrayLike.length;
            for (let i = 0; i < length; i++) {
                const item = await iterableOrArrayLike[i];
                items.push(item);
            }
        }
    }
    return items;
};
