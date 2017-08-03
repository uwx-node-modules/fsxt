'use strict';

const common = require('../common');

if (!(common.isOSX || common.isWindows)) {
  common.skip('recursive option is darwin/windows specific');
}

const assert = require('assert');
const path = require('path');
const fs = require('fs');

const testDir = common.tmpDir;
const filenameOne = 'watch.txt';

common.refreshTmpDir();

const testsubdir = fs.mkdtempSync(testDir + path.sep);
const relativePathOne = path.join(path.basename(testsubdir), filenameOne);
const filepathOne = path.join(testsubdir, filenameOne);

const watcher = fs.watch(testDir, {recursive: true});

let watcherClosed = false;
watcher.on('change', function(event, filename) {
  assert.ok('change' === event || 'rename' === event);

  // Ignore stale events generated by mkdir and other tests
  if (filename !== relativePathOne) {
    return;
  }

  if (common.isOSX) {
    clearInterval(interval);
  }
  watcher.close();
  watcherClosed = true;
});

let interval;
if (common.isOSX) {
  interval = setInterval(function() {
    fs.writeFileSync(filepathOne, 'world');
  }, 10);
} else {
  fs.writeFileSync(filepathOne, 'world');
}

process.on('exit', function() {
  assert(watcherClosed, 'watcher Object was not closed');
});
