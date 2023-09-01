

import { universalify as u } from '@fs/universalify';
import { writeFile, existsSync, writeFileSync } from 'graceful-fs';
import { dirname } from 'path';
import { mkdirs, mkdirsSync } from '../mkdirs';
import { exists as pathExists } from '@fs/exists';

export const outputFile = u(function outputFile(file, data, encoding, callback) {
    if (typeof encoding === 'function') {
        callback = encoding;
        encoding = 'utf8';
    }

    const dir = dirname(file);
    pathExists(dir, (err, itDoes) => {
        if (err) return callback(err);
        if (itDoes) return writeFile(file, data, encoding, callback);

        mkdirs(dir, err => {
            if (err) return callback(err);

            writeFile(file, data, encoding, callback);
        });
    });
});

export function outputFileSync(file, ...args) {
    const dir = dirname(file);
    if (existsSync(dir)) {
        return writeFileSync(file, ...args);
    }
    mkdirsSync(dir);
    writeFileSync(file, ...args);
}
