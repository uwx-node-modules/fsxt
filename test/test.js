// @ts-check

import { install } from '@cspotcode/source-map-support';
install();

import { tmpdir } from 'os';
import { resolve, join } from 'path';
import klaw from 'klaw';
import Mocha from 'mocha';

import minimist from 'minimist';
const argv = minimist(process.argv.slice(2));

const mochaOpts = Object.assign(/** @satisfies {Mocha.MochaOptions} */ ({
    ui: 'bdd',
    reporter: 'list',
    timeout: 30000,
}), argv);

const mocha = new Mocha(mochaOpts);
const testExt = '.test.js';

klaw('./lib').on('readable', function() {
    let item;
    while ((item = this.read())) {
        if (!item.stats.isFile()) return;
        if (item.path.lastIndexOf(testExt) !== (item.path.length - testExt.length)) return;
        mocha.addFile(item.path);
    }
}).on('end', () => {
    mocha.addFile(resolve(__dirname, 'htest.js'));
    mocha.run(async failures => {
        (await import('..')).remove(join(tmpdir(), 'fs-extra'), () => process.exit(failures));
    });
});
