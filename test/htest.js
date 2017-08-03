'use strict';
/* globals module, exports, require, process */
/* exported module, exports, require, process */

let os = require('os');
let path = require('path');
let Mocha = require('mocha');
let assign = require('./lib/util/assign');
let klaw = require('klaw');

(() => {
  const arr = [];
  const r = require('./index.js');
  for (let key in r) {
    if (r[key] === undefined) {
      arr.push(key + ' is not defined!!');
    }
  }
  if (arr.length > 0) throw arr.join(', ');
})();
