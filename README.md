# fsxt

Improved fork of `fs-extra` with extra [sic] features (and semicolons!)  
`fsxt` provides support for node.js 7 and above, but you should probably use 8.

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-google-brightgreen.svg)](https://google.github.io/styleguide/jsguide.html)
[![Used by practically no-one](https://img.shields.io/badge/downloads-basically_none-brightgreen.svg)](https://github.com/uwx-node-modules/fsxt)
[![Travis Build Status](https://img.shields.io/travis/uwx-node-modules/fsxt.svg)](https://travis-ci.org/uwx-node-modules/fsxt)
[![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/q0oojcejiyualshb/branch/master?svg=true)](https://ci.appveyor.com/project/uwx/fsxt)
[![Coverage Status](https://coveralls.io/repos/github/uwx-node-modules/fsxt/badge.svg?branch=master)](https://coveralls.io/github/uwx-node-modules/fsxt?branch=master)
[![GitHub issues](https://img.shields.io/github/issues/uwx-node-modules/fsxt.svg)](https://github.com/uwx-node-modules/fsxt/issues)
[![GitHub closed issues](https://img.shields.io/github/issues-closed/uwx-node-modules/fsxt.svg)](https://github.com/uwx-node-modules/fsxt/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/uwx-node-modules/fsxt.svg)](https://github.com/uwx-node-modules/fsxt/pulls)
[![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/uwx-node-modules/fsxt.svg)](https://github.com/uwx-node-modules/fsxt/pulls)
[![GitHub contributors](https://img.shields.io/github/contributors/uwx-node-modules/fsxt.svg)](https://github.com/uwx-node-modules/fsxt/graphs/contributors)
[![Licensed under MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/uwx-node-modules/fsxt/blob/master/LICENSE)
[![Maintenance](https://img.shields.io/maintenance/yes/2018.svg)](https://github.com/uwx-node-modules/fsxt)
[![David](https://img.shields.io/david/uwx-node-modules/fsxt.svg)](https://david-dm.org/uwx-node-modules/fsxt)
[![David](https://img.shields.io/david/dev/uwx-node-modules/fsxt.svg)](https://david-dm.org/uwx-node-modules/fsx#info=devDependenciest)

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

Additionally, see [notes on `fs.read()` & `fs.write()`](docs/fs-read-write.md) if you're using
either method.

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

The docs don't include descriptions for methods inherited from fs-extra, but you can find them here:

- [copy](docs/copy.md)                   | [copySync](docs/copy-sync.md)
- [emptyDir](docs/emptyDir.md)           | [emptyDirSync](docs/emptyDir-sync.md)
- [ensureFile](docs/ensureFile.md)       | [ensureFileSync](docs/ensureFile-sync.md)
- [ensureDir](docs/ensureDir.md)         | [ensureDirSync](docs/ensureDir-sync.md)
- [ensureLink](docs/ensureLink.md)       | [ensureLinkSync](docs/ensureLink-sync.md)
- [ensureSymlink](docs/ensureSymlink.md) | [ensureSymlinkSync](docs/ensureSymlink-sync.md)
- [mkdirp](docs/ensureDir.md)            | [mkdirpSync](docs/ensureDir-sync.md)
- [mkdirs](docs/ensureDir.md)            | [mkdirsSync](docs/ensureDir-sync.md)
- [move](docs/move.md)                   | [moveSync](docs/move-sync.md)
- [outputFile](docs/outputFile.md)       | [outputFileSync](docs/outputFile-sync.md)
- [outputJson](docs/outputJson.md)       | [outputJsonSync](docs/outputJson-sync.md)
- [pathExists](docs/pathExists.md)       | [pathExistsSync](docs/pathExists-sync.md)
- [readJson](docs/readJson.md)           | [readJsonSync](docs/readJson-sync.md)
- [remove](docs/remove.md)               | [removeSync](docs/remove-sync.md)
- [writeJson](docs/writeJson.md)         | [writeJsonSync](docs/writeJson-sync.md)

The core node.js [`fs`](http://nodejs.org/docs/latest/api/fs.html) module methods are also
available; although the node.js documentation doesn't show Promise overloads of the async methods,
you can find them at:

<!-- 
generator snippet for nodejs core methods (run in http://nodejs.org/docs/latest/api/fs.html)
copy($$('h2').map(e => ({
	text: e.firstChild.textContent,
	mark: e.querySelector('.mark') && e.querySelector('.mark').href || null
})).filter(e => e.mark).map(e => `[${e.text.replace(/[\(\[\]\)]/g, '\\$&')}](${e.mark})`))
-->
- [Class: fs.Stats](https://nodejs.org/api/fs.html#fs_class_fs_stats)
- [fs.access\(path\[, mode\], callback\)](https://nodejs.org/api/fs.html#fs_fs_access_path_mode_callback)
- [fs.accessSync\(path\[, mode\]\)](https://nodejs.org/api/fs.html#fs_fs_accesssync_path_mode)
- [fs.appendFile\(path, data\[, options\], callback\)](https://nodejs.org/api/fs.html#fs_fs_appendfile_path_data_options_callback)
- [fs.appendFileSync\(path, data\[, options\]\)](https://nodejs.org/api/fs.html#fs_fs_appendfilesync_path_data_options)
- [fs.chmod\(path, mode, callback\)](https://nodejs.org/api/fs.html#fs_fs_chmod_path_mode_callback)
- [fs.chmodSync\(path, mode\)](https://nodejs.org/api/fs.html#fs_fs_chmodsync_path_mode)
- [fs.chown\(path, uid, gid, callback\)](https://nodejs.org/api/fs.html#fs_fs_chown_path_uid_gid_callback)
- [fs.chownSync\(path, uid, gid\)](https://nodejs.org/api/fs.html#fs_fs_chownsync_path_uid_gid)
- [fs.close\(fd, callback\)](https://nodejs.org/api/fs.html#fs_fs_close_fd_callback)
- [fs.closeSync\(fd\)](https://nodejs.org/api/fs.html#fs_fs_closesync_fd)
- [fs.constants](https://nodejs.org/api/fs.html#fs_fs_constants)
- [fs.copyFile\(src, dest\[, flags\], callback\)](https://nodejs.org/api/fs.html#fs_fs_copyfile_src_dest_flags_callback)
- [fs.copyFileSync\(src, dest\[, flags\]\)](https://nodejs.org/api/fs.html#fs_fs_copyfilesync_src_dest_flags)
- [fs.createReadStream\(path\[, options\]\)](https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options)
- [fs.createWriteStream\(path\[, options\]\)](https://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options)
- [fs.exists\(path, callback\)](https://nodejs.org/api/fs.html#fs_fs_exists_path_callback)
- [fs.existsSync\(path\)](https://nodejs.org/api/fs.html#fs_fs_existssync_path)
- [fs.fchmod\(fd, mode, callback\)](https://nodejs.org/api/fs.html#fs_fs_fchmod_fd_mode_callback)
- [fs.fchmodSync\(fd, mode\)](https://nodejs.org/api/fs.html#fs_fs_fchmodsync_fd_mode)
- [fs.fchown\(fd, uid, gid, callback\)](https://nodejs.org/api/fs.html#fs_fs_fchown_fd_uid_gid_callback)
- [fs.fchownSync\(fd, uid, gid\)](https://nodejs.org/api/fs.html#fs_fs_fchownsync_fd_uid_gid)
- [fs.fdatasync\(fd, callback\)](https://nodejs.org/api/fs.html#fs_fs_fdatasync_fd_callback)
- [fs.fdatasyncSync\(fd\)](https://nodejs.org/api/fs.html#fs_fs_fdatasyncsync_fd)
- [fs.fstat\(fd\[, options\], callback\)](https://nodejs.org/api/fs.html#fs_fs_fstat_fd_options_callback)
- [fs.fstatSync\(fd\[, options\]\)](https://nodejs.org/api/fs.html#fs_fs_fstatsync_fd_options)
- [fs.fsync\(fd, callback\)](https://nodejs.org/api/fs.html#fs_fs_fsync_fd_callback)
- [fs.fsyncSync\(fd\)](https://nodejs.org/api/fs.html#fs_fs_fsyncsync_fd)
- [fs.ftruncate\(fd\[, len\], callback\)](https://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback)
- [fs.ftruncateSync\(fd\[, len\]\)](https://nodejs.org/api/fs.html#fs_fs_ftruncatesync_fd_len)
- [fs.futimes\(fd, atime, mtime, callback\)](https://nodejs.org/api/fs.html#fs_fs_futimes_fd_atime_mtime_callback)
- [fs.futimesSync\(fd, atime, mtime\)](https://nodejs.org/api/fs.html#fs_fs_futimessync_fd_atime_mtime)
- [fs.lchmod\(path, mode, callback\)](https://nodejs.org/api/fs.html#fs_fs_lchmod_path_mode_callback)
- [fs.lchmodSync\(path, mode\)](https://nodejs.org/api/fs.html#fs_fs_lchmodsync_path_mode)
- [fs.lchown\(path, uid, gid, callback\)](https://nodejs.org/api/fs.html#fs_fs_lchown_path_uid_gid_callback)
- [fs.lchownSync\(path, uid, gid\)](https://nodejs.org/api/fs.html#fs_fs_lchownsync_path_uid_gid)
- [fs.link\(existingPath, newPath, callback\)](https://nodejs.org/api/fs.html#fs_fs_link_existingpath_newpath_callback)
- [fs.linkSync\(existingPath, newPath\)](https://nodejs.org/api/fs.html#fs_fs_linksync_existingpath_newpath)
- [fs.lstat\(path\[, options\], callback\)](https://nodejs.org/api/fs.html#fs_fs_lstat_path_options_callback)
- [fs.lstatSync\(path\[, options\]\)](https://nodejs.org/api/fs.html#fs_fs_lstatsync_path_options)
- [fs.mkdir\(path\[, options\], callback\)](https://nodejs.org/api/fs.html#fs_fs_mkdir_path_options_callback)
- [fs.mkdirSync\(path\[, options\]\)](https://nodejs.org/api/fs.html#fs_fs_mkdirsync_path_options)
- [fs.mkdtemp\(prefix\[, options\], callback\)](https://nodejs.org/api/fs.html#fs_fs_mkdtemp_prefix_options_callback)
- [fs.mkdtempSync\(prefix\[, options\]\)](https://nodejs.org/api/fs.html#fs_fs_mkdtempsync_prefix_options)
- [fs.open\(path\[, flags\[, mode\]\], callback\)](https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback)
- [fs.openSync\(path\[, flags, mode\]\)](https://nodejs.org/api/fs.html#fs_fs_opensync_path_flags_mode)
- [fs.read\(fd, buffer, offset, length, position, callback\)](https://nodejs.org/api/fs.html#fs_fs_read_fd_buffer_offset_length_position_callback)
- [fs.readdir\(path\[, options\], callback\)](https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback)
- [fs.readdirSync\(path\[, options\]\)](https://nodejs.org/api/fs.html#fs_fs_readdirsync_path_options)
- [fs.readFile\(path\[, options\], callback\)](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback)
- [fs.readFileSync\(path\[, options\]\)](https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options)
- [fs.readlink\(path\[, options\], callback\)](https://nodejs.org/api/fs.html#fs_fs_readlink_path_options_callback)
- [fs.readlinkSync\(path\[, options\]\)](https://nodejs.org/api/fs.html#fs_fs_readlinksync_path_options)
- [fs.readSync\(fd, buffer, offset, length, position\)](https://nodejs.org/api/fs.html#fs_fs_readsync_fd_buffer_offset_length_position)
- [fs.realpath\(path\[, options\], callback\)](https://nodejs.org/api/fs.html#fs_fs_realpath_path_options_callback)
- [fs.realpath.native\(path\[, options\], callback\)](https://nodejs.org/api/fs.html#fs_fs_realpath_native_path_options_callback)
- [fs.realpathSync\(path\[, options\]\)](https://nodejs.org/api/fs.html#fs_fs_realpathsync_path_options)
- [fs.realpathSync.native\(path\[, options\]\)](https://nodejs.org/api/fs.html#fs_fs_realpathsync_native_path_options)
- [fs.rename\(oldPath, newPath, callback\)](https://nodejs.org/api/fs.html#fs_fs_rename_oldpath_newpath_callback)
- [fs.renameSync\(oldPath, newPath\)](https://nodejs.org/api/fs.html#fs_fs_renamesync_oldpath_newpath)
- [fs.rmdir\(path, callback\)](https://nodejs.org/api/fs.html#fs_fs_rmdir_path_callback)
- [fs.rmdirSync\(path\)](https://nodejs.org/api/fs.html#fs_fs_rmdirsync_path)
- [fs.stat\(path\[, options\], callback\)](https://nodejs.org/api/fs.html#fs_fs_stat_path_options_callback)
- [fs.statSync\(path\[, options\]\)](https://nodejs.org/api/fs.html#fs_fs_statsync_path_options)
- [fs.symlink\(target, path\[, type\], callback\)](https://nodejs.org/api/fs.html#fs_fs_symlink_target_path_type_callback)
- [fs.symlinkSync\(target, path\[, type\]\)](https://nodejs.org/api/fs.html#fs_fs_symlinksync_target_path_type)
- [fs.truncate\(path\[, len\], callback\)](https://nodejs.org/api/fs.html#fs_fs_truncate_path_len_callback)
- [fs.truncateSync\(path\[, len\]\)](https://nodejs.org/api/fs.html#fs_fs_truncatesync_path_len)
- [fs.unlink\(path, callback\)](https://nodejs.org/api/fs.html#fs_fs_unlink_path_callback)
- [fs.unlinkSync\(path\)](https://nodejs.org/api/fs.html#fs_fs_unlinksync_path)
- [fs.unwatchFile\(filename\[, listener\]\)](https://nodejs.org/api/fs.html#fs_fs_unwatchfile_filename_listener)
- [fs.utimes\(path, atime, mtime, callback\)](https://nodejs.org/api/fs.html#fs_fs_utimes_path_atime_mtime_callback)
- [fs.utimesSync\(path, atime, mtime\)](https://nodejs.org/api/fs.html#fs_fs_utimessync_path_atime_mtime)
- [fs.watch\(filename\[, options\]\[, listener\]\)](https://nodejs.org/api/fs.html#fs_fs_watch_filename_options_listener)
- [fs.watchFile\(filename\[, options\], listener\)](https://nodejs.org/api/fs.html#fs_fs_watchfile_filename_options_listener)
- [fs.write\(fd, buffer\[, offset\[, length\[, position\]\]\], callback\)](https://nodejs.org/api/fs.html#fs_fs_write_fd_buffer_offset_length_position_callback)
- [fs.write\(fd, string\[, position\[, encoding\]\], callback\)](https://nodejs.org/api/fs.html#fs_fs_write_fd_string_position_encoding_callback)
- [fs.writeFile\(file, data\[, options\], callback\)](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
- [fs.writeFileSync\(file, data\[, options\]\)](https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options)
- [fs.writeSync\(fd, buffer\[, offset\[, length\[, position\]\]\]\)](https://nodejs.org/api/fs.html#fs_fs_writesync_fd_buffer_offset_length_position)
- [fs.writeSync\(fd, string\[, position\[, encoding\]\]\)](https://nodejs.org/api/fs.html#fs_fs_writesync_fd_string_position_encoding)

Third Party
-----------
### File / Directory Watching
If you want to watch for changes to files or directories, then you should use [chokidar](https://github.com/paulmillr/chokidar).


### Misc.
- [mfs](https://github.com/cadorn/mfs) - Monitor your fsxt calls.

Hacking on fsxt
---------------

Do you want to hack on fsxt? Well, you probably shouldn't. Still, you can go ahead and send a PR.

Please, no changes to anything in the `lib` folder; the contents of that folder are almost entirely
verbatim from fs-extra, so they should be submitted upstream.

fsxt uses the [Google Style](https://google.github.io/styleguide/jsguide.html). It's pretty.

### Running the Test Suite

fsxt contains like at least 4 tests that pass.

- `npm run lint`: runs eslint
- `npm run unit`: runs the unit tests
- `npm test`: runs both the linter and the tests

#### Windows

If you run the tests on the Windows and receive a lot of symbolic link `EPERM` permission errors,
it's because on Windows you need elevated privilege to create symbolic links. You can either run the
tests as Administrator or run `node testlite` to test only fsxt-exclusive methods, which doesn't
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
- [LICENSE.nodejs.txt](https://github.com/uwx-node-modules/fsxt/blob/master/LICENSE.nodejs.txt) 
- [external/LICENSE.fs-vacuum.txt](https://github.com/uwx-node-modules/fsxt/blob/master/external/LICENSE.fs-vacuum.txt) 
- [external/LICENSE.path-is-inside.txt](https://github.com/uwx-node-modules/fsxt/blob/master/external/LICENSE.path-is-inside.txt) 
- [external/LICENSE.rimraf.txt](https://github.com/uwx-node-modules/fsxt/blob/master/external/LICENSE.rimraf.txt) 
- [external/LICENSE.append.txt](https://github.com/uwx-node-modules/fsxt/blob/master/external/LICENSE.append.txt) 
- [external/LICENSE.dive.txt](https://github.com/uwx-node-modules/fsxt/blob/master/external/LICENSE.dive.txt) 
- [external/LICENSE.dive-sync.txt](https://github.com/uwx-node-modules/fsxt/blob/master/external/LICENSE.dive-sync.txt) 

`fs-extra` and `fsxt` are not endorsed by or affiliated with Joyent or the Node.js Foundation.
`fsxt` is not endorsed by or affiliated with JP Richardson.