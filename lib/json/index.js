'use strict'

import { fromPromise as u } from 'universalify'
export { writeFile as writeJson, writeFileSync as writeJsonSync, readFile as readJson, readFileSync as readJsonSync } from 'jsonfile'

import _outputJson from './output-json';
export const outputJson = u(_outputJson);
export { default as outputJsonSync } from './output-json-sync';
