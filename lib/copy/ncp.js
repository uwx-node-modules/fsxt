// imported from ncp (this is temporary, will rewrite)

let fs = require('graceful-fs');
let path = require('path');
let utimes = require('../util/utimes');

function ncp(source, dest, options, callback) {
  if (!callback) {
    callback = options;
    options = {};
  }

  let basePath = process.cwd();
  let currentPath = path.resolve(basePath, source);
  let targetPath = path.resolve(basePath, dest);

  let filter = options.filter;
  let transform = options.transform;
  let overwrite = options.overwrite;
  // If overwrite is undefined, use clobber, otherwise default to true:
  if (overwrite === undefined)
    overwrite = options.clobber;
  if (overwrite === undefined)
    overwrite = true;
  let errorOnExist = options.errorOnExist;
  let dereference = options.dereference;
  let preserveTimestamps = options.preserveTimestamps === true;

  let started = 0;
  let finished = 0;
  let running = 0;

  let errored = false;

  startCopy(currentPath);

  function startCopy(source) {
    started++;
    if (filter) {
      if (filter instanceof RegExp) {
        console.warn('Warning: fs-extra: Passing a RegExp filter is deprecated, use a function');
        if (!filter.test(source)) {
          return doneOne(true);
        }
      } else if (typeof filter === 'function') {
        if (!filter(source, dest)) {
          return doneOne(true);
        }
      }
    }
    return getStats(source);
  }

  function getStats(source) {
    let stat = dereference ? fs.stat : fs.lstat;
    running++;
    stat(source, function(err, stats) {
      if (err) return onError(err);

      // We need to get the mode from the stats object and preserve it.
      let item = {
        name: source,
        mode: stats.mode,
        mtime: stats.mtime, // modified time
        atime: stats.atime, // access time
        stats: stats, // temporary
      };

      if (stats.isDirectory()) {
        return onDir(item);
      } else if (stats.isFile() || stats.isCharacterDevice() || stats.isBlockDevice()) {
        return onFile(item);
      } else if (stats.isSymbolicLink()) {
        // Symlinks don't really need to know about the mode.
        return onLink(source);
      }
    });
  }

  function onFile(file) {
    let target = file.name.replace(currentPath, targetPath.replace('$', '$$$$')); // escapes '$' with '$$'
    isWritable(target, function(writable) {
      if (writable) {
        copyFile(file, target);
      } else {
        if (overwrite) {
          rmFile(target, function() {
            copyFile(file, target);
          });
        } else if (errorOnExist) {
          onError(new Error(target + ' already exists'));
        } else {
          doneOne();
        }
      }
    });
  }

  function copyFile(file, target) {
    let readStream = fs.createReadStream(file.name);
    let writeStream = fs.createWriteStream(target, {
      mode: file.mode
    });

    readStream.on('error', onError);
    writeStream.on('error', onError);

    if (transform) {
      transform(readStream, writeStream, file);
    } else {
      writeStream.on('open', function() {
        readStream.pipe(writeStream);
      });
    }

    writeStream.once('close', function() {
      fs.chmod(target, file.mode, function(err) {
        if (err) return onError(err);
        if (preserveTimestamps) {
          utimes.utimesMillis(target, file.atime, file.mtime, function(err) {
            if (err) return onError(err);
            return doneOne();
          });
        } else {
          doneOne();
        }
      });
    });
  }

  function rmFile(file, done) {
    fs.unlink(file, function(err) {
      if (err) return onError(err);
      return done();
    });
  }

  function onDir(dir) {
    let target = dir.name.replace(currentPath, targetPath.replace('$', '$$$$')); // escapes '$' with '$$'
    isWritable(target, function(writable) {
      if (writable) {
        return mkDir(dir, target);
      }
      copyDir(dir.name);
    });
  }

  function mkDir(dir, target) {
    fs.mkdir(target, dir.mode, function(err) {
      if (err) return onError(err);
      // despite setting mode in fs.mkdir, doesn't seem to work
      // so we set it here.
      fs.chmod(target, dir.mode, function(err) {
        if (err) return onError(err);
        copyDir(dir.name);
      });
    });
  }

  function copyDir(dir) {
    fs.readdir(dir, function(err, items) {
      if (err) return onError(err);
      items.forEach(function(item) {
        startCopy(path.join(dir, item));
      });
      return doneOne();
    });
  }

  function onLink(link) {
    let target = link.replace(currentPath, targetPath);
    fs.readlink(link, function(err, resolvedPath) {
      if (err) return onError(err);
      checkLink(resolvedPath, target);
    });
  }

  function checkLink(resolvedPath, target) {
    if (dereference) {
      resolvedPath = path.resolve(basePath, resolvedPath);
    }
    isWritable(target, function(writable) {
      if (writable) {
        return makeLink(resolvedPath, target);
      }
      fs.readlink(target, function(err, targetDest) {
        if (err) return onError(err);

        if (dereference) {
          targetDest = path.resolve(basePath, targetDest);
        }
        if (targetDest === resolvedPath) {
          return doneOne();
        }
        return rmFile(target, function() {
          makeLink(resolvedPath, target);
        });
      });
    });
  }

  function makeLink(linkPath, target) {
    fs.symlink(linkPath, target, function(err) {
      if (err) return onError(err);
      return doneOne();
    });
  }

  function isWritable(path, done) {
    fs.lstat(path, function(err) {
      if (err) {
        if (err.code === 'ENOENT') return done(true);
        return done(false);
      }
      return done(false);
    });
  }

  function onError(err) {
    // ensure callback is defined & called only once:
    if (!errored && callback !== undefined) {
      errored = true;
      return callback(err);
    }
  }

  function doneOne(skipped) {
    if (!skipped) running--;
    finished++;
    if ((started === finished) && (running === 0)) {
      if (callback !== undefined) {
        return callback(null);
      }
    }
  }
}

module.exports = ncp;
