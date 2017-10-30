 <!-- BEGIN heading -->
fsxt
=========

Improved fork of `fs-extra` with extra [sic] features (and semicolons!)  
`fsxt` provides support for node.js 7 and above, but you should probably use 8.

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-google-brightgreen.svg)](https://google.github.io/styleguide/jsguide.html)
[![Used by practically no-one](https://img.shields.io/badge/downloads-basically_none-brightgreen.svg)](https://github.com/hansen-modules/fsxt)
[![Travis Build Status](https://img.shields.io/travis/hansen-modules/fsxt.svg)](https://travis-ci.org/hansen-modules/fsxt)
[![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/v5el5nslee17t1mw/branch/master?svg=true)](https://ci.appveyor.com/project/rafa1231518/node-fs-extra/branch/master)
[![Coverage Status](https://coveralls.io/repos/github/hansen-modules/fsxt/badge.svg?branch=master)](https://coveralls.io/github/hansen-modules/fsxt?branch=master)
[![GitHub issues](https://img.shields.io/github/issues/hansen-modules/fsxt.svg)](https://github.com/hansen-modules/fsxt/issues)
[![GitHub closed issues](https://img.shields.io/github/issues-closed/hansen-modules/fsxt.svg)](https://github.com/hansen-modules/fsxt/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/hansen-modules/fsxt.svg)](https://github.com/hansen-modules/fsxt/pulls)
[![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/hansen-modules/fsxt.svg)](https://github.com/hansen-modules/fsxt/pulls)
[![GitHub contributors](https://img.shields.io/github/contributors/hansen-modules/fsxt.svg)](https://github.com/hansen-modules/fsxt/graphs/contributors)
[![Licensed under MIT](https://img.shields.io/github/license/hansen-modules/fsxt.svg)](https://github.com/hansen-modules/fsxt/blob/master/LICENSE)
[![Maintenance](https://img.shields.io/maintenance/yes/2017.svg)](https://github.com/hansen-modules/fsxt)

<!-- ENDIN heading --> 

 <!-- BEGIN installation -->
Installation
------------

    npm install --save fsxt

<!-- ENDIN installation --> 

 <!-- BEGIN usage -->
Usage
-----

`fsxt` is a drop in replacement for native [`fs`](http://nodejs.org/docs/latest/api/fs.html). All methods in [`fs`](http://nodejs.org/docs/latest/api/fs.html) are unmodified and attached to `fsxt`.

You don't ever need to include the original [`fs`](http://nodejs.org/docs/latest/api/fs.html) module again:

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

#### Useful Resources
- [About ](#about-fsread--fswrite)[fs.read()](#fsread)[ & ](#about-fsread--fswrite)[fs.write()](#fswrite)
- [FS Constants](#fs-constants)
- [File Access Constants](#file-access-constants)
- [File Open Constants](#file-open-constants)
- [File Type Constants](#file-type-constants)
- [File Mode Constants](#file-mode-constants)
<!-- ENDIN usage --> 

 <!-- BEGIN syncinfo -->
Sync vs Async
-------------
Most methods are asynchronous by default (they take a callback with an `Error` or `null` as first argument, and some form of data as the second).
All async methods will return a Promise if the callback isn't passed.

Synchronous methods on the other hand will throw if an error occurs, and return the second parameter of what would be in the async callback.

Example:

```js
const fs = require('fsxt');

fs.copy('/tmp/myfile', '/tmp/mynewfile', function (err) {
  if (err) return console.error(err)
  console.log("success!");
});

try {
  fs.copySync('/tmp/myfile', '/tmp/mynewfile');
  console.log("success!");
} catch (err) {
  console.error(err);
}
```
<!-- ENDIN syncinfo --> 

Methods
-------
 <!-- BEGIN nav -->
- [copy(src, dest, [options, callback])](#copysrc-dest-options-callback) | [copySync(src, dest, [options])](#copysyncsrc-dest-options)
- [emptyDir(dir, [callback])](#emptydirdir-callback) | [emptyDirSync(dir)](#emptydirsyncdir)
- [ensureDir(dir, [callback])](#ensuredirdir-callback) | [ensureDirSync(dir)](#ensuredirsyncdir)
- [ensureFile(file, [callback])](#ensurefilefile-callback) | [ensureFileSync(file)](#ensurefilesyncfile)
- [ensureLink(srcpath, dstpath, [callback])](#ensurelinksrcpath-dstpath-callback) | [ensureLinkSync(srcpath, dstpath)](#ensurelinksyncsrcpath-dstpath)
- [ensureSymlink(srcpath, dstpath, [type, callback])](#ensuresymlinksrcpath-dstpath-type-callback) | [ensureSymlinkSync(srcpath, dstpath, [type])](#ensuresymlinksyncsrcpath-dstpath-type)
- [move(src, dest, [options, callback])](#movesrc-dest-options-callback) | [moveSync(src, dest, [options])](#movesyncsrc-dest-options)
- [outputFile(file, data, [options, callback])](#outputfilefile-data-options-callback) | [outputFileSync(file, data, [options])](#outputfilesyncfile-data-options)
- [outputJson(file, object, [options, callback])](#outputjsonfile-object-options-callback) | [outputJsonSync(file, object, [options])](#outputjsonsyncfile-object-options)
- [pathExists(file[, callback])](#pathexistsfile-callback) | [pathExistsSync(file)](#pathexistssyncfile)
- [readJson(file, [options, callback])](#readjsonfile-options-callback) | [readJsonSync(file, [options])](#readjsonsyncfile-options)
- [remove(path, [callback])](#removepath-callback) | [removeSync(path)](#removesyncpath)
- [writeJson(file, object, [options, callback])](#writejsonfile-object-options-callback) | [writeJsonSync(file, object, [options])](#writejsonsyncfile-object-options)
##### (methods added in fs-extra+)
- [exists](#existsfile-callback)
- [resolve](#resolvepath-child)
- [forEachChild](#foreachchildfunctionerror-file-options-callback) | [forEachChildSync](#foreachchildsyncpath-functionfile-options)
- [vacuum](#vacuumdirectory-options-callback)
- [dive | diveSync](#divedirectory-options-action-complete)
- [createReaddirStream](#createreaddirstreamdir-options)
- [readXML | readXMLSync](#readxmlpath-functionerr-parsedobject)
- [readLinesSync](#readlinessyncpath-encoding)
- [readSync](#readsyncpath-encoding)
- [isDirectory | isDirectorySync](#isdirectorypath-callback)
<!-- ENDIN nav --> 

##### (built-in `fs` module methods)

 <!-- BEGIN node-fs-nav -->
<!-- Generated using: copy($('.anchor').map(e => '- [' + e.parentElement.textContent + '](' + e.href.substring('https://github.com/fallk/node-fs-extra/blob/master/docs/fs.md'.length) + ')').join('\n'))-->
- [access(path[, mode], callback)](#fsaccesspath-mode-callback) | [accessSync(path[, mode])](#fsaccesssyncpath-mode)
- [appendFile(file, data[, options], callback)](#fsappendfilefile-data-options-callback) | [appendFileSync(file, data[, options])](#fsappendfilesyncfile-data-options)
- [chmod(path, mode, callback)](#fschmodpath-mode-callback) | [chmodSync(path, mode)](#fschmodsyncpath-mode)
- [chown(path, uid, gid, callback)](#fschownpath-uid-gid-callback) | [chownSync(path, uid, gid)](#fschownsyncpath-uid-gid)
- [close(fd, callback)](#fsclosefd-callback) | [closeSync(fd)](#fsclosesyncfd)
- [constants](#fsconstants)
- [createReadStream(path[, options])](#fscreatereadstreampath-options)
- [createWriteStream(path[, options])](#fscreatewritestreampath-options)
- [exists(path, callback)](#fsexistspath-callback) | [existsSync(path)](#fsexistssyncpath)
- [fchmod(fd, mode, callback)](#fsfchmodfd-mode-callback) | [fchmodSync(fd, mode)](#fsfchmodsyncfd-mode)
- [fchown(fd, uid, gid, callback)](#fsfchownfd-uid-gid-callback) | [fchownSync(fd, uid, gid)](#fsfchownsyncfd-uid-gid)
- [fdatasync(fd, callback)](#fsfdatasyncfd-callback) | [fdatasyncSync(fd)](#fsfdatasyncsyncfd)
- [fstat(fd, callback)](#fsfstatfd-callback) | [fstatSync(fd)](#fsfstatsyncfd)
- [fsync(fd, callback)](#fsfsyncfd-callback) | [fsyncSync(fd)](#fsfsyncsyncfd)
- [ftruncate(fd[, len], callback)](#fsftruncatefd-len-callback) | [ftruncateSync(fd[, len])](#fsftruncatesyncfd-len)
- [futimes(fd, atime, mtime, callback)](#fsfutimesfd-atime-mtime-callback) | [futimesSync(fd, atime, mtime)](#fsfutimessyncfd-atime-mtime)
- [lchmod(path, mode, callback)](#fslchmodpath-mode-callback) | [lchmodSync(path, mode)](#fslchmodsyncpath-mode)
- [lchown(path, uid, gid, callback)](#fslchownpath-uid-gid-callback) | [lchownSync(path, uid, gid)](#fslchownsyncpath-uid-gid)
- [link(existingPath, newPath, callback)](#fslinkexistingpath-newpath-callback) | [linkSync(existingPath, newPath)](#fslinksyncexistingpath-newpath)
- [lstat(path, callback)](#fslstatpath-callback) | [lstatSync(path)](#fslstatsyncpath)
- [mkdir(path[, mode], callback)](#fsmkdirpath-mode-callback) | [mkdirSync(path[, mode])](#fsmkdirsyncpath-mode)
- [mkdtemp(prefix[, options], callback)](#fsmkdtempprefix-options-callback) | [mkdtempSync(prefix[, options])](#fsmkdtempsyncprefix-options)
- [open(path, flags[, mode], callback)](#fsopenpath-flags-mode-callback) | [openSync(path, flags[, mode])](#fsopensyncpath-flags-mode)
- [read(fd, buffer, offset, length, position, callback)](#fsreadfd-buffer-offset-length-position-callback)
- [readdir(path[, options], callback)](#fsreaddirpath-options-callback) | [readdirSync(path[, options])](#fsreaddirsyncpath-options)
- [readFile(path[, options], callback)](#fsreadfilepath-options-callback) | [readFileSync(path[, options])](#fsreadfilesyncpath-options)
- [readlink(path[, options], callback)](#fsreadlinkpath-options-callback) | [readlinkSync(path[, options])](#fsreadlinksyncpath-options)
- [readSync(fd, buffer, offset, length, position)](#fsreadsyncfd-buffer-offset-length-position)
- [realpath(path[, options], callback)](#fsrealpathpath-options-callback) | [realpathSync(path[, options])](#fsrealpathsyncpath-options)
- [rename(oldPath, newPath, callback)](#fsrenameoldpath-newpath-callback) | [renameSync(oldPath, newPath)](#fsrenamesyncoldpath-newpath)
- [rmdir(path, callback)](#fsrmdirpath-callback) | [rmdirSync(path)](#fsrmdirsyncpath)
- [stat(path, callback)](#fsstatpath-callback) | [statSync(path)](#fsstatsyncpath)
- [symlink(target, path[, type], callback)](#fssymlinktarget-path-type-callback) | [symlinkSync(target, path[, type])](#fssymlinksynctarget-path-type)
- [truncate(path[, len], callback)](#fstruncatepath-len-callback) | [truncateSync(path[, len])](#fstruncatesyncpath-len)
- [unlink(path, callback)](#fsunlinkpath-callback) | [unlinkSync(path)](#fsunlinksyncpath)
- [unwatchFile(filename[, listener])](#fsunwatchfilefilename-listener)
- [utimes(path, atime, mtime, callback)](#fsutimespath-atime-mtime-callback) | [utimesSync(path, atime, mtime)](#fsutimessyncpath-atime-mtime)
- [watch(filename[, options][, listener])](#fswatchfilename-options-listener): [Caveats](#caveats), [Availability](#availability), [Inodes](#inodes), [Filename Argument](#filename-argument)
- [watchFile(filename[, options], listener)](#fswatchfilefilename-options-listener)
- [write(fd, buffer[, offset[, length[, position]]], callback)](#fswritefd-buffer-offset-length-position-callback)
- [write(fd, string[, position[, encoding]], callback)](#fswritefd-string-position-encoding-callback)
- [writeFile(file, data[, options], callback)](#fswritefilefile-data-options-callback) | [writeFileSync(file, data[, options])](#fswritefilesyncfile-data-options)
- [writeSync(fd, buffer[, offset[, length[, position]]])](#fswritesyncfd-buffer-offset-length-position) | [writeSync(fd, string[, position[, encoding]])](#fswritesyncfd-string-position-encoding)
<!-- ENDIN node-fs-nav --> 

 <!-- BEGIN fsextra -->
## copySync(src, dest, [options])

Copy a file or directory. The directory can have contents. Like `cp -r`.

- `src` `<String>`
- `dest` `<String>`
- `options` `<Object>`
  - `overwrite` `<boolean>`: overwrite existing file or directory, default is `true`. _Note that the copy operation will silently fail if you set this to `false` and the destination exists._ Use the `errorOnExist` option to change this behavior.
  - `errorOnExist` `<boolean>`: when `overwrite` is `false` and the destination exists, throw an error. Default is `false`.
  - `dereference` `<boolean>`: dereference symlinks, default is `false`.
  - `preserveTimestamps` `<boolean>`: will set last modification and access times to the ones of the original source files, default is `false`.
  - `filter` `<Function>`: Function to filter copied files. Return `true` to include, `false` to exclude. This can also be a RegExp, however this is deprecated (See [issue #239](https://github.com/jprichardson/node-fs-extra/issues/239) for background).

### Example:

```js
const fs = require('fs-extra')

// copy file
fs.copySync('/tmp/myfile', '/tmp/mynewfile')

// copy directory, even if it has subdirectories or files
fs.copySync('/tmp/mydir', '/tmp/mynewdir')
```

**Using filter function**

```js
const fs = require('fs-extra')

const filterFunc = (src, dest) => {
  // your logic here
  // it will be copied if return true
}

fs.copySync('/tmp/mydir', '/tmp/mynewdir', { filter: filterFunc })
```

## copy(src, dest, [options, callback])

Copy a file or directory. The directory can have contents. Like `cp -r`.

- `src` `<String>`
- `dest` `<String>` Note that if `src` is a file, `dest` cannot be a directory (see [issue #323](https://github.com/jprichardson/node-fs-extra/issues/323)).
- `options` `<Object>`
  - `overwrite` `<boolean>`: overwrite existing file or directory, default is `true`. _Note that the copy operation will silently fail if you set this to `false` and the destination exists._ Use the `errorOnExist` option to change this behavior.
  - `errorOnExist` `<boolean>`: when `overwrite` is `false` and the destination exists, throw an error. Default is `false`.
  - `dereference` `<boolean>`: dereference symlinks, default is `false`.
  - `preserveTimestamps` `<boolean>`: will set last modification and access times to the ones of the original source files, default is `false`.
  - `filter` `<Function>`: Function to filter copied files. Return `true` to include, `false` to exclude. This can also be a RegExp, however this is deprecated (See [issue #239](https://github.com/jprichardson/node-fs-extra/issues/239) for background).
- `callback` `<Function>`

### Example:

```js
const fs = require('fs-extra')

fs.copy('/tmp/myfile', '/tmp/mynewfile', err => {
  if (err) return console.error(err)

  console.log('success!')
}) // copies file

fs.copy('/tmp/mydir', '/tmp/mynewdir', err => {
  if (err) return console.error(err)

  console.log('success!')
}) // copies directory, even if it has subdirectories or files

// Promise usage:
fs.copy('/tmp/myfile', '/tmp/mynewfile')
.then(() => {
  console.log('success!')
})
.catch(err => {
  console.error(err)
})
```

**Using filter function**

```js
const fs = require('fs-extra')

const filterFunc = (src, dest) => {
  // your logic here
  // it will be copied if return true
}

fs.copy('/tmp/mydir', '/tmp/mynewdir', { filter: filterFunc }, err => {
  if (err) return console.error(err)

  console.log('success!')
})
```

## emptyDirSync(dir)

Ensures that a directory is empty. Deletes directory contents if the directory is not empty. If the directory does not exist, it is created. The directory itself is not deleted.

**Alias:** `emptydirSync()`

- `dir` `<String>`

### Example:

```js
const fs = require('fs-extra')

// assume this directory has a lot of files and folders
fs.emptyDirSync('/tmp/some/dir')
```

## emptyDir(dir, [callback])

Ensures that a directory is empty. Deletes directory contents if the directory is not empty. If the directory does not exist, it is created. The directory itself is not deleted.

**Alias:** `emptydir()`

- `dir` `<String>`
- `callback` `<Function>`

### Example:

```js
const fs = require('fs-extra')

// assume this directory has a lot of files and folders
fs.emptyDir('/tmp/some/dir', err => {
  if (err) return console.error(err)

  console.log('success!')
})

// With promises
fs.emptyDir('/tmp/some/dir')
.then(() => {
  console.log('success!')
})
.catch(err => {
  console.error(err)
})
```

## ensureDirSync(dir)

Ensures that the directory exists. If the directory structure does not exist, it is created. Like `mkdir -p`.

**Aliases:** `mkdirsSync()`, `mkdirpSync()`

- `dir` `<String>`

### Example:

```js
const fs = require('fs-extra')

const dir = '/tmp/this/path/does/not/exist'
fs.ensureDirSync(dir)
// dir has now been created, including the directory it is to be placed in
```

## ensureDir(dir, [callback])

Ensures that the directory exists. If the directory structure does not exist, it is created. Like `mkdir -p`.

**Aliases:** `mkdirs()`, `mkdirp()`

- `dir` `<String>`
- `callback` `<Function>`

### Example:

```js
const fs = require('fs-extra')

const dir = '/tmp/this/path/does/not/exist'
fs.ensureDir(dir, err => {
  console.log(err) // => null
  // dir has now been created, including the directory it is to be placed in
})

// With Promises:
fs.ensureDir(dir)
.then(() => {
  console.log('success!')
})
.catch(err => {
  console.error(err)
})
```

## ensureFileSync(file)

Ensures that the file exists. If the file that is requested to be created is in directories that do not exist, these directories are created. If the file already exists, it is **NOT MODIFIED**.

**Alias:** `createFileSync()`

- `file` `<String>`

### Example:

```js
const fs = require('fs-extra')

const file = '/tmp/this/path/does/not/exist/file.txt'
fs.ensureFileSync(file)
// file has now been created, including the directory it is to be placed in
```

## ensureFile(file, [callback])

Ensures that the file exists. If the file that is requested to be created is in directories that do not exist, these directories are created. If the file already exists, it is **NOT MODIFIED**.

**Alias:** `createFile()`

- `file` `<String>`
- `callback` `<Function>`

### Example:

```js
const fs = require('fs-extra')

const file = '/tmp/this/path/does/not/exist/file.txt'
fs.ensureFile(file, err => {
  console.log(err) // => null
  // file has now been created, including the directory it is to be placed in
})

// With Promises:
fs.ensureFile(file)
.then(() => {
  console.log('success!')
})
.catch(err => {
  console.error(err)
})
```

## ensureLinkSync(srcpath, dstpath)

Ensures that the link exists. If the directory structure does not exist, it is created.

- `srcpath` `<String>`
- `dstpath` `<String>`

### Example:

```js
const fs = require('fs-extra')

const srcpath = '/tmp/file.txt'
const dstpath = '/tmp/this/path/does/not/exist/file.txt'
fs.ensureLinkSync(srcpath, dstpath)
// link has now been created, including the directory it is to be placed in
```

## ensureLink(srcpath, dstpath, [callback])

Ensures that the link exists. If the directory structure does not exist, it is created.

- `srcpath` `<String>`
- `dstpath` `<String>`
- `callback` `<Function>`

### Example:

```js
const fs = require('fs-extra')

const srcpath = '/tmp/file.txt'
const dstpath = '/tmp/this/path/does/not/exist/file.txt'
fs.ensureLink(srcpath, dstpath, err => {
  console.log(err) // => null
  // link has now been created, including the directory it is to be placed in
})

// With Promises:
fs.ensureLink(srcpath, dstpath)
.then(() => {
  console.log('success!')
})
.catch(err => {
  console.error(err)
})
```

## ensureSymlinkSync(srcpath, dstpath, [type])

Ensures that the symlink exists. If the directory structure does not exist, it is created.

- `srcpath` `<String>`
- `dstpath` `<String>`
- `type` `<String>`

### Example:

```js
const fs = require('fs-extra')

const srcpath = '/tmp/file.txt'
const dstpath = '/tmp/this/path/does/not/exist/file.txt'
fs.ensureSymlinkSync(srcpath, dstpath)
// symlink has now been created, including the directory it is to be placed in
```

## ensureSymlink(srcpath, dstpath, [type, callback])

Ensures that the symlink exists. If the directory structure does not exist, it is created.

- `srcpath` `<String>`
- `dstpath` `<String>`
- `type` `<String>`
- `callback` `<Function>`

### Example:

```js
const fs = require('fs-extra')

const srcpath = '/tmp/file.txt'
const dstpath = '/tmp/this/path/does/not/exist/file.txt'
fs.ensureSymlink(srcpath, dstpath, err => {
  console.log(err) // => null
  // symlink has now been created, including the directory it is to be placed in
})

// With Promises:
fs.ensureSymlink(srcpath, dstpath)
.then(() => {
  console.log('success!')
})
.catch(err => {
  console.error(err)
})
```

## About `fs.read()` & `fs.write()`

[`fs.read()`](https://nodejs.org/api/fs.html#fs_fs_read_fd_buffer_offset_length_position_callback) & [`fs.write()`](https://nodejs.org/api/fs.html#fs_fs_write_fd_buffer_offset_length_position_callback) are different from other `fs` methods in that their callbacks are called with 3 arguments instead of the usual 2 arguments.

If you're using them with callbacks, they will behave as usual. However, their promise usage is a little different. `fs-extra` promisifies these methods like [`util.promisify()`](https://nodejs.org/api/util.html#util_util_promisify_original) (only available in Node 8+) does.

Here's the example promise usage:

### `fs.read()`

```js
// Basic promises
fs.read(fd, buffer, offset, length, position)
  .then(results => {
    console.log(results)
    // { bytesRead: 20, buffer: <Buffer 0f 34 5d ...> }
  })

// Async/await usage:
async function example () {
  const { bytesRead, buffer } = await fs.read(fd, Buffer.alloc(length), offset, length, position)
}
```

### `fs.write()`

```js
// Basic promises
fs.write(fd, buffer, offset, length, position)
  .then(results => {
    console.log(results)
    // { bytesWritten: 20, buffer: <Buffer 0f 34 5d ...> }
  })

// Async/await usage:
async function example () {
  const { bytesWritten, buffer } = await fs.write(fd, Buffer.alloc(length), offset, length, position)
}
```

## moveSync(src, dest, [options])

Moves a file or directory, even across devices.

- `src` `<String>`
- `dest` `<String>`
- `options` `<Object>`
  - `overwrite` `<boolean>`: overwrite existing file or directory, default is `false`.

### Example:

```js
const fs = require('fs-extra')

fs.moveSync('/tmp/somefile', '/tmp/does/not/exist/yet/somefile')
```

**Using `overwrite` option**

```js
const fs = require('fs-extra')

fs.moveSync('/tmp/somedir', '/tmp/may/already/existed/somedir', { overwrite: true })
```

## move(src, dest, [options, callback])

Moves a file or directory, even across devices.

- `src` `<String>`
- `dest` `<String>`
- `options` `<Object>`
  - `overwrite` `<boolean>`: overwrite existing file or directory, default is `false`.
- `callback` `<Function>`

### Example:

```js
const fs = require('fs-extra')

fs.move('/tmp/somefile', '/tmp/does/not/exist/yet/somefile', err => {
  if (err) return console.error(err)

  console.log('success!')
})

fs.move('/tmp/somefile', '/tmp/does/not/exist/yet/somefile')
.then(() => {
  console.log('success!')
})
.catch(err => {
  console.error(err)
})
```

**Using `overwrite` option**

```js
const fs = require('fs-extra')

fs.move('/tmp/somedir', '/tmp/may/already/existed/somedir', { overwrite: true }, err => {
  if (err) return console.error(err)

  console.log('success!')
})
```

## outputFileSync(file, data, [options])

Almost the same as `writeFileSync` (i.e. it [overwrites](http://pages.citebite.com/v2o5n8l2f5reb)), except that if the parent directory does not exist, it's created. `file` must be a file path (a buffer or a file descriptor is not allowed). `options` are what you'd pass to [`fs.writeFileSync()`](https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options).

- `file` `<String>`
- `data` `<String> | <Buffer> | <Uint8Array>`
- `options` `<Object> | <String>`

### Example:

```js
const fs = require('fs-extra')

const file = '/tmp/this/path/does/not/exist/file.txt'
fs.outputFileSync(file, 'hello!')

const data = fs.readFileSync(file, 'utf8')
console.log(data) // => hello!
```

## outputFile(file, data, [options, callback])

Almost the same as `writeFile` (i.e. it [overwrites](http://pages.citebite.com/v2o5n8l2f5reb)), except that if the parent directory does not exist, it's created. `file` must be a file path (a buffer or a file descriptor is not allowed). `options` are what you'd pass to [`fs.writeFile()`](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback).

- `file` `<String>`
- `data` `<String> | <Buffer> | <Uint8Array>`
- `options` `<Object> | <String>`
- `callback` `<Function>`

### Example:

```js
const fs = require('fs-extra')

const file = '/tmp/this/path/does/not/exist/file.txt'
fs.outputFile(file, 'hello!', err => {
  console.log(err) // => null

  fs.readFile(file, 'utf8', (err, data) => {
    if (err) return console.error(err)
    console.log(data) // => hello!
  })
})

// With Promises:
fs.outputFile(file, 'hello!')
.then(() => fs.readFile(file, 'utf8'))
.then(data => {
  console.log(data) // => hello!
})
.catch(err => {
  console.error(err)
})
```

## outputJsonSync(file, object, [options])

Almost the same as [`writeJsonSync`](writeJson-sync.md), except that if the directory does not exist, it's created.

**Alias:** `outputJSONSync()`

- `file` `<String>`
- `object` `<Object>`
- `options` `<Object>`
  - `spaces` `<Number|String>` Number of spaces to indent; or a string to use for indentation (i.e. pass `'\t'` for tab indentation). See [the docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_space_argument) for more info.
  - `EOL` `<String>` Set EOL character. Default is `\n`.
  - `replacer` [JSON replacer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter)
  - Also accepts [`fs.writeFileSync` options](https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options)

### Example:

```js
const fs = require('fs-extra')

const file = '/tmp/this/path/does/not/exist/file.json'
fs.outputJsonSync(file, {name: 'JP'})

const data = fs.readJsonSync(file)
console.log(data.name) // => JP
```

## outputJson(file, object, [options, callback])

Almost the same as [`writeJson`](writeJson.md), except that if the directory does not exist, it's created.

**Alias:** `outputJSON()`

- `file` `<String>`
- `object` `<Object>`
- `options` `<Object>`
  - `spaces` `<Number|String>` Number of spaces to indent; or a string to use for indentation (i.e. pass `'\t'` for tab indentation). See [the docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_space_argument) for more info.
  - `EOL` `<String>` Set EOL character. Default is `\n`.
  - `replacer` [JSON replacer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter)
  - Also accepts [`fs.writeFile` options](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
- `callback` `<Function>`

### Example:

```js
const fs = require('fs-extra')

const file = '/tmp/this/path/does/not/exist/file.json'
fs.outputJson(file, {name: 'JP'}, err => {
  console.log(err) // => null

  fs.readJson(file, (err, data) => {
    if (err) return console.error(err)
    console.log(data.name) // => JP
  })
})

// With Promises:
fs.outputJson(file, {name: 'JP'})
.then(() => fs.readJson(file))
.then(data => {
  console.log(data.name) // => JP
})
.catch(err => {
  console.error(err)
})
```

## pathExistsSync(file)

An alias for [`fs.existsSync()`](https://nodejs.org/api/fs.html#fs_fs_existssync_path), created for consistency with [`pathExists()`](pathExists.md).

## pathExists(file[, callback])

Test whether or not the given path exists by checking with the file system. Like [`fs.exists`](https://nodejs.org/api/fs.html#fs_fs_exists_path_callback), but with a normal callback signature (err, exists). Uses `fs.access` under the hood.

- `file` `<String>`
- `callback` `<Function>`

### Example:

```js
const fs = require('fs-extra')

const file = '/tmp/this/path/does/not/exist/file.txt'
// Promise usage:
fs.pathExists(file)
  .then(exists => console.log(exists)) // => false
// Callback usage:
fs.pathExists(file, (err, exists) => {
  console.log(err) // => null
  console.log(exists) // => false
})
```

## readJsonSync(file, [options])

Reads a JSON file and then parses it into an object. `options` are the same
that you'd pass to [`jsonFile.readFileSync`](https://github.com/jprichardson/node-jsonfile#readfilesyncfilename-options).

**Alias:** `readJSONSync()`

- `file` `<String>`
- `options` `<Object>`

### Example:

```js
const fs = require('fs-extra')

const packageObj = fs.readJsonSync('./package.json')
console.log(packageObj.version) // => 2.0.0
```

---

`readJsonSync()` can take a `throws` option set to `false` and it won't throw if the JSON is invalid. Example:

```js
const fs = require('fs-extra')

const file = '/tmp/some-invalid.json'
const data = '{not valid JSON'
fs.writeFileSync(file, data)

const obj = fs.readJsonSync(file, { throws: false })
console.log(obj) // => null
```

## readJson(file, [options, callback])

Reads a JSON file and then parses it into an object. `options` are the same
that you'd pass to [`jsonFile.readFile`](https://github.com/jprichardson/node-jsonfile#readfilefilename-options-callback).

**Alias:** `readJSON()`

- `file` `<String>`
- `options` `<Object>`
- `callback` `<Function>`

### Example:

```js
const fs = require('fs-extra')

fs.readJson('./package.json', (err, packageObj) => {
  if (err) console.error(err)

  console.log(packageObj.version) // => 0.1.3
})

// Promise Usage
fs.readJson('./package.json')
.then(packageObj => {
  console.log(packageObj.version) // => 0.1.3
})
.catch(err => {
  console.error(err)
})
```

---

`readJson()` can take a `throws` option set to `false` and it won't throw if the JSON is invalid. Example:

```js
const fs = require('fs-extra')

const file = '/tmp/some-invalid.json'
const data = '{not valid JSON'
fs.writeFileSync(file, data)

fs.readJson(file, { throws: false }, (err, obj) => {
  if (err) console.error(err)

  console.log(obj) // => null
})

// Promise Usage
fs.readJson(file, { throws: false })
.then(obj => {
  console.log(obj) // => null
})
.catch(err => {
  console.error(err) // Not called
})
```

## removeSync(path)

Removes a file or directory. The directory can have contents. Like `rm -rf`.

- `path` `<String>`

### Example:

```js
const fs = require('fs-extra')

// remove file
fs.removeSync('/tmp/myfile')

fs.removeSync('/home/jprichardson') // I just deleted my entire HOME directory.
```

## remove(path, [callback])

Removes a file or directory. The directory can have contents. Like `rm -rf`.

- `path` `<String>`
- `callback` `<Function>`

### Example:

```js
const fs = require('fs-extra')

// remove file
fs.remove('/tmp/myfile', err => {
  if (err) return console.error(err)

  console.log('success!')
})

fs.remove('/home/jprichardson', err => {
  if (err) return console.error(err)

  console.log('success!') // I just deleted my entire HOME directory.
})

// Promise Usage
fs.remove('/tmp/myfile')
.then(() => {
  console.log('success!')
})
.catch(err => {
  console.error(err)
})
```

## writeJsonSync(file, object, [options])

Writes an object to a JSON file.

**Alias:** `writeJSONSync()`

- `file` `<String>`
- `object` `<Object>`
- `options` `<Object>`
  - `spaces` `<Number|String>` Number of spaces to indent; or a string to use for indentation (i.e. pass `'\t'` for tab indentation). See [the docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_space_argument) for more info.
  - `EOL` `<String>` Set EOL character. Default is `\n`.
  - `replacer` [JSON replacer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter)
  - Also accepts [`fs.writeFileSync` options](https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options)

### Example:

```js
const fs = require('fs-extra')

fs.writeJsonSync('./package.json', {name: 'fs-extra'})
```
---

**See also:** [`outputJsonSync()`](outputJson-sync.md)

## writeJson(file, object, [options, callback])

Writes an object to a JSON file.

**Alias:** `writeJSON()`

- `file` `<String>`
- `object` `<Object>`
- `options` `<Object>`
  - `spaces` `<Number|String>` Number of spaces to indent; or a string to use for indentation (i.e. pass `'\t'` for tab indentation). See [the docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_space_argument) for more info.
  - `EOL` `<String>` Set EOL character. Default is `\n`.
  - `replacer` [JSON replacer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter)
  - Also accepts [`fs.writeFile` options](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
- `callback` `<Function>`

### Example:

```js
const fs = require('fs-extra')

fs.writeJson('./package.json', {name: 'fs-extra'}, err => {
  if (err) return console.error(err)

  console.log('success!')
})

// With Promises
fs.writeJson('./package.json', {name: 'fs-extra'})
.then(() => {
  console.log('success!')
})
.catch(err => {
  console.error(err)
})
```

---

**See also:** [`outputJson()`](outputJson.md)

<!-- ENDIN fsextra --> 

 <!-- BEGIN fs-extra-plus -->
## exists(file, callback)

Non-deprecated check if a file exists. Calls `callback` with `true`, `false` or an error.

Example:

```js
const fs = require('fs-extra')
fs.exists('./package.json', function (res) {
  if (typeof res == 'string') {
    console.error(err);
  } else {
    console.log(res ? 'file exists' : 'file doesn\'t exist');
  }
})
```

## resolve(path, child)

Resolve a child file of a folder.

## forEachChildSync(path, function(file)[, options])

Iterate through every child of a folder, synchronously.

## forEachChild(function(error, file)[, options], callback)

Iterate through every child of a folder, asynchronously.

## vacuum(directory, options, callback)

Remove the empty branches of a directory tree, optionally up to (but not including) a specified base directory. Optionally nukes the leaf directory.

* `directory` {String} Leaf node to remove. **Must be a directory, symlink, or file.**
* `options` {Object}
  * `base` {String} No directories at or above this level of the filesystem will be removed.
  * `purge` {Boolean} If set, nuke the whole leaf directory, including its contents.
  * `log` {Function} A logging function that takes `npmlog`-compatible argument lists.
* `callback` {Function} Function to call once vacuuming is complete.
  * `error` {Error} What went wrong along the way, if anything.

### Usage

```javascript
var logger = require("npmlog");
var vacuum = require("fs-vacuum");

var options = {
  base  : "/path/to/my/tree/root",
  purge : true,
  log   : logger.silly.bind(logger, "myCleanup")
};

/* Assuming there are no other files or directories in "out", "to", or "my",
 * the final path will just be "/path/to/my/tree/root".
 */
vacuum("/path/to/my/tree/root/out/to/my/files", function (error) {
  if (error) console.error("Unable to cleanly vacuum:", error.message);
});
```

## dive(directory[, options], action[, complete]);

Recursively walk (_“dive”_) a directory tree.

*   `directory` is the pathname of a readable directory.
*   `options` [optional] is an object that defines some of the properties.

    The default options are as follows:

```javascript
{
  recursive: true,    // - If set to false, this will ignore subdirectories.
  all: false,         // - If set to true, this will show "dot files" and
                      //   files in "dot directories", e.g. ".gitignore" or
                      //  ".git/HEAD".
  directories: false, // - If set to true, this will call `action` on
                      //   directories, too.
  files: true,        // - If set to false, this won't call `action` on
                      //   files any more.
  ignore: false,      // - If set to a string or RegExp, all files and
                      //   directories that match will be ignored.
}
```

*   `action` is passed three arguments `(err, file, stat)` where `err` is an
    error or `null`, `file` is the pathname of a file and `stat` is an
    [fs.Stats](https://nodejs.org/api/fs.html#fs_class_fs_stats) object.
*   `complete [optional]` may define a second callback, that is called, when all
    files have been processed. It takes no arguments.

### Usage

Default:

``` javascript
var dive = require('dive');

dive(process.cwd(), function(err, file) {

});
```

All files and a callback in the end:

``` javascript
var dive = require('dive');

dive(process.cwd(), { all: true }, function(err, file, stat) {
  if (err) throw err;
  console.log(file);
}, function() {
  console.log('complete');
});
```

Directories only:

``` javascript
var dive = require('dive');

dive(process.cwd(), { directories: true, files: false }, function(err, dir) {
  if (err) throw err;
  console.log(dir);
});
```

## diveSync(path[, options])

The synchronous version of `dive`. Improved version of the `diveSync` module.

Returns an array of file paths.

Example:

``` javascript
const files = fs.diveSync(process.cwd());

for (let i in files) {

}

for (let file of files) {
  
}

files.forEach(function(file, i) {

});

for (let i = 0; i < files.length; i++) {

}

```

## createReaddirStream(dir[, options])

Streaming `fs.readdir`, extensible with smart plugins. No recursion and no globs by default - [use](https://www.npmjs.com/package/use) plugins. Does not stat and doesn't read the filepaths - use plugins. It just push [vinyl](https://www.npmjs.com/package/vinyl) files to stream. Follows signature and semantics of `fs.createReadStream` method.

### Usage
For more use-cases see the [tests](./test.js)

```js
const readdir = require('create-readdir-stream')
```


### API

#### [CreateReaddirStream](https://github.com/tunnckoCore/create-readdir-stream/blob/master/index.js#L32)
Initialize `CreateReaddirStream` with default `options`.

**Params**

* `[options]` **{Object}**: one of them is `cwd`.    

**Example**

```js
const inst = require('create-readdir-stream')

console.log(inst.use) // => 'function'
console.log(inst.createReaddirStream) // => 'function'

// or get constructor
const Readdir = require('create-readdir-stream').CreateReaddirStream
```

#### [.use](https://github.com/tunnckoCore/create-readdir-stream/blob/master/index.js#L118)
Smart plugins support using [use](https://www.npmjs.com/package/use). It just calls that `fn` immediately and if it returns function again it is called (**only when** `.createReaddirStream` is called) with `file` argument ([vinyl](https://www.npmjs.com/package/vinyl) file) for each item in the returned array by `fs.readdir`.

**Params**

* `<fn>` **{Function}**: plugin to be called immediately    
* `returns` **{CreateReadStream}**: this instance for chaining  

**Example**

```js
const through2 = require('through2')
const readdir = require('create-readdir-stream')

readdir.use(function (app) {
  // both `this` and `app` are the instance aka `readdir`
  // called immediately

  // below function IS NOT called immediately it is
  // called only when `.createReaddirStream` is called
  return function (file) {
    // both `this` and `file` are Vinyl virtual file object
    // called on each filepath. Or in other words
    // this function is called on each item in
    // returned array by `fs.readdir`

    // exclude `index.js` from been pushed to stream
    if (file.basename === 'index.js') {
      file.exclude = true
      // or file.include = false
    }
    console.log('from plugin', file.basename)
  }
})

readdir
  .createReaddirStream('./')
  .once('error', console.error)
  .pipe(through2.obj(function (file, enc, cb) {
    // you should NOT expect to see `index.js` here :)
    console.log('from pipe', file.basename)
    cb()
  }))
```

#### [.createReaddirStream](https://github.com/tunnckoCore/create-readdir-stream/blob/master/index.js#L144)
Reads a `dir` contents, creates [vinyl](https://www.npmjs.com/package/vinyl) file from each filepath, after that push them to stream.

**Params**

* `<dir>` **{String|Buffer}**: buffer or string folder/directory to read    
* `[options]` **{Object}**: options are [extend-shallow](https://www.npmjs.com/package/extend-shallow)ed with `this.options`    
* `returns` **{Stream}**: Transform Stream, [through2](https://www.npmjs.com/package/through2)  

**Example**

```js
const th2 = require('through2')
const fs2 = require('create-readdir-stream')

// same signature and api as `fs.createReadStream`
fs2.createReaddirStream('./')
  .once('error', console.error)
  .pipe(th2.obj(function (file, enc, cb) {
    console.log('from pipe', file.basename)
    cb()
  }))
```

## readXML(path, function(err, parsedObject))

Read a file containing XML to an object.

## readXMLSync(path)

Read a file containing XML to an object. Returns the object.

## readLinesSync(path[, encoding])

Read a file into a string array of its lines. Default encoding is UTF-8.

## readSync(path[, encoding])

Shorter version of `fs.readFileSync` where the default encoding is UTF-8.

## isDirectory(path, callback)

Check if the file at a path is a directory.

Sync: `isDirectorySync()`

<!-- ENDIN fs-extra-plus --> 

 <!-- BEGIN nodejsfs -->
## fs.access(path[, mode], callback)
<!-- YAML
added: v0.11.15
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameter can be a WHATWG `URL` object using `file:`
                 protocol. Support is currently still *experimental*.
  - version: v6.3.0
    pr-url: https://github.com/nodejs/node/pull/6534
    description: The constants like `fs.R_OK`, etc which were present directly
                 on `fs` were moved into `fs.constants` as a soft deprecation.
                 Thus for Node `< v6.3.0` use `fs` to access those constants, or
                 do something like `(fs.constants || fs).R_OK` to work with all
                 versions.
-->

* `path` {string|Buffer|URL}
* `mode` {integer} **Default:** `fs.constants.F_OK`
* `callback` {Function}

Tests a user's permissions for the file or directory specified by `path`.
The `mode` argument is an optional integer that specifies the accessibility
checks to be performed. The following constants define the possible values of
`mode`. It is possible to create a mask consisting of the bitwise OR of two or
more values.

- `fs.constants.F_OK` - `path` is visible to the calling process. This is useful
for determining if a file exists, but says nothing about `rwx` permissions.
Default if no `mode` is specified.
- `fs.constants.R_OK` - `path` can be read by the calling process.
- `fs.constants.W_OK` - `path` can be written by the calling process.
- `fs.constants.X_OK` - `path` can be executed by the calling process. This has
no effect on Windows (will behave like `fs.constants.F_OK`).

The final argument, `callback`, is a callback function that is invoked with
a possible error argument. If any of the accessibility checks fail, the error
argument will be populated. The following example checks if the file
`/etc/passwd` can be read and written by the current process.

```js
fs.access('/etc/passwd', fs.constants.R_OK | fs.constants.W_OK, (err) => {
  console.log(err ? 'no access!' : 'can read/write');
});
```

Using `fs.access()` to check for the accessibility of a file before calling
`fs.open()`, `fs.readFile()` or `fs.writeFile()` is not recommended. Doing
so introduces a race condition, since other processes may change the file's
state between the two calls. Instead, user code should open/read/write the
file directly and handle the error raised if the file is not accessible.

For example:


**write (NOT RECOMMENDED)**

```js
fs.access('myfile', (err) => {
  if (!err) {
    console.error('myfile already exists');
    return;
  }

  fs.open('myfile', 'wx', (err, fd) => {
    if (err) throw err;
    writeMyData(fd);
  });
});
```

**write (RECOMMENDED)**

```js
fs.open('myfile', 'wx', (err, fd) => {
  if (err) {
    if (err.code === 'EEXIST') {
      console.error('myfile already exists');
      return;
    }

    throw err;
  }

  writeMyData(fd);
});
```

**read (NOT RECOMMENDED)**

```js
fs.access('myfile', (err) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error('myfile does not exist');
      return;
    }

    throw err;
  }

  fs.open('myfile', 'r', (err, fd) => {
    if (err) throw err;
    readMyData(fd);
  });
});
```

**read (RECOMMENDED)**

```js
fs.open('myfile', 'r', (err, fd) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error('myfile does not exist');
      return;
    }

    throw err;
  }

  readMyData(fd);
});
```

The "not recommended" examples above check for accessibility and then use the
file; the "recommended" examples are better because they use the file directly
and handle the error, if any.

In general, check for the accessibility of a file only if the file won’t be
used directly, for example when its accessibility is a signal from another
process.

## fs.accessSync(path[, mode])
<!-- YAML
added: v0.11.15
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameter can be a WHATWG `URL` object using `file:`
                 protocol. Support is currently still *experimental*.
-->

* `path` {string|Buffer|URL}
* `mode` {integer} **Default:** `fs.constants.F_OK`

Synchronous version of [`fs.access()`][]. This throws if any accessibility
checks fail, and does nothing otherwise.

## fs.appendFile(file, data[, options], callback)
<!-- YAML
added: v0.6.7
changes:
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: The `callback` parameter is no longer optional. Not passing
                 it will emit a deprecation warning.
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7831
    description: The passed `options` object will never be modified.
  - version: v5.0.0
    pr-url: https://github.com/nodejs/node/pull/3163
    description: The `file` parameter can be a file descriptor now.
-->

* `file` {string|Buffer|number} filename or file descriptor
* `data` {string|Buffer}
* `options` {Object|string}
  * `encoding` {string|null} **Default:** `'utf8'`
  * `mode` {integer} **Default:** `0o666`
  * `flag` {string} **Default:** `'a'`
* `callback` {Function}

Asynchronously append data to a file, creating the file if it does not yet exist.
`data` can be a string or a buffer.

Example:

```js
fs.appendFile('message.txt', 'data to append', (err) => {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});
```

If `options` is a string, then it specifies the encoding. Example:

```js
fs.appendFile('message.txt', 'data to append', 'utf8', callback);
```

Any specified file descriptor has to have been opened for appending.

*Note*: If a file descriptor is specified as the `file`, it will not be closed
automatically.

## fs.appendFileSync(file, data[, options])
<!-- YAML
added: v0.6.7
changes:
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7831
    description: The passed `options` object will never be modified.
  - version: v5.0.0
    pr-url: https://github.com/nodejs/node/pull/3163
    description: The `file` parameter can be a file descriptor now.
-->

* `file` {string|Buffer|number} filename or file descriptor
* `data` {string|Buffer}
* `options` {Object|string}
  * `encoding` {string|null} **Default:** `'utf8'`
  * `mode` {integer} **Default:** `0o666`
  * `flag` {string} **Default:** `'a'`

The synchronous version of [`fs.appendFile()`][]. Returns `undefined`.

## fs.chmod(path, mode, callback)
<!-- YAML
added: v0.1.30
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameter can be a WHATWG `URL` object using `file:`
                 protocol. Support is currently still *experimental*.
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: The `callback` parameter is no longer optional. Not passing
                 it will emit a deprecation warning.
-->

* `path` {string|Buffer|URL}
* `mode` {integer}
* `callback` {Function}

Asynchronous chmod(2). No arguments other than a possible exception are given
to the completion callback.

## fs.chmodSync(path, mode)
<!-- YAML
added: v0.6.7
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameter can be a WHATWG `URL` object using `file:`
                 protocol. Support is currently still *experimental*.
-->

* `path` {string|Buffer|URL}
* `mode` {integer}

Synchronous chmod(2). Returns `undefined`.

## fs.chown(path, uid, gid, callback)
<!-- YAML
added: v0.1.97
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameter can be a WHATWG `URL` object using `file:`
                 protocol. Support is currently still *experimental*.
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: The `callback` parameter is no longer optional. Not passing
                 it will emit a deprecation warning.
-->

* `path` {string|Buffer|URL}
* `uid` {integer}
* `gid` {integer}
* `callback` {Function}

Asynchronous chown(2). No arguments other than a possible exception are given
to the completion callback.

## fs.chownSync(path, uid, gid)
<!-- YAML
added: v0.1.97
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameter can be a WHATWG `URL` object using `file:`
                 protocol. Support is currently still *experimental*.
-->

* `path` {string|Buffer|URL}
* `uid` {integer}
* `gid` {integer}

Synchronous chown(2). Returns `undefined`.

## fs.close(fd, callback)
<!-- YAML
added: v0.0.2
changes:
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: The `callback` parameter is no longer optional. Not passing
                 it will emit a deprecation warning.
-->

* `fd` {integer}
* `callback` {Function}

Asynchronous close(2).  No arguments other than a possible exception are given
to the completion callback.

## fs.closeSync(fd)
<!-- YAML
added: v0.1.21
-->

* `fd` {integer}

Synchronous close(2). Returns `undefined`.

## fs.constants

Returns an object containing commonly used constants for file system
operations. The specific constants currently defined are described in
[FS Constants][].

## fs.createReadStream(path[, options])
<!-- YAML
added: v0.1.31
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameter can be a WHATWG `URL` object using
                 `file:` protocol. Support is currently still *experimental*.
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7831
    description: The passed `options` object will never be modified.
  - version: v2.3.0
    pr-url: https://github.com/nodejs/node/pull/1845
    description: The passed `options` object can be a string now.
-->

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `flags` {string}
  * `encoding` {string}
  * `fd` {integer}
  * `mode` {integer}
  * `autoClose` {boolean}
  * `start` {integer}
  * `end` {integer}

Returns a new [`ReadStream`][] object. (See [Readable Stream][]).

Be aware that, unlike the default value set for `highWaterMark` on a
readable stream (16 kb), the stream returned by this method has a
default value of 64 kb for the same parameter.

`options` is an object or string with the following defaults:

```js
const defaults = {
  flags: 'r',
  encoding: null,
  fd: null,
  mode: 0o666,
  autoClose: true
};
```

`options` can include `start` and `end` values to read a range of bytes from
the file instead of the entire file.  Both `start` and `end` are inclusive and
start counting at 0. If `fd` is specified and `start` is omitted or `undefined`,
`fs.createReadStream()` reads sequentially from the current file position.
The `encoding` can be any one of those accepted by [`Buffer`][].

If `fd` is specified, `ReadStream` will ignore the `path` argument and will use
the specified file descriptor. This means that no `'open'` event will be
emitted. Note that `fd` should be blocking; non-blocking `fd`s should be passed
to [`net.Socket`][].

If `autoClose` is false, then the file descriptor won't be closed, even if
there's an error. It is the application's responsibility to close it and make
sure there's no file descriptor leak. If `autoClose` is set to true (default
behavior), on `error` or `end` the file descriptor will be closed
automatically.

`mode` sets the file mode (permission and sticky bits), but only if the
file was created.

An example to read the last 10 bytes of a file which is 100 bytes long:

```js
fs.createReadStream('sample.txt', { start: 90, end: 99 });
```

If `options` is a string, then it specifies the encoding.

## fs.createWriteStream(path[, options])
<!-- YAML
added: v0.1.31
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameter can be a WHATWG `URL` object using
                 `file:` protocol. Support is currently still *experimental*.
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7831
    description: The passed `options` object will never be modified.
  - version: v5.5.0
    pr-url: https://github.com/nodejs/node/pull/3679
    description: The `autoClose` option is supported now.
  - version: v2.3.0
    pr-url: https://github.com/nodejs/node/pull/1845
    description: The passed `options` object can be a string now.
-->

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `flags` {string}
  * `defaultEncoding` {string}
  * `fd` {integer}
  * `mode` {integer}
  * `autoClose` {boolean}
  * `start` {integer}

Returns a new [`WriteStream`][] object. (See [Writable Stream][]).

`options` is an object or string with the following defaults:

```js
const defaults = {
  flags: 'w',
  defaultEncoding: 'utf8',
  fd: null,
  mode: 0o666,
  autoClose: true
};
```

`options` may also include a `start` option to allow writing data at
some position past the beginning of the file.  Modifying a file rather
than replacing it may require a `flags` mode of `r+` rather than the
default mode `w`. The `defaultEncoding` can be any one of those accepted by
[`Buffer`][].

If `autoClose` is set to true (default behavior) on `error` or `end`
the file descriptor will be closed automatically. If `autoClose` is false,
then the file descriptor won't be closed, even if there's an error.
It is the application's responsibility to close it and make sure there's no
file descriptor leak.

Like [`ReadStream`][], if `fd` is specified, `WriteStream` will ignore the
`path` argument and will use the specified file descriptor. This means that no
`'open'` event will be emitted. Note that `fd` should be blocking; non-blocking
`fd`s should be passed to [`net.Socket`][].

If `options` is a string, then it specifies the encoding.

## fs.exists(path, callback)
<!-- YAML
added: v0.0.2
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameter can be a WHATWG `URL` object using
                 `file:` protocol. Support is currently still *experimental*.
deprecated: v1.0.0
-->

> Stability: 0 - Deprecated: Use [`fs.stat()`][] or [`fs.access()`][] instead.

* `path` {string|Buffer|URL}
* `callback` {Function}

Test whether or not the given path exists by checking with the file system.
Then call the `callback` argument with either true or false.  Example:

```js
fs.exists('/etc/passwd', (exists) => {
  console.log(exists ? 'it\'s there' : 'no passwd!');
});
```

**Note that the parameter to this callback is not consistent with other
Node.js callbacks.** Normally, the first parameter to a Node.js callback is
an `err` parameter, optionally followed by other parameters. The
`fs.exists()` callback has only one boolean parameter. This is one reason
`fs.access()` is recommended instead of `fs.exists()`.

Using `fs.exists()` to check for the existence of a file before calling
`fs.open()`, `fs.readFile()` or `fs.writeFile()` is not recommended. Doing
so introduces a race condition, since other processes may change the file's
state between the two calls. Instead, user code should open/read/write the
file directly and handle the error raised if the file does not exist.

For example:

**write (NOT RECOMMENDED)**

```js
fs.exists('myfile', (exists) => {
  if (exists) {
    console.error('myfile already exists');
  } else {
    fs.open('myfile', 'wx', (err, fd) => {
      if (err) throw err;
      writeMyData(fd);
    });
  }
});
```

**write (RECOMMENDED)**

```js
fs.open('myfile', 'wx', (err, fd) => {
  if (err) {
    if (err.code === 'EEXIST') {
      console.error('myfile already exists');
      return;
    }

    throw err;
  }

  writeMyData(fd);
});
```

**read (NOT RECOMMENDED)**

```js
fs.exists('myfile', (exists) => {
  if (exists) {
    fs.open('myfile', 'r', (err, fd) => {
      readMyData(fd);
    });
  } else {
    console.error('myfile does not exist');
  }
});
```

**read (RECOMMENDED)**

```js
fs.open('myfile', 'r', (err, fd) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error('myfile does not exist');
      return;
    }

    throw err;
  }

  readMyData(fd);
});
```

The "not recommended" examples above check for existence and then use the
file; the "recommended" examples are better because they use the file directly
and handle the error, if any.

In general, check for the existence of a file only if the file won’t be
used directly, for example when its existence is a signal from another
process.

## fs.existsSync(path)
<!-- YAML
added: v0.1.21
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameter can be a WHATWG `URL` object using
                 `file:` protocol. Support is currently still *experimental*.
-->

* `path` {string|Buffer|URL}

Synchronous version of [`fs.exists()`][].
Returns `true` if the file exists, `false` otherwise.

Note that `fs.exists()` is deprecated, but `fs.existsSync()` is not.
(The `callback` parameter to `fs.exists()` accepts parameters that are
inconsistent with other Node.js callbacks. `fs.existsSync()` does not use
a callback.)

## fs.fchmod(fd, mode, callback)
<!-- YAML
added: v0.4.7
changes:
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: The `callback` parameter is no longer optional. Not passing
                 it will emit a deprecation warning.
-->

* `fd` {integer}
* `mode` {integer}
* `callback` {Function}

Asynchronous fchmod(2). No arguments other than a possible exception
are given to the completion callback.

## fs.fchmodSync(fd, mode)
<!-- YAML
added: v0.4.7
-->

* `fd` {integer}
* `mode` {integer}

Synchronous fchmod(2). Returns `undefined`.

## fs.fchown(fd, uid, gid, callback)
<!-- YAML
added: v0.4.7
changes:
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: The `callback` parameter is no longer optional. Not passing
                 it will emit a deprecation warning.
-->

* `fd` {integer}
* `uid` {integer}
* `gid` {integer}
* `callback` {Function}

Asynchronous fchown(2). No arguments other than a possible exception are given
to the completion callback.

## fs.fchownSync(fd, uid, gid)
<!-- YAML
added: v0.4.7
-->

* `fd` {integer}
* `uid` {integer}
* `gid` {integer}

Synchronous fchown(2). Returns `undefined`.

## fs.fdatasync(fd, callback)
<!-- YAML
added: v0.1.96
changes:
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: The `callback` parameter is no longer optional. Not passing
                 it will emit a deprecation warning.
-->

* `fd` {integer}
* `callback` {Function}

Asynchronous fdatasync(2). No arguments other than a possible exception are
given to the completion callback.

## fs.fdatasyncSync(fd)
<!-- YAML
added: v0.1.96
-->

* `fd` {integer}

Synchronous fdatasync(2). Returns `undefined`.

## fs.fstat(fd, callback)
<!-- YAML
added: v0.1.95
changes:
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: The `callback` parameter is no longer optional. Not passing
                 it will emit a deprecation warning.
-->

* `fd` {integer}
* `callback` {Function}

Asynchronous fstat(2). The callback gets two arguments `(err, stats)` where
`stats` is an [`fs.Stats`][] object. `fstat()` is identical to [`stat()`][],
except that the file to be stat-ed is specified by the file descriptor `fd`.

## fs.fstatSync(fd)
<!-- YAML
added: v0.1.95
-->

* `fd` {integer}

Synchronous fstat(2). Returns an instance of [`fs.Stats`][].

## fs.fsync(fd, callback)
<!-- YAML
added: v0.1.96
changes:
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: The `callback` parameter is no longer optional. Not passing
                 it will emit a deprecation warning.
-->

* `fd` {integer}
* `callback` {Function}

Asynchronous fsync(2). No arguments other than a possible exception are given
to the completion callback.

## fs.fsyncSync(fd)
<!-- YAML
added: v0.1.96
-->

* `fd` {integer}

Synchronous fsync(2). Returns `undefined`.

## fs.ftruncate(fd[, len], callback)
<!-- YAML
added: v0.8.6
changes:
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: The `callback` parameter is no longer optional. Not passing
                 it will emit a deprecation warning.
-->

* `fd` {integer}
* `len` {integer} **Default:** `0`
* `callback` {Function}

Asynchronous ftruncate(2). No arguments other than a possible exception are
given to the completion callback.

If the file referred to by the file descriptor was larger than `len` bytes, only
the first `len` bytes will be retained in the file.

For example, the following program retains only the first four bytes of the file

```js
console.log(fs.readFileSync('temp.txt', 'utf8'));
// Prints: Node.js

// get the file descriptor of the file to be truncated
const fd = fs.openSync('temp.txt', 'r+');

// truncate the file to first four bytes
fs.ftruncate(fd, 4, (err) => {
  assert.ifError(err);
  console.log(fs.readFileSync('temp.txt', 'utf8'));
});
// Prints: Node
```

If the file previously was shorter than `len` bytes, it is extended, and the
extended part is filled with null bytes ('\0'). For example,

```js
console.log(fs.readFileSync('temp.txt', 'utf-8'));
// Prints: Node.js

// get the file descriptor of the file to be truncated
const fd = fs.openSync('temp.txt', 'r+');

// truncate the file to 10 bytes, whereas the actual size is 7 bytes
fs.ftruncate(fd, 10, (err) => {
  assert.ifError(err);
  console.log(fs.readFileSync('temp.txt'));
});
// Prints: <Buffer 4e 6f 64 65 2e 6a 73 00 00 00>
// ('Node.js\0\0\0' in UTF8)
```

The last three bytes are null bytes ('\0'), to compensate the over-truncation.

## fs.ftruncateSync(fd[, len])
<!-- YAML
added: v0.8.6
-->

* `fd` {integer}
* `len` {integer} **Default:** `0`

Synchronous ftruncate(2). Returns `undefined`.

## fs.futimes(fd, atime, mtime, callback)
<!-- YAML
added: v0.4.2
changes:
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: The `callback` parameter is no longer optional. Not passing
                 it will emit a deprecation warning.
  - version: v4.1.0
    pr-url: https://github.com/nodejs/node/pull/2387
    description: Numeric strings, `NaN` and `Infinity` are now allowed
                 time specifiers.
-->

* `fd` {integer}
* `atime` {integer}
* `mtime` {integer}
* `callback` {Function}

Change the file timestamps of a file referenced by the supplied file
descriptor.

*Note*: This function does not work on AIX versions before 7.1, it will return
the error `UV_ENOSYS`.

## fs.futimesSync(fd, atime, mtime)
<!-- YAML
added: v0.4.2
changes:
  - version: v4.1.0
    pr-url: https://github.com/nodejs/node/pull/2387
    description: Numeric strings, `NaN` and `Infinity` are now allowed
                 time specifiers.
-->

* `fd` {integer}
* `atime` {integer}
* `mtime` {integer}

Synchronous version of [`fs.futimes()`][]. Returns `undefined`.

## fs.lchmod(path, mode, callback)
<!-- YAML
deprecated: v0.4.7
changes:
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: The `callback` parameter is no longer optional. Not passing
                 it will emit a deprecation warning.
-->

* `path` {string|Buffer}
* `mode` {integer}
* `callback` {Function}

Asynchronous lchmod(2). No arguments other than a possible exception
are given to the completion callback.

Only available on macOS.

## fs.lchmodSync(path, mode)
<!-- YAML
deprecated: v0.4.7
-->

* `path` {string|Buffer}
* `mode` {integer}

Synchronous lchmod(2). Returns `undefined`.

## fs.lchown(path, uid, gid, callback)
<!-- YAML
deprecated: v0.4.7
changes:
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: The `callback` parameter is no longer optional. Not passing
                 it will emit a deprecation warning.
-->

* `path` {string|Buffer}
* `uid` {integer}
* `gid` {integer}
* `callback` {Function}

Asynchronous lchown(2). No arguments other than a possible exception are given
to the completion callback.

## fs.lchownSync(path, uid, gid)
<!-- YAML
deprecated: v0.4.7
-->

* `path` {string|Buffer}
* `uid` {integer}
* `gid` {integer}

Synchronous lchown(2). Returns `undefined`.

## fs.link(existingPath, newPath, callback)
<!-- YAML
added: v0.1.31
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `existingPath` and `newPath` parameters can be WHATWG
                 `URL` objects using `file:` protocol. Support is currently
                 still *experimental*.
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: The `callback` parameter is no longer optional. Not passing
                 it will emit a deprecation warning.
-->

* `existingPath` {string|Buffer|URL}
* `newPath` {string|Buffer|URL}
* `callback` {Function}

Asynchronous link(2). No arguments other than a possible exception are given to
the completion callback.

## fs.linkSync(existingPath, newPath)
<!-- YAML
added: v0.1.31
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `existingPath` and `newPath` parameters can be WHATWG
                 `URL` objects using `file:` protocol. Support is currently
                 still *experimental*.
-->

* `existingPath` {string|Buffer|URL}
* `newPath` {string|Buffer|URL}

Synchronous link(2). Returns `undefined`.

## fs.lstat(path, callback)
<!-- YAML
added: v0.1.30
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameter can be a WHATWG `URL` object using `file:`
                 protocol. Support is currently still *experimental*.
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: The `callback` parameter is no longer optional. Not passing
                 it will emit a deprecation warning.
-->

* `path` {string|Buffer|URL}
* `callback` {Function}

Asynchronous lstat(2). The callback gets two arguments `(err, stats)` where
`stats` is a [`fs.Stats`][] object. `lstat()` is identical to `stat()`,
except that if `path` is a symbolic link, then the link itself is stat-ed,
not the file that it refers to.

## fs.lstatSync(path)
<!-- YAML
added: v0.1.30
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameter can be a WHATWG `URL` object using `file:`
                 protocol. Support is currently still *experimental*.
-->

* `path` {string|Buffer|URL}

Synchronous lstat(2). Returns an instance of [`fs.Stats`][].

## fs.mkdir(path[, mode], callback)
<!-- YAML
added: v0.1.8
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameter can be a WHATWG `URL` object using `file:`
                 protocol. Support is currently still *experimental*.
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: The `callback` parameter is no longer optional. Not passing
                 it will emit a deprecation warning.
-->

* `path` {string|Buffer|URL}
* `mode` {integer} **Default:** `0o777`
* `callback` {Function}

Asynchronous mkdir(2). No arguments other than a possible exception are given
to the completion callback. `mode` defaults to `0o777`.

## fs.mkdirSync(path[, mode])
<!-- YAML
added: v0.1.21
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameter can be a WHATWG `URL` object using `file:`
                 protocol. Support is currently still *experimental*.
-->

* `path` {string|Buffer|URL}
* `mode` {integer} **Default:** `0o777`

Synchronous mkdir(2). Returns `undefined`.

## fs.mkdtemp(prefix[, options], callback)
<!-- YAML
added: v5.10.0
changes:
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: The `callback` parameter is no longer optional. Not passing
                 it will emit a deprecation warning.
  - version: v6.2.1
    pr-url: https://github.com/nodejs/node/pull/6828
    description: The `callback` parameter is optional now.
-->

* `prefix` {string}
* `options` {string|Object}
  * `encoding` {string} **Default:** `'utf8'`
* `callback` {Function}

Creates a unique temporary directory.

Generates six random characters to be appended behind a required
`prefix` to create a unique temporary directory.

The created folder path is passed as a string to the callback's second
parameter.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use.

Example:

```js
fs.mkdtemp('/tmp/foo-', (err, folder) => {
  if (err) throw err;
  console.log(folder);
  // Prints: /tmp/foo-itXde2
});
```

*Note*: The `fs.mkdtemp()` method will append the six randomly selected
characters directly to the `prefix` string. For instance, given a directory
`/tmp`, if the intention is to create a temporary directory *within* `/tmp`,
the `prefix` *must* end with a trailing platform-specific path separator
(`require('path').sep`).

```js
// The parent directory for the new temporary directory
const tmpDir = '/tmp';

// This method is *INCORRECT*:
fs.mkdtemp(tmpDir, (err, folder) => {
  if (err) throw err;
  console.log(folder);
  // Will print something similar to `/tmpabc123`.
  // Note that a new temporary directory is created
  // at the file system root rather than *within*
  // the /tmp directory.
});

// This method is *CORRECT*:
const { sep } = require('path');
fs.mkdtemp(`${tmpDir}${sep}`, (err, folder) => {
  if (err) throw err;
  console.log(folder);
  // Will print something similar to `/tmp/abc123`.
  // A new temporary directory is created within
  // the /tmp directory.
});
```

## fs.mkdtempSync(prefix[, options])
<!-- YAML
added: v5.10.0
-->

* `prefix` {string}
* `options` {string|Object}
  * `encoding` {string} **Default:** `'utf8'`

The synchronous version of [`fs.mkdtemp()`][]. Returns the created
folder path.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use.

## fs.open(path, flags[, mode], callback)
<!-- YAML
added: v0.0.2
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameter can be a WHATWG `URL` object using `file:`
                 protocol. Support is currently still *experimental*.
-->

* `path` {string|Buffer|URL}
* `flags` {string|number}
* `mode` {integer} **Default:** `0o666`
* `callback` {Function}

Asynchronous file open. See open(2). `flags` can be:

* `'r'` - Open file for reading.
An exception occurs if the file does not exist.

* `'r+'` - Open file for reading and writing.
An exception occurs if the file does not exist.

* `'rs+'` - Open file for reading and writing in synchronous mode. Instructs
  the operating system to bypass the local file system cache.

  This is primarily useful for opening files on NFS mounts as it allows skipping
  the potentially stale local cache. It has a very real impact on I/O
  performance so using this flag is not recommended unless it is needed.

  Note that this doesn't turn `fs.open()` into a synchronous blocking call.
  If synchronous operation is desired `fs.openSync()` should be used.

* `'w'` - Open file for writing.
The file is created (if it does not exist) or truncated (if it exists).

* `'wx'` - Like `'w'` but fails if `path` exists.

* `'w+'` - Open file for reading and writing.
The file is created (if it does not exist) or truncated (if it exists).

* `'wx+'` - Like `'w+'` but fails if `path` exists.

* `'a'` - Open file for appending.
The file is created if it does not exist.

* `'ax'` - Like `'a'` but fails if `path` exists.

* `'a+'` - Open file for reading and appending.
The file is created if it does not exist.

* `'ax+'` - Like `'a+'` but fails if `path` exists.

`mode` sets the file mode (permission and sticky bits), but only if the file was
created. It defaults to `0o666`, readable and writable.

The callback gets two arguments `(err, fd)`.

The exclusive flag `'x'` (`O_EXCL` flag in open(2)) ensures that `path` is newly
created. On POSIX systems, `path` is considered to exist even if it is a symlink
to a non-existent file. The exclusive flag may or may not work with network file
systems.

`flags` can also be a number as documented by open(2); commonly used constants
are available from `fs.constants`.  On Windows, flags are translated to
their equivalent ones where applicable, e.g. `O_WRONLY` to `FILE_GENERIC_WRITE`,
or `O_EXCL|O_CREAT` to `CREATE_NEW`, as accepted by CreateFileW.

On Linux, positional writes don't work when the file is opened in append mode.
The kernel ignores the position argument and always appends the data to
the end of the file.

*Note*: The behavior of `fs.open()` is platform-specific for some flags. As
such, opening a directory on macOS and Linux with the `'a+'` flag - see example
below - will return an error. In contrast, on Windows and FreeBSD, a file
descriptor will be returned.

```js
// macOS and Linux
fs.open('<directory>', 'a+', (err, fd) => {
  // => [Error: EISDIR: illegal operation on a directory, open <directory>]
});

// Windows and FreeBSD
fs.open('<directory>', 'a+', (err, fd) => {
  // => null, <fd>
});
```

Some characters (`< > : " / \ | ? *`) are reserved under Windows as documented
by [Naming Files, Paths, and Namespaces][]. Under NTFS, if the filename contains
a colon, Node.js will open a file system stream, as described by
[this MSDN page][MSDN-Using-Streams].

Functions based on `fs.open()` exhibit this behavior as well. eg.
`fs.writeFile()`, `fs.readFile()`, etc.

## fs.openSync(path, flags[, mode])
<!-- YAML
added: v0.1.21
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameter can be a WHATWG `URL` object using `file:`
                 protocol. Support is currently still *experimental*.
-->

* `path` {string|Buffer|URL}
* `flags` {string|number}
* `mode` {integer} **Default:** `0o666`

Synchronous version of [`fs.open()`][]. Returns an integer representing the file
descriptor.

## fs.read(fd, buffer, offset, length, position, callback)
<!-- YAML
added: v0.0.2
changes:
  - version: v7.4.0
    pr-url: https://github.com/nodejs/node/pull/10382
    description: The `buffer` parameter can now be a `Uint8Array`.
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/4518
    description: The `length` parameter can now be `0`.
-->

* `fd` {integer}
* `buffer` {Buffer|Uint8Array}
* `offset` {integer}
* `length` {integer}
* `position` {integer}
* `callback` {Function}

Read data from the file specified by `fd`.

`buffer` is the buffer that the data will be written to.

`offset` is the offset in the buffer to start writing at.

`length` is an integer specifying the number of bytes to read.

`position` is an integer specifying where to begin reading from in the file.
If `position` is `null`, data will be read from the current file position.

The callback is given the three arguments, `(err, bytesRead, buffer)`.

If this method is invoked as its [`util.promisify()`][]ed version, it returns
a Promise for an object with `bytesRead` and `buffer` properties.

## fs.readdir(path[, options], callback)
<!-- YAML
added: v0.1.8
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameter can be a WHATWG `URL` object using `file:`
                 protocol. Support is currently still *experimental*.
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: The `callback` parameter is no longer optional. Not passing
                 it will emit a deprecation warning.
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/5616
    description: The `options` parameter was added.
-->

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **Default:** `'utf8'`
* `callback` {Function}

Asynchronous readdir(3).  Reads the contents of a directory.
The callback gets two arguments `(err, files)` where `files` is an array of
the names of the files in the directory excluding `'.'` and `'..'`.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the filenames passed to the callback. If the `encoding` is set to `'buffer'`,
the filenames returned will be passed as `Buffer` objects.

## fs.readdirSync(path[, options])
<!-- YAML
added: v0.1.21
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameter can be a WHATWG `URL` object using `file:`
                 protocol. Support is currently still *experimental*.
-->

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **Default:** `'utf8'`

Synchronous readdir(3). Returns an array of filenames excluding `'.'` and
`'..'`.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the filenames passed to the callback. If the `encoding` is set to `'buffer'`,
the filenames returned will be passed as `Buffer` objects.

## fs.readFile(path[, options], callback)
<!-- YAML
added: v0.1.29
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameter can be a WHATWG `URL` object using `file:`
                 protocol. Support is currently still *experimental*.
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: The `callback` parameter is no longer optional. Not passing
                 it will emit a deprecation warning.
  - version: v5.1.0
    pr-url: https://github.com/nodejs/node/pull/3740
    description: The `callback` will always be called with `null` as the `error`
                 parameter in case of success.
  - version: v5.0.0
    pr-url: https://github.com/nodejs/node/pull/3163
    description: The `path` parameter can be a file descriptor now.
-->

* `path` {string|Buffer|URL|integer} filename or file descriptor
* `options` {Object|string}
  * `encoding` {string|null} **Default:** `null`
  * `flag` {string} **Default:** `'r'`
* `callback` {Function}

Asynchronously reads the entire contents of a file. Example:

```js
fs.readFile('/etc/passwd', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

The callback is passed two arguments `(err, data)`, where `data` is the
contents of the file.

If no encoding is specified, then the raw buffer is returned.

If `options` is a string, then it specifies the encoding. Example:

```js
fs.readFile('/etc/passwd', 'utf8', callback);
```
*Note*: When the path is a directory, the behavior of
`fs.readFile()` and [`fs.readFileSync()`][] is platform-specific. On macOS,
Linux, and Windows, an error will be returned. On FreeBSD, a representation
of the directory's contents will be returned.

```js
// macOS, Linux and Windows
fs.readFile('<directory>', (err, data) => {
  // => [Error: EISDIR: illegal operation on a directory, read <directory>]
});

//  FreeBSD
fs.readFile('<directory>', (err, data) => {
  // => null, <data>
});
```

Any specified file descriptor has to support reading.

*Note*: If a file descriptor is specified as the `path`, it will not be closed
automatically.

## fs.readFileSync(path[, options])
<!-- YAML
added: v0.1.8
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameter can be a WHATWG `URL` object using `file:`
                 protocol. Support is currently still *experimental*.
  - version: v5.0.0
    pr-url: https://github.com/nodejs/node/pull/3163
    description: The `path` parameter can be a file descriptor now.
-->

* `path` {string|Buffer|URL|integer} filename or file descriptor
* `options` {Object|string}
  * `encoding` {string|null} **Default:** `null`
  * `flag` {string} **Default:** `'r'`

Synchronous version of [`fs.readFile()`][]. Returns the contents of the `path`.

If the `encoding` option is specified then this function returns a
string. Otherwise it returns a buffer.

*Note*: Similar to [`fs.readFile()`][], when the path is a directory, the
behavior of `fs.readFileSync()` is platform-specific.

```js
// macOS, Linux and Windows
fs.readFileSync('<directory>');
// => [Error: EISDIR: illegal operation on a directory, read <directory>]

//  FreeBSD
fs.readFileSync('<directory>'); // => null, <data>
```

## fs.readlink(path[, options], callback)
<!-- YAML
added: v0.1.31
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameter can be a WHATWG `URL` object using `file:`
                 protocol. Support is currently still *experimental*.
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: The `callback` parameter is no longer optional. Not passing
                 it will emit a deprecation warning.
-->

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **Default:** `'utf8'`
* `callback` {Function}

Asynchronous readlink(2). The callback gets two arguments `(err,
linkString)`.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the link path passed to the callback. If the `encoding` is set to `'buffer'`,
the link path returned will be passed as a `Buffer` object.

## fs.readlinkSync(path[, options])
<!-- YAML
added: v0.1.31
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameter can be a WHATWG `URL` object using `file:`
                 protocol. Support is currently still *experimental*.
-->

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **Default:** `'utf8'`

Synchronous readlink(2). Returns the symbolic link's string value.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the link path passed to the callback. If the `encoding` is set to `'buffer'`,
the link path returned will be passed as a `Buffer` object.

## fs.readSync(fd, buffer, offset, length, position)
<!-- YAML
added: v0.1.21
changes:
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/4518
    description: The `length` parameter can now be `0`.
-->

* `fd` {integer}
* `buffer` {string|Buffer|Uint8Array}
* `offset` {integer}
* `length` {integer}
* `position` {integer}

Synchronous version of [`fs.read()`][]. Returns the number of `bytesRead`.

## fs.realpath(path[, options], callback)
<!-- YAML
added: v0.1.31
changes:
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/13028
    description: Pipe/Socket resolve support was added.
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameter can be a WHATWG `URL` object using
                 `file:` protocol. Support is currently still *experimental*.
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: The `callback` parameter is no longer optional. Not passing
                 it will emit a deprecation warning.
  - version: v6.4.0
    pr-url: https://github.com/nodejs/node/pull/7899
    description: Calling `realpath` now works again for various edge cases
                 on Windows.
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/3594
    description: The `cache` parameter was removed.
-->

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **Default:** `'utf8'`
* `callback` {Function}

Asynchronous realpath(3). The `callback` gets two arguments `(err,
resolvedPath)`. May use `process.cwd` to resolve relative paths.

Only paths that can be converted to UTF8 strings are supported.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the path passed to the callback. If the `encoding` is set to `'buffer'`,
the path returned will be passed as a `Buffer` object.

*Note*: If `path` resolves to a socket or a pipe, the function will return a
system dependent name for that object.

## fs.realpathSync(path[, options])
<!-- YAML
added: v0.1.31
changes:
  - version: v8.0.0
    pr-url: https://github.com/nodejs/node/pull/13028
    description: Pipe/Socket resolve support was added.
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameter can be a WHATWG `URL` object using
                 `file:` protocol. Support is currently still *experimental*.
  - version: v6.4.0
    pr-url: https://github.com/nodejs/node/pull/7899
    description: Calling `realpathSync` now works again for various edge cases
                 on Windows.
  - version: v6.0.0
    pr-url: https://github.com/nodejs/node/pull/3594
    description: The `cache` parameter was removed.
-->

* `path` {string|Buffer|URL}
* `options` {string|Object}
  * `encoding` {string} **Default:** `'utf8'`

Synchronous realpath(3). Returns the resolved path.

Only paths that can be converted to UTF8 strings are supported.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the returned value. If the `encoding` is set to `'buffer'`, the path returned
will be passed as a `Buffer` object.

*Note*: If `path` resolves to a socket or a pipe, the function will return a
system dependent name for that object.

## fs.rename(oldPath, newPath, callback)
<!-- YAML
added: v0.0.2
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `oldPath` and `newPath` parameters can be WHATWG `URL`
                 objects using `file:` protocol. Support is currently still
                 *experimental*.
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: The `callback` parameter is no longer optional. Not passing
                 it will emit a deprecation warning.
-->

* `oldPath` {string|Buffer|URL}
* `newPath` {string|Buffer|URL}
* `callback` {Function}

Asynchronous rename(2). No arguments other than a possible exception are given
to the completion callback.

## fs.renameSync(oldPath, newPath)
<!-- YAML
added: v0.1.21
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `oldPath` and `newPath` parameters can be WHATWG `URL`
                 objects using `file:` protocol. Support is currently still
                 *experimental*.
-->

* `oldPath` {string|Buffer|URL}
* `newPath` {string|Buffer|URL}

Synchronous rename(2). Returns `undefined`.

## fs.rmdir(path, callback)
<!-- YAML
added: v0.0.2
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameters can be a WHATWG `URL` object using
                 `file:` protocol. Support is currently still *experimental*.
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: The `callback` parameter is no longer optional. Not passing
                 it will emit a deprecation warning.
-->

* `path` {string|Buffer|URL}
* `callback` {Function}

Asynchronous rmdir(2). No arguments other than a possible exception are given
to the completion callback.

*Note*: Using `fs.rmdir()` on a file (not a directory) results in an `ENOENT`
error on Windows and an `ENOTDIR` error on POSIX.

## fs.rmdirSync(path)
<!-- YAML
added: v0.1.21
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameters can be a WHATWG `URL` object using
                 `file:` protocol. Support is currently still *experimental*.
-->

* `path` {string|Buffer|URL}

Synchronous rmdir(2). Returns `undefined`.

*Note*: Using `fs.rmdirSync()` on a file (not a directory) results in an `ENOENT`
error on Windows and an `ENOTDIR` error on POSIX.

## fs.stat(path, callback)
<!-- YAML
added: v0.0.2
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameter can be a WHATWG `URL` object using `file:`
                 protocol. Support is currently still *experimental*.
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: The `callback` parameter is no longer optional. Not passing
                 it will emit a deprecation warning.
-->

* `path` {string|Buffer|URL}
* `callback` {Function}

Asynchronous stat(2). The callback gets two arguments `(err, stats)` where
`stats` is an [`fs.Stats`][] object.

In case of an error, the `err.code` will be one of [Common System Errors][].

Using `fs.stat()` to check for the existence of a file before calling
`fs.open()`, `fs.readFile()` or `fs.writeFile()` is not recommended.
Instead, user code should open/read/write the file directly and handle the
error raised if the file is not available.

To check if a file exists without manipulating it afterwards, [`fs.access()`]
is recommended.

## fs.statSync(path)
<!-- YAML
added: v0.1.21
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameter can be a WHATWG `URL` object using `file:`
                 protocol. Support is currently still *experimental*.
-->

* `path` {string|Buffer|URL}

Synchronous stat(2). Returns an instance of [`fs.Stats`][].

## fs.symlink(target, path[, type], callback)
<!-- YAML
added: v0.1.31
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `target` and `path` parameters can be WHATWG `URL` objects
                 using `file:` protocol. Support is currently still
                 *experimental*.
-->

* `target` {string|Buffer|URL}
* `path` {string|Buffer|URL}
* `type` {string} **Default:** `'file'`
* `callback` {Function}

Asynchronous symlink(2). No arguments other than a possible exception are given
to the completion callback. The `type` argument can be set to `'dir'`,
`'file'`, or `'junction'` (default is `'file'`) and is only available on
Windows (ignored on other platforms). Note that Windows junction points require
the destination path to be absolute. When using `'junction'`, the `target`
argument will automatically be normalized to absolute path.

Here is an example below:

```js
fs.symlink('./foo', './new-port', callback);
```

It creates a symbolic link named "new-port" that points to "foo".

## fs.symlinkSync(target, path[, type])
<!-- YAML
added: v0.1.31
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `target` and `path` parameters can be WHATWG `URL` objects
                 using `file:` protocol. Support is currently still
                 *experimental*.
-->

* `target` {string|Buffer|URL}
* `path` {string|Buffer|URL}
* `type` {string} **Default:** `'file'`

Synchronous symlink(2). Returns `undefined`.

## fs.truncate(path[, len], callback)
<!-- YAML
added: v0.8.6
changes:
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: The `callback` parameter is no longer optional. Not passing
                 it will emit a deprecation warning.
-->

* `path` {string|Buffer}
* `len` {integer} **Default:** `0`
* `callback` {Function}

Asynchronous truncate(2). No arguments other than a possible exception are
given to the completion callback. A file descriptor can also be passed as the
first argument. In this case, `fs.ftruncate()` is called.

## fs.truncateSync(path[, len])
<!-- YAML
added: v0.8.6
-->

* `path` {string|Buffer}
* `len` {integer} **Default:** `0`

Synchronous truncate(2). Returns `undefined`. A file descriptor can also be
passed as the first argument. In this case, `fs.ftruncateSync()` is called.

## fs.unlink(path, callback)
<!-- YAML
added: v0.0.2
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameter can be a WHATWG `URL` object using `file:`
                 protocol. Support is currently still *experimental*.
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: The `callback` parameter is no longer optional. Not passing
                 it will emit a deprecation warning.
-->

* `path` {string|Buffer|URL}
* `callback` {Function}

Asynchronous unlink(2). No arguments other than a possible exception are given
to the completion callback.

## fs.unlinkSync(path)
<!-- YAML
added: v0.1.21
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameter can be a WHATWG `URL` object using `file:`
                 protocol. Support is currently still *experimental*.
-->

* `path` {string|Buffer|URL}

Synchronous unlink(2). Returns `undefined`.

## fs.unwatchFile(filename[, listener])
<!-- YAML
added: v0.1.31
-->

* `filename` {string|Buffer}
* `listener` {Function|undefined} **Default:** `undefined`

Stop watching for changes on `filename`. If `listener` is specified, only that
particular listener is removed. Otherwise, *all* listeners are removed,
effectively stopping watching of `filename`.

Calling `fs.unwatchFile()` with a filename that is not being watched is a
no-op, not an error.

*Note*: [`fs.watch()`][] is more efficient than `fs.watchFile()` and
`fs.unwatchFile()`.  `fs.watch()` should be used instead of `fs.watchFile()`
and `fs.unwatchFile()` when possible.

## fs.utimes(path, atime, mtime, callback)
<!-- YAML
added: v0.4.2
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameter can be a WHATWG `URL` object using `file:`
                 protocol. Support is currently still *experimental*.
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: The `callback` parameter is no longer optional. Not passing
                 it will emit a deprecation warning.
  - version: v4.1.0
    pr-url: https://github.com/nodejs/node/pull/2387
    description: Numeric strings, `NaN` and `Infinity` are now allowed
                 time specifiers.
-->

* `path` {string|Buffer|URL}
* `atime` {integer}
* `mtime` {integer}
* `callback` {Function}

Change file timestamps of the file referenced by the supplied path.

*Note*: The arguments `atime` and `mtime` of the following related functions
follow these rules:

- The value should be a Unix timestamp in seconds. For example, `Date.now()`
  returns milliseconds, so it should be divided by 1000 before passing it in.
- If the value is a numeric string like `'123456789'`, the value will get
  converted to the corresponding number.
- If the value is `NaN`, `Infinity` or `-Infinity`, an Error will be thrown.

## fs.utimesSync(path, atime, mtime)
<!-- YAML
added: v0.4.2
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `path` parameter can be a WHATWG `URL` object using `file:`
                 protocol. Support is currently still *experimental*.
  - version: v4.1.0
    pr-url: https://github.com/nodejs/node/pull/2387
    description: Numeric strings, `NaN` and `Infinity` are now allowed
                 time specifiers.
-->

* `path` {string|Buffer|URL}
* `atime` {integer}
* `mtime` {integer}

Synchronous version of [`fs.utimes()`][]. Returns `undefined`.

## fs.watch(filename[, options][, listener])
<!-- YAML
added: v0.5.10
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `filename` parameter can be a WHATWG `URL` object using
                 `file:` protocol. Support is currently still *experimental*.
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7831
    description: The passed `options` object will never be modified.
-->

* `filename` {string|Buffer|URL}
* `options` {string|Object}
  * `persistent` {boolean} Indicates whether the process should continue to run
    as long as files are being watched. **Default:** `true`
  * `recursive` {boolean} Indicates whether all subdirectories should be
    watched, or only the current directory. This applies when a directory is
    specified, and only on supported platforms (See [Caveats][]). **Default:**
    `false`
  * `encoding` {string} Specifies the character encoding to be used for the
     filename passed to the listener. **Default:** `'utf8'`
* `listener` {Function|undefined} **Default:** `undefined`

Watch for changes on `filename`, where `filename` is either a file or a
directory.  The returned object is a [`fs.FSWatcher`][].

The second argument is optional. If `options` is provided as a string, it
specifies the `encoding`. Otherwise `options` should be passed as an object.

The listener callback gets two arguments `(eventType, filename)`.  `eventType` is either
`'rename'` or `'change'`, and `filename` is the name of the file which triggered
the event.

Note that on most platforms, `'rename'` is emitted whenever a filename appears
or disappears in the directory.

Also note the listener callback is attached to the `'change'` event fired by
[`fs.FSWatcher`][], but it is not the same thing as the `'change'` value of
`eventType`.

### Caveats

<!--type=misc-->

The `fs.watch` API is not 100% consistent across platforms, and is
unavailable in some situations.

The recursive option is only supported on macOS and Windows.

#### Availability

<!--type=misc-->

This feature depends on the underlying operating system providing a way
to be notified of filesystem changes.

* On Linux systems, this uses [`inotify`]
* On BSD systems, this uses [`kqueue`]
* On macOS, this uses [`kqueue`] for files and [`FSEvents`] for directories.
* On SunOS systems (including Solaris and SmartOS), this uses [`event ports`].
* On Windows systems, this feature depends on [`ReadDirectoryChangesW`].
* On Aix systems, this feature depends on [`AHAFS`], which must be enabled.

If the underlying functionality is not available for some reason, then
`fs.watch` will not be able to function. For example, watching files or
directories can be unreliable, and in some cases impossible, on network file
systems (NFS, SMB, etc), or host file systems when using virtualization software
such as Vagrant, Docker, etc.

It is still possible to use `fs.watchFile()`, which uses stat polling, but
this method is slower and less reliable.

#### Inodes

<!--type=misc-->

On Linux and macOS systems, `fs.watch()` resolves the path to an [inode][] and
watches the inode. If the watched path is deleted and recreated, it is assigned
a new inode. The watch will emit an event for the delete but will continue
watching the *original* inode. Events for the new inode will not be emitted.
This is expected behavior.

In AIX, save and close of a file being watched causes two notifications -
one for adding new content, and one for truncation. Moreover, save and
close operations on some platforms cause inode changes that force watch
operations to become invalid and ineffective. AIX retains inode for the
lifetime of a file, that way though this is different from Linux / macOS,
this improves the usability of file watching. This is expected behavior.

#### Filename Argument

<!--type=misc-->

Providing `filename` argument in the callback is only supported on Linux,
macOS, Windows, and AIX.  Even on supported platforms, `filename` is not always
guaranteed to be provided. Therefore, don't assume that `filename` argument is
always provided in the callback, and have some fallback logic if it is null.

```js
fs.watch('somedir', (eventType, filename) => {
  console.log(`event type is: ${eventType}`);
  if (filename) {
    console.log(`filename provided: ${filename}`);
  } else {
    console.log('filename not provided');
  }
});
```

## fs.watchFile(filename[, options], listener)
<!-- YAML
added: v0.1.31
changes:
  - version: v7.6.0
    pr-url: https://github.com/nodejs/node/pull/10739
    description: The `filename` parameter can be a WHATWG `URL` object using
                 `file:` protocol. Support is currently still *experimental*.
-->

* `filename` {string|Buffer|URL}
* `options` {Object}
  * `persistent` {boolean} **Default:** `true`
  * `interval` {integer} **Default:** `5007`
* `listener` {Function}

Watch for changes on `filename`. The callback `listener` will be called each
time the file is accessed.

The `options` argument may be omitted. If provided, it should be an object. The
`options` object may contain a boolean named `persistent` that indicates
whether the process should continue to run as long as files are being watched.
The `options` object may specify an `interval` property indicating how often the
target should be polled in milliseconds. The default is
`{ persistent: true, interval: 5007 }`.

The `listener` gets two arguments the current stat object and the previous
stat object:

```js
fs.watchFile('message.text', (curr, prev) => {
  console.log(`the current mtime is: ${curr.mtime}`);
  console.log(`the previous mtime was: ${prev.mtime}`);
});
```

These stat objects are instances of `fs.Stat`.

To be notified when the file was modified, not just accessed, it is necessary
to compare `curr.mtime` and `prev.mtime`.

*Note*: When an `fs.watchFile` operation results in an `ENOENT` error, it
will invoke the listener once, with all the fields zeroed (or, for dates, the
Unix Epoch). In Windows, `blksize` and `blocks` fields will be `undefined`,
instead of zero. If the file is created later on, the listener will be called
again, with the latest stat objects. This is a change in functionality since
v0.10.

*Note*: [`fs.watch()`][] is more efficient than `fs.watchFile` and
`fs.unwatchFile`. `fs.watch` should be used instead of `fs.watchFile` and
`fs.unwatchFile` when possible.

## fs.write(fd, buffer[, offset[, length[, position]]], callback)
<!-- YAML
added: v0.0.2
changes:
  - version: v7.4.0
    pr-url: https://github.com/nodejs/node/pull/10382
    description: The `buffer` parameter can now be a `Uint8Array`.
  - version: v7.2.0
    pr-url: https://github.com/nodejs/node/pull/7856
    description: The `offset` and `length` parameters are optional now.
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: The `callback` parameter is no longer optional. Not passing
                 it will emit a deprecation warning.
-->

* `fd` {integer}
* `buffer` {Buffer|Uint8Array}
* `offset` {integer}
* `length` {integer}
* `position` {integer}
* `callback` {Function}

Write `buffer` to the file specified by `fd`.

`offset` determines the part of the buffer to be written, and `length` is
an integer specifying the number of bytes to write.

`position` refers to the offset from the beginning of the file where this data
should be written. If `typeof position !== 'number'`, the data will be written
at the current position. See pwrite(2).

The callback will be given three arguments `(err, bytesWritten, buffer)` where
`bytesWritten` specifies how many _bytes_ were written from `buffer`.

If this method is invoked as its [`util.promisify()`][]ed version, it returns
a Promise for an object with `bytesWritten` and `buffer` properties.

Note that it is unsafe to use `fs.write` multiple times on the same file
without waiting for the callback. For this scenario,
`fs.createWriteStream` is strongly recommended.

On Linux, positional writes don't work when the file is opened in append mode.
The kernel ignores the position argument and always appends the data to
the end of the file.

## fs.write(fd, string[, position[, encoding]], callback)
<!-- YAML
added: v0.11.5
changes:
  - version: v7.2.0
    pr-url: https://github.com/nodejs/node/pull/7856
    description: The `position` parameter is optional now.
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: The `callback` parameter is no longer optional. Not passing
                 it will emit a deprecation warning.
-->

* `fd` {integer}
* `string` {string}
* `position` {integer}
* `encoding` {string}
* `callback` {Function}

Write `string` to the file specified by `fd`.  If `string` is not a string, then
the value will be coerced to one.

`position` refers to the offset from the beginning of the file where this data
should be written. If `typeof position !== 'number'` the data will be written at
the current position. See pwrite(2).

`encoding` is the expected string encoding.

The callback will receive the arguments `(err, written, string)` where `written`
specifies how many _bytes_ the passed string required to be written. Note that
bytes written is not the same as string characters. See [`Buffer.byteLength`][].

Unlike when writing `buffer`, the entire string must be written. No substring
may be specified. This is because the byte offset of the resulting data may not
be the same as the string offset.

Note that it is unsafe to use `fs.write` multiple times on the same file
without waiting for the callback. For this scenario,
`fs.createWriteStream` is strongly recommended.

On Linux, positional writes don't work when the file is opened in append mode.
The kernel ignores the position argument and always appends the data to
the end of the file.

## fs.writeFile(file, data[, options], callback)
<!-- YAML
added: v0.1.29
changes:
  - version: v7.4.0
    pr-url: https://github.com/nodejs/node/pull/10382
    description: The `data` parameter can now be a `Uint8Array`.
  - version: v7.0.0
    pr-url: https://github.com/nodejs/node/pull/7897
    description: The `callback` parameter is no longer optional. Not passing
                 it will emit a deprecation warning.
  - version: v5.0.0
    pr-url: https://github.com/nodejs/node/pull/3163
    description: The `file` parameter can be a file descriptor now.
-->

* `file` {string|Buffer|integer} filename or file descriptor
* `data` {string|Buffer|Uint8Array}
* `options` {Object|string}
  * `encoding` {string|null} **Default:** `'utf8'`
  * `mode` {integer} **Default:** `0o666`
  * `flag` {string} **Default:** `'w'`
* `callback` {Function}

Asynchronously writes data to a file, replacing the file if it already exists.
`data` can be a string or a buffer.

The `encoding` option is ignored if `data` is a buffer. It defaults
to `'utf8'`.

Example:

```js
fs.writeFile('message.txt', 'Hello Node.js', (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
```

If `options` is a string, then it specifies the encoding. Example:

```js
fs.writeFile('message.txt', 'Hello Node.js', 'utf8', callback);
```

Any specified file descriptor has to support writing.

Note that it is unsafe to use `fs.writeFile` multiple times on the same file
without waiting for the callback. For this scenario,
`fs.createWriteStream` is strongly recommended.

*Note*: If a file descriptor is specified as the `file`, it will not be closed
automatically.

## fs.writeFileSync(file, data[, options])
<!-- YAML
added: v0.1.29
changes:
  - version: v7.4.0
    pr-url: https://github.com/nodejs/node/pull/10382
    description: The `data` parameter can now be a `Uint8Array`.
  - version: v5.0.0
    pr-url: https://github.com/nodejs/node/pull/3163
    description: The `file` parameter can be a file descriptor now.
-->

* `file` {string|Buffer|integer} filename or file descriptor
* `data` {string|Buffer|Uint8Array}
* `options` {Object|string}
  * `encoding` {string|null} **Default:** `'utf8'`
  * `mode` {integer} **Default:** `0o666`
  * `flag` {string} **Default:** `'w'`

The synchronous version of [`fs.writeFile()`][]. Returns `undefined`.

## fs.writeSync(fd, buffer[, offset[, length[, position]]])
<!-- YAML
added: v0.1.21
changes:
  - version: v7.4.0
    pr-url: https://github.com/nodejs/node/pull/10382
    description: The `buffer` parameter can now be a `Uint8Array`.
  - version: v7.2.0
    pr-url: https://github.com/nodejs/node/pull/7856
    description: The `offset` and `length` parameters are optional now.
-->

* `fd` {integer}
* `buffer` {Buffer|Uint8Array}
* `offset` {integer}
* `length` {integer}
* `position` {integer}

## fs.writeSync(fd, string[, position[, encoding]])
<!-- YAML
added: v0.11.5
changes:
  - version: v7.2.0
    pr-url: https://github.com/nodejs/node/pull/7856
    description: The `position` parameter is optional now.
-->

* `fd` {integer}
* `string` {string}
* `position` {integer}
* `encoding` {string}

Synchronous versions of [`fs.write()`][]. Returns the number of bytes written.

## FS Constants

The following constants are exported by `fs.constants`.

*Note*: Not every constant will be available on every operating system.

### File Access Constants

The following constants are meant for use with [`fs.access()`][].

<table>
  <tr>
    <th>Constant</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>F_OK</code></td>
    <td>Flag indicating that the file is visible to the calling process.</td>
  </tr>
  <tr>
    <td><code>R_OK</code></td>
    <td>Flag indicating that the file can be read by the calling process.</td>
  </tr>
  <tr>
    <td><code>W_OK</code></td>
    <td>Flag indicating that the file can be written by the calling
    process.</td>
  </tr>
  <tr>
    <td><code>X_OK</code></td>
    <td>Flag indicating that the file can be executed by the calling
    process.</td>
  </tr>
</table>

### File Open Constants

The following constants are meant for use with `fs.open()`.

<table>
  <tr>
    <th>Constant</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>O_RDONLY</code></td>
    <td>Flag indicating to open a file for read-only access.</td>
  </tr>
  <tr>
    <td><code>O_WRONLY</code></td>
    <td>Flag indicating to open a file for write-only access.</td>
  </tr>
  <tr>
    <td><code>O_RDWR</code></td>
    <td>Flag indicating to open a file for read-write access.</td>
  </tr>
  <tr>
    <td><code>O_CREAT</code></td>
    <td>Flag indicating to create the file if it does not already exist.</td>
  </tr>
  <tr>
    <td><code>O_EXCL</code></td>
    <td>Flag indicating that opening a file should fail if the
    <code>O_CREAT</code> flag is set and the file already exists.</td>
  </tr>
  <tr>
    <td><code>O_NOCTTY</code></td>
    <td>Flag indicating that if path identifies a terminal device, opening the
    path shall not cause that terminal to become the controlling terminal for
    the process (if the process does not already have one).</td>
  </tr>
  <tr>
    <td><code>O_TRUNC</code></td>
    <td>Flag indicating that if the file exists and is a regular file, and the
    file is opened successfully for write access, its length shall be truncated
    to zero.</td>
  </tr>
  <tr>
    <td><code>O_APPEND</code></td>
    <td>Flag indicating that data will be appended to the end of the file.</td>
  </tr>
  <tr>
    <td><code>O_DIRECTORY</code></td>
    <td>Flag indicating that the open should fail if the path is not a
    directory.</td>
  </tr>
  <tr>
  <td><code>O_NOATIME</code></td>
    <td>Flag indicating reading accesses to the file system will no longer
    result in an update to the `atime` information associated with the file.
    This flag is available on Linux operating systems only.</td>
  </tr>
  <tr>
    <td><code>O_NOFOLLOW</code></td>
    <td>Flag indicating that the open should fail if the path is a symbolic
    link.</td>
  </tr>
  <tr>
    <td><code>O_SYNC</code></td>
    <td>Flag indicating that the file is opened for synchronous I/O.</td>
  </tr>
  <tr>
    <td><code>O_SYMLINK</code></td>
    <td>Flag indicating to open the symbolic link itself rather than the
    resource it is pointing to.</td>
  </tr>
  <tr>
    <td><code>O_DIRECT</code></td>
    <td>When set, an attempt will be made to minimize caching effects of file
    I/O.</td>
  </tr>
  <tr>
    <td><code>O_NONBLOCK</code></td>
    <td>Flag indicating to open the file in nonblocking mode when possible.</td>
  </tr>
</table>

### File Type Constants

The following constants are meant for use with the [`fs.Stats`][] object's
`mode` property for determining a file's type.

<table>
  <tr>
    <th>Constant</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>S_IFMT</code></td>
    <td>Bit mask used to extract the file type code.</td>
  </tr>
  <tr>
    <td><code>S_IFREG</code></td>
    <td>File type constant for a regular file.</td>
  </tr>
  <tr>
    <td><code>S_IFDIR</code></td>
    <td>File type constant for a directory.</td>
  </tr>
  <tr>
    <td><code>S_IFCHR</code></td>
    <td>File type constant for a character-oriented device file.</td>
  </tr>
  <tr>
    <td><code>S_IFBLK</code></td>
    <td>File type constant for a block-oriented device file.</td>
  </tr>
  <tr>
    <td><code>S_IFIFO</code></td>
    <td>File type constant for a FIFO/pipe.</td>
  </tr>
  <tr>
    <td><code>S_IFLNK</code></td>
    <td>File type constant for a symbolic link.</td>
  </tr>
  <tr>
    <td><code>S_IFSOCK</code></td>
    <td>File type constant for a socket.</td>
  </tr>
</table>

### File Mode Constants

The following constants are meant for use with the [`fs.Stats`][] object's
`mode` property for determining the access permissions for a file.

<table>
  <tr>
    <th>Constant</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>S_IRWXU</code></td>
    <td>File mode indicating readable, writable and executable by owner.</td>
  </tr>
  <tr>
    <td><code>S_IRUSR</code></td>
    <td>File mode indicating readable by owner.</td>
  </tr>
  <tr>
    <td><code>S_IWUSR</code></td>
    <td>File mode indicating writable by owner.</td>
  </tr>
  <tr>
    <td><code>S_IXUSR</code></td>
    <td>File mode indicating executable by owner.</td>
  </tr>
  <tr>
    <td><code>S_IRWXG</code></td>
    <td>File mode indicating readable, writable and executable by group.</td>
  </tr>
  <tr>
    <td><code>S_IRGRP</code></td>
    <td>File mode indicating readable by group.</td>
  </tr>
  <tr>
    <td><code>S_IWGRP</code></td>
    <td>File mode indicating writable by group.</td>
  </tr>
  <tr>
    <td><code>S_IXGRP</code></td>
    <td>File mode indicating executable by group.</td>
  </tr>
  <tr>
    <td><code>S_IRWXO</code></td>
    <td>File mode indicating readable, writable and executable by others.</td>
  </tr>
  <tr>
    <td><code>S_IROTH</code></td>
    <td>File mode indicating readable by others.</td>
  </tr>
  <tr>
    <td><code>S_IWOTH</code></td>
    <td>File mode indicating writable by others.</td>
  </tr>
  <tr>
    <td><code>S_IXOTH</code></td>
    <td>File mode indicating executable by others.</td>
  </tr>
</table>


[`AHAFS`]: https://www.ibm.com/developerworks/aix/library/au-aix_event_infrastructure/
[`Buffer.byteLength`]: buffer.html#buffer_class_method_buffer_bytelength_string_encoding
[`Buffer`]: buffer.html#buffer_buffer
[`FSEvents`]: https://developer.apple.com/library/mac/documentation/Darwin/Conceptual/FSEvents_ProgGuide/Introduction/Introduction.html#//apple_ref/doc/uid/TP40005289-CH1-SW1
[`ReadDirectoryChangesW`]: https://msdn.microsoft.com/en-us/library/windows/desktop/aa365465%28v=vs.85%29.aspx
[`ReadStream`]: #fs_class_fs_readstream
[`URL`]: url.html#url_the_whatwg_url_api
[`WriteStream`]: #fs_class_fs_writestream
[`event ports`]: http://illumos.org/man/port_create
[`fs.FSWatcher`]: #fs_class_fs_fswatcher
[`fs.Stats`]: #fs_class_fs_stats
[`fs.access()`]: #fs_fs_access_path_mode_callback
[`fs.appendFile()`]: fs.html#fs_fs_appendfile_file_data_options_callback
[`fs.exists()`]: fs.html#fs_fs_exists_path_callback
[`fs.fstat()`]: #fs_fs_fstat_fd_callback
[`fs.futimes()`]: #fs_fs_futimes_fd_atime_mtime_callback
[`fs.lstat()`]: #fs_fs_lstat_path_callback
[`fs.mkdtemp()`]: #fs_fs_mkdtemp_prefix_options_callback
[`fs.open()`]: #fs_fs_open_path_flags_mode_callback
[`fs.read()`]: #fs_fs_read_fd_buffer_offset_length_position_callback
[`fs.readFile()`]: #fs_fs_readfile_path_options_callback
[`fs.readFileSync()`]: #fs_fs_readfilesync_path_options
[`fs.stat()`]: #fs_fs_stat_path_callback
[`fs.utimes()`]: #fs_fs_utimes_path_atime_mtime_callback
[`fs.watch()`]: #fs_fs_watch_filename_options_listener
[`fs.write()`]: #fs_fs_write_fd_buffer_offset_length_position_callback
[`fs.writeFile()`]: #fs_fs_writefile_file_data_options_callback
[`inotify`]: http://man7.org/linux/man-pages/man7/inotify.7.html
[`kqueue`]: https://www.freebsd.org/cgi/man.cgi?kqueue
[`net.Socket`]: net.html#net_class_net_socket
[`stat()`]: fs.html#fs_fs_stat_path_callback
[`util.inspect(stats)`]: util.html#util_util_inspect_object_options
[`util.promisify()`]: util.html#util_util_promisify_original
[Caveats]: #fs_caveats
[Common System Errors]: errors.html#errors_common_system_errors
[FS Constants]: #fs_fs_constants_1
[MDN-Date]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date
[MDN-Number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type
[MSDN-Rel-Path]: https://msdn.microsoft.com/en-us/library/windows/desktop/aa365247.aspx#fully_qualified_vs._relative_paths
[Readable Stream]: stream.html#stream_class_stream_readable
[Writable Stream]: stream.html#stream_class_stream_writable
[inode]: https://en.wikipedia.org/wiki/Inode
[Naming Files, Paths, and Namespaces]: https://msdn.microsoft.com/en-us/library/windows/desktop/aa365247(v=vs.85).aspx
[MSDN-Using-Streams]: https://msdn.microsoft.com/en-us/library/windows/desktop/bb540537.aspx

<!-- ENDIN nodejsfs --> 

 <!-- BEGIN ending -->
Third Party
-----------

## File / Directory Watching

If you want to watch for changes to files or directories, then you should use [chokidar](https://github.com/paulmillr/chokidar).


## Misc.

- [mfs](https://github.com/cadorn/mfs) - Monitor your fsxt calls.

Hacking on fsxt
-------------------

Do you want to hack on fsxt? Well, that's pretty dumb. Still, you can go ahead and send a PR.

fsxt uses the [Google Style](https://google.github.io/styleguide/jsguide.html). It's good-looking and safe JavaScript as God (Brendan Eich) intended.

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

License
-------

Licensed under MIT

`fs-extra` is copyright (c) 2011-2017 [JP Richardson](https://github.com/jprichardson)

`fsxt` is copyright © 2016-2017 [chrishansen69/rafa1231518](https://github.com/rafa1231518), some rights reserved.

Parts of the documentation have been completely stolen from [create-readdir-stream](https://github.com/tunnckoCore/create-readdir-stream/),
[diveSync](https://github.com/pvorb/node-diveSync), [dive](https://github.com/pvorb/node-dive) and the Node.js `fs` module.

`fs-extra` and `fsxt` are not endorsed by or affiliated with Joyent or the Node.js Foundation.
`fsxt` is not endorsed by or affiliated with JP Richardson, but who would want that, anyway?

<!-- ENDIN ending --> 
