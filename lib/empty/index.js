// @ts-check

import { fromPromise as u } from 'universalify';
import { readdir, readdirSync } from '@fs/index';
import { join } from 'path';
import { mkdirs, mkdirsSync } from '../mkdirs';
import { remove as _remove, removeSync } from '../remove';

export const emptyDir = u(async function emptyDir(dir) {
    let items;
    try {
        items = await readdir(dir);
    } catch {
        return mkdirs(dir);
    }

    return Promise.all(items.map(item => _remove(join(dir, item))));
});

/**
 * @param {string} dir
 * @returns
 */
export function emptyDirSync(dir) {
    let items;
    try {
        items = readdirSync(dir);
    } catch {
        return mkdirsSync(dir);
    }

    items.forEach(item => {
        item = join(dir, item);
        removeSync(item);
    });
}
