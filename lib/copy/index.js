'use strict';

import { universalify as u } from '@fs/universalify';

import _copy from './copy';
export const copy = u(_copy);

export { default as copySync } from './copy-sync';
