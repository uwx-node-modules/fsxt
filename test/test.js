// @ts-check

import { install } from '@cspotcode/source-map-support';
install();

import { tmpdir } from 'os';
import { resolve, join, extname } from 'path';
import { dive } from '../src/index';
import Mocha from 'mocha';

import minimist from 'minimist';
const argv = minimist(process.argv.slice(2));

const mochaOpts = Object.assign(/** @satisfies {Mocha.MochaOptions} */({
    // ui: 'bdd',
    // reporter: 'list',
    timeout: 10000,
}), argv);

const mocha = new Mocha(mochaOpts);

(async () => {
    await dive('./lib', (file, stat) => {
        if (!stat.isFile()) return;
        if (!file.endsWith('.test.js')) return;
        mocha.addFile(file);
    });

    mocha.addFile(resolve(__dirname, 'htest.js'));
    mocha.run(async failures => {
        (await import('..')).remove(join(tmpdir(), 'fs-extra'), () => process.exit(failures));
    });
})();
