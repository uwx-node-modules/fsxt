// @ts-check

'use strict';

const os = require('os');
const path = require('path');
const klaw = require('klaw');
const Mocha = require('mocha');

const argv = require('minimist')(process.argv.slice(2));

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
  mocha.addFile(path.resolve(__dirname, 'htest.js'));
  mocha.addFile(path.resolve(__dirname, 'mzfs-test.js'));
  mocha.run((failures) => {
    require('../').remove(path.join(os.tmpdir(), 'fs-extra'), () => process.exit(failures));
  });
});
