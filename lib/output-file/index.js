// @ts-check

import { fromPromise } from 'universalify';
import { writeFile, existsSync, writeFileSync } from '@fs/index';
import { dirname } from 'path';
import { mkdirs, mkdirsSync } from '../mkdirs';
import { exists as pathExists } from '@fs/exists';

/**
 * @param {string} file
 * @param {string | NodeJS.ArrayBufferView} data
 * @param {import('fs').WriteFileOptions} encoding
 * @returns
 */
async function _outputFile(file, data, encoding = 'utf-8') {
    const dir = dirname(file);

    if (!(await pathExists(dir))) {
        await mkdirs(dir);
    }

    return writeFile(file, data, encoding);
}
export const outputFile = fromPromise(_outputFile);

/**
 * @param {string} file
 * @param {[string | NodeJS.ArrayBufferView, import('fs').WriteFileOptions | undefined]} args
 */
export function outputFileSync(file, ...args) {
    const dir = dirname(file);
    if (!existsSync(dir)) {
        mkdirsSync(dir);
    }

    writeFileSync(file, ...args);
}
