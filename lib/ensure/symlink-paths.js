import { isAbsolute, dirname, join, relative } from 'path';
import { lstat, existsSync } from '../fs';
import { exists as pathExists } from '@fs/exists';
import { fromPromise } from 'universalify';

/**
 * Function that returns two types of paths, one relative to symlink, and one
 * relative to the current working directory. Checks if path is absolute or
 * relative. If the path is relative, this function checks if the path is
 * relative to symlink or relative to current working directory. This is an
 * initiative to find a smarter `srcpath` to supply when building symlinks.
 * This allows you to determine which path to use out of one of three possible
 * types of source paths. The first is an absolute path. This is detected by
 * `path.isAbsolute()`. When an absolute path is provided, it is checked to
 * see if it exists. If it does it's used, if not an error is returned
 * (callback)/ thrown (sync). The other two options for `srcpath` are a
 * relative url. By default Node's `fs.symlink` works by creating a symlink
 * using `dstpath` and expects the `srcpath` to be relative to the newly
 * created symlink. If you provide a `srcpath` that does not exist on the file
 * system it results in a broken symlink. To minimize this, the function
 * checks to see if the 'relative to symlink' source file exists, and if it
 * does it will use it. If it does not, it checks if there's a file that
 * exists that is relative to the current working directory, if does its used.
 * This preserves the expectations of the original fs.symlink spec and adds
 * the ability to pass in `relative to current working direcotry` paths.
 */

async function _symlinkPaths(srcpath, dstpath) {
    if (isAbsolute(srcpath)) {
        try {
            await lstat(srcpath);
        } catch (err) {
            err.message = err.message.replace('lstat', 'ensureSymlink');
            throw err;
        }

        return {
            toCwd: srcpath,
            toDst: srcpath
        };
    }

    const dstdir = dirname(dstpath);
    const relativeToDst = join(dstdir, srcpath);

    const exists = await pathExists(relativeToDst);
    if (exists) {
        return {
            toCwd: relativeToDst,
            toDst: srcpath
        };
    }

    try {
        await lstat(srcpath);
    } catch (err) {
        err.message = err.message.replace('lstat', 'ensureSymlink');
        throw err;
    }

    return {
        toCwd: srcpath,
        toDst: relative(dstdir, srcpath)
    };
}

export const symlinkPaths = fromPromise(_symlinkPaths);

export function symlinkPathsSync(srcpath, dstpath) {
    if (isAbsolute(srcpath)) {
        const exists = existsSync(srcpath);
        if (!exists) throw new Error('absolute srcpath does not exist');
        return {
            toCwd: srcpath,
            toDst: srcpath
        };
    }

    const dstdir = dirname(dstpath);
    const relativeToDst = join(dstdir, srcpath);
    const exists = existsSync(relativeToDst);
    if (exists) {
        return {
            toCwd: relativeToDst,
            toDst: srcpath
        };
    }

    const srcExists = existsSync(srcpath);
    if (!srcExists) throw new Error('relative srcpath does not exist');
    return {
        toCwd: srcpath,
        toDst: relative(dstdir, srcpath)
    };
}
