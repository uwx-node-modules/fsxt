

import { rm, rmSync } from 'graceful-fs';
import { universalify as u } from '@fs/universalify';

export const remove = u(function remove(path, callback) {
    rm(path, { recursive: true, force: true }, callback);
});

export function removeSync(path) {
    rmSync(path, { recursive: true, force: true });
}
