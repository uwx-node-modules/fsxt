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
