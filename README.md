Node.js: fs-extra
=================

`fs-extra` adds file system methods that aren't included in the native `fs` module. It is a drop in replacement for `fs`.

[![npm Package](https://img.shields.io/npm/v/fs-extra.svg?style=flat-square)](https://www.npmjs.org/package/fs-extra)
[![build status](https://api.travis-ci.org/jprichardson/node-fs-extra.svg)](http://travis-ci.org/jprichardson/node-fs-extra)
[![windows Build status](https://img.shields.io/appveyor/ci/jprichardson/node-fs-extra/master.svg?label=windows%20build)](https://ci.appveyor.com/project/jprichardson/node-fs-extra/branch/master)
[![downloads per month](http://img.shields.io/npm/dm/fs-extra.svg)](https://www.npmjs.org/package/fs-extra)
[![Coverage Status](https://img.shields.io/coveralls/jprichardson/node-fs-extra.svg)](https://coveralls.io/r/jprichardson/node-fs-extra)

<a href="https://github.com/feross/standard"><img src="https://cdn.rawgit.com/feross/standard/master/sticker.svg" alt="Standard JavaScript" width="100"></a>

**NOTE (2016-04-28):** Node v0.10 will be unsupported 2016-10-01. Node v0.12 will be unsupported on 2017-04-01.


Why?
----

I got tired of including `mkdirp`, `rimraf`, and `ncp` in most of my projects.




Installation
------------

    npm install --save fs-extra



Usage
-----

`fs-extra` is a drop in replacement for native `fs`. All methods in `fs` are unmodified and attached to `fs-extra`.

You don't ever need to include the original `fs` module again:

```js
const fs = require('fs') // this is no longer necessary
```

you can now do this:

```js
const fs = require('fs-extra')
```

or if you prefer to make it clear that you're using `fs-extra` and not `fs`, you may want
to name your `fs` variable `fse` like so:

```js
const fse = require('fs-extra')
```

you can also keep both, but it's redundant:

```js
const fs = require('fs')
const fse = require('fs-extra')
```

Sync vs Async
-------------
Most methods are async by default (they take a callback with an `Error` as first argument).

Sync methods on the other hand will throw if an error occurs.

Example:

```js
const fs = require('fs-extra')

fs.copy('/tmp/myfile', '/tmp/mynewfile', function (err) {
  if (err) return console.error(err)
  console.log("success!")
});

try {
  fs.copySync('/tmp/myfile', '/tmp/mynewfile')
  console.log("success!")
} catch (err) {
  console.error(err)
}
```


Methods
-------
- [copy](#copy)
- [copySync](#copy)
- [emptyDir](#emptydirdir-callback)
- [emptyDirSync](#emptydirdir-callback)
- [ensureFile](#ensurefilefile-callback)
- [ensureFileSync](#ensurefilefile-callback)
- [ensureDir](#ensuredirdir-callback)
- [ensureDirSync](#ensuredirdir-callback)
- [ensureLink](#ensurelinksrcpath-dstpath-callback)
- [ensureLinkSync](#ensurelinksrcpath-dstpath-callback)
- [ensureSymlink](#ensuresymlinksrcpath-dstpath-type-callback)
- [ensureSymlinkSync](#ensuresymlinksrcpath-dstpath-type-callback)
- [mkdirs](#mkdirsdir-callback)
- [mkdirsSync](#mkdirsdir-callback)
- [move](#movesrc-dest-options-callback)
- [outputFile](#outputfilefile-data-options-callback)
- [outputFileSync](#outputfilefile-data-options-callback)
- [outputJson](#outputjsonfile-data-options-callback)
- [outputJsonSync](#outputjsonfile-data-options-callback)
- [readJson](#readjsonfile-options-callback)
- [readJsonSync](#readjsonfile-options-callback)
- [remove](#removedir-callback)
- [removeSync](#removedir-callback)
- [walk](#walk)
- [writeJson](#writejsonfile-object-options-callback)
- [writeJsonSync](#writejsonfile-object-options-callback)


**NOTE:** You can still use the native Node.js methods. They are copied over to `fs-extra`.


### copy()

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
const fs = require('fs-extra')

fs.copy('/tmp/myfile', '/tmp/mynewfile', function (err) {
  if (err) return console.error(err)
  console.log("success!")
}) // copies file

fs.copy('/tmp/mydir', '/tmp/mynewdir', function (err) {
  if (err) return console.error(err)
  console.log('success!')
}) // copies directory, even if it has subdirectories or files
```


### emptyDir(dir, [callback])

Ensures that a directory is empty. Deletes directory contents if the directory is not empty. If the directory does not exist, it is created. The directory itself is not deleted.

Alias: `emptydir()`

Sync: `emptyDirSync()`, `emptydirSync()`

Example:

```js
const fs = require('fs-extra')

// assume this directory has a lot of files and folders
fs.emptyDir('/tmp/some/dir', function (err) {
  if (!err) console.log('success!')
})
```


### ensureFile(file, callback)

Ensures that the file exists. If the file that is requested to be created is in directories that do not exist, these directories are created. If the file already exists, it is **NOT MODIFIED**.

Alias: `createFile()`

Sync: `createFileSync()`,`ensureFileSync()`


Example:

```js
const fs = require('fs-extra')

const file = '/tmp/this/path/does/not/exist/file.txt'
fs.ensureFile(file, function (err) {
  console.log(err) // => null
  // file has now been created, including the directory it is to be placed in
})
```


### ensureDir(dir, callback)

Ensures that the directory exists. If the directory structure does not exist, it is created.

Sync: `ensureDirSync()`


Example:

```js
const fs = require('fs-extra')

const dir = '/tmp/this/path/does/not/exist'
fs.ensureDir(dir, function (err) {
  console.log(err) // => null
  // dir has now been created, including the directory it is to be placed in
})
```


### ensureLink(srcpath, dstpath, callback)

Ensures that the link exists. If the directory structure does not exist, it is created.

Sync: `ensureLinkSync()`


Example:

```js
const fs = require('fs-extra')

const srcpath = '/tmp/file.txt'
const dstpath = '/tmp/this/path/does/not/exist/file.txt'
fs.ensureLink(srcpath, dstpath, function (err) {
  console.log(err) // => null
  // link has now been created, including the directory it is to be placed in
})
```


### ensureSymlink(srcpath, dstpath, [type], callback)

Ensures that the symlink exists. If the directory structure does not exist, it is created.

Sync: `ensureSymlinkSync()`


Example:

```js
const fs = require('fs-extra')

const srcpath = '/tmp/file.txt'
const dstpath = '/tmp/this/path/does/not/exist/file.txt'
fs.ensureSymlink(srcpath, dstpath, function (err) {
  console.log(err) // => null
  // symlink has now been created, including the directory it is to be placed in
})
```


### mkdirs(dir, callback)

Creates a directory. If the parent hierarchy doesn't exist, it's created. Like `mkdir -p`.

Alias: `mkdirp()`

Sync: `mkdirsSync()` / `mkdirpSync()`


Examples:

```js
const fs = require('fs-extra')

fs.mkdirs('/tmp/some/long/path/that/prob/doesnt/exist', function (err) {
  if (err) return console.error(err)
  console.log("success!")
})

fs.mkdirsSync('/tmp/another/path')
```


### move(src, dest, [options], callback)

Moves a file or directory, even across devices.

Options:
- clobber (boolean): overwrite existing file or directory
- limit (number): number of concurrent moves, see ncp for more information

Example:

```js
const fs = require('fs-extra')

fs.move('/tmp/somefile', '/tmp/does/not/exist/yet/somefile', function (err) {
  if (err) return console.error(err)
  console.log("success!")
})
```


### outputFile(file, data, [options], callback)

Almost the same as `writeFile` (i.e. it [overwrites](http://pages.citebite.com/v2o5n8l2f5reb)), except that if the parent directory does not exist, it's created. `options` are what you'd pass to [`fs.writeFile()`](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback).

Sync: `outputFileSync()`


Example:

```js
const fs = require('fs-extra')
const file = '/tmp/this/path/does/not/exist/file.txt'

fs.outputFile(file, 'hello!', function (err) {
  console.log(err) // => null

  fs.readFile(file, 'utf8', function (err, data) {
    console.log(data) // => hello!
  })
})
```



### outputJson(file, data, [options], callback)

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



### readJson(file, [options], callback)

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


### remove(dir, callback)

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

### walk()

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


### writeJson(file, object, [options], callback)

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

### exists(file, callback)

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

### resolve(path, child)

Resolve a child file of a folder.

### forEachChildSync(path, function(file)[, options])

Iterate through every child of a folder, synchronously.

### forEachChild(function(error, file)[, options], callback)

Iterate through every child of a folder, asynchronously.

### vacuum(directory, options, callback)

Remove the empty branches of a directory tree, optionally up to (but not including) a specified base directory. Optionally nukes the leaf directory.

* `directory` {String} Leaf node to remove. **Must be a directory, symlink, or file.**
* `options` {Object}
  * `base` {String} No directories at or above this level of the filesystem will be removed.
  * `purge` {Boolean} If set, nuke the whole leaf directory, including its contents.
  * `log` {Function} A logging function that takes `npmlog`-compatible argument lists.
* `callback` {Function} Function to call once vacuuming is complete.
  * `error` {Error} What went wrong along the way, if anything.

#### Usage

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

### dive(directory[, options], action[, complete]);

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

#### Usage

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

### diveSync(path, action)

The synchronous version of `dive`. Improved version of the `diveSync` module.

### createReaddirStream(dir[, options])

Streaming `fs.readdir`, extensible with smart plugins. No recursion and no globs by default - [use][] plugins. Does not stat and doesn't read the filepaths - use plugins. It just push [vinyl][] files to stream. Follows signature and semantics of `fs.createReadStream` method.

#### Usage
> For more use-cases see the [tests](./test.js)

```js
const readdir = require('create-readdir-stream')
```


#### API

##### [CreateReaddirStream](index.js#L32)
> Initialize `CreateReaddirStream` with default `options`.

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

##### [.use](index.js#L118)
> Smart plugins support using [use][]. It just calls that `fn` immediately and if it returns function again it is called (**only when** `.createReaddirStream` is called) with `file` argument ([vinyl][] file) for each item in the returned array by `fs.readdir`.

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

##### [.createReaddirStream](index.js#L144)
> Reads a `dir` contents, creates [vinyl][] file from each filepath, after that push them to stream.

**Params**

* `<dir>` **{String|Buffer}**: buffer or string folder/directory to read    
* `[options]` **{Object}**: options are [extend-shallow][]ed with `this.options`    
* `returns` **{Stream}**: Transform Stream, [through2][]  

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

### readXML(path, function(err, parsedObject))

Read a file containing XML to an object.

### readXMLSync(path)

Read a file containing XML to an object. Returns the object.

### readLinesSync(path[, encoding])

Read a file into a string array of its lines. Default encoding is UTF-8.

### readSync(path[, encoding])

Shorter version of `fs.readFileSync` where the default encoding is UTF-8.

Third Party
-----------

### Promises

Use [Bluebird](https://github.com/petkaantonov/bluebird). See https://github.com/petkaantonov/bluebird/blob/master/API.md#promisification. `fs-extra` is
explicitly listed as supported.

```js
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs-extra'))
```

Or you can use the package [`fs-extra-promise`](https://github.com/overlookmotel/fs-extra-promise) that marries the two together.


### TypeScript

If you like TypeScript, you can use `fs-extra` with it: https://github.com/borisyankov/DefinitelyTyped/tree/master/fs-extra


### File / Directory Watching

If you want to watch for changes to files or directories, then you should use [chokidar](https://github.com/paulmillr/chokidar).


### Misc.

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

### Running the Test Suite

fs-extra contains hundreds of tests.

- `npm run lint`: runs the linter ([standard](http://standardjs.com/))
- `npm run unit`: runs the unit tests
- `npm test`: runs both the linter and the tests


### Windows

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

I put a lot of thought into the naming of these functions. Inspired by @coolaj86's request. So he deserves much of the credit for raising the issue. See discussion(s) here:

* https://github.com/jprichardson/node-fs-extra/issues/2
* https://github.com/flatiron/utile/issues/11
* https://github.com/ryanmcgrath/wrench-js/issues/29
* https://github.com/substack/node-mkdirp/issues/17

First, I believe that in as many cases as possible, the [Node.js naming schemes](http://nodejs.org/api/fs.html) should be chosen. However, there are problems with the Node.js own naming schemes.

For example, `fs.readFile()` and `fs.readdir()`: the **F** is capitalized in *File* and the **d** is not capitalized in *dir*. Perhaps a bit pedantic, but they should still be consistent. Also, Node.js has chosen a lot of POSIX naming schemes, which I believe is great. See: `fs.mkdir()`, `fs.rmdir()`, `fs.chown()`, etc.

We have a dilemma though. How do you consistently name methods that perform the following POSIX commands: `cp`, `cp -r`, `mkdir -p`, and `rm -rf`?

My perspective: when in doubt, err on the side of simplicity. A directory is just a hierarchical grouping of directories and files. Consider that for a moment. So when you want to copy it or remove it, in most cases you'll want to copy or remove all of its contents. When you want to create a directory, if the directory that it's suppose to be contained in does not exist, then in most cases you'll want to create that too.

So, if you want to remove a file or a directory regardless of whether it has contents, just call `fs.remove(path)`. If you want to copy a file or a directory whether it has contents, just call `fs.copy(source, destination)`. If you want to create a directory regardless of whether its parent directories exist, just call `fs.mkdirs(path)` or `fs.mkdirp(path)`.


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

Copyright (c) 2011-2016 [JP Richardson](https://github.com/jprichardson)

[1]: http://nodejs.org/docs/latest/api/fs.html


[jsonfile]: https://github.com/jprichardson/node-jsonfile
