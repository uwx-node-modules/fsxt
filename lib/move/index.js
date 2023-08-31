'use strict'

import { universalify as u } from '@fs/universalify';

import _move from './move';
export const move = u(_move)

export { default as moveSync } from './move-sync';
