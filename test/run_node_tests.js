require('events').EventEmitter.prototype._maxListeners = 1000;

/**
 * Removes a module from the cache
 */
function purgeCache(moduleName) {
  // Traverse the cache looking for the files
  // loaded by the specified module name
  searchCache(moduleName, function(mod) {
    delete require.cache[mod.id];
  });

  // Remove cached paths to the module.
  // Thanks to @bentael for pointing this out.
  Object.keys(module.constructor._pathCache).forEach(function(cacheKey) {
    if (cacheKey.indexOf(moduleName)>0) {
      delete module.constructor._pathCache[cacheKey];
    }
  });
}

/**
 * Traverses the cache to search for all the cached
 * files of the specified module name
 */
function searchCache(moduleName, callback) {
  // Resolve the module identified by the specified name
  let mod = require.resolve(moduleName);

  // Check if the module has been resolved and found within
  // the cache
  if (mod && ((mod = require.cache[mod]) !== undefined)) {
    // Recursively go over the results
    (function traverse(mod) {
      // Go over each of the module's children and
      // traverse them
      mod.children.forEach(function(child) {
        traverse(child);
      });

      // Call the specified callback providing the
      // found cached module
      callback(mod);
    }(mod));
  }
}

const fs = require('../');
const chalk = require('chalk');

let current = 'N/A';
const info = {};
const errors = {};
const asyncErrors = [];
let count = 0;
let successes = 0;
let failures = 0;

process.exit = function() {};

const con = console.log;
console.log = function() {
  info[current] = Array.from(arguments).join(' ');
};

// process.on('uncaughtException', err => {
//  asyncErrors.push(err);
// });

console.log('we');

process.stdout.write('    ');

fs.diveSync('./test/node').filter((e) => e.indexOf('test-')>-1 && e.endsWith('.js')).forEach((e) => {
  current = e;
  count++;
  if (count > 80) {
    process.stdout.write('\n    ');
    count = 0;
  }
  try {
    require('../'+e);
  } catch (ex) {
    errors[current] = ''+ex.stack;
    process.stdout.write(chalk.red('!'));
    failures++;
    return;
  }
  successes++;
  process.stdout.write(chalk.gray('.'));
});

process.stdout.write('\n\n');
process.stdout.write(chalk.green('succeeded: ' + successes) + '\n');
process.stdout.write(chalk.red('errored:   ' + failures) + '\n');
process.stdout.write(chalk.yellow('hidden:    ' + asyncErrors.length) + '\n');

process.stdout.write('\n\n');
// process.stdout.write(JSON.stringify(errors));
process.stdout.write(Object.keys(errors).map((e) => chalk.blue(e + ': ') + '\n    ' + (errors[e].split('\n').join('\n    '))).join('\n\n'));
process.stdout.write('\n\n');

console.error = null;

process.stdout.write('(end of input)\n\n');
