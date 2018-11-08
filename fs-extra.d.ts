/**
 * @module fsxt
 * @internal
 */

// Type definitions for fs-extra 5.0
// Project: https://github.com/jprichardson/node-fs-extra
// Definitions by: Alan Agius <https://github.com/alan-agius4>,
//                 midknight41 <https://github.com/midknight41>,
//                 Brendan Forster <https://github.com/shiftkey>,
//                 Mees van Dijk <https://github.com/mees->,
//                 Justin Rockwood <https://github.com/jrockwood>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.2

/// <reference types="node" />

import * as fs from 'fs';
import Stats = fs.Stats;

export * from 'fs';

/**
  # copy(src, dest, [options, callback])

  Copy a file or directory. The directory can have contents. Like `cp -r`.

  - `src` `<String>` Note that if `src` is a directory it will copy everything inside of this directory, not the entire directory itself (see [issue #537](https://github.com/jprichardson/node-fs-extra/issues/537)).
  - `dest` `<String>` Note that if `src` is a file, `dest` cannot be a directory (see [issue #323](https://github.com/jprichardson/node-fs-extra/issues/323)).
  - `options` `<Object>`
    - `overwrite` `<boolean>`: overwrite existing file or directory, default is `true`. _Note that the copy operation will silently fail if you set this to `false` and the destination exists._ Use the `errorOnExist` option to change this behavior.
    - `errorOnExist` `<boolean>`: when `overwrite` is `false` and the destination exists, throw an error. Default is `false`.
    - `dereference` `<boolean>`: dereference symlinks, default is `false`.
    - `preserveTimestamps` `<boolean>`: When true, will set last modification and access times to the ones of the original source files. When false, timestamp behavior is OS-dependent. Default is `false`.
    - `filter` `<Function>`: Function to filter copied files. Return `true` to include, `false` to exclude. Can also return a `Promise` that resolves to `true` or `false` (or pass in an `async` function).
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  // With a callback:
  fs.copy('/tmp/myfile', '/tmp/mynewfile', err => {
    if (err) return console.error(err)

    console.log('success!')
  }) // copies file

  fs.copy('/tmp/mydir', '/tmp/mynewdir', err => {
    if (err) return console.error(err)

    console.log('success!')
  }) // copies directory, even if it has subdirectories or files

  // With Promises:
  fs.copy('/tmp/myfile', '/tmp/mynewfile')
  .then(() => {
    console.log('success!')
  })
  .catch(err => {
    console.error(err)
  })

  // With async/await:
  async function example () {
    try {
      await fs.copy('/tmp/myfile', '/tmp/mynewfile')
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }

  example()
  ```

  **Using filter function**

  ```
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

 */
export function copy(src: string, dest: string, options?: CopyOptions): Promise<void>;
/**
  # copy(src, dest, [options, callback])

  Copy a file or directory. The directory can have contents. Like `cp -r`.

  - `src` `<String>` Note that if `src` is a directory it will copy everything inside of this directory, not the entire directory itself (see [issue #537](https://github.com/jprichardson/node-fs-extra/issues/537)).
  - `dest` `<String>` Note that if `src` is a file, `dest` cannot be a directory (see [issue #323](https://github.com/jprichardson/node-fs-extra/issues/323)).
  - `options` `<Object>`
    - `overwrite` `<boolean>`: overwrite existing file or directory, default is `true`. _Note that the copy operation will silently fail if you set this to `false` and the destination exists._ Use the `errorOnExist` option to change this behavior.
    - `errorOnExist` `<boolean>`: when `overwrite` is `false` and the destination exists, throw an error. Default is `false`.
    - `dereference` `<boolean>`: dereference symlinks, default is `false`.
    - `preserveTimestamps` `<boolean>`: When true, will set last modification and access times to the ones of the original source files. When false, timestamp behavior is OS-dependent. Default is `false`.
    - `filter` `<Function>`: Function to filter copied files. Return `true` to include, `false` to exclude. Can also return a `Promise` that resolves to `true` or `false` (or pass in an `async` function).
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  // With a callback:
  fs.copy('/tmp/myfile', '/tmp/mynewfile', err => {
    if (err) return console.error(err)

    console.log('success!')
  }) // copies file

  fs.copy('/tmp/mydir', '/tmp/mynewdir', err => {
    if (err) return console.error(err)

    console.log('success!')
  }) // copies directory, even if it has subdirectories or files

  // With Promises:
  fs.copy('/tmp/myfile', '/tmp/mynewfile')
  .then(() => {
    console.log('success!')
  })
  .catch(err => {
    console.error(err)
  })

  // With async/await:
  async function example () {
    try {
      await fs.copy('/tmp/myfile', '/tmp/mynewfile')
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }

  example()
  ```

  **Using filter function**

  ```
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

 */
export function copy(src: string, dest: string, callback: (err: Error) => void): void;
/**
  # copy(src, dest, [options, callback])

  Copy a file or directory. The directory can have contents. Like `cp -r`.

  - `src` `<String>` Note that if `src` is a directory it will copy everything inside of this directory, not the entire directory itself (see [issue #537](https://github.com/jprichardson/node-fs-extra/issues/537)).
  - `dest` `<String>` Note that if `src` is a file, `dest` cannot be a directory (see [issue #323](https://github.com/jprichardson/node-fs-extra/issues/323)).
  - `options` `<Object>`
    - `overwrite` `<boolean>`: overwrite existing file or directory, default is `true`. _Note that the copy operation will silently fail if you set this to `false` and the destination exists._ Use the `errorOnExist` option to change this behavior.
    - `errorOnExist` `<boolean>`: when `overwrite` is `false` and the destination exists, throw an error. Default is `false`.
    - `dereference` `<boolean>`: dereference symlinks, default is `false`.
    - `preserveTimestamps` `<boolean>`: When true, will set last modification and access times to the ones of the original source files. When false, timestamp behavior is OS-dependent. Default is `false`.
    - `filter` `<Function>`: Function to filter copied files. Return `true` to include, `false` to exclude. Can also return a `Promise` that resolves to `true` or `false` (or pass in an `async` function).
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  // With a callback:
  fs.copy('/tmp/myfile', '/tmp/mynewfile', err => {
    if (err) return console.error(err)

    console.log('success!')
  }) // copies file

  fs.copy('/tmp/mydir', '/tmp/mynewdir', err => {
    if (err) return console.error(err)

    console.log('success!')
  }) // copies directory, even if it has subdirectories or files

  // With Promises:
  fs.copy('/tmp/myfile', '/tmp/mynewfile')
  .then(() => {
    console.log('success!')
  })
  .catch(err => {
    console.error(err)
  })

  // With async/await:
  async function example () {
    try {
      await fs.copy('/tmp/myfile', '/tmp/mynewfile')
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }

  example()
  ```

  **Using filter function**

  ```
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

 */
export function copy(src: string, dest: string, options: CopyOptions, callback: (err: Error) => void): void;
/**
  # copySync(src, dest, [options])

  Copy a file or directory. The directory can have contents. Like `cp -r`.

  - `src` `<String>` Note that if `src` is a directory it will copy everything inside of this directory, not the entire directory itself (see [issue #537](https://github.com/jprichardson/node-fs-extra/issues/537)).
  - `dest` `<String>` Note that if `src` is a file, `dest` cannot be a directory (see [issue #323](https://github.com/jprichardson/node-fs-extra/issues/323)).
  - `options` `<Object>`
    - `overwrite` `<boolean>`: overwrite existing file or directory, default is `true`. _Note that the copy operation will silently fail if you set this to `false` and the destination exists._ Use the `errorOnExist` option to change this behavior.
    - `errorOnExist` `<boolean>`: when `overwrite` is `false` and the destination exists, throw an error. Default is `false`.
    - `dereference` `<boolean>`: dereference symlinks, default is `false`.
    - `preserveTimestamps` `<boolean>`: When true, will set last modification and access times to the ones of the original source files. When false, timestamp behavior is OS-dependent. Default is `false`.
    - `filter` `<Function>`: Function to filter copied files. Return `true` to include, `false` to exclude.

  ## Example:

  ```
  const fs = require('fs-extra')

  // copy file
  fs.copySync('/tmp/myfile', '/tmp/mynewfile')

  // copy directory, even if it has subdirectories or files
  fs.copySync('/tmp/mydir', '/tmp/mynewdir')
  ```

  **Using filter function**

  ```
  const fs = require('fs-extra')

  const filterFunc = (src, dest) => {
    // your logic here
    // it will be copied if return true
  }

  fs.copySync('/tmp/mydir', '/tmp/mynewdir', { filter: filterFunc })
  ```

 */
export function copySync(src: string, dest: string, options?: CopyOptionsSync): void;

/**
  # move(src, dest, [options, callback])

  Moves a file or directory, even across devices.

  - `src` `<String>`
  - `dest` `<String>`
  - `options` `<Object>`
    - `overwrite` `<boolean>`: overwrite existing file or directory, default is `false`.
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  const srcpath = '/tmp/file.txt'
  const dstpath = '/tmp/this/path/does/not/exist/file.txt'

  // With a callback:
  fs.move(srcpath, dstpath, err => {
    if (err) return console.error(err)

    console.log('success!')
  })

  // With Promises:
  fs.move(srcpath, dstpath)
  .then(() => {
    console.log('success!')
  })
  .catch(err => {
    console.error(err)
  })

  // With async/await:
  async function example (src, dest) {
    try {
      await fs.move(srcpath, dstpath)
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }

  example(srcpath, dstpath)
  ```

  **Using `overwrite` option**

  ```
  const fs = require('fs-extra')

  fs.move('/tmp/somedir', '/tmp/may/already/existed/somedir', { overwrite: true }, err => {
    if (err) return console.error(err)

    console.log('success!')
  })
  ```

 */
export function move(src: string, dest: string, options?: MoveOptions): Promise<void>;
/**
  # move(src, dest, [options, callback])

  Moves a file or directory, even across devices.

  - `src` `<String>`
  - `dest` `<String>`
  - `options` `<Object>`
    - `overwrite` `<boolean>`: overwrite existing file or directory, default is `false`.
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  const srcpath = '/tmp/file.txt'
  const dstpath = '/tmp/this/path/does/not/exist/file.txt'

  // With a callback:
  fs.move(srcpath, dstpath, err => {
    if (err) return console.error(err)

    console.log('success!')
  })

  // With Promises:
  fs.move(srcpath, dstpath)
  .then(() => {
    console.log('success!')
  })
  .catch(err => {
    console.error(err)
  })

  // With async/await:
  async function example (src, dest) {
    try {
      await fs.move(srcpath, dstpath)
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }

  example(srcpath, dstpath)
  ```

  **Using `overwrite` option**

  ```
  const fs = require('fs-extra')

  fs.move('/tmp/somedir', '/tmp/may/already/existed/somedir', { overwrite: true }, err => {
    if (err) return console.error(err)

    console.log('success!')
  })
  ```

 */
export function move(src: string, dest: string, callback: (err: Error) => void): void;
/**
  # move(src, dest, [options, callback])

  Moves a file or directory, even across devices.

  - `src` `<String>`
  - `dest` `<String>`
  - `options` `<Object>`
    - `overwrite` `<boolean>`: overwrite existing file or directory, default is `false`.
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  const srcpath = '/tmp/file.txt'
  const dstpath = '/tmp/this/path/does/not/exist/file.txt'

  // With a callback:
  fs.move(srcpath, dstpath, err => {
    if (err) return console.error(err)

    console.log('success!')
  })

  // With Promises:
  fs.move(srcpath, dstpath)
  .then(() => {
    console.log('success!')
  })
  .catch(err => {
    console.error(err)
  })

  // With async/await:
  async function example (src, dest) {
    try {
      await fs.move(srcpath, dstpath)
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }

  example(srcpath, dstpath)
  ```

  **Using `overwrite` option**

  ```
  const fs = require('fs-extra')

  fs.move('/tmp/somedir', '/tmp/may/already/existed/somedir', { overwrite: true }, err => {
    if (err) return console.error(err)

    console.log('success!')
  })
  ```

 */
export function move(src: string, dest: string, options: MoveOptions, callback: (err: Error) => void): void;
/**
  # moveSync(src, dest, [options])

  Moves a file or directory, even across devices.

  - `src` `<String>`
  - `dest` `<String>`
  - `options` `<Object>`
    - `overwrite` `<boolean>`: overwrite existing file or directory, default is `false`.

  ## Example:

  ```
  const fs = require('fs-extra')

  fs.moveSync('/tmp/somefile', '/tmp/does/not/exist/yet/somefile')
  ```

  **Using `overwrite` option**

  ```
  const fs = require('fs-extra')

  fs.moveSync('/tmp/somedir', '/tmp/may/already/existed/somedir', { overwrite: true })
  ```

 */
export function moveSync(src: string, dest: string, options?: MoveOptions): void;

/**
  # ensureFile(file, [callback])

  Ensures that the file exists. If the file that is requested to be created is in directories that do not exist, these directories are created. If the file already exists, it is **NOT MODIFIED**.

  **Alias:** `createFile()`

  - `file` `<String>`
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  const file = '/tmp/this/path/does/not/exist/file.txt'

  // With a callback:
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

  // With async/await:
  async function example (f) {
    try {
      await fs.ensureFile(f)
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }

  example(file)
  ```

 */
export function createFile(file: string): Promise<void>;
/**
  # ensureFile(file, [callback])

  Ensures that the file exists. If the file that is requested to be created is in directories that do not exist, these directories are created. If the file already exists, it is **NOT MODIFIED**.

  **Alias:** `createFile()`

  - `file` `<String>`
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  const file = '/tmp/this/path/does/not/exist/file.txt'

  // With a callback:
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

  // With async/await:
  async function example (f) {
    try {
      await fs.ensureFile(f)
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }

  example(file)
  ```

 */
export function createFile(file: string, callback: (err: Error) => void): void;
/**
  # ensureFileSync(file)

  Ensures that the file exists. If the file that is requested to be created is in directories that do not exist, these directories are created. If the file already exists, it is **NOT MODIFIED**.

  **Alias:** `createFileSync()`

  - `file` `<String>`

  ## Example:

  ```
  const fs = require('fs-extra')

  const file = '/tmp/this/path/does/not/exist/file.txt'
  fs.ensureFileSync(file)
  // file has now been created, including the directory it is to be placed in
  ```

 */
export function createFileSync(file: string): void;

/**
  # ensureDir(dir[,options][,callback])

  Ensures that the directory exists. If the directory structure does not exist, it is created. Like `mkdir -p`.

  **Aliases:** `mkdirs()`, `mkdirp()`

  - `dir` `<String>`
  - `options` `<Integer>|<Object>`
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  const dir = '/tmp/this/path/does/not/exist'
  const desiredMode = 0o2775
  const options = {
    mode: 0o2775
  }

  // With a callback:
  fs.ensureDir(dir, err => {
    console.log(err) // => null
    // dir has now been created, including the directory it is to be placed in
  })

  // With a callback and a mode integer
  fs.ensureDir(dir, desiredMode, err => {
    console.log(err) // => null
    // dir has now been created with mode 0o2775, including the directory it is to be placed in
  })

  // With Promises:
  fs.ensureDir(dir)
  .then(() => {
    console.log('success!')
  })
  .catch(err => {
    console.error(err)
  })

  // With Promises and a mode integer:
  fs.ensureDir(dir, desiredMode)
  .then(() => {
    console.log('success!')
  })
  .catch(err => {
    console.error(err)
  })

  // With async/await:
  async function example (directory) {
    try {
      await fs.ensureDir(directory)
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }
  example(dir)

  // With async/await and an options object, containing mode:
  async function exampleMode (directory) {
    try {
      await fs.ensureDir(directory, options)
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }
  exampleMode(dir)
  ```

 */
export function ensureDir(path: string): Promise<void>;
/**
  # ensureDir(dir[,options][,callback])

  Ensures that the directory exists. If the directory structure does not exist, it is created. Like `mkdir -p`.

  **Aliases:** `mkdirs()`, `mkdirp()`

  - `dir` `<String>`
  - `options` `<Integer>|<Object>`
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  const dir = '/tmp/this/path/does/not/exist'
  const desiredMode = 0o2775
  const options = {
    mode: 0o2775
  }

  // With a callback:
  fs.ensureDir(dir, err => {
    console.log(err) // => null
    // dir has now been created, including the directory it is to be placed in
  })

  // With a callback and a mode integer
  fs.ensureDir(dir, desiredMode, err => {
    console.log(err) // => null
    // dir has now been created with mode 0o2775, including the directory it is to be placed in
  })

  // With Promises:
  fs.ensureDir(dir)
  .then(() => {
    console.log('success!')
  })
  .catch(err => {
    console.error(err)
  })

  // With Promises and a mode integer:
  fs.ensureDir(dir, desiredMode)
  .then(() => {
    console.log('success!')
  })
  .catch(err => {
    console.error(err)
  })

  // With async/await:
  async function example (directory) {
    try {
      await fs.ensureDir(directory)
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }
  example(dir)

  // With async/await and an options object, containing mode:
  async function exampleMode (directory) {
    try {
      await fs.ensureDir(directory, options)
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }
  exampleMode(dir)
  ```

 */
export function ensureDir(path: string, callback: (err: Error) => void): void;
/**
  # ensureDirSync(dir[,options])

  Ensures that the directory exists. If the directory structure does not exist, it is created. Like `mkdir -p`. If provided, options may specify the desired mode for the directory.

  **Aliases:** `mkdirsSync()`, `mkdirpSync()`

  - `dir` `<String>`
  - `options` `<Integer>|<Object>`
  ## Example:

  ```
  const fs = require('fs-extra')

  const dir = '/tmp/this/path/does/not/exist'

  const desiredMode = 0o2775
  const options = {
    mode: 0o2775
  }

  fs.ensureDirSync(dir)
  // dir has now been created, including the directory it is to be placed in

  fs.ensureDirSync(dir, desiredMode)
  // dir has now been created, including the directory it is to be placed in with permission 0o2775

  fs.ensureDirSync(dir, options)
  // dir has now been created, including the directory it is to be placed in with permission 0o2775
  ```

 */
export function ensureDirSync(path: string): void;

/**
  # ensureDir(dir[,options][,callback])

  Ensures that the directory exists. If the directory structure does not exist, it is created. Like `mkdir -p`.

  **Aliases:** `mkdirs()`, `mkdirp()`

  - `dir` `<String>`
  - `options` `<Integer>|<Object>`
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  const dir = '/tmp/this/path/does/not/exist'
  const desiredMode = 0o2775
  const options = {
    mode: 0o2775
  }

  // With a callback:
  fs.ensureDir(dir, err => {
    console.log(err) // => null
    // dir has now been created, including the directory it is to be placed in
  })

  // With a callback and a mode integer
  fs.ensureDir(dir, desiredMode, err => {
    console.log(err) // => null
    // dir has now been created with mode 0o2775, including the directory it is to be placed in
  })

  // With Promises:
  fs.ensureDir(dir)
  .then(() => {
    console.log('success!')
  })
  .catch(err => {
    console.error(err)
  })

  // With Promises and a mode integer:
  fs.ensureDir(dir, desiredMode)
  .then(() => {
    console.log('success!')
  })
  .catch(err => {
    console.error(err)
  })

  // With async/await:
  async function example (directory) {
    try {
      await fs.ensureDir(directory)
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }
  example(dir)

  // With async/await and an options object, containing mode:
  async function exampleMode (directory) {
    try {
      await fs.ensureDir(directory, options)
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }
  exampleMode(dir)
  ```

 */
export function mkdirs(dir: string): Promise<void>;
/**
  # ensureDir(dir[,options][,callback])

  Ensures that the directory exists. If the directory structure does not exist, it is created. Like `mkdir -p`.

  **Aliases:** `mkdirs()`, `mkdirp()`

  - `dir` `<String>`
  - `options` `<Integer>|<Object>`
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  const dir = '/tmp/this/path/does/not/exist'
  const desiredMode = 0o2775
  const options = {
    mode: 0o2775
  }

  // With a callback:
  fs.ensureDir(dir, err => {
    console.log(err) // => null
    // dir has now been created, including the directory it is to be placed in
  })

  // With a callback and a mode integer
  fs.ensureDir(dir, desiredMode, err => {
    console.log(err) // => null
    // dir has now been created with mode 0o2775, including the directory it is to be placed in
  })

  // With Promises:
  fs.ensureDir(dir)
  .then(() => {
    console.log('success!')
  })
  .catch(err => {
    console.error(err)
  })

  // With Promises and a mode integer:
  fs.ensureDir(dir, desiredMode)
  .then(() => {
    console.log('success!')
  })
  .catch(err => {
    console.error(err)
  })

  // With async/await:
  async function example (directory) {
    try {
      await fs.ensureDir(directory)
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }
  example(dir)

  // With async/await and an options object, containing mode:
  async function exampleMode (directory) {
    try {
      await fs.ensureDir(directory, options)
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }
  exampleMode(dir)
  ```

 */
export function mkdirs(dir: string, callback: (err: Error) => void): void;
/**
  # ensureDir(dir[,options][,callback])

  Ensures that the directory exists. If the directory structure does not exist, it is created. Like `mkdir -p`.

  **Aliases:** `mkdirs()`, `mkdirp()`

  - `dir` `<String>`
  - `options` `<Integer>|<Object>`
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  const dir = '/tmp/this/path/does/not/exist'
  const desiredMode = 0o2775
  const options = {
    mode: 0o2775
  }

  // With a callback:
  fs.ensureDir(dir, err => {
    console.log(err) // => null
    // dir has now been created, including the directory it is to be placed in
  })

  // With a callback and a mode integer
  fs.ensureDir(dir, desiredMode, err => {
    console.log(err) // => null
    // dir has now been created with mode 0o2775, including the directory it is to be placed in
  })

  // With Promises:
  fs.ensureDir(dir)
  .then(() => {
    console.log('success!')
  })
  .catch(err => {
    console.error(err)
  })

  // With Promises and a mode integer:
  fs.ensureDir(dir, desiredMode)
  .then(() => {
    console.log('success!')
  })
  .catch(err => {
    console.error(err)
  })

  // With async/await:
  async function example (directory) {
    try {
      await fs.ensureDir(directory)
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }
  example(dir)

  // With async/await and an options object, containing mode:
  async function exampleMode (directory) {
    try {
      await fs.ensureDir(directory, options)
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }
  exampleMode(dir)
  ```

 */
export function mkdirp(dir: string): Promise<void>;
/**
  # ensureDir(dir[,options][,callback])

  Ensures that the directory exists. If the directory structure does not exist, it is created. Like `mkdir -p`.

  **Aliases:** `mkdirs()`, `mkdirp()`

  - `dir` `<String>`
  - `options` `<Integer>|<Object>`
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  const dir = '/tmp/this/path/does/not/exist'
  const desiredMode = 0o2775
  const options = {
    mode: 0o2775
  }

  // With a callback:
  fs.ensureDir(dir, err => {
    console.log(err) // => null
    // dir has now been created, including the directory it is to be placed in
  })

  // With a callback and a mode integer
  fs.ensureDir(dir, desiredMode, err => {
    console.log(err) // => null
    // dir has now been created with mode 0o2775, including the directory it is to be placed in
  })

  // With Promises:
  fs.ensureDir(dir)
  .then(() => {
    console.log('success!')
  })
  .catch(err => {
    console.error(err)
  })

  // With Promises and a mode integer:
  fs.ensureDir(dir, desiredMode)
  .then(() => {
    console.log('success!')
  })
  .catch(err => {
    console.error(err)
  })

  // With async/await:
  async function example (directory) {
    try {
      await fs.ensureDir(directory)
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }
  example(dir)

  // With async/await and an options object, containing mode:
  async function exampleMode (directory) {
    try {
      await fs.ensureDir(directory, options)
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }
  exampleMode(dir)
  ```

 */
export function mkdirp(dir: string, callback: (err: Error) => void): void;
/**
  # ensureDirSync(dir[,options])

  Ensures that the directory exists. If the directory structure does not exist, it is created. Like `mkdir -p`. If provided, options may specify the desired mode for the directory.

  **Aliases:** `mkdirsSync()`, `mkdirpSync()`

  - `dir` `<String>`
  - `options` `<Integer>|<Object>`
  ## Example:

  ```
  const fs = require('fs-extra')

  const dir = '/tmp/this/path/does/not/exist'

  const desiredMode = 0o2775
  const options = {
    mode: 0o2775
  }

  fs.ensureDirSync(dir)
  // dir has now been created, including the directory it is to be placed in

  fs.ensureDirSync(dir, desiredMode)
  // dir has now been created, including the directory it is to be placed in with permission 0o2775

  fs.ensureDirSync(dir, options)
  // dir has now been created, including the directory it is to be placed in with permission 0o2775
  ```

 */
export function mkdirsSync(dir: string): void;
/**
  # ensureDirSync(dir[,options])

  Ensures that the directory exists. If the directory structure does not exist, it is created. Like `mkdir -p`. If provided, options may specify the desired mode for the directory.

  **Aliases:** `mkdirsSync()`, `mkdirpSync()`

  - `dir` `<String>`
  - `options` `<Integer>|<Object>`
  ## Example:

  ```
  const fs = require('fs-extra')

  const dir = '/tmp/this/path/does/not/exist'

  const desiredMode = 0o2775
  const options = {
    mode: 0o2775
  }

  fs.ensureDirSync(dir)
  // dir has now been created, including the directory it is to be placed in

  fs.ensureDirSync(dir, desiredMode)
  // dir has now been created, including the directory it is to be placed in with permission 0o2775

  fs.ensureDirSync(dir, options)
  // dir has now been created, including the directory it is to be placed in with permission 0o2775
  ```

 */
export function mkdirpSync(dir: string): void;

/**
  # outputFile(file, data, [options, callback])

  Almost the same as `writeFile` (i.e. it [overwrites](http://pages.citebite.com/v2o5n8l2f5reb)), except that if the parent directory does not exist, it's created. `file` must be a file path (a buffer or a file descriptor is not allowed). `options` are what you'd pass to [`fs.writeFile()`](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback).

  - `file` `<String>`
  - `data` `<String> | <Buffer> | <Uint8Array>`
  - `options` `<Object> | <String>`
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  const file = '/tmp/this/path/does/not/exist/file.txt'

  // With a callback:
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

  // With async/await:
  async function example (f) {
    try {
      await fs.outputFile(f, 'hello!')

      const data = await fs.readFile(f, 'utf8')

      console.log(data) // => hello!
    } catch (err) {
      console.error(err)
    }
  }

  example(file)
  ```

 */
export function outputFile(file: string, data: any, options?: WriteFileOptions | string): Promise<void>;
/**
  # outputFile(file, data, [options, callback])

  Almost the same as `writeFile` (i.e. it [overwrites](http://pages.citebite.com/v2o5n8l2f5reb)), except that if the parent directory does not exist, it's created. `file` must be a file path (a buffer or a file descriptor is not allowed). `options` are what you'd pass to [`fs.writeFile()`](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback).

  - `file` `<String>`
  - `data` `<String> | <Buffer> | <Uint8Array>`
  - `options` `<Object> | <String>`
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  const file = '/tmp/this/path/does/not/exist/file.txt'

  // With a callback:
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

  // With async/await:
  async function example (f) {
    try {
      await fs.outputFile(f, 'hello!')

      const data = await fs.readFile(f, 'utf8')

      console.log(data) // => hello!
    } catch (err) {
      console.error(err)
    }
  }

  example(file)
  ```

 */
export function outputFile(file: string, data: any, callback: (err: Error) => void): void;
/**
  # outputFile(file, data, [options, callback])

  Almost the same as `writeFile` (i.e. it [overwrites](http://pages.citebite.com/v2o5n8l2f5reb)), except that if the parent directory does not exist, it's created. `file` must be a file path (a buffer or a file descriptor is not allowed). `options` are what you'd pass to [`fs.writeFile()`](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback).

  - `file` `<String>`
  - `data` `<String> | <Buffer> | <Uint8Array>`
  - `options` `<Object> | <String>`
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  const file = '/tmp/this/path/does/not/exist/file.txt'

  // With a callback:
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

  // With async/await:
  async function example (f) {
    try {
      await fs.outputFile(f, 'hello!')

      const data = await fs.readFile(f, 'utf8')

      console.log(data) // => hello!
    } catch (err) {
      console.error(err)
    }
  }

  example(file)
  ```

 */
export function outputFile(file: string, data: any, options: WriteFileOptions | string, callback: (err: Error) => void): void;
/**
  # outputFileSync(file, data, [options])

  Almost the same as `writeFileSync` (i.e. it [overwrites](http://pages.citebite.com/v2o5n8l2f5reb)), except that if the parent directory does not exist, it's created. `file` must be a file path (a buffer or a file descriptor is not allowed). `options` are what you'd pass to [`fs.writeFileSync()`](https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options).

  - `file` `<String>`
  - `data` `<String> | <Buffer> | <Uint8Array>`
  - `options` `<Object> | <String>`

  ## Example:

  ```
  const fs = require('fs-extra')

  const file = '/tmp/this/path/does/not/exist/file.txt'
  fs.outputFileSync(file, 'hello!')

  const data = fs.readFileSync(file, 'utf8')
  console.log(data) // => hello!
  ```

 */
export function outputFileSync(file: string, data: any, options?: WriteFileOptions | string): void;

/**
  # readJson(file, [options, callback])

  Reads a JSON file and then parses it into an object. `options` are the same
  that you'd pass to [`jsonFile.readFile`](https://github.com/jprichardson/node-jsonfile#readfilefilename-options-callback).

  **Alias:** `readJSON()`

  - `file` `<String>`
  - `options` `<Object>`
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  // With a callback:
  fs.readJson('./package.json', (err, packageObj) => {
    if (err) console.error(err)

    console.log(packageObj.version) // => 0.1.3
  })

  // With Promises:
  fs.readJson('./package.json')
  .then(packageObj => {
    console.log(packageObj.version) // => 0.1.3
  })
  .catch(err => {
    console.error(err)
  })

  // With async/await:
  async function example () {
    try {
      const packageObj = await fs.readJson('./package.json')

      console.log(packageObj.version) // => 0.1.3
    } catch (err) {
      console.error(err)
    }
  }

  example()
  ```

  ---

  `readJson()` can take a `throws` option set to `false` and it won't throw if the JSON is invalid. Example:

  ```
  const fs = require('fs-extra')

  const file = '/tmp/some-invalid.json'
  const data = '{not valid JSON'
  fs.writeFileSync(file, data)

  // With a callback:
  fs.readJson(file, { throws: false }, (err, obj) => {
    if (err) console.error(err)

    console.log(obj) // => null
  })

  // Wtih Promises:
  fs.readJson(file, { throws: false })
  .then(obj => {
    console.log(obj) // => null
  })
  .catch(err => {
    console.error(err) // Not called
  })

  // With async/await:
  async function example (f) {
    const obj = await fs.readJson(f, { throws: false })

    console.log(obj) // => null
  }

  example(file)
  ```

 */
export function readJson(file: string, options?: ReadOptions): Promise<any>;
/**
  # readJson(file, [options, callback])

  Reads a JSON file and then parses it into an object. `options` are the same
  that you'd pass to [`jsonFile.readFile`](https://github.com/jprichardson/node-jsonfile#readfilefilename-options-callback).

  **Alias:** `readJSON()`

  - `file` `<String>`
  - `options` `<Object>`
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  // With a callback:
  fs.readJson('./package.json', (err, packageObj) => {
    if (err) console.error(err)

    console.log(packageObj.version) // => 0.1.3
  })

  // With Promises:
  fs.readJson('./package.json')
  .then(packageObj => {
    console.log(packageObj.version) // => 0.1.3
  })
  .catch(err => {
    console.error(err)
  })

  // With async/await:
  async function example () {
    try {
      const packageObj = await fs.readJson('./package.json')

      console.log(packageObj.version) // => 0.1.3
    } catch (err) {
      console.error(err)
    }
  }

  example()
  ```

  ---

  `readJson()` can take a `throws` option set to `false` and it won't throw if the JSON is invalid. Example:

  ```
  const fs = require('fs-extra')

  const file = '/tmp/some-invalid.json'
  const data = '{not valid JSON'
  fs.writeFileSync(file, data)

  // With a callback:
  fs.readJson(file, { throws: false }, (err, obj) => {
    if (err) console.error(err)

    console.log(obj) // => null
  })

  // Wtih Promises:
  fs.readJson(file, { throws: false })
  .then(obj => {
    console.log(obj) // => null
  })
  .catch(err => {
    console.error(err) // Not called
  })

  // With async/await:
  async function example (f) {
    const obj = await fs.readJson(f, { throws: false })

    console.log(obj) // => null
  }

  example(file)
  ```

 */
export function readJson(file: string, callback: (err: Error, jsonObject: any) => void): void;
/**
  # readJson(file, [options, callback])

  Reads a JSON file and then parses it into an object. `options` are the same
  that you'd pass to [`jsonFile.readFile`](https://github.com/jprichardson/node-jsonfile#readfilefilename-options-callback).

  **Alias:** `readJSON()`

  - `file` `<String>`
  - `options` `<Object>`
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  // With a callback:
  fs.readJson('./package.json', (err, packageObj) => {
    if (err) console.error(err)

    console.log(packageObj.version) // => 0.1.3
  })

  // With Promises:
  fs.readJson('./package.json')
  .then(packageObj => {
    console.log(packageObj.version) // => 0.1.3
  })
  .catch(err => {
    console.error(err)
  })

  // With async/await:
  async function example () {
    try {
      const packageObj = await fs.readJson('./package.json')

      console.log(packageObj.version) // => 0.1.3
    } catch (err) {
      console.error(err)
    }
  }

  example()
  ```

  ---

  `readJson()` can take a `throws` option set to `false` and it won't throw if the JSON is invalid. Example:

  ```
  const fs = require('fs-extra')

  const file = '/tmp/some-invalid.json'
  const data = '{not valid JSON'
  fs.writeFileSync(file, data)

  // With a callback:
  fs.readJson(file, { throws: false }, (err, obj) => {
    if (err) console.error(err)

    console.log(obj) // => null
  })

  // Wtih Promises:
  fs.readJson(file, { throws: false })
  .then(obj => {
    console.log(obj) // => null
  })
  .catch(err => {
    console.error(err) // Not called
  })

  // With async/await:
  async function example (f) {
    const obj = await fs.readJson(f, { throws: false })

    console.log(obj) // => null
  }

  example(file)
  ```

 */
export function readJson(file: string, options: ReadOptions, callback: (err: Error, jsonObject: any) => void): void;
/**
  # readJson(file, [options, callback])

  Reads a JSON file and then parses it into an object. `options` are the same
  that you'd pass to [`jsonFile.readFile`](https://github.com/jprichardson/node-jsonfile#readfilefilename-options-callback).

  **Alias:** `readJSON()`

  - `file` `<String>`
  - `options` `<Object>`
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  // With a callback:
  fs.readJson('./package.json', (err, packageObj) => {
    if (err) console.error(err)

    console.log(packageObj.version) // => 0.1.3
  })

  // With Promises:
  fs.readJson('./package.json')
  .then(packageObj => {
    console.log(packageObj.version) // => 0.1.3
  })
  .catch(err => {
    console.error(err)
  })

  // With async/await:
  async function example () {
    try {
      const packageObj = await fs.readJson('./package.json')

      console.log(packageObj.version) // => 0.1.3
    } catch (err) {
      console.error(err)
    }
  }

  example()
  ```

  ---

  `readJson()` can take a `throws` option set to `false` and it won't throw if the JSON is invalid. Example:

  ```
  const fs = require('fs-extra')

  const file = '/tmp/some-invalid.json'
  const data = '{not valid JSON'
  fs.writeFileSync(file, data)

  // With a callback:
  fs.readJson(file, { throws: false }, (err, obj) => {
    if (err) console.error(err)

    console.log(obj) // => null
  })

  // Wtih Promises:
  fs.readJson(file, { throws: false })
  .then(obj => {
    console.log(obj) // => null
  })
  .catch(err => {
    console.error(err) // Not called
  })

  // With async/await:
  async function example (f) {
    const obj = await fs.readJson(f, { throws: false })

    console.log(obj) // => null
  }

  example(file)
  ```

 */
export function readJSON(file: string, options?: ReadOptions): Promise<any>;
/**
  # readJson(file, [options, callback])

  Reads a JSON file and then parses it into an object. `options` are the same
  that you'd pass to [`jsonFile.readFile`](https://github.com/jprichardson/node-jsonfile#readfilefilename-options-callback).

  **Alias:** `readJSON()`

  - `file` `<String>`
  - `options` `<Object>`
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  // With a callback:
  fs.readJson('./package.json', (err, packageObj) => {
    if (err) console.error(err)

    console.log(packageObj.version) // => 0.1.3
  })

  // With Promises:
  fs.readJson('./package.json')
  .then(packageObj => {
    console.log(packageObj.version) // => 0.1.3
  })
  .catch(err => {
    console.error(err)
  })

  // With async/await:
  async function example () {
    try {
      const packageObj = await fs.readJson('./package.json')

      console.log(packageObj.version) // => 0.1.3
    } catch (err) {
      console.error(err)
    }
  }

  example()
  ```

  ---

  `readJson()` can take a `throws` option set to `false` and it won't throw if the JSON is invalid. Example:

  ```
  const fs = require('fs-extra')

  const file = '/tmp/some-invalid.json'
  const data = '{not valid JSON'
  fs.writeFileSync(file, data)

  // With a callback:
  fs.readJson(file, { throws: false }, (err, obj) => {
    if (err) console.error(err)

    console.log(obj) // => null
  })

  // Wtih Promises:
  fs.readJson(file, { throws: false })
  .then(obj => {
    console.log(obj) // => null
  })
  .catch(err => {
    console.error(err) // Not called
  })

  // With async/await:
  async function example (f) {
    const obj = await fs.readJson(f, { throws: false })

    console.log(obj) // => null
  }

  example(file)
  ```

 */
export function readJSON(file: string, callback: (err: Error, jsonObject: any) => void): void;
/**
  # readJson(file, [options, callback])

  Reads a JSON file and then parses it into an object. `options` are the same
  that you'd pass to [`jsonFile.readFile`](https://github.com/jprichardson/node-jsonfile#readfilefilename-options-callback).

  **Alias:** `readJSON()`

  - `file` `<String>`
  - `options` `<Object>`
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  // With a callback:
  fs.readJson('./package.json', (err, packageObj) => {
    if (err) console.error(err)

    console.log(packageObj.version) // => 0.1.3
  })

  // With Promises:
  fs.readJson('./package.json')
  .then(packageObj => {
    console.log(packageObj.version) // => 0.1.3
  })
  .catch(err => {
    console.error(err)
  })

  // With async/await:
  async function example () {
    try {
      const packageObj = await fs.readJson('./package.json')

      console.log(packageObj.version) // => 0.1.3
    } catch (err) {
      console.error(err)
    }
  }

  example()
  ```

  ---

  `readJson()` can take a `throws` option set to `false` and it won't throw if the JSON is invalid. Example:

  ```
  const fs = require('fs-extra')

  const file = '/tmp/some-invalid.json'
  const data = '{not valid JSON'
  fs.writeFileSync(file, data)

  // With a callback:
  fs.readJson(file, { throws: false }, (err, obj) => {
    if (err) console.error(err)

    console.log(obj) // => null
  })

  // Wtih Promises:
  fs.readJson(file, { throws: false })
  .then(obj => {
    console.log(obj) // => null
  })
  .catch(err => {
    console.error(err) // Not called
  })

  // With async/await:
  async function example (f) {
    const obj = await fs.readJson(f, { throws: false })

    console.log(obj) // => null
  }

  example(file)
  ```

 */
export function readJSON(file: string, options: ReadOptions, callback: (err: Error, jsonObject: any) => void): void;

/**
  # readJsonSync(file, [options])

  Reads a JSON file and then parses it into an object. `options` are the same
  that you'd pass to [`jsonFile.readFileSync`](https://github.com/jprichardson/node-jsonfile#readfilesyncfilename-options).

  **Alias:** `readJSONSync()`

  - `file` `<String>`
  - `options` `<Object>`

  ## Example:

  ```
  const fs = require('fs-extra')

  const packageObj = fs.readJsonSync('./package.json')
  console.log(packageObj.version) // => 2.0.0
  ```

  ---

  `readJsonSync()` can take a `throws` option set to `false` and it won't throw if the JSON is invalid. Example:

  ```
  const fs = require('fs-extra')

  const file = '/tmp/some-invalid.json'
  const data = '{not valid JSON'
  fs.writeFileSync(file, data)

  const obj = fs.readJsonSync(file, { throws: false })
  console.log(obj) // => null
  ```

 */
export function readJsonSync(file: string, options?: ReadOptions): any;
/**
  # readJsonSync(file, [options])

  Reads a JSON file and then parses it into an object. `options` are the same
  that you'd pass to [`jsonFile.readFileSync`](https://github.com/jprichardson/node-jsonfile#readfilesyncfilename-options).

  **Alias:** `readJSONSync()`

  - `file` `<String>`
  - `options` `<Object>`

  ## Example:

  ```
  const fs = require('fs-extra')

  const packageObj = fs.readJsonSync('./package.json')
  console.log(packageObj.version) // => 2.0.0
  ```

  ---

  `readJsonSync()` can take a `throws` option set to `false` and it won't throw if the JSON is invalid. Example:

  ```
  const fs = require('fs-extra')

  const file = '/tmp/some-invalid.json'
  const data = '{not valid JSON'
  fs.writeFileSync(file, data)

  const obj = fs.readJsonSync(file, { throws: false })
  console.log(obj) // => null
  ```

 */
export function readJSONSync(file: string, options?: ReadOptions): any;

/**
  # remove(path, [callback])

  Removes a file or directory. The directory can have contents. Like `rm -rf`.

  - `path` `<String>`
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  // remove file
  // With a callback:
  fs.remove('/tmp/myfile', err => {
    if (err) return console.error(err)

    console.log('success!')
  })

  fs.remove('/home/jprichardson', err => {
    if (err) return console.error(err)

    console.log('success!') // I just deleted my entire HOME directory.
  })

  // With Promises:
  fs.remove('/tmp/myfile')
  .then(() => {
    console.log('success!')
  })
  .catch(err => {
    console.error(err)
  })

  // With async/await:
  async function example (src, dest) {
    try {
      await fs.remove('/tmp/myfile')
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }

  example()
  ```

 */
export function remove(dir: string): Promise<void>;
/**
  # remove(path, [callback])

  Removes a file or directory. The directory can have contents. Like `rm -rf`.

  - `path` `<String>`
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  // remove file
  // With a callback:
  fs.remove('/tmp/myfile', err => {
    if (err) return console.error(err)

    console.log('success!')
  })

  fs.remove('/home/jprichardson', err => {
    if (err) return console.error(err)

    console.log('success!') // I just deleted my entire HOME directory.
  })

  // With Promises:
  fs.remove('/tmp/myfile')
  .then(() => {
    console.log('success!')
  })
  .catch(err => {
    console.error(err)
  })

  // With async/await:
  async function example (src, dest) {
    try {
      await fs.remove('/tmp/myfile')
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }

  example()
  ```

 */
export function remove(dir: string, callback: (err: Error) => void): void;
/**
  # removeSync(path)

  Removes a file or directory. The directory can have contents. Like `rm -rf`.

  - `path` `<String>`

  ## Example:

  ```
  const fs = require('fs-extra')

  // remove file
  fs.removeSync('/tmp/myfile')

  fs.removeSync('/home/jprichardson') // I just deleted my entire HOME directory.
  ```

 */
export function removeSync(dir: string): void;

/**
  # outputJson(file, object, [options, callback])

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

  ## Example:

  ```
  const fs = require('fs-extra')

  const file = '/tmp/this/path/does/not/exist/file.json'

  // With a callback:
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

  // With async/await:
  async function example (f) {
    try {
      await fs.outputJson(f, {name: 'JP'})

      const data = await fs.readJson(f)

      console.log(data.name) // => JP
    } catch (err) {
      console.error(err)
    }
  }

  example(file)
  ```

 */
export function outputJSON(file: string, data: any, options?: WriteOptions): Promise<void>;
/**
  # outputJson(file, object, [options, callback])

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

  ## Example:

  ```
  const fs = require('fs-extra')

  const file = '/tmp/this/path/does/not/exist/file.json'

  // With a callback:
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

  // With async/await:
  async function example (f) {
    try {
      await fs.outputJson(f, {name: 'JP'})

      const data = await fs.readJson(f)

      console.log(data.name) // => JP
    } catch (err) {
      console.error(err)
    }
  }

  example(file)
  ```

 */
export function outputJSON(file: string, data: any, options: WriteOptions, callback: (err: Error) => void): void;
/**
  # outputJson(file, object, [options, callback])

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

  ## Example:

  ```
  const fs = require('fs-extra')

  const file = '/tmp/this/path/does/not/exist/file.json'

  // With a callback:
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

  // With async/await:
  async function example (f) {
    try {
      await fs.outputJson(f, {name: 'JP'})

      const data = await fs.readJson(f)

      console.log(data.name) // => JP
    } catch (err) {
      console.error(err)
    }
  }

  example(file)
  ```

 */
export function outputJSON(file: string, data: any, callback: (err: Error) => void): void;
/**
  # outputJson(file, object, [options, callback])

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

  ## Example:

  ```
  const fs = require('fs-extra')

  const file = '/tmp/this/path/does/not/exist/file.json'

  // With a callback:
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

  // With async/await:
  async function example (f) {
    try {
      await fs.outputJson(f, {name: 'JP'})

      const data = await fs.readJson(f)

      console.log(data.name) // => JP
    } catch (err) {
      console.error(err)
    }
  }

  example(file)
  ```

 */
export function outputJson(file: string, data: any, options?: WriteOptions): Promise<void>;
/**
  # outputJson(file, object, [options, callback])

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

  ## Example:

  ```
  const fs = require('fs-extra')

  const file = '/tmp/this/path/does/not/exist/file.json'

  // With a callback:
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

  // With async/await:
  async function example (f) {
    try {
      await fs.outputJson(f, {name: 'JP'})

      const data = await fs.readJson(f)

      console.log(data.name) // => JP
    } catch (err) {
      console.error(err)
    }
  }

  example(file)
  ```

 */
export function outputJson(file: string, data: any, options: WriteOptions, callback: (err: Error) => void): void;
/**
  # outputJson(file, object, [options, callback])

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

  ## Example:

  ```
  const fs = require('fs-extra')

  const file = '/tmp/this/path/does/not/exist/file.json'

  // With a callback:
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

  // With async/await:
  async function example (f) {
    try {
      await fs.outputJson(f, {name: 'JP'})

      const data = await fs.readJson(f)

      console.log(data.name) // => JP
    } catch (err) {
      console.error(err)
    }
  }

  example(file)
  ```

 */
export function outputJson(file: string, data: any, callback: (err: Error) => void): void;
/**
  # outputJsonSync(file, object, [options])

  Almost the same as [`writeJsonSync`](writeJson-sync.md), except that if the directory does not exist, it's created.

  **Alias:** `outputJSONSync()`

  - `file` `<String>`
  - `object` `<Object>`
  - `options` `<Object>`
    - `spaces` `<Number|String>` Number of spaces to indent; or a string to use for indentation (i.e. pass `'\t'` for tab indentation). See [the docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_space_argument) for more info.
    - `EOL` `<String>` Set EOL character. Default is `\n`.
    - `replacer` [JSON replacer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter)
    - Also accepts [`fs.writeFileSync` options](https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options)

  ## Example:

  ```
  const fs = require('fs-extra')

  const file = '/tmp/this/path/does/not/exist/file.json'
  fs.outputJsonSync(file, {name: 'JP'})

  const data = fs.readJsonSync(file)
  console.log(data.name) // => JP
  ```

 */
export function outputJsonSync(file: string, data: any, options?: WriteOptions): void;
/**
  # outputJsonSync(file, object, [options])

  Almost the same as [`writeJsonSync`](writeJson-sync.md), except that if the directory does not exist, it's created.

  **Alias:** `outputJSONSync()`

  - `file` `<String>`
  - `object` `<Object>`
  - `options` `<Object>`
    - `spaces` `<Number|String>` Number of spaces to indent; or a string to use for indentation (i.e. pass `'\t'` for tab indentation). See [the docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_space_argument) for more info.
    - `EOL` `<String>` Set EOL character. Default is `\n`.
    - `replacer` [JSON replacer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter)
    - Also accepts [`fs.writeFileSync` options](https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options)

  ## Example:

  ```
  const fs = require('fs-extra')

  const file = '/tmp/this/path/does/not/exist/file.json'
  fs.outputJsonSync(file, {name: 'JP'})

  const data = fs.readJsonSync(file)
  console.log(data.name) // => JP
  ```

 */
export function outputJSONSync(file: string, data: any, options?: WriteOptions): void;

/**
  # writeJson(file, object, [options, callback])

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

  ## Example:

  ```
  const fs = require('fs-extra')

  // With a callback:
  fs.writeJson('./package.json', {name: 'fs-extra'}, err => {
    if (err) return console.error(err)

    console.log('success!')
  })

  // With Promises:
  fs.writeJson('./package.json', {name: 'fs-extra'})
  .then(() => {
    console.log('success!')
  })
  .catch(err => {
    console.error(err)
  })

  // With async/await:
  async function example () {
    try {
      await fs.writeJson('./package.json', {name: 'fs-extra'})
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }

  example()
  ```

  ---

  **See also:** [`outputJson()`](outputJson.md)

 */
export function writeJSON(file: string, object: any, options?: WriteOptions): Promise<void>;
/**
  # writeJson(file, object, [options, callback])

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

  ## Example:

  ```
  const fs = require('fs-extra')

  // With a callback:
  fs.writeJson('./package.json', {name: 'fs-extra'}, err => {
    if (err) return console.error(err)

    console.log('success!')
  })

  // With Promises:
  fs.writeJson('./package.json', {name: 'fs-extra'})
  .then(() => {
    console.log('success!')
  })
  .catch(err => {
    console.error(err)
  })

  // With async/await:
  async function example () {
    try {
      await fs.writeJson('./package.json', {name: 'fs-extra'})
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }

  example()
  ```

  ---

  **See also:** [`outputJson()`](outputJson.md)

 */
export function writeJSON(file: string, object: any, callback: (err: Error) => void): void;
/**
  # writeJson(file, object, [options, callback])

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

  ## Example:

  ```
  const fs = require('fs-extra')

  // With a callback:
  fs.writeJson('./package.json', {name: 'fs-extra'}, err => {
    if (err) return console.error(err)

    console.log('success!')
  })

  // With Promises:
  fs.writeJson('./package.json', {name: 'fs-extra'})
  .then(() => {
    console.log('success!')
  })
  .catch(err => {
    console.error(err)
  })

  // With async/await:
  async function example () {
    try {
      await fs.writeJson('./package.json', {name: 'fs-extra'})
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }

  example()
  ```

  ---

  **See also:** [`outputJson()`](outputJson.md)

 */
export function writeJSON(file: string, object: any, options: WriteOptions, callback: (err: Error) => void): void;
/**
  # writeJson(file, object, [options, callback])

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

  ## Example:

  ```
  const fs = require('fs-extra')

  // With a callback:
  fs.writeJson('./package.json', {name: 'fs-extra'}, err => {
    if (err) return console.error(err)

    console.log('success!')
  })

  // With Promises:
  fs.writeJson('./package.json', {name: 'fs-extra'})
  .then(() => {
    console.log('success!')
  })
  .catch(err => {
    console.error(err)
  })

  // With async/await:
  async function example () {
    try {
      await fs.writeJson('./package.json', {name: 'fs-extra'})
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }

  example()
  ```

  ---

  **See also:** [`outputJson()`](outputJson.md)

 */
export function writeJson(file: string, object: any, options?: WriteOptions): Promise<void>;
/**
  # writeJson(file, object, [options, callback])

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

  ## Example:

  ```
  const fs = require('fs-extra')

  // With a callback:
  fs.writeJson('./package.json', {name: 'fs-extra'}, err => {
    if (err) return console.error(err)

    console.log('success!')
  })

  // With Promises:
  fs.writeJson('./package.json', {name: 'fs-extra'})
  .then(() => {
    console.log('success!')
  })
  .catch(err => {
    console.error(err)
  })

  // With async/await:
  async function example () {
    try {
      await fs.writeJson('./package.json', {name: 'fs-extra'})
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }

  example()
  ```

  ---

  **See also:** [`outputJson()`](outputJson.md)

 */
export function writeJson(file: string, object: any, callback: (err: Error) => void): void;
/**
  # writeJson(file, object, [options, callback])

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

  ## Example:

  ```
  const fs = require('fs-extra')

  // With a callback:
  fs.writeJson('./package.json', {name: 'fs-extra'}, err => {
    if (err) return console.error(err)

    console.log('success!')
  })

  // With Promises:
  fs.writeJson('./package.json', {name: 'fs-extra'})
  .then(() => {
    console.log('success!')
  })
  .catch(err => {
    console.error(err)
  })

  // With async/await:
  async function example () {
    try {
      await fs.writeJson('./package.json', {name: 'fs-extra'})
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }

  example()
  ```

  ---

  **See also:** [`outputJson()`](outputJson.md)

 */
export function writeJson(file: string, object: any, options: WriteOptions, callback: (err: Error) => void): void;

/**
  # writeJsonSync(file, object, [options])

  Writes an object to a JSON file.

  **Alias:** `writeJSONSync()`

  - `file` `<String>`
  - `object` `<Object>`
  - `options` `<Object>`
    - `spaces` `<Number|String>` Number of spaces to indent; or a string to use for indentation (i.e. pass `'\t'` for tab indentation). See [the docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_space_argument) for more info.
    - `EOL` `<String>` Set EOL character. Default is `\n`.
    - `replacer` [JSON replacer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter)
    - Also accepts [`fs.writeFileSync` options](https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options)

  ## Example:

  ```
  const fs = require('fs-extra')

  fs.writeJsonSync('./package.json', {name: 'fs-extra'})
  ```
  ---

  **See also:** [`outputJsonSync()`](outputJson-sync.md)

 */
export function writeJsonSync(file: string, object: any, options?: WriteOptions): void;
/**
  # writeJsonSync(file, object, [options])

  Writes an object to a JSON file.

  **Alias:** `writeJSONSync()`

  - `file` `<String>`
  - `object` `<Object>`
  - `options` `<Object>`
    - `spaces` `<Number|String>` Number of spaces to indent; or a string to use for indentation (i.e. pass `'\t'` for tab indentation). See [the docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_space_argument) for more info.
    - `EOL` `<String>` Set EOL character. Default is `\n`.
    - `replacer` [JSON replacer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter)
    - Also accepts [`fs.writeFileSync` options](https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options)

  ## Example:

  ```
  const fs = require('fs-extra')

  fs.writeJsonSync('./package.json', {name: 'fs-extra'})
  ```
  ---

  **See also:** [`outputJsonSync()`](outputJson-sync.md)

 */
export function writeJSONSync(file: string, object: any, options?: WriteOptions): void;

/**
  # ensureFile(file, [callback])

  Ensures that the file exists. If the file that is requested to be created is in directories that do not exist, these directories are created. If the file already exists, it is **NOT MODIFIED**.

  **Alias:** `createFile()`

  - `file` `<String>`
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  const file = '/tmp/this/path/does/not/exist/file.txt'

  // With a callback:
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

  // With async/await:
  async function example (f) {
    try {
      await fs.ensureFile(f)
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }

  example(file)
  ```

 */
export function ensureFile(path: string): Promise<void>;
/**
  # ensureFile(file, [callback])

  Ensures that the file exists. If the file that is requested to be created is in directories that do not exist, these directories are created. If the file already exists, it is **NOT MODIFIED**.

  **Alias:** `createFile()`

  - `file` `<String>`
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  const file = '/tmp/this/path/does/not/exist/file.txt'

  // With a callback:
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

  // With async/await:
  async function example (f) {
    try {
      await fs.ensureFile(f)
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }

  example(file)
  ```

 */
export function ensureFile(path: string, callback: (err: Error) => void): void;
/**
  # ensureFileSync(file)

  Ensures that the file exists. If the file that is requested to be created is in directories that do not exist, these directories are created. If the file already exists, it is **NOT MODIFIED**.

  **Alias:** `createFileSync()`

  - `file` `<String>`

  ## Example:

  ```
  const fs = require('fs-extra')

  const file = '/tmp/this/path/does/not/exist/file.txt'
  fs.ensureFileSync(file)
  // file has now been created, including the directory it is to be placed in
  ```

 */
export function ensureFileSync(path: string): void;

/**
  # ensureLink(srcpath, dstpath, [callback])

  Ensures that the link exists. If the directory structure does not exist, it is created.

  - `srcpath` `<String>`
  - `dstpath` `<String>`
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  const srcpath = '/tmp/file.txt'
  const dstpath = '/tmp/this/path/does/not/exist/file.txt'

  // With a callback:
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

  // With async/await:
  async function example (src, dest) {
    try {
      await fs.ensureLink(src, dest)
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }

  example(srcpath, dstpath)
  ```

 */
export function ensureLink(src: string, dest: string): Promise<void>;
/**
  # ensureLink(srcpath, dstpath, [callback])

  Ensures that the link exists. If the directory structure does not exist, it is created.

  - `srcpath` `<String>`
  - `dstpath` `<String>`
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  const srcpath = '/tmp/file.txt'
  const dstpath = '/tmp/this/path/does/not/exist/file.txt'

  // With a callback:
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

  // With async/await:
  async function example (src, dest) {
    try {
      await fs.ensureLink(src, dest)
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }

  example(srcpath, dstpath)
  ```

 */
export function ensureLink(src: string, dest: string, callback: (err: Error) => void): void;
/**
  # ensureLinkSync(srcpath, dstpath)

  Ensures that the link exists. If the directory structure does not exist, it is created.

  - `srcpath` `<String>`
  - `dstpath` `<String>`

  ## Example:

  ```
  const fs = require('fs-extra')

  const srcpath = '/tmp/file.txt'
  const dstpath = '/tmp/this/path/does/not/exist/file.txt'
  fs.ensureLinkSync(srcpath, dstpath)
  // link has now been created, including the directory it is to be placed in
  ```

 */
export function ensureLinkSync(src: string, dest: string): void;

/**
  # ensureSymlink(srcpath, dstpath, [type, callback])

  Ensures that the symlink exists. If the directory structure does not exist, it is created.

  - `srcpath` `<String>`
  - `dstpath` `<String>`
  - `type` `<String>`
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  const srcpath = '/tmp/file.txt'
  const dstpath = '/tmp/this/path/does/not/exist/file.txt'

  // With a callback:
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

  // With async/await:
  async function example (src, dest) {
    try {
      await fs.ensureSymlink(src, dest)
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }

  example(srcpath, dstpath)
  ```

 */
export function ensureSymlink(src: string, dest: string, type?: SymlinkType): Promise<void>;
/**
  # ensureSymlink(srcpath, dstpath, [type, callback])

  Ensures that the symlink exists. If the directory structure does not exist, it is created.

  - `srcpath` `<String>`
  - `dstpath` `<String>`
  - `type` `<String>`
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  const srcpath = '/tmp/file.txt'
  const dstpath = '/tmp/this/path/does/not/exist/file.txt'

  // With a callback:
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

  // With async/await:
  async function example (src, dest) {
    try {
      await fs.ensureSymlink(src, dest)
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }

  example(srcpath, dstpath)
  ```

 */
export function ensureSymlink(src: string, dest: string, type: SymlinkType, callback: (err: Error) => void): void;
/**
  # ensureSymlink(srcpath, dstpath, [type, callback])

  Ensures that the symlink exists. If the directory structure does not exist, it is created.

  - `srcpath` `<String>`
  - `dstpath` `<String>`
  - `type` `<String>`
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  const srcpath = '/tmp/file.txt'
  const dstpath = '/tmp/this/path/does/not/exist/file.txt'

  // With a callback:
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

  // With async/await:
  async function example (src, dest) {
    try {
      await fs.ensureSymlink(src, dest)
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }

  example(srcpath, dstpath)
  ```

 */
export function ensureSymlink(src: string, dest: string, callback: (err: Error) => void): void;
/**
  # ensureSymlinkSync(srcpath, dstpath, [type])

  Ensures that the symlink exists. If the directory structure does not exist, it is created.

  - `srcpath` `<String>`
  - `dstpath` `<String>`
  - `type` `<String>`

  ## Example:

  ```
  const fs = require('fs-extra')

  const srcpath = '/tmp/file.txt'
  const dstpath = '/tmp/this/path/does/not/exist/file.txt'
  fs.ensureSymlinkSync(srcpath, dstpath)
  // symlink has now been created, including the directory it is to be placed in
  ```

 */
export function ensureSymlinkSync(src: string, dest: string, type?: SymlinkType): void;

/**
  # emptyDir(dir, [callback])

  Ensures that a directory is empty. Deletes directory contents if the directory is not empty. If the directory does not exist, it is created. The directory itself is not deleted.

  **Alias:** `emptydir()`

  - `dir` `<String>`
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  // assume this directory has a lot of files and folders
  // With a callback:
  fs.emptyDir('/tmp/some/dir', err => {
    if (err) return console.error(err)

    console.log('success!')
  })

  // With Promises:
  fs.emptyDir('/tmp/some/dir')
  .then(() => {
    console.log('success!')
  })
  .catch(err => {
    console.error(err)
  })

  // With async/await:
  async function example () {
    try {
      await fs.emptyDir('/tmp/some/dir')
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }

  example()
  ```

 */
export function emptyDir(path: string): Promise<void>;
/**
  # emptyDir(dir, [callback])

  Ensures that a directory is empty. Deletes directory contents if the directory is not empty. If the directory does not exist, it is created. The directory itself is not deleted.

  **Alias:** `emptydir()`

  - `dir` `<String>`
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  // assume this directory has a lot of files and folders
  // With a callback:
  fs.emptyDir('/tmp/some/dir', err => {
    if (err) return console.error(err)

    console.log('success!')
  })

  // With Promises:
  fs.emptyDir('/tmp/some/dir')
  .then(() => {
    console.log('success!')
  })
  .catch(err => {
    console.error(err)
  })

  // With async/await:
  async function example () {
    try {
      await fs.emptyDir('/tmp/some/dir')
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }

  example()
  ```

 */
export function emptyDir(path: string, callback: (err: Error) => void): void;
/**
  # emptyDirSync(dir)

  Ensures that a directory is empty. Deletes directory contents if the directory is not empty. If the directory does not exist, it is created. The directory itself is not deleted.

  **Alias:** `emptydirSync()`

  - `dir` `<String>`

  ## Example:

  ```
  const fs = require('fs-extra')

  // assume this directory has a lot of files and folders
  fs.emptyDirSync('/tmp/some/dir')
  ```

 */
export function emptyDirSync(path: string): void;

/**
  # pathExists(file[, callback])

  Test whether or not the given path exists by checking with the file system. Like [`fs.exists`](https://nodejs.org/api/fs.html#fs_fs_exists_path_callback), but with a normal callback signature (err, exists). Uses `fs.access` under the hood.

  - `file` `<String>`
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  const file = '/tmp/this/path/does/not/exist/file.txt'

  // With a callback:
  fs.pathExists(file, (err, exists) => {
    console.log(err) // => null
    console.log(exists) // => false
  })

  // Promise usage:
  fs.pathExists(file)
    .then(exists => console.log(exists)) // => false

  // With async/await:
  async function example (f) {
    const exists = await fs.pathExists(f)

    console.log(exists) // => false
  }

  example(file)
  ```

 */
export function pathExists(path: string): Promise<boolean>;
/**
  # pathExists(file[, callback])

  Test whether or not the given path exists by checking with the file system. Like [`fs.exists`](https://nodejs.org/api/fs.html#fs_fs_exists_path_callback), but with a normal callback signature (err, exists). Uses `fs.access` under the hood.

  - `file` `<String>`
  - `callback` `<Function>`

  ## Example:

  ```
  const fs = require('fs-extra')

  const file = '/tmp/this/path/does/not/exist/file.txt'

  // With a callback:
  fs.pathExists(file, (err, exists) => {
    console.log(err) // => null
    console.log(exists) // => false
  })

  // Promise usage:
  fs.pathExists(file)
    .then(exists => console.log(exists)) // => false

  // With async/await:
  async function example (f) {
    const exists = await fs.pathExists(f)

    console.log(exists) // => false
  }

  example(file)
  ```

 */
export function pathExists(path: string, callback: (err: Error, exists: boolean) => void): void;
/**
  # pathExistsSync(file)

  An alias for [`fs.existsSync()`](https://nodejs.org/api/fs.html#fs_fs_existssync_path), created for consistency with [`pathExists()`](pathExists.md).

 */
export function pathExistsSync(path: string): boolean;

// fs async methods
// copied from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/v6/index.d.ts

/** See https://nodejs.org/api/fs.html for documentation. */
export function access(path: string | Buffer, callback: (err: NodeJS.ErrnoException) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function access(path: string | Buffer, mode: number, callback: (err: NodeJS.ErrnoException) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function access(path: string | Buffer, mode?: number): Promise<void>;

/** See https://nodejs.org/api/fs.html for documentation. */
export function appendFile(file: string | Buffer | number, data: any, options: { encoding?: string; mode?: number | string; flag?: string; },
    callback: (err: NodeJS.ErrnoException) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function appendFile(file: string | Buffer | number, data: any, callback: (err: NodeJS.ErrnoException) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function appendFile(file: string | Buffer | number, data: any, options?: { encoding?: string; mode?: number | string; flag?: string; }): Promise<void>;

/** See https://nodejs.org/api/fs.html for documentation. */
export function chmod(path: string | Buffer, mode: string | number, callback: (err: NodeJS.ErrnoException) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function chmod(path: string | Buffer, mode: string | number): Promise<void>;

/** See https://nodejs.org/api/fs.html for documentation. */
export function chown(path: string | Buffer, uid: number, gid: number): Promise<void>;
/** See https://nodejs.org/api/fs.html for documentation. */
export function chown(path: string | Buffer, uid: number, gid: number, callback: (err: NodeJS.ErrnoException) => void): void;

/** See https://nodejs.org/api/fs.html for documentation. */
export function close(fd: number, callback: (err: NodeJS.ErrnoException) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function close(fd: number): Promise<void>;

/** See https://nodejs.org/api/fs.html for documentation. */
export function fchmod(fd: number, mode: string | number, callback: (err: NodeJS.ErrnoException) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function fchmod(fd: number, mode: string | number): Promise<void>;

/** See https://nodejs.org/api/fs.html for documentation. */
export function fchown(fd: number, uid: number, gid: number, callback: (err: NodeJS.ErrnoException) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function fchown(fd: number, uid: number, gid: number): Promise<void>;

/** See https://nodejs.org/api/fs.html for documentation. */
export function fdatasync(fd: number, callback: () => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function fdatasync(fd: number): Promise<void>;

/** See https://nodejs.org/api/fs.html for documentation. */
export function fstat(fd: number, callback: (err: NodeJS.ErrnoException, stats: Stats) => any): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function fstat(fd: number): Promise<Stats>;

/** See https://nodejs.org/api/fs.html for documentation. */
export function fsync(fd: number, callback: (err: NodeJS.ErrnoException) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function fsync(fd: number): Promise<void>;

/** See https://nodejs.org/api/fs.html for documentation. */
export function ftruncate(fd: number, callback: (err: NodeJS.ErrnoException) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function ftruncate(fd: number, len: number, callback: (err: NodeJS.ErrnoException) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function ftruncate(fd: number, len?: number): Promise<void>;

/** See https://nodejs.org/api/fs.html for documentation. */
export function futimes(fd: number, atime: number, mtime: number, callback: (err: NodeJS.ErrnoException) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function futimes(fd: number, atime: Date, mtime: Date, callback: (err: NodeJS.ErrnoException) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function futimes(fd: number, atime: number, mtime: number): Promise<void>;
/** See https://nodejs.org/api/fs.html for documentation. */
export function futimes(fd: number, atime: Date, mtime: Date): Promise<void>;

/** See https://nodejs.org/api/fs.html for documentation. */
export function lchown(path: string | Buffer, uid: number, gid: number, callback: (err: NodeJS.ErrnoException) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function lchown(path: string | Buffer, uid: number, gid: number): Promise<void>;

/** See https://nodejs.org/api/fs.html for documentation. */
export function link(srcpath: string | Buffer, dstpath: string | Buffer, callback: (err: NodeJS.ErrnoException) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function link(srcpath: string | Buffer, dstpath: string | Buffer): Promise<void>;

/** See https://nodejs.org/api/fs.html for documentation. */
export function lstat(path: string | Buffer, callback: (err: NodeJS.ErrnoException, stats: Stats) => any): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function lstat(path: string | Buffer): Promise<Stats>;

/**
 * Asynchronous mkdir - creates the directory specified in {path}.  Parameter {mode} defaults to 0777.
 *
 * @param callback No arguments other than a possible exception are given to the completion callback.
 */
/** See https://nodejs.org/api/fs.html for documentation. */
export function mkdir(path: string | Buffer, callback: (err: NodeJS.ErrnoException) => void): void;
/**
 * Asynchronous mkdir - creates the directory specified in {path}.  Parameter {mode} defaults to 0777.
 *
 * @param callback No arguments other than a possible exception are given to the completion callback.
 */
/** See https://nodejs.org/api/fs.html for documentation. */
export function mkdir(path: string | Buffer, mode: number | string, callback: (err: NodeJS.ErrnoException) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function mkdir(path: string | Buffer): Promise<void>;

/** See https://nodejs.org/api/fs.html for documentation. */
export function open(path: string | Buffer, flags: string | number, callback: (err: NodeJS.ErrnoException, fd: number) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function open(path: string | Buffer, flags: string | number, mode: number, callback: (err: NodeJS.ErrnoException, fd: number) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function open(path: string | Buffer, flags: string | number, mode?: number): Promise<number>;

/** See https://nodejs.org/api/fs.html for documentation. */
export function read(fd: number, buffer: Buffer, offset: number, length: number, position: number | null,
    callback: (err: NodeJS.ErrnoException, bytesRead: number, buffer: Buffer) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function read(fd: number, buffer: Buffer, offset: number, length: number, position: number | null): Promise<ReadResult>;

/** See https://nodejs.org/api/fs.html for documentation. */
export function readFile(file: string | Buffer | number, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function readFile(file: string | Buffer | number, encoding: string, callback: (err: NodeJS.ErrnoException, data: string) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function readFile(file: string | Buffer | number, options: { flag?: string; } | { encoding: string; flag?: string; }, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function readFile(file: string | Buffer | number, options: { flag?: string; } | { encoding: string; flag?: string; }): Promise<string>;
// tslint:disable-next-line:unified-signatures
/** See https://nodejs.org/api/fs.html for documentation. */
export function readFile(file: string | Buffer | number, encoding: string): Promise<string>;
/** See https://nodejs.org/api/fs.html for documentation. */
export function readFile(file: string | Buffer | number): Promise<Buffer>;

/** See https://nodejs.org/api/fs.html for documentation. */
export function readdir(path: string | Buffer, callback: (err: NodeJS.ErrnoException, files: string[]) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function readdir(path: string | Buffer): Promise<string[]>;

/** See https://nodejs.org/api/fs.html for documentation. */
export function readlink(path: string | Buffer, callback: (err: NodeJS.ErrnoException, linkString: string) => any): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function readlink(path: string | Buffer): Promise<string>;

/** See https://nodejs.org/api/fs.html for documentation. */
export function realpath(path: string | Buffer, callback: (err: NodeJS.ErrnoException, resolvedPath: string) => any): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function realpath(path: string | Buffer, cache: { [path: string]: string }, callback: (err: NodeJS.ErrnoException, resolvedPath: string) => any): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function realpath(path: string | Buffer, cache?: { [path: string]: string }): Promise<string>;

/** See https://nodejs.org/api/fs.html for documentation. */
export function rename(oldPath: string, newPath: string, callback: (err: NodeJS.ErrnoException) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function rename(oldPath: string, newPath: string): Promise<void>;

/**
 * Asynchronous rmdir - removes the directory specified in {path}
 *
 * @param callback No arguments other than a possible exception are given to the completion callback.
 */
/** See https://nodejs.org/api/fs.html for documentation. */
export function rmdir(path: string | Buffer, callback: (err: NodeJS.ErrnoException) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function rmdir(path: string | Buffer): Promise<void>;

/** See https://nodejs.org/api/fs.html for documentation. */
export function stat(path: string | Buffer, callback: (err: NodeJS.ErrnoException, stats: Stats) => any): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function stat(path: string | Buffer): Promise<Stats>;

/** See https://nodejs.org/api/fs.html for documentation. */
export function symlink(srcpath: string | Buffer, dstpath: string | Buffer, type: FsSymlinkType | undefined, callback: (err: NodeJS.ErrnoException) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function symlink(srcpath: string | Buffer, dstpath: string | Buffer, callback: (err: NodeJS.ErrnoException) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function symlink(srcpath: string | Buffer, dstpath: string | Buffer, type?: FsSymlinkType): Promise<void>;

/** See https://nodejs.org/api/fs.html for documentation. */
export function truncate(path: string | Buffer, callback: (err: NodeJS.ErrnoException) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function truncate(path: string | Buffer, len: number, callback: (err: NodeJS.ErrnoException) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function truncate(path: string | Buffer, len?: number): Promise<void>;

/**
 * Asynchronous unlink - deletes the file specified in {path}
 *
 * @param callback No arguments other than a possible exception are given to the completion callback.
 */
/** See https://nodejs.org/api/fs.html for documentation. */
export function unlink(path: string | Buffer, callback: (err: NodeJS.ErrnoException) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function unlink(path: string | Buffer): Promise<void>;

/** See https://nodejs.org/api/fs.html for documentation. */
export function utimes(path: string | Buffer, atime: number, mtime: number, callback: (err: NodeJS.ErrnoException) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function utimes(path: string | Buffer, atime: Date, mtime: Date, callback: (err: NodeJS.ErrnoException) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function utimes(path: string | Buffer, atime: number, mtime: number): Promise<void>;
/** See https://nodejs.org/api/fs.html for documentation. */
export function utimes(path: string | Buffer, atime: Date, mtime: Date): Promise<void>;

/** See https://nodejs.org/api/fs.html for documentation. */
export function write(fd: number, buffer: Buffer, offset: number, length: number, position: number | null, callback: (err: NodeJS.ErrnoException, written: number, buffer: Buffer) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function write(fd: number, buffer: Buffer, offset: number, length: number, callback: (err: NodeJS.ErrnoException, written: number, buffer: Buffer) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function write(fd: number, data: any, callback: (err: NodeJS.ErrnoException, written: number, str: string) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function write(fd: number, data: any, offset: number, callback: (err: NodeJS.ErrnoException, written: number, str: string) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function write(fd: number, data: any, offset: number, encoding: string, callback: (err: NodeJS.ErrnoException, written: number, str: string) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function write(fd: number, buffer: Buffer, offset: number, length: number, position?: number | null): Promise<WriteResult>;
/** See https://nodejs.org/api/fs.html for documentation. */
export function write(fd: number, data: any, offset: number, encoding?: string): Promise<WriteResult>;

/** See https://nodejs.org/api/fs.html for documentation. */
export function writeFile(file: string | Buffer | number, data: any, callback: (err: NodeJS.ErrnoException) => void): void;
/** See https://nodejs.org/api/fs.html for documentation. */
export function writeFile(file: string | Buffer | number, data: any, options?: WriteFileOptions | string): Promise<void>;
/** See https://nodejs.org/api/fs.html for documentation. */
export function writeFile(file: string | Buffer | number, data: any, options: WriteFileOptions | string, callback: (err: NodeJS.ErrnoException) => void): void;

/** See https://nodejs.org/api/fs.html for documentation. */
export function mkdtemp(prefix: string): Promise<string>;
/** See https://nodejs.org/api/fs.html for documentation. */
export function mkdtemp(prefix: string, callback: (err: NodeJS.ErrnoException, folder: string) => void): void;

export interface PathEntry {
    path: string;
    stats: Stats;
}

export interface PathEntryStream {
    read(): PathEntry | null;
}

export type CopyFilterSync = (src: string, dest: string) => boolean;
export type CopyFilterAsync = (src: string, dest: string) => Promise<boolean>;

export type SymlinkType = 'dir' | 'file';
export type FsSymlinkType = 'dir' | 'file' | 'junction';

export interface CopyOptions {
    dereference?: boolean;
    overwrite?: boolean;
    preserveTimestamps?: boolean;
    errorOnExist?: boolean;
    filter?: CopyFilterSync | CopyFilterAsync;
    recursive?: boolean;
}

export interface CopyOptionsSync extends CopyOptions {
    filter?: CopyFilterSync;
}

export interface MoveOptions {
    overwrite?: boolean;
    limit?: number;
}

export interface ReadOptions {
    throws?: boolean;
    fs?: object;
    reviver?: any;
    encoding?: string;
    flag?: string;
}

export interface WriteFileOptions {
    encoding?: string;
    flag?: string;
    mode?: number;
}

export interface WriteOptions extends WriteFileOptions {
    fs?: object;
    replacer?: any;
    spaces?: number | string;
    EOL?: string;
}

export interface ReadResult {
    bytesRead: number;
    buffer: Buffer;
}

export interface WriteResult {
    bytesWritten: number;
    buffer: Buffer;
}
