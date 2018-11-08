# fsxt

Improved fork of `fs-extra` with extra [sic] features (and semicolons!)  
`fsxt` provides support for node.js 7 and above, but you should probably use 8.

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-google-brightgreen.svg)](https://google.github.io/styleguide/jsguide.html)
[![Used by practically no-one](https://img.shields.io/badge/downloads-basically_none-brightgreen.svg)](https://github.com/hansen-modules/fsxt)
[![Travis Build Status](https://img.shields.io/travis/hansen-modules/fsxt.svg)](https://travis-ci.org/hansen-modules/fsxt)
[![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/q0oojcejiyualshb/branch/master?svg=true)](https://ci.appveyor.com/project/uwx/fsxt)
[![Coverage Status](https://coveralls.io/repos/github/hansen-modules/fsxt/badge.svg?branch=master)](https://coveralls.io/github/hansen-modules/fsxt?branch=master)
[![GitHub issues](https://img.shields.io/github/issues/hansen-modules/fsxt.svg)](https://github.com/hansen-modules/fsxt/issues)
[![GitHub closed issues](https://img.shields.io/github/issues-closed/hansen-modules/fsxt.svg)](https://github.com/hansen-modules/fsxt/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/hansen-modules/fsxt.svg)](https://github.com/hansen-modules/fsxt/pulls)
[![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/hansen-modules/fsxt.svg)](https://github.com/hansen-modules/fsxt/pulls)
[![GitHub contributors](https://img.shields.io/github/contributors/hansen-modules/fsxt.svg)](https://github.com/hansen-modules/fsxt/graphs/contributors)
[![Licensed under MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/hansen-modules/fsxt/blob/master/LICENSE)
[![Maintenance](https://img.shields.io/maintenance/yes/2018.svg)](https://github.com/hansen-modules/fsxt)
[![David](https://img.shields.io/david/hansen-modules/fsxt.svg)](https://david-dm.org/hansen-modules/fsxt)
[![David](https://img.shields.io/david/dev/hansen-modules/fsxt.svg)](https://david-dm.org/hansen-modules/fsx#info=devDependenciest)

Installation
------------

    npm install --save fsxt

Or install with your preferred package manager (yarn, pnpm, ...)

Usage
-----

`fsxt` is a drop-in replacement for the node.js core [`fs`](http://nodejs.org/docs/latest/api/fs.html)
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

or if you prefer to make it clear that you're using `fsxt` and not [`fs`](http://nodejs.org/docs/latest/api/fs.html), you may want
to name your [`fs`](http://nodejs.org/docs/latest/api/fs.html) variable `fsxt` like so:

```js
const fsxt = require('fsxt');
```

you can also keep both, but it's redundant:

```js
const fs = require('fs');
const fsxt = require('fsxt');
```

Improvements on fs
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

Example use:

```js
const fs = require('fsxt');

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
async function copyFiles () {
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
The documentation is available at https://uwx-node-modules.github.io/fsxt/typedoc/globals.html.

You can also find the documentation for just the methods added in fsxt that aren't in fs-extra at
https://uwx-node-modules.github.io/fsxt/typedoc-fsxt-only/globals.html.

Third Party
-----------
## File / Directory Watching
If you want to watch for changes to files or directories, then you should use [chokidar](https://github.com/paulmillr/chokidar).


## Misc.
- [mfs](https://github.com/cadorn/mfs) - Monitor your fsxt calls.

Hacking on fsxt
---------------

Do you want to hack on fsxt? Well, you probably shouldn't. Still, you can go ahead and send a PR.

fsxt uses the [Google Style](https://google.github.io/styleguide/jsguide.html). It's pretty.

## Running the Test Suite

fsxt contains hundreds of tests that don't work.

- `npm run lint`: runs eslint
- `npm run unit`: runs the unit tests
- `npm test`: runs both the linter and the tests

## Windows

If you run the tests on the Windows and receive a lot of symbolic link `EPERM` permission errors, it's
because on Windows you need elevated privilege to create symbolic links. You can add this to your Windows's
account by following the instructions here: http://superuser.com/questions/104845/permission-to-make-symbolic-links-in-windows-7
However, I didn't have much luck doing this.

Since I develop on Mac OS X, I use VMWare Fusion for Windows testing. I create a shared folder that I map to a drive on Windows.
I open the `Node.js command prompt` and run as `Administrator`. I then map the network drive running the following command:

    net use z: "\\vmware-host\Shared Folders"

I can then navigate to my `fsxt` directory and run the tests.

Naming
------

eh just go with whatever feels good

Legal
-----

Licensed under MIT. Full license text available at [LICENSE.txt](https://github.com/uwx-node-modules/fsxt/blob/master/LICENSE.txt)

`fs-extra` is copyright (c) 2011-2017 [JP Richardson](https://github.com/jprichardson)

`fsxt` is copyright © 2016-2018 [uwx](https://github.com/uwx), some rights reserved.

Parts of the documentation were taken from other modules and the Node.js `fs` module.
Relevant licenses are included at the following locations:
* [LICENSE.DefinitelyTyped.txt](https://github.com/uwx-node-modules/fsxt/blob/master/LICENSE.DefinitelyTyped.txt) 
* [LICENSE.DefinitelyTyped-generator.txt](https://github.com/uwx-node-modules/fsxt/blob/master/LICENSE.DefinitelyTyped-generator.txt) 
* [LICENSE.fs-extra.txt](https://github.com/uwx-node-modules/fsxt/blob/master/LICENSE.fs-extra.txt) 
* [LICENSE.fs-vacuum.txt](https://github.com/uwx-node-modules/fsxt/blob/master/LICENSE.fs-vacuum.txt) 
* [LICENSE.nodejs.txt](https://github.com/uwx-node-modules/fsxt/blob/master/LICENSE.nodejs.txt) 
* [external/LICENSE.fs-vacuum.txt](https://github.com/uwx-node-modules/fsxt/blob/master/external\LICENSE.fs-vacuum.txt) 
* [external/LICENSE.path-is-inside.txt](https://github.com/uwx-node-modules/fsxt/blob/master/external\LICENSE.path-is-inside.txt) 
* [external/LICENSE.rimraf.txt](https://github.com/uwx-node-modules/fsxt/blob/master/external\LICENSE.rimraf.txt) 
* [external/LICENSE.append.txt](https://github.com/uwx-node-modules/fsxt/blob/master/external\LICENSE.append.txt) 
* [external/LICENSE.dive.txt](https://github.com/uwx-node-modules/fsxt/blob/master/external\LICENSE.dive.txt) 
* [external/LICENSE.dive-sync.txt](https://github.com/uwx-node-modules/fsxt/blob/master/external\LICENSE.dive-sync.txt) 

`fs-extra` and `fsxt` are not endorsed by or affiliated with Joyent or the Node.js Foundation.
`fsxt` is not endorsed by or affiliated with JP Richardson.