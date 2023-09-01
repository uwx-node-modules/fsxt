// @ts-check

// Export promisified graceful-fs:
export * from '@fs/index';

// Export extra methods:
export * from './copy';
export * from './empty';
export * from './ensure';
export * from '@fsxt/json';
export * from './mkdirs';
export * from './move';
export * from './output-file';
export * from './remove';
export { exists } from '@fs/exists';

// Export aliases used by fs-extra tests:
export { existsSync as pathExistsSync } from '@fs/index';
export { exists as pathExists } from '@fs/exists';
export { readJson as readJSON, readJsonSync as readJSONSync, writeJson as writeJSON, writeJsonSync as writeJSONSync, outputJson as outputJSON, outputJsonSync as outputJSONSync } from '@fsxt/json';

export {
    mkdirs as mkdirp,
    mkdirsSync as mkdirpSync,
    mkdirs as ensureDir,
    mkdirsSync as ensureDirSync,
} from './mkdirs';

export {
    // file
    ensureFile as createFile,
    ensureFileSync as createFileSync,

    // link
    ensureLink as createLink,
    ensureLinkSync as createLinkSync,

    // symlink
    ensureSymlink as createSymlink,
    ensureSymlinkSync as createSymlinkSync,
} from './ensure';
