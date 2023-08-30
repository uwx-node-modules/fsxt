declare module '*/lib/copy' {
    export { copy, copySync } from 'fs-extra';
}
declare module '*/lib/empty' {
    export { emptyDir, emptyDirSync } from 'fs-extra';
}
declare module '*/lib/ensure' {
    export { ensureFile, ensureFileSync, ensureLink, ensureLinkSync, ensureSymlink, ensureSymlinkSync } from 'fs-extra';
}
declare module '*/lib/mkdirs' {
    export { ensureDir, ensureDirSync, mkdirSync, mkdirp, mkdirpSync, mkdirs, mkdirsSync, mkdtempSync } from 'fs-extra';
}
declare module '*/lib/move' {
    export { move, moveSync } from 'fs-extra';
}
declare module '*/lib/output-file' {
    export { outputFile, outputFileSync } from 'fs-extra';
}
declare module '*/lib/path-exists' {
    export { pathExists, pathExistsSync } from 'fs-extra';
}
declare module '*/lib/remove' {
    export { remove, removeSync } from 'fs-extra';
}