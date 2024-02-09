import _assert from 'assert';
import { HookFunction, TestFunction, PendingTestFunction } from 'mocha';

// @ts-expect-error
export const assert: {
    [Properties in keyof typeof _assert]: typeof _assert[Properties]
} & ((done: (err?: any) => void) => typeof _assert) = (done: (err?: any) => void, ...args: any[]) => {
    if (typeof done !== 'function') {
        return _assert(done, ...args);
    }

    const record: Record<string | symbol, unknown> = {};
    return new Proxy(_assert, {
        get(target, p, receiver) {
            if (p in record) {
                return record[p];
            }

            if (p in target) {
                const v = target[p as keyof typeof target];
                if (typeof v === 'function') {
                    return record[p] = (...args: unknown[]) => {
                        try {
                            // @ts-expect-error
                            v.apply(receiver, args);
                            // done();
                        } catch (err) {
                            done(err);
                            throw err;
                        }
                    };
                }
            }
        },
    });
};

Object.assign(assert, _assert);

export default assert;
