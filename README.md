fs-extra+
=========

Improved fork of `fs-extra` with extra [sic] features (and semicolons!)  
`fs-extra+` provides support for Node.js 4.X.X and above (possibly), but at least 6.X.X is recommended.

Installation
------------

    npm install --save rafa1231518/node-fs-extra

Usage
-----

`fs-extra+` is a drop in replacement for native [`fs`](http://nodejs.org/docs/latest/api/fs.html). All methods in [`fs`](http://nodejs.org/docs/latest/api/fs.html) are unmodified and attached to `fs-extra+`.

You don't ever need to include the original [`fs`](http://nodejs.org/docs/latest/api/fs.html) module again:

```js
const fs = require('fs'); // this is no longer necessary
```

you can now do this:

```js
const fs = require('fs-extra');
```

or if you prefer to make it clear that you're using `fs-extra` and not [`fs`](http://nodejs.org/docs/latest/api/fs.html), you may want
to name your [`fs`](http://nodejs.org/docs/latest/api/fs.html) variable `fse` like so:

```js
const fse = require('fs-extra');
```

you can also keep both, but it's redundant:

```js
const fs = require('fs');
const fse = require('fs-extra');
```

Sync vs Async
-------------
Most methods are asynchronous by default (they take a callback with an `Error` or `null` as first argument, and some form of data as the second).

Synchronous methods on the other hand will throw if an error occurs, and return the second parameter of what would be in the async callback.

Example:

```js
const fs = require('fs-extra');

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

Methods
-------
- [copy | copySync](#copy)
- [emptyDir | emptyDirSync](#emptydirdir-callback)
- [ensureFile | ensureFileSync](#ensurefilefile-callback)
- [ensureDir | ensureDirSync](#ensuredirdir-callback)
- [ensureLink | ensureLinkSync](#ensurelinksrcpath-dstpath-callback)
- [ensureSymlink | ensureSymlinkSync](#ensuresymlinksrcpath-dstpath-type-callback)
- [mkdirs | mkdirsSync](#mkdirsdir-callback)
- [move](#movesrc-dest-options-callback)
- [outputFile | outputFileSync](#outputfilefile-data-options-callback)
- [outputJson | outputJsonSync](#outputjsonfile-data-options-callback)
- [readJson | readJsonSync](#readjsonfile-options-callback)
- [remove | removeSync](#removedir-callback)
- [walk](#walk)
- [writeJson | writeJsonSync](#writejsonfile-object-options-callback)
- [exists](#existsfile-callback)
- [resolve](#resolvepath-child)
- [forEachChildSync](#foreachchildsyncpath-functionfile-options)
- [forEachChild](#foreachchildfunctionerror-file-options-callback)
- [vacuum](#vacuumdirectory-options-callback)
- [dive | diveSync](#divedirectory-options-action-complete)
- [createReaddirStream](#createreaddirstreamdir-options)
- [readXML | readXMLSync](#readxmlpath-functionerr-parsedobject)
- [readLinesSync](#readlinessyncpath-encoding)
- [readSync](#readsyncpath-encoding)
- [isDirectory | isDirectorySync](#isdirectorypath-callback)

Built-in Node.js `fs` methods:

- [access(path[, mode], callback)](#fsaccesspath-mode-callback)
- [accessSync(path[, mode])](#fsaccesssyncpath-mode)
- [appendFile(file, data[, options], callback)](#fsappendfilefile-data-options-callback)
- [appendFileSync(file, data[, options])](#fsappendfilesyncfile-data-options)
- [chmod(path, mode, callback)](#fschmodpath-mode-callback)
- [chmodSync(path, mode)](#fschmodsyncpath-mode)
- [chown(path, uid, gid, callback)](#fschownpath-uid-gid-callback)
- [chownSync(path, uid, gid)](#fschownsyncpath-uid-gid)
- [close(fd, callback)](#fsclosefd-callback)
- [closeSync(fd)](#fsclosesyncfd)
- [constants](#fsconstants)
- [createReadStream(path[, options])](#fscreatereadstreampath-options)
- [createWriteStream(path[, options])](#fscreatewritestreampath-options)
- [exists(path, callback)](#fsexistspath-callback)
- [existsSync(path)](#fsexistssyncpath)
- [fchmod(fd, mode, callback)](#fsfchmodfd-mode-callback)
- [fchmodSync(fd, mode)](#fsfchmodsyncfd-mode)
- [fchown(fd, uid, gid, callback)](#fsfchownfd-uid-gid-callback)
- [fchownSync(fd, uid, gid)](#fsfchownsyncfd-uid-gid)
- [fdatasync(fd, callback)](#fsfdatasyncfd-callback)
- [fdatasyncSync(fd)](#fsfdatasyncsyncfd)
- [fstat(fd, callback)](#fsfstatfd-callback)
- [fstatSync(fd)](#fsfstatsyncfd)
- [fsync(fd, callback)](#fsfsyncfd-callback)
- [fsyncSync(fd)](#fsfsyncsyncfd)
- [ftruncate(fd, len, callback)](#fsftruncatefd-len-callback)
- [ftruncateSync(fd, len)](#fsftruncatesyncfd-len)
- [futimes(fd, atime, mtime, callback)](#fsfutimesfd-atime-mtime-callback)
- [futimesSync(fd, atime, mtime)](#fsfutimessyncfd-atime-mtime)
- [lchmod(path, mode, callback)](#fslchmodpath-mode-callback)
- [lchmodSync(path, mode)](#fslchmodsyncpath-mode)
- [lchown(path, uid, gid, callback)](#fslchownpath-uid-gid-callback)
- [lchownSync(path, uid, gid)](#fslchownsyncpath-uid-gid)
- [link(existingPath, newPath, callback)](#fslinkexistingpath-newpath-callback)
- [linkSync(existingPath, newPath)](#fslinksyncexistingpath-newpath)
- [lstat(path, callback)](#fslstatpath-callback)
- [lstatSync(path)](#fslstatsyncpath)
- [mkdir(path[, mode], callback)](#fsmkdirpath-mode-callback)
- [mkdirSync(path[, mode])](#fsmkdirsyncpath-mode)
- [mkdtemp(prefix[, options], callback)](#fsmkdtempprefix-options-callback)
- [mkdtempSync(prefix[, options])](#fsmkdtempsyncprefix-options)
- [open(path, flags[, mode], callback)](#fsopenpath-flags-mode-callback)
- [openSync(path, flags[, mode])](#fsopensyncpath-flags-mode)
- [read(fd, buffer, offset, length, position, callback)](#fsreadfd-buffer-offset-length-position-callback)
- [readdir(path[, options], callback)](#fsreaddirpath-options-callback)
- [readdirSync(path[, options])](#fsreaddirsyncpath-options)
- [readFile(file[, options], callback)](#fsreadfilefile-options-callback)
- [readFileSync(file[, options])](#fsreadfilesyncfile-options)
- [readlink(path[, options], callback)](#fsreadlinkpath-options-callback)
- [readlinkSync(path[, options])](#fsreadlinksyncpath-options)
- [readSync(fd, buffer, offset, length, position)](#fsreadsyncfd-buffer-offset-length-position)
- [realpath(path[, options], callback)](#fsrealpathpath-options-callback)
- [realpathSync(path[, options])](#fsrealpathsyncpath-options)
- [rename(oldPath, newPath, callback)](#fsrenameoldpath-newpath-callback)
- [renameSync(oldPath, newPath)](#fsrenamesyncoldpath-newpath)
- [rmdir(path, callback)](#fsrmdirpath-callback)
- [rmdirSync(path)](#fsrmdirsyncpath)
- [stat(path, callback)](#fsstatpath-callback)
- [statSync(path)](#fsstatsyncpath)
- [symlink(target, path[, type], callback)](#fssymlinktarget-path-type-callback)
- [symlinkSync(target, path[, type])](#fssymlinksynctarget-path-type)
- [truncate(path, len, callback)](#fstruncatepath-len-callback)
- [truncateSync(path, len)](#fstruncatesyncpath-len)
- [unlink(path, callback)](#fsunlinkpath-callback)
- [unlinkSync(path)](#fsunlinksyncpath)
- [unwatchFile(filename[, listener])](#fsunwatchfilefilename-listener)
- [utimes(path, atime, mtime, callback)](#fsutimespath-atime-mtime-callback)
- [utimesSync(path, atime, mtime)](#fsutimessyncpath-atime-mtime)
- [watch(filename[, options][, listener])](#fswatchfilename-options-listener)
- [watchFile(filename[, options], listener)](#fswatchfilefilename-options-listener)
- [write(fd, buffer, offset, length[, position], callback)](#fswritefd-buffer-offset-length-position-callback)
- [write(fd, data[, position[, encoding]], callback)](#fswritefd-data-position-encoding-callback)
- [writeFile(file, data[, options], callback)](#fswritefilefile-data-options-callback)
- [writeFileSync(file, data[, options])](#fswritefilesyncfile-data-options)
- [writeSync(fd, buffer, offset, length[, position])](#fswritesyncfd-buffer-offset-length-position)
- [writeSync(fd, data[, position[, encoding]])](#fswritesyncfd-data-position-encoding)

**NOTE:** You can still use the native Node.js methods. They are copied over to `fs-extra`.

## copy()

**copy(src, dest, [options], callback)**


Copy a file or directory. The directory can have contents. Like `cp -r`.

Options:
- clobber (boolean): overwrite existing file or directory, default is `true`.
- dereference (boolean): dereference symlinks, default is `false`.
- preserveTimestamps (boolean): will set last modification and access times to the ones of the original source files, default is `false`.
- filter: Function or RegExp to filter copied files. If function, return true to include, false to exclude. If RegExp, same as function, where `filter` is `filter.test`.

Sync: `copySync()`

Example:

```js
const fs = require('fs-extra');

fs.copy('/tmp/myfile', '/tmp/mynewfile', function (err) {
  if (err) return console.error(err);
  console.log("success!");
}) // copies file

fs.copy('/tmp/mydir', '/tmp/mynewdir', function (err) {
  if (err) return console.error(err);
  console.log('success!');
}) // copies directory, even if it has subdirectories or files
```


## emptyDir(dir, [callback])

Ensures that a directory is empty. Deletes directory contents if the directory is not empty. If the directory does not exist, it is created. The directory itself is not deleted.

Alias: `emptydir()`

Sync: `emptyDirSync()`, `emptydirSync()`

Example:

```js
const fs = require('fs-extra');

// assume this directory has a lot of files and folders
fs.emptyDir('/tmp/some/dir', function (err) {
  if (!err) console.log('success!');
})
```


## ensureFile(file, callback)

Ensures that the file exists. If the file that is requested to be created is in directories that do not exist, these directories are created. If the file already exists, it is **NOT MODIFIED**.

Alias: `createFile()`

Sync: `createFileSync()`,`ensureFileSync()`


Example:

```js
const fs = require('fs-extra');

const file = '/tmp/this/path/does/not/exist/file.txt'
fs.ensureFile(file, function (err) {
  console.log(err) // => null
  // file has now been created, including the directory it is to be placed in
})
```


## ensureDir(dir, callback)

Ensures that the directory exists. If the directory structure does not exist, it is created.

Sync: `ensureDirSync()`


Example:

```js
const fs = require('fs-extra');

const dir = '/tmp/this/path/does/not/exist'
fs.ensureDir(dir, function (err) {
  console.log(err); // => null
  // dir has now been created, including the directory it is to be placed in
})
```


## ensureLink(srcpath, dstpath, callback)

Ensures that the link exists. If the directory structure does not exist, it is created.

Sync: `ensureLinkSync()`


Example:

```js
const fs = require('fs-extra');

const srcpath = '/tmp/file.txt';
const dstpath = '/tmp/this/path/does/not/exist/file.txt';
fs.ensureLink(srcpath, dstpath, function (err) {
  console.log(err); // => null
  // link has now been created, including the directory it is to be placed in
})
```


## ensureSymlink(srcpath, dstpath, [type], callback)

Ensures that the symlink exists. If the directory structure does not exist, it is created.

Sync: `ensureSymlinkSync()`


Example:

```js
const fs = require('fs-extra');

const srcpath = '/tmp/file.txt';
const dstpath = '/tmp/this/path/does/not/exist/file.txt';
fs.ensureSymlink(srcpath, dstpath, function (err) {
  console.log(err); // => null
  // symlink has now been created, including the directory it is to be placed in
})
```


## mkdirs(dir, callback)

Creates a directory. If the parent hierarchy doesn't exist, it's created. Like `mkdir -p`.

Alias: `mkdirp()`

Sync: `mkdirsSync()` / `mkdirpSync()`


Examples:

```js
const fs = require('fs-extra');

fs.mkdirs('/tmp/some/long/path/that/prob/doesnt/exist', function (err) {
  if (err) return console.error(err);
  console.log("success!");
})

fs.mkdirsSync('/tmp/another/path');
```


## move(src, dest, [options], callback)

Moves a file or directory, even across devices.

Options:
- clobber (boolean): overwrite existing file or directory
- limit (number): number of concurrent moves, see ncp for more information

Example:

```js
const fs = require('fs-extra');

fs.move('/tmp/somefile', '/tmp/does/not/exist/yet/somefile', function (err) {
  if (err) return console.error(err);
  console.log("success!");
})
```


## outputFile(file, data, [options], callback)

Almost the same as `writeFile` (i.e. it [overwrites](http://pages.citebite.com/v2o5n8l2f5reb)), except that if the parent directory does not exist, it's created. `options` are what you'd pass to [`fs.writeFile()`](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback).

Sync: `outputFileSync()`


Example:

```js
const fs = require('fs-extra');
const file = '/tmp/this/path/does/not/exist/file.txt';

fs.outputFile(file, 'hello!', function (err) {
  console.log(err); // => null

  fs.readFile(file, 'utf8', function (err, data) {
    console.log(data); // => hello!
  })
})
```



## outputJson(file, data, [options], callback)

Almost the same as `writeJson`, except that if the directory does not exist, it's created.
`options` are what you'd pass to [`jsonFile.writeFile()`](https://github.com/jprichardson/node-jsonfile#writefilefilename-options-callback).

Alias: `outputJSON()`

Sync: `outputJsonSync()`, `outputJSONSync()`


Example:

```js
const fs = require('fs-extra')
const file = '/tmp/this/path/does/not/exist/file.txt'

fs.outputJson(file, {name: 'JP'}, function (err) {
  console.log(err) // => null

  fs.readJson(file, function(err, data) {
    console.log(data.name) // => JP
  })
})
```



## readJson(file, [options], callback)

Reads a JSON file and then parses it into an object. `options` are the same
that you'd pass to [`jsonFile.readFile`](https://github.com/jprichardson/node-jsonfile#readfilefilename-options-callback).

Alias: `readJSON()`

Sync: `readJsonSync()`, `readJSONSync()`


Example:

```js
const fs = require('fs-extra')

fs.readJson('./package.json', function (err, packageObj) {
  console.log(packageObj.version) // => 0.1.3
})
```

`readJsonSync()` can take a `throws` option set to `false` and it won't throw if the JSON is invalid. Example:

```js
const fs = require('fs-extra')
const file = path.join('/tmp/some-invalid.json')
const data = '{not valid JSON'
fs.writeFileSync(file, data)

const obj = fs.readJsonSync(file, {throws: false})
console.log(obj) // => null
```


## remove(dir, callback)

Removes a file or directory. The directory can have contents. Like `rm -rf`.

Sync: `removeSync()`


Examples:

```js
const fs = require('fs-extra')

fs.remove('/tmp/myfile', function (err) {
  if (err) return console.error(err)

  console.log('success!')
})

fs.removeSync('/home/jprichardson') //I just deleted my entire HOME directory.
```

## walk()

**walk(dir, [streamOptions])**

The function `walk()` from the module [`klaw`](https://github.com/jprichardson/node-klaw).

Returns a [Readable stream](https://nodejs.org/api/stream.html#stream_class_stream_readable) that iterates
through every file and directory starting with `dir` as the root. Every `read()` or `data` event
returns an object with two properties: `path` and `stats`. `path` is the full path of the file and
`stats` is an instance of [fs.Stats](https://nodejs.org/api/fs.html#fs_class_fs_stats).

Streams 1 (push) example:

```js
const fs = require('fs-extra')
const items = [] // files, directories, symlinks, etc
fs.walk(TEST_DIR)
  .on('data', function (item) {
    items.push(item.path)
  })
  .on('end', function () {
    console.dir(items) // => [ ... array of files]
  })
```

Streams 2 & 3 (pull) example:

```js
const items = [] // files, directories, symlinks, etc
const fs = require('fs-extra')
fs.walk(TEST_DIR)
  .on('readable', function () {
    const item
    while ((item = this.read())) {
      items.push(item.path)
    }
  })
  .on('end', function () {
    console.dir(items) // => [ ... array of files]
  })
```

If you're not sure of the differences on Node.js streams 1, 2, 3 then I'd
recommend this resource as a good starting point: https://strongloop.com/strongblog/whats-new-io-js-beta-streams3/.

**See [`klaw` documentation](https://github.com/jprichardson/node-klaw) for more detailed usage.**


## writeJson(file, object, [options], callback)

Writes an object to a JSON file. `options` are the same that
you'd pass to [`jsonFile.writeFile()`](https://github.com/jprichardson/node-jsonfile#writefilefilename-options-callback).

Alias: `writeJSON()`

Sync: `writeJsonSync()`, `writeJSONSync()`

Example:

```js
const fs = require('fs-extra')
fs.writeJson('./package.json', {name: 'fs-extra'}, function (err) {
  console.log(err)
})
```

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

## diveSync(path, options)

The synchronous version of `dive`. Improved version of the `diveSync` module.

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

## fs.access(path[, mode], callback)
<!-- YAML
added: v0.11.15
-->

* `path` {String | Buffer}
* `mode` {Integer}
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
    if (err.code === "EEXIST") {
      console.error('myfile already exists');
      return;
    } else {
      throw err;
    }
  }

  writeMyData(fd);
});
```

**read (NOT RECOMMENDED)**

```js
fs.access('myfile', (err) => {
  if (err) {
    if (err.code === "ENOENT") {
      console.error('myfile does not exist');
      return;
    } else {
      throw err;
    }
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
    if (err.code === "ENOENT") {
      console.error('myfile does not exist');
      return;
    } else {
      throw err;
    }
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
-->

* `path` {String | Buffer}
* `mode` {Integer}

Synchronous version of [`fs.access()`][]. This throws if any accessibility
checks fail, and does nothing otherwise.

## fs.appendFile(file, data[, options], callback)
<!-- YAML
added: v0.6.7
-->

* `file` {String | Buffer | Number} filename or file descriptor
* `data` {String | Buffer}
* `options` {Object | String}
  * `encoding` {String | Null} default = `'utf8'`
  * `mode` {Integer} default = `0o666`
  * `flag` {String} default = `'a'`
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

_Note: If a file descriptor is specified as the `file`, it will not be closed
automatically._

## fs.appendFileSync(file, data[, options])
<!-- YAML
added: v0.6.7
-->

* `file` {String | Buffer | Number} filename or file descriptor
* `data` {String | Buffer}
* `options` {Object | String}
  * `encoding` {String | Null} default = `'utf8'`
  * `mode` {Integer} default = `0o666`
  * `flag` {String} default = `'a'`

The synchronous version of [`fs.appendFile()`][]. Returns `undefined`.

## fs.chmod(path, mode, callback)
<!-- YAML
added: v0.1.30
-->

* `path` {String | Buffer}
* `mode` {Integer}
* `callback` {Function}

Asynchronous chmod(2). No arguments other than a possible exception are given
to the completion callback.

## fs.chmodSync(path, mode)
<!-- YAML
added: v0.6.7
-->

* `path` {String | Buffer}
* `mode` {Integer}

Synchronous chmod(2). Returns `undefined`.

## fs.chown(path, uid, gid, callback)
<!-- YAML
added: v0.1.97
-->

* `path` {String | Buffer}
* `uid` {Integer}
* `gid` {Integer}
* `callback` {Function}

Asynchronous chown(2). No arguments other than a possible exception are given
to the completion callback.

## fs.chownSync(path, uid, gid)
<!-- YAML
added: v0.1.97
-->

* `path` {String | Buffer}
* `uid` {Integer}
* `gid` {Integer}

Synchronous chown(2). Returns `undefined`.

## fs.close(fd, callback)
<!-- YAML
added: v0.0.2
-->

* `fd` {Integer}
* `callback` {Function}

Asynchronous close(2).  No arguments other than a possible exception are given
to the completion callback.

## fs.closeSync(fd)
<!-- YAML
added: v0.1.21
-->

* `fd` {Integer}

Synchronous close(2). Returns `undefined`.

## fs.constants

Returns an object containing commonly used constants for file system
operations. The specific constants currently defined are described in
[FS Constants][].

## fs.createReadStream(path[, options])
<!-- YAML
added: v0.1.31
-->

* `path` {String | Buffer}
* `options` {String | Object}
  * `flags` {String}
  * `encoding` {String}
  * `fd` {Integer}
  * `mode` {Integer}
  * `autoClose` {Boolean}
  * `start` {Integer}
  * `end` {Integer}

Returns a new [`ReadStream`][] object. (See [Readable Stream][]).

Be aware that, unlike the default value set for `highWaterMark` on a
readable stream (16 kb), the stream returned by this method has a
default value of 64 kb for the same parameter.

`options` is an object or string with the following defaults:

```js
{
  flags: 'r',
  encoding: null,
  fd: null,
  mode: 0o666,
  autoClose: true
}
```

`options` can include `start` and `end` values to read a range of bytes from
the file instead of the entire file.  Both `start` and `end` are inclusive and
start at 0. The `encoding` can be any one of those accepted by [`Buffer`][].

If `fd` is specified, `ReadStream` will ignore the `path` argument and will use
the specified file descriptor. This means that no `'open'` event will be
emitted. Note that `fd` should be blocking; non-blocking `fd`s should be passed
to [`net.Socket`][].

If `autoClose` is false, then the file descriptor won't be closed, even if
there's an error.  It is your responsibility to close it and make sure
there's no file descriptor leak.  If `autoClose` is set to true (default
behavior), on `error` or `end` the file descriptor will be closed
automatically.

`mode` sets the file mode (permission and sticky bits), but only if the
file was created.

An example to read the last 10 bytes of a file which is 100 bytes long:

```js
fs.createReadStream('sample.txt', {start: 90, end: 99});
```

If `options` is a string, then it specifies the encoding.

## fs.createWriteStream(path[, options])
<!-- YAML
added: v0.1.31
-->

* `path` {String | Buffer}
* `options` {String | Object}
  * `flags` {String}
  * `defaultEncoding` {String}
  * `fd` {Integer}
  * `mode` {Integer}
  * `autoClose` {Boolean}
  * `start` {Integer}

Returns a new [`WriteStream`][] object. (See [Writable Stream][]).

`options` is an object or string with the following defaults:

```js
{
  flags: 'w',
  defaultEncoding: 'utf8',
  fd: null,
  mode: 0o666,
  autoClose: true
}
```

`options` may also include a `start` option to allow writing data at
some position past the beginning of the file.  Modifying a file rather
than replacing it may require a `flags` mode of `r+` rather than the
default mode `w`. The `defaultEncoding` can be any one of those accepted by
[`Buffer`][].

If `autoClose` is set to true (default behavior) on `error` or `end`
the file descriptor will be closed automatically. If `autoClose` is false,
then the file descriptor won't be closed, even if there's an error.
It is your responsibility to close it and make sure
there's no file descriptor leak.

Like [`ReadStream`][], if `fd` is specified, `WriteStream` will ignore the
`path` argument and will use the specified file descriptor. This means that no
`'open'` event will be emitted. Note that `fd` should be blocking; non-blocking
`fd`s should be passed to [`net.Socket`][].

If `options` is a string, then it specifies the encoding.

## fs.exists(path, callback)
<!-- YAML
added: v0.0.2
deprecated: v1.0.0
-->

> Stability: 0 - Deprecated: Use [`fs.stat()`][] or [`fs.access()`][] instead.

* `path` {String | Buffer}
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
    if (err.code === "EEXIST") {
      console.error('myfile already exists');
      return;
    } else {
      throw err;
    }
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
    if (err.code === "ENOENT") {
      console.error('myfile does not exist');
      return;
    } else {
      throw err;
    }
  } else {
    readMyData(fd);
  }
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
-->

* `path` {String | Buffer}

Synchronous version of [`fs.exists()`][].
Returns `true` if the file exists, `false` otherwise.

Note that `fs.exists()` is deprecated, but `fs.existsSync()` is not.
(The `callback` parameter to `fs.exists()` accepts parameters that are
inconsistent with other Node.js callbacks. `fs.existsSync()` does not use
a callback.)

## fs.fchmod(fd, mode, callback)
<!-- YAML
added: v0.4.7
-->

* `fd` {Integer}
* `mode` {Integer}
* `callback` {Function}

Asynchronous fchmod(2). No arguments other than a possible exception
are given to the completion callback.

## fs.fchmodSync(fd, mode)
<!-- YAML
added: v0.4.7
-->

* `fd` {Integer}
* `mode` {Integer}

Synchronous fchmod(2). Returns `undefined`.

## fs.fchown(fd, uid, gid, callback)
<!-- YAML
added: v0.4.7
-->

* `fd` {Integer}
* `uid` {Integer}
* `gid` {Integer}
* `callback` {Function}

Asynchronous fchown(2). No arguments other than a possible exception are given
to the completion callback.

## fs.fchownSync(fd, uid, gid)
<!-- YAML
added: v0.4.7
-->

* `fd` {Integer}
* `uid` {Integer}
* `gid` {Integer}

Synchronous fchown(2). Returns `undefined`.

## fs.fdatasync(fd, callback)
<!-- YAML
added: v0.1.96
-->

* `fd` {Integer}
* `callback` {Function}

Asynchronous fdatasync(2). No arguments other than a possible exception are
given to the completion callback.

## fs.fdatasyncSync(fd)
<!-- YAML
added: v0.1.96
-->

* `fd` {Integer}

Synchronous fdatasync(2). Returns `undefined`.

## fs.fstat(fd, callback)
<!-- YAML
added: v0.1.95
-->

* `fd` {Integer}
* `callback` {Function}

Asynchronous fstat(2). The callback gets two arguments `(err, stats)` where
`stats` is an [`fs.Stats`][] object. `fstat()` is identical to [`stat()`][],
except that the file to be stat-ed is specified by the file descriptor `fd`.

## fs.fstatSync(fd)
<!-- YAML
added: v0.1.95
-->

* `fd` {Integer}

Synchronous fstat(2). Returns an instance of [`fs.Stats`][].

## fs.fsync(fd, callback)
<!-- YAML
added: v0.1.96
-->

* `fd` {Integer}
* `callback` {Function}

Asynchronous fsync(2). No arguments other than a possible exception are given
to the completion callback.

## fs.fsyncSync(fd)
<!-- YAML
added: v0.1.96
-->

* `fd` {Integer}

Synchronous fsync(2). Returns `undefined`.

## fs.ftruncate(fd, len, callback)
<!-- YAML
added: v0.8.6
-->

* `fd` {Integer}
* `len` {Integer} default = `0`
* `callback` {Function}

Asynchronous ftruncate(2). No arguments other than a possible exception are
given to the completion callback.

If the file referred to by the file descriptor was larger than `len` bytes, only
the first `len` bytes will be retained in the file.

For example, the following program retains only the first four bytes of the file

```js
console.log(fs.readFileSync('temp.txt', 'utf8'));
  // prints Node.js

// get the file descriptor of the file to be truncated
const fd = fs.openSync('temp.txt', 'r+');

// truncate the file to first four bytes
fs.ftruncate(fd, 4, (err) => {
  assert.ifError(err);
  console.log(fs.readFileSync('temp.txt', 'utf8'));
});
  // prints Node
```

If the file previously was shorter than `len` bytes, it is extended, and the
extended part is filled with null bytes ('\0'). For example,

```js
console.log(fs.readFileSync('temp.txt', 'utf-8'));
  // prints Node.js

// get the file descriptor of the file to be truncated
const fd = fs.openSync('temp.txt', 'r+');

// truncate the file to 10 bytes, whereas the actual size is 7 bytes
fs.ftruncate(fd, 10, (err) => {
  assert.ifError(!err);
  console.log(fs.readFileSync('temp.txt'));
});
  // prints <Buffer 4e 6f 64 65 2e 6a 73 00 00 00>
  // ('Node.js\0\0\0' in UTF8)
```

The last three bytes are null bytes ('\0'), to compensate the over-truncation.

## fs.ftruncateSync(fd, len)
<!-- YAML
added: v0.8.6
-->

* `fd` {Integer}
* `len` {Integer} default = `0`

Synchronous ftruncate(2). Returns `undefined`.

## fs.futimes(fd, atime, mtime, callback)
<!-- YAML
added: v0.4.2
-->

* `fd` {Integer}
* `atime` {Integer}
* `mtime` {Integer}
* `callback` {Function}

Change the file timestamps of a file referenced by the supplied file
descriptor.

## fs.futimesSync(fd, atime, mtime)
<!-- YAML
added: v0.4.2
-->

* `fd` {Integer}
* `atime` {Integer}
* `mtime` {Integer}

Synchronous version of [`fs.futimes()`][]. Returns `undefined`.

## fs.lchmod(path, mode, callback)
<!-- YAML
deprecated: v0.4.7
-->

* `path` {String | Buffer}
* `mode` {Integer}
* `callback` {Function}

Asynchronous lchmod(2). No arguments other than a possible exception
are given to the completion callback.

Only available on Mac OS X.

## fs.lchmodSync(path, mode)
<!-- YAML
deprecated: v0.4.7
-->

* `path` {String | Buffer}
* `mode` {Integer}

Synchronous lchmod(2). Returns `undefined`.

## fs.lchown(path, uid, gid, callback)
<!-- YAML
deprecated: v0.4.7
-->

* `path` {String | Buffer}
* `uid` {Integer}
* `gid` {Integer}
* `callback` {Function}

Asynchronous lchown(2). No arguments other than a possible exception are given
to the completion callback.

## fs.lchownSync(path, uid, gid)
<!-- YAML
deprecated: v0.4.7
-->

* `path` {String | Buffer}
* `uid` {Integer}
* `gid` {Integer}

Synchronous lchown(2). Returns `undefined`.

## fs.link(existingPath, newPath, callback)
<!-- YAML
added: v0.1.31
-->

* `existingPath` {String | Buffer}
* `newPath` {String | Buffer}
* `callback` {Function}

Asynchronous link(2). No arguments other than a possible exception are given to
the completion callback.

## fs.linkSync(existingPath, newPath)
<!-- YAML
added: v0.1.31
-->

* `existingPath` {String | Buffer}
* `newPath` {String | Buffer}

Synchronous link(2). Returns `undefined`.

## fs.lstat(path, callback)
<!-- YAML
added: v0.1.30
-->

* `path` {String | Buffer}
* `callback` {Function}

Asynchronous lstat(2). The callback gets two arguments `(err, stats)` where
`stats` is a [`fs.Stats`][] object. `lstat()` is identical to `stat()`,
except that if `path` is a symbolic link, then the link itself is stat-ed,
not the file that it refers to.

## fs.lstatSync(path)
<!-- YAML
added: v0.1.30
-->

* `path` {String | Buffer}

Synchronous lstat(2). Returns an instance of [`fs.Stats`][].

## fs.mkdir(path[, mode], callback)
<!-- YAML
added: v0.1.8
-->

* `path` {String | Buffer}
* `mode` {Integer}
* `callback` {Function}

Asynchronous mkdir(2). No arguments other than a possible exception are given
to the completion callback. `mode` defaults to `0o777`.

## fs.mkdirSync(path[, mode])
<!-- YAML
added: v0.1.21
-->

* `path` {String | Buffer}
* `mode` {Integer}

Synchronous mkdir(2). Returns `undefined`.

## fs.mkdtemp(prefix[, options], callback)
<!-- YAML
added: v5.10.0
-->

* `prefix` {String}
* `options` {String | Object}
  * `encoding` {String} default = `'utf8'`
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
const path = require('path');
fs.mkdtemp(tmpDir + path.sep, (err, folder) => {
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

* `prefix` {String}
* `options` {String | Object}
  * `encoding` {String} default = `'utf8'`

The synchronous version of [`fs.mkdtemp()`][]. Returns the created
folder path.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use.

## fs.open(path, flags[, mode], callback)
<!-- YAML
added: v0.0.2
-->

* `path` {String | Buffer}
* `flags` {String | Number}
* `mode` {Integer}
* `callback` {Function}

Asynchronous file open. See open(2). `flags` can be:

* `'r'` - Open file for reading.
An exception occurs if the file does not exist.

* `'r+'` - Open file for reading and writing.
An exception occurs if the file does not exist.

* `'rs+'` - Open file for reading and writing in synchronous mode. Instructs
  the operating system to bypass the local file system cache.

  This is primarily useful for opening files on NFS mounts as it allows you to
  skip the potentially stale local cache. It has a very real impact on I/O
  performance so don't use this flag unless you need it.

  Note that this doesn't turn `fs.open()` into a synchronous blocking call.
  If that's what you want then you should be using `fs.openSync()`

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
created. It defaults to `0666`, readable and writable.

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

_Note: The behavior of `fs.open()` is platform specific for some flags. As such,
opening a directory on OS X and Linux with the `'a+'` flag - see example below -
will return an error. In contrast, on Windows and FreeBSD, a file descriptor
will be returned._

```js
// OS X and Linux
fs.open('<directory>', 'a+', (err, fd) => {
  // => [Error: EISDIR: illegal operation on a directory, open <directory>]
});

// Windows and FreeBSD
fs.open('<directory>', 'a+', (err, fd) => {
  // => null, <fd>
});
```

## fs.openSync(path, flags[, mode])
<!-- YAML
added: v0.1.21
-->

* `path` {String | Buffer}
* `flags` {String | Number}
* `mode` {Integer}

Synchronous version of [`fs.open()`][]. Returns an integer representing the file
descriptor.

## fs.read(fd, buffer, offset, length, position, callback)
<!-- YAML
added: v0.0.2
-->

* `fd` {Integer}
* `buffer` {String | Buffer}
* `offset` {Integer}
* `length` {Integer}
* `position` {Integer}
* `callback` {Function}

Read data from the file specified by `fd`.

`buffer` is the buffer that the data will be written to.

`offset` is the offset in the buffer to start writing at.

`length` is an integer specifying the number of bytes to read.

`position` is an integer specifying where to begin reading from in the file.
If `position` is `null`, data will be read from the current file position.

The callback is given the three arguments, `(err, bytesRead, buffer)`.

## fs.readdir(path[, options], callback)
<!-- YAML
added: v0.1.8
-->

* `path` {String | Buffer}
* `options` {String | Object}
  * `encoding` {String} default = `'utf8'`
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
-->

* `path` {String | Buffer}
* `options` {String | Object}
  * `encoding` {String} default = `'utf8'`

Synchronous readdir(3). Returns an array of filenames excluding `'.'` and
`'..'`.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the filenames passed to the callback. If the `encoding` is set to `'buffer'`,
the filenames returned will be passed as `Buffer` objects.

## fs.readFile(file[, options], callback)
<!-- YAML
added: v0.1.29
-->

* `file` {String | Buffer | Integer} filename or file descriptor
* `options` {Object | String}
  * `encoding` {String | Null} default = `null`
  * `flag` {String} default = `'r'`
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

Any specified file descriptor has to support reading.

_Note: If a file descriptor is specified as the `file`, it will not be closed
automatically._

## fs.readFileSync(file[, options])
<!-- YAML
added: v0.1.8
-->

* `file` {String | Buffer | Integer} filename or file descriptor
* `options` {Object | String}
  * `encoding` {String | Null} default = `null`
  * `flag` {String} default = `'r'`

Synchronous version of [`fs.readFile`][]. Returns the contents of the `file`.

If the `encoding` option is specified then this function returns a
string. Otherwise it returns a buffer.

## fs.readlink(path[, options], callback)
<!-- YAML
added: v0.1.31
-->

* `path` {String | Buffer}
* `options` {String | Object}
  * `encoding` {String} default = `'utf8'`
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
-->

* `path` {String | Buffer}
* `options` {String | Object}
  * `encoding` {String} default = `'utf8'`

Synchronous readlink(2). Returns the symbolic link's string value.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the link path passed to the callback. If the `encoding` is set to `'buffer'`,
the link path returned will be passed as a `Buffer` object.

## fs.readSync(fd, buffer, offset, length, position)
<!-- YAML
added: v0.1.21
-->

* `fd` {Integer}
* `buffer` {String | Buffer}
* `offset` {Integer}
* `length` {Integer}
* `position` {Integer}

Synchronous version of [`fs.read()`][]. Returns the number of `bytesRead`.

## fs.realpath(path[, options], callback)
<!-- YAML
added: v0.1.31
-->

* `path` {String | Buffer}
* `options` {String | Object}
  * `encoding` {String} default = `'utf8'`
* `callback` {Function}

Asynchronous realpath(3). The `callback` gets two arguments `(err,
resolvedPath)`. May use `process.cwd` to resolve relative paths.

Only paths that can be converted to UTF8 strings are supported.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the path passed to the callback. If the `encoding` is set to `'buffer'`,
the path returned will be passed as a `Buffer` object.

## fs.realpathSync(path[, options])
<!-- YAML
added: v0.1.31
-->

* `path` {String | Buffer};
* `options` {String | Object}
  * `encoding` {String} default = `'utf8'`

Synchronous realpath(3). Returns the resolved path.

Only paths that can be converted to UTF8 strings are supported.

The optional `options` argument can be a string specifying an encoding, or an
object with an `encoding` property specifying the character encoding to use for
the returned value. If the `encoding` is set to `'buffer'`, the path returned
will be passed as a `Buffer` object.

## fs.rename(oldPath, newPath, callback)
<!-- YAML
added: v0.0.2
-->

* `oldPath` {String | Buffer}
* `newPath` {String | Buffer}
* `callback` {Function}

Asynchronous rename(2). No arguments other than a possible exception are given
to the completion callback.

## fs.renameSync(oldPath, newPath)
<!-- YAML
added: v0.1.21
-->

* `oldPath` {String | Buffer}
* `newPath` {String | Buffer}

Synchronous rename(2). Returns `undefined`.

## fs.rmdir(path, callback)
<!-- YAML
added: v0.0.2
-->

* `path` {String | Buffer}
* `callback` {Function}

Asynchronous rmdir(2). No arguments other than a possible exception are given
to the completion callback.

## fs.rmdirSync(path)
<!-- YAML
added: v0.1.21
-->

* `path` {String | Buffer}

Synchronous rmdir(2). Returns `undefined`.

## fs.stat(path, callback)
<!-- YAML
added: v0.0.2
-->

* `path` {String | Buffer}
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
-->

* `path` {String | Buffer}

Synchronous stat(2). Returns an instance of [`fs.Stats`][].

## fs.symlink(target, path[, type], callback)
<!-- YAML
added: v0.1.31
-->

* `target` {String | Buffer}
* `path` {String | Buffer}
* `type` {String}
* `callback` {Function}

Asynchronous symlink(2). No arguments other than a possible exception are given
to the completion callback. The `type` argument can be set to `'dir'`,
`'file'`, or `'junction'` (default is `'file'`) and is only available on
Windows (ignored on other platforms). Note that Windows junction points require
the destination path to be absolute. When using `'junction'`, the `target`
argument will automatically be normalized to absolute path.

Here is an example below:

```js
fs.symlink('./foo', './new-port');
```

It creates a symbolic link named "new-port" that points to "foo".

## fs.symlinkSync(target, path[, type])
<!-- YAML
added: v0.1.31
-->

* `target` {String | Buffer}
* `path` {String | Buffer}
* `type` {String}

Synchronous symlink(2). Returns `undefined`.

## fs.truncate(path, len, callback)
<!-- YAML
added: v0.8.6
-->

* `path` {String | Buffer}
* `len` {Integer} default = `0`
* `callback` {Function}

Asynchronous truncate(2). No arguments other than a possible exception are
given to the completion callback. A file descriptor can also be passed as the
first argument. In this case, `fs.ftruncate()` is called.

## fs.truncateSync(path, len)
<!-- YAML
added: v0.8.6
-->

* `path` {String | Buffer}
* `len` {Integer} default = `0`

Synchronous truncate(2). Returns `undefined`. A file descriptor can also be
passed as the first argument. In this case, `fs.ftruncateSync()` is called.

## fs.unlink(path, callback)
<!-- YAML
added: v0.0.2
-->

* `path` {String | Buffer}
* `callback` {Function}

Asynchronous unlink(2). No arguments other than a possible exception are given
to the completion callback.

## fs.unlinkSync(path)
<!-- YAML
added: v0.1.21
-->

* `path` {String | Buffer}

Synchronous unlink(2). Returns `undefined`.

## fs.unwatchFile(filename[, listener])
<!-- YAML
added: v0.1.31
-->

* `filename` {String | Buffer}
* `listener` {Function}

Stop watching for changes on `filename`. If `listener` is specified, only that
particular listener is removed. Otherwise, *all* listeners are removed and you
have effectively stopped watching `filename`.

Calling `fs.unwatchFile()` with a filename that is not being watched is a
no-op, not an error.

_Note: [`fs.watch()`][] is more efficient than `fs.watchFile()` and `fs.unwatchFile()`.
`fs.watch()` should be used instead of `fs.watchFile()` and `fs.unwatchFile()`
when possible._

## fs.utimes(path, atime, mtime, callback)
<!-- YAML
added: v0.4.2
-->

* `path` {String | Buffer}
* `atime` {Integer}
* `mtime` {Integer}
* `callback` {Function}

Change file timestamps of the file referenced by the supplied path.

Note: the arguments `atime` and `mtime` of the following related functions
follow these rules:

- The value should be a Unix timestamp in seconds. For example, `Date.now()`
  returns milliseconds, so it should be divided by 1000 before passing it in.
- If the value is a numeric string like `'123456789'`, the value will get
  converted to the corresponding number.
- If the value is `NaN` or `Infinity`, the value will get converted to
  `Date.now() / 1000`.

## fs.utimesSync(path, atime, mtime)
<!-- YAML
added: v0.4.2
-->

* `path` {String | Buffer}
* `atime` {Integer}
* `mtime` {Integer}

Synchronous version of [`fs.utimes()`][]. Returns `undefined`.

## fs.watch(filename[, options][, listener])
<!-- YAML
added: v0.5.10
-->

* `filename` {String | Buffer}
* `options` {String | Object}
  * `persistent` {Boolean} Indicates whether the process should continue to run
    as long as files are being watched. default = `true`
  * `recursive` {Boolean} Indicates whether all subdirectories should be
    watched, or only the current directory. The applies when a directory is
    specified, and only on supported platforms (See [Caveats][]). default =
    `false`
  * `encoding` {String} Specifies the character encoding to be used for the
     filename passed to the listener. default = `'utf8'`
* `listener` {Function}

Watch for changes on `filename`, where `filename` is either a file or a
directory.  The returned object is a [`fs.FSWatcher`][].

The second argument is optional. If `options` is provided as a string, it
specifies the `encoding`. Otherwise `options` should be passed as an object.

The listener callback gets two arguments `(eventType, filename)`.  `eventType` is either
`'rename'` or `'change'`, and `filename` is the name of the file which triggered
the event.

Please note the listener callback is attached to the `'change'` event
fired by [`fs.FSWatcher`][], but they are not the same thing.

### Caveats

<!--type=misc-->

The `fs.watch` API is not 100% consistent across platforms, and is
unavailable in some situations.

The recursive option is only supported on OS X and Windows.

#### Availability

<!--type=misc-->

This feature depends on the underlying operating system providing a way
to be notified of filesystem changes.

* On Linux systems, this uses [`inotify`]
* On BSD systems, this uses [`kqueue`]
* On OS X, this uses [`kqueue`] for files and [`FSEvents`] for directories.
* On SunOS systems (including Solaris and SmartOS), this uses [`event ports`].
* On Windows systems, this feature depends on [`ReadDirectoryChangesW`].
* On Aix systems, this feature depends on [`AHAFS`], which must be enabled.

If the underlying functionality is not available for some reason, then
`fs.watch` will not be able to function. For example, watching files or
directories can be unreliable, and in some cases impossible, on network file
systems (NFS, SMB, etc), or host file systems when using virtualization software
such as Vagrant, Docker, etc.

You can still use `fs.watchFile`, which uses stat polling, but it is slower and
less reliable.

#### Inodes

<!--type=misc-->

On Linux and OS X systems, `fs.watch()` resolves the path to an [inode][] and
watches the inode. If the watched path is deleted and recreated, it is assigned
a new inode. The watch will emit an event for the delete but will continue
watching the *original* inode. Events for the new inode will not be emitted.
This is expected behavior.

#### Filename Argument

<!--type=misc-->

Providing `filename` argument in the callback is only supported on Linux and
Windows.  Even on supported platforms, `filename` is not always guaranteed to
be provided. Therefore, don't assume that `filename` argument is always
provided in the callback, and have some fallback logic if it is null.

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
-->

* `filename` {String | Buffer}
* `options` {Object}
  * `persistent` {Boolean}
  * `interval` {Integer}
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

If you want to be notified when the file was modified, not just accessed,
you need to compare `curr.mtime` and `prev.mtime`.

_Note: when an `fs.watchFile` operation results in an `ENOENT` error, it will
 invoke the listener once, with all the fields zeroed (or, for dates, the Unix
 Epoch). In Windows, `blksize` and `blocks` fields will be `undefined`, instead
 of zero. If the file is created later on, the listener will be called again,
 with the latest stat objects. This is a change in functionality since v0.10._

_Note: [`fs.watch()`][] is more efficient than `fs.watchFile` and
`fs.unwatchFile`. `fs.watch` should be used instead of `fs.watchFile` and
`fs.unwatchFile` when possible._

## fs.write(fd, buffer, offset, length[, position], callback)
<!-- YAML
added: v0.0.2
-->

* `fd` {Integer}
* `buffer` {String | Buffer}
* `offset` {Integer}
* `length` {Integer}
* `position` {Integer}
* `callback` {Function}

Write `buffer` to the file specified by `fd`.

`offset` and `length` determine the part of the buffer to be written.

`position` refers to the offset from the beginning of the file where this data
should be written. If `typeof position !== 'number'`, the data will be written
at the current position. See pwrite(2).

The callback will be given three arguments `(err, written, buffer)` where
`written` specifies how many _bytes_ were written from `buffer`.

Note that it is unsafe to use `fs.write` multiple times on the same file
without waiting for the callback. For this scenario,
`fs.createWriteStream` is strongly recommended.

On Linux, positional writes don't work when the file is opened in append mode.
The kernel ignores the position argument and always appends the data to
the end of the file.

## fs.write(fd, data[, position[, encoding]], callback)
<!-- YAML
added: v0.11.5
-->

* `fd` {Integer}
* `data` {String | Buffer}
* `position` {Integer}
* `encoding` {String}
* `callback` {Function}

Write `data` to the file specified by `fd`.  If `data` is not a Buffer instance
then the value will be coerced to a string.

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
-->

* `file` {String | Buffer | Integer} filename or file descriptor
* `data` {String | Buffer}
* `options` {Object | String}
  * `encoding` {String | Null} default = `'utf8'`
  * `mode` {Integer} default = `0o666`
  * `flag` {String} default = `'w'`
* `callback` {Function}

Asynchronously writes data to a file, replacing the file if it already exists.
`data` can be a string or a buffer.

The `encoding` option is ignored if `data` is a buffer. It defaults
to `'utf8'`.

Example:

```js
fs.writeFile('message.txt', 'Hello Node.js', (err) => {
  if (err) throw err;
  console.log('It\'s saved!');
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

_Note: If a file descriptor is specified as the `file`, it will not be closed
automatically._

## fs.writeFileSync(file, data[, options])
<!-- YAML
added: v0.1.29
-->

* `file` {String | Buffer | Integer} filename or file descriptor
* `data` {String | Buffer}
* `options` {Object | String}
  * `encoding` {String | Null} default = `'utf8'`
  * `mode` {Integer} default = `0o666`
  * `flag` {String} default = `'w'`

The synchronous version of [`fs.writeFile()`][]. Returns `undefined`.

## fs.writeSync(fd, buffer, offset, length[, position])
<!-- YAML
added: v0.1.21
-->

* `fd` {Integer}
* `buffer` {String | Buffer}
* `offset` {Integer}
* `length` {Integer}
* `position` {Integer}

## fs.writeSync(fd, data[, position[, encoding]])
<!-- YAML
added: v0.11.5
-->

* `fd` {Integer}
* `data` {String | Buffer}
* `position` {Integer}
* `encoding` {String}

Synchronous versions of [`fs.write()`][]. Returns the number of bytes written.

## FS Constants

The following constants are exported by `fs.constants`. **Note:** Not every
constant will be available on every operating system.

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

Third Party
-----------

## Promises

Use [Bluebird](https://github.com/petkaantonov/bluebird). See https://github.com/petkaantonov/bluebird/blob/master/API.md#promisification. `fs-extra` is
explicitly listed as supported.

```js
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs-extra'))
```

Or you can use the package [`fs-extra-promise`](https://github.com/overlookmotel/fs-extra-promise) that marries the two together.


## TypeScript

If you like TypeScript, you can use `fs-extra` with it: https://github.com/borisyankov/DefinitelyTyped/tree/master/fs-extra


## File / Directory Watching

If you want to watch for changes to files or directories, then you should use [chokidar](https://github.com/paulmillr/chokidar).


## Misc.

- [mfs](https://github.com/cadorn/mfs) - Monitor your fs-extra calls.



Hacking on fs-extra
-------------------

Wanna hack on `fs-extra`? Great! Your help is needed! [fs-extra is one of the most depended upon Node.js packages](http://nodei.co/npm/fs-extra.png?downloads=true&downloadRank=true&stars=true). This project
uses [JavaScript Standard Style](https://github.com/feross/standard) - if the name or style choices bother you,
you're gonna have to get over it :) If `standard` is good enough for `npm`, it's good enough for `fs-extra`.

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

What's needed?
- First, take a look at existing issues. Those are probably going to be where the priority lies.
- More tests for edge cases. Specifically on different platforms. There can never be enough tests.
- Improve test coverage. See coveralls output for more info.
- After the directory walker is integrated, any function that needs to traverse directories like
`copy`, `remove`, or `mkdirs` should be built on top of it.

Note: If you make any big changes, **you should definitely file an issue for discussion first.**

## Running the Test Suite

fs-extra contains hundreds of tests.

- `npm run lint`: runs the linter ([standard](http://standardjs.com/))
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

I can then navigate to my `fs-extra` directory and run the tests.


Naming
------

eh just go with whatever feels good

Credit
------

`fs-extra` wouldn't be possible without using the modules from the following authors:

- [Isaac Shlueter](https://github.com/isaacs)
- [Charlie McConnel](https://github.com/avianflu)
- [James Halliday](https://github.com/substack)
- [Andrew Kelley](https://github.com/andrewrk)




License
-------

Licensed under MIT

`fs-extra` is copyright (c) 2011-2016 [JP Richardson](https://github.com/jprichardson)

`fs-extra+` is copyright © 2016 [chrishansen69/rafa1231518](https://github.com/rafa1231518), some rights reserved.

Partial documentation is from [create-readdir-stream](https://github.com/tunnckoCore/create-readdir-stream/), [diveSync](https://github.com/pvorb/node-diveSync), [dive](https://github.com/pvorb/node-dive) and the Node.js `fs` module.

`fs-extra+` is not endorsed by or affiliated with Joyent or the Node.js Foundation.

[1]: http://nodejs.org/docs/latest/api/fs.html
[jsonfile]: https://github.com/jprichardson/node-jsonfile

[`Buffer.byteLength`]: https://nodejs.org/api/buffer.html#buffer_class_method_buffer_bytelength_string_encoding
[`Buffer`]: https://nodejs.org/api/buffer.html#buffer_buffer
[Caveats]: https://nodejs.org/api/fs.html#fs_caveats
[`fs.access()`]: https://nodejs.org/api/fs.html#fs_fs_access_path_mode_callback
[`fs.appendFile()`]: https://nodejs.org/api/fs.html#fs_fs_appendfile_file_data_options_callback
[`fs.exists()`]: https://nodejs.org/api/fs.html#fs_fs_exists_path_callback
[`fs.fstat()`]: https://nodejs.org/api/fs.html#fs_fs_fstat_fd_callback
[`fs.FSWatcher`]: https://nodejs.org/api/fs.html#fs_class_fs_fswatcher
[`fs.futimes()`]: https://nodejs.org/api/fs.html#fs_fs_futimes_fd_atime_mtime_callback
[`fs.lstat()`]: https://nodejs.org/api/fs.html#fs_fs_lstat_path_callback
[`fs.mkdtemp()`]: https://nodejs.org/api/fs.html#fs_fs_mkdtemp_prefix_options_callback
[`fs.open()`]: https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback
[`fs.read()`]: https://nodejs.org/api/fs.html#fs_fs_read_fd_buffer_offset_length_position_callback
[`fs.readFile`]: https://nodejs.org/api/fs.html#fs_fs_readfile_file_options_callback
[`fs.stat()`]: https://nodejs.org/api/fs.html#fs_fs_stat_path_callback
[`fs.Stats`]: https://nodejs.org/api/fs.html#fs_class_fs_stats
[`fs.utimes()`]: https://nodejs.org/api/fs.html#fs_fs_futimes_fd_atime_mtime_callback
[`fs.watch()`]: https://nodejs.org/api/fs.html#fs_fs_watch_filename_options_listener
[`fs.write()`]: https://nodejs.org/api/fs.html#fs_fs_write_fd_buffer_offset_length_position_callback
[`fs.writeFile()`]: https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback
[`net.Socket`]: https://nodejs.org/api/net.html#net_class_net_socket
[`ReadStream`]: https://nodejs.org/api/fs.html#fs_class_fs_readstream
[`stat()`]: https://nodejs.org/api/fs.html#fs_fs_stat_path_callback
[`util.inspect(stats)`]: https://nodejs.org/api/util.html#util_util_inspect_object_options
[`WriteStream`]: https://nodejs.org/api/fs.html#fs_class_fs_writestream
[MDN-Date-getTime]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/getTime
[MDN-Date]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date
[Readable Stream]: https://nodejs.org/api/stream.html#stream_class_stream_readable
[Writable Stream]: https://nodejs.org/api/stream.html#stream_class_stream_writable
[inode]: https://en.wikipedia.org/wiki/Inode
[FS Constants]: https://nodejs.org/api/fs.html#fs_fs_constants
[`inotify`]: http://man7.org/linux/man-pages/man7/inotify.7.html
[`kqueue`]: https://www.freebsd.org/cgi/man.cgi?kqueue
[`FSEvents`]: https://developer.apple.com/library/mac/documentation/Darwin/Conceptual/FSEvents_ProgGuide/Introduction/Introduction.html#//apple_ref/doc/uid/TP40005289-CH1-SW1
[`event ports`]: http://illumos.org/man/port_create
[`ReadDirectoryChangesW`]: https://msdn.microsoft.com/en-us/library/windows/desktop/aa365465%28v=vs.85%29.aspx
[`AHAFS`]: https://www.ibm.com/developerworks/aix/library/au-aix_event_infrastructure/
[Common System Errors]: https://nodejs.org/api/errors.html#errors_common_system_errors
