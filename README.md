# fsxt

Improved fork of `fs-extra` with extra [sic] features!
`fsxt` provides support for node.js 16 and above.

![npm](https://img.shields.io/npm/v/fsxt)
[![Node.js CI](https://github.com/uwx-node-modules/fsxt/actions/workflows/ci.yml/badge.svg)](https://github.com/uwx-node-modules/fsxt/actions/workflows/ci.yml)
[![GitHub issues](https://img.shields.io/github/issues/uwx-node-modules/fsxt.svg)](https://github.com/uwx-node-modules/fsxt/issues)
[![GitHub closed issues](https://img.shields.io/github/issues-closed/uwx-node-modules/fsxt.svg)](https://github.com/uwx-node-modules/fsxt/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/uwx-node-modules/fsxt.svg)](https://github.com/uwx-node-modules/fsxt/pulls)
[![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/uwx-node-modules/fsxt.svg)](https://github.com/uwx-node-modules/fsxt/pulls)
[![GitHub contributors](https://img.shields.io/github/contributors/uwx-node-modules/fsxt.svg)](https://github.com/uwx-node-modules/fsxt/graphs/contributors)
[![Licensed under MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/uwx-node-modules/fsxt/blob/master/LICENSE)
[![Maintenance](https://img.shields.io/maintenance/yes/2023.svg)](https://github.com/uwx-node-modules/fsxt)

Installation
------------

    npm install fsxt

    pnpm install fsxt

    yarn add fsxt

Or install with your preferred package manager (yarn, pnpm, ...)

Usage
-----

`fsxt` is a mostly drop-in replacement for the node.js core [`fs`](http://nodejs.org/docs/latest/api/fs.html)
module. All methods in `fs` can be used in their standard forms in fsxt, with some
[improvements](#improvements).

You don't ever need to include the original `fs` module again:

```js
const fs = require('fs'); // this is no longer necessary
```

you can now do this:

```js
const fs = require('fsxt');
```

or if you prefer to make it clear that you're using `fsxt` and not `fs`, you may want to name your
`fs` variable `fsxt` like so:

```js
const fsxt = require('fsxt');
```

you can also keep both, but it's redundant:

```js
const fs = require('fs');
const fsxt = require('fsxt');
```

Breaking changes from `node:fs`
------------------

The callback-based implementation of `fs.exists` now uses a propper error-first callback system like `mz/fs`.

Improvements on `node:fs`
------------------
All the improvements from [`mz/fs`](https://github.com/normalize/mz/blob/master/fs.js) are included,
which also includes improvements from [`graceful-fs`](https://github.com/isaacs/node-graceful-fs#improvements-over-fs-module).

Most methods are async by default, returning a Promise that resolves to the method's result, or
rejects if the operation fails.

Sync methods on the other hand will throw if an error occurs, and directly return the resulting
value to the caller if the operation succeeds.

You can also use the methods in the legacy node.js form, passing a callback as the last parameter,
as a function that takes `(Error, <result>)` parameters, but it's not recommended, and those
variants may be removed in a later (major) version.

Additionally, see [notes on `fs.read()` & `fs.write()`](docs/fs-read-write.md) if you're using
either method.

Example use:

```js
const fs = require('fsxt');
// or
// import * as fs from 'fsxt';

// Async with promises:
fs.copy('/tmp/myfile', '/tmp/mynewfile')
  .then(() => console.log('success!'))
  .catch(err => console.error(err));

// Async with callbacks:
fs.copy('/tmp/myfile', '/tmp/mynewfile', err => {
  if (err) return console.error(err);
  console.log('success!');
});

// Sync:
try {
  fs.copySync('/tmp/myfile', '/tmp/mynewfile');
  console.log('success!');
} catch (err) {
  console.error(err);
}

// Async/Await:
async function copyFiles() {
  try {
    await fs.copy('/tmp/myfile', '/tmp/mynewfile');
    console.log('success!');
  } catch (err) {
    console.error(err);
  }
}

copyFiles();
```

Methods
-------
The documentation is available at https://uwx-node-modules.github.io/fsxt/.

Third Party
-----------
### File / Directory Watching
If you want to watch for changes to files or directories, then you should use [chokidar](https://github.com/paulmillr/chokidar).

### Misc.
- [mfs](https://github.com/cadorn/mfs) - Monitor your fsxt calls.

Hacking on fsxt
---------------

Do you want to hack on fsxt? Well, you probably shouldn't. Still, you can go ahead and send a PR.

Please, no changes to anything in the `lib` folder; the contents of that folder are taken entirely
verbatim from fs-extra, so they should be submitted upstream.

### Running the Test Suite

fsxt contains like at least 4 tests that pass.

- `npm run lint`: runs eslint
- `npm run test`: runs the tests
- `npm run test-no-fse`: runs the tests, except for fs-extra tests

#### Windows

If you run the tests on the Windows and receive a lot of symbolic link `EPERM` permission errors,
it's because on Windows you need elevated privilege to create symbolic links. You can either run the
tests as Administrator or run `npm run test-no-fse` to test only fsxt-exclusive methods, which doesn't
include symbolic links

Legal
-----

Licensed under MIT. Full license text available at [LICENSE.txt](https://github.com/uwx-node-modules/fsxt/blob/master/LICENSE.txt)

`fs-extra` is copyright (c) 2011-2017 [JP Richardson](https://github.com/jprichardson)

`fsxt` is copyright © 2016-2018 [uwx](https://github.com/uwx), some rights reserved.

Parts of the documentation were taken from other modules and the Node.js `fs` module.
Relevant licenses are included at the following locations:
- [LICENSE.DefinitelyTyped.txt](https://github.com/uwx-node-modules/fsxt/blob/master/LICENSE.DefinitelyTyped.txt)
- [LICENSE.DefinitelyTyped-generator.txt](https://github.com/uwx-node-modules/fsxt/blob/master/LICENSE.DefinitelyTyped-generator.txt)
- [LICENSE.fs-extra.txt](https://github.com/uwx-node-modules/fsxt/blob/master/LICENSE.fs-extra.txt)
- [LICENSE.fs-vacuum.txt](https://github.com/uwx-node-modules/fsxt/blob/master/LICENSE.fs-vacuum.txt)
- [LICENSE.jsonfile.txt](https://github.com/uwx-node-modules/fsxt/blob/master/LICENSE.jsonfile.txt)
- [LICENSE.nodejs.txt](https://github.com/uwx-node-modules/fsxt/blob/master/LICENSE.nodejs.txt)
- [LICENSE.fs-vacuum.txt](https://github.com/uwx-node-modules/fsxt/blob/master/external/LICENSE.fs-vacuum.txt)
- [LICENSE.path-is-inside.txt](https://github.com/uwx-node-modules/fsxt/blob/master/external/LICENSE.path-is-inside.txt)

`fs-extra` and `fsxt` are not endorsed by or affiliated with Joyent or the Node.js Foundation.
`fsxt` is not endorsed by or affiliated with JP Richardson.