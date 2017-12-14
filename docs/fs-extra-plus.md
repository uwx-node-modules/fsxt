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

## mapChildren(path, mapper(contents, filename, pathOnly, pathWithFilename) => toContents[, readOptions[, writeOptions]])

Iterate through every file child of a folder, call a mapper function with each file's contents and write the returned value of the mapper to the files. This will not recurse into subdirectories.

Returns a Promise resolving to an array of the children files, once the mapping is finished.

* `path` {String} folder path to iterate through
* `mapper` {Function => String | Promise} mapping function to call on each file, with these arguments:
  * contents {String | ?} returned value of [fs.readFile](#fsreadfilepath-options-callback). Varies depending on `readOptions`
  * filename {String} file name including extension
  * pathOnly {String} path not including file name
  * pathWithFilename {String} full path, including file name
  * => toContents {String | Promise | ?} return the value or a Promise resolving to the value to pass to [fs.writeFile](#fswritefilefile-data-options-callback).
* readOptions {String | Object} options to pass to [fs.readFile](#fsreadfilepath-options-callback)
* writeOptions {Object} options to pass to [fs.writeFile](#fswritefilefile-data-options-callback)

## mapStructure(path, mapper(contents, fullPath, stat) => toContents[, readOptions[, writeOptions]])

Iterate through every file child of a folder recursively, call a mapper function with each file's contents and write the returned value of the mapper to the files.

Returns a Promise resoving to nothing.

* `path` {String} folder path to iterate through
* `mapper` {Function => String | Promise} mapping function to call on each file, with these arguments:
  * contents {String | ?} returned value of [fs.readFile](#fsreadfilepath-options-callback). Varies depending on `readOptions`
  * fullPath {String} the full path to the file **relative to the current working directory, not** `path`
  * stat {fs.Stats} an [fs.Stats](https://nodejs.org/api/fs.html#fs_class_fs_stats) object.
  * => toContents {String | Promise | ?} return the value or a Promise resolving to the value to pass to [fs.writeFile](#fswritefilefile-data-options-callback).
* readOptions {String | Object} options to pass to [fs.readFile](#fsreadfilepath-options-callback)
* writeOptions {Object} options to pass to [fs.writeFile](#fswritefilefile-data-options-callback)

## forEachChildSync(path, function(file)[, options])

Iterate through every child of a folder, synchronously. This function will not recurse into subdirectories.

* `path` {String} folder path to iterate through
* `options` {Object} options to pass through to [fs.readdirSync](#fsreaddirsyncpath-options)
* `func` {Function} iterate function, called for every child

## forEachChild(path[, options], function(file)[, callback(err | null)])

Iterate through every child of a folder, asynchronously. This function will not recurse into subdirectories.

* `path` {String} folder path to iterate through
* `options` {Object} options to pass through to [fs.readdir](#fsreaddirpath-options-callback)
* `func` {Function} iterate function, called for every child
* `callback` {Function} Function to call once all items have been iterated. If not present, returns a Promise

## vacuum(directory, options[, callback])

Remove the empty branches of a directory tree, optionally up to (but not including) a specified base directory. Optionally nukes the leaf directory.

* `directory` {String} Leaf node to remove. **Must be a directory, symlink, or file.**
* `options` {Object}
  * `base` {String} No directories at or above this level of the filesystem will be removed.
  * `purge` {Boolean} If set, nuke the whole leaf directory, including its contents.
  * `log` {Function} A logging function that takes `npmlog`-compatible argument lists.
* `callback` {Function} Function to call once vacuuming is complete. If not present, returns a Promise.
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

* `action` is passed three arguments `(err, file, stat)` or `(file, stat)` when not passing `complete` (promise form).
  * `err` is an error or `null` (not present when using the promise form)
  * `file` is the **full** pathname of a file (relative to process.cwd, not relative to `directory`)
  * `stat` is an [fs.Stats](https://nodejs.org/api/fs.html#fs_class_fs_stats) object.
* `complete` may define a second callback, that is called, when all files have been processed. It takes no arguments.

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

## ~~createReaddirStream(dir[, options])~~

**DEPRECATED!**

*Removed in 8.0.0.*

Use NPM package [create-readdir-stream](https://github.com/olstenlarck/create-readdir-stream) if you still need the functionality.

## readXML(path, function(err, parsedObject))

Read a file containing XML to an object.

## readXMLSync(path)

Read a file containing XML to an object. Returns the object.

## readLines(path[, encoding]\[, callback(err, lines)])

Read a file into a string array of its lines. Default encoding is UTF-8.

## readLinesSync(path[, encoding])

Read a file into a string array of its lines. Default encoding is UTF-8. Returns the array.

## readText(path[, encoding]\[, callback(err, text)])

Shorter version of `fs.readFile` where the default encoding is UTF-8.

## readSync(path[, encoding])

Shorter version of `fs.readFileSync` where the default encoding is UTF-8.

## isDirectory(path, callback)

Check if the file at a path is a directory.

Sync: `isDirectorySync()`
