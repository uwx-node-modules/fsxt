'use strict';
/* globals module, exports, require, process */
/* exported module, exports, require, process */

var os = require('os');
var path = require('path');
var Mocha = require('mocha');
var assign = require('./lib/util/assign');
var klaw = require('klaw');

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
