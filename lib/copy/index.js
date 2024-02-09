import { fromPromise } from 'universalify';

import _copy from './copy';
export const copy = fromPromise(_copy);

export { default as copySync } from './copy-sync';
