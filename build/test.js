// go back to root if spawned from test dir, has no effect on require()
if (process.cwd().endsWith('test')) {
  process.chdir('..');
}
require('../test/test.js');
