import { lstat, lstatSync } from '@fs/index';
import { fromPromise } from 'universalify';

async function _symlinkType(srcpath, type) {
    if (type) return type;

    let stats;
    try {
        stats = await lstat(srcpath);
    } catch {
        return 'file';
    }

    return (stats && stats.isDirectory()) ? 'dir' : 'file';
}

export const symlinkType = fromPromise(_symlinkType);

export function symlinkTypeSync(srcpath, type) {
    if (type) return type;

    let stats;
    try {
        stats = lstatSync(srcpath);
    } catch {
        return 'file';
    }
    return (stats && stats.isDirectory()) ? 'dir' : 'file';
}

