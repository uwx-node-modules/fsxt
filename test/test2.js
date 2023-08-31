// @ts-check

'use strict';

require('@cspotcode/source-map-support').install();

const os = require('os');
const path = require('path');
const Mocha = require('mocha');

const argv = require('minimist')(process.argv.slice(2));

const mochaOpts = Object.assign(/** @satisfies {Mocha.MochaOptions} */ ({
  ui: 'bdd',
  reporter: 'list',
  timeout: 30000,
}), argv);

const mocha = new Mocha(mochaOpts);

mocha.addFile(path.resolve(__dirname, 'htest.js'));
mocha.addFile(path.resolve(__dirname, 'mzfs-test.js'));
mocha.run((failures) => {
  require('../').remove(path.join(os.tmpdir(), 'fs-extra'), () => process.exit(failures));
});
