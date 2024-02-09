// @ts-check

import { rm, rmSync } from '@fs/index';
import { fromPromise } from 'universalify';

export const remove = fromPromise(function remove(path) {
    return rm(path, { recursive: true, force: true });
});

/**
 * @param {import('fs').PathLike} path
 */
export function removeSync(path) {
    rmSync(path, { recursive: true, force: true });
}
