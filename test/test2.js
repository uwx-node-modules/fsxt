'use strict';

const os = require('os');
const path = require('path');
const klaw = require('klaw');
const Mocha = require('mocha');
const assign = require('../lib/util/assign');

const argv = require('minimist')(process.argv.slice(2));

const mochaOpts = assign({
  ui: 'bdd',
  reporter: 'list',
  timeout: 30000,
}, argv);

const mocha = new Mocha(mochaOpts);
const testExt = '.test.js';

mocha.addFile('./test/htest.js');
mocha.addFile('./test/mzfs-test.js');
mocha.run((failures) => {
  require('../').remove(path.join(os.tmpdir(), 'fs-extra'), () => process.exit(failures));
});