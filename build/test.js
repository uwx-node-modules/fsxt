// @ts-check
// go back to root if spawned from test dir, has no effect on require()
if (process.cwd().endsWith('build')) {
  process.chdir('..');
}
require('../test/test.js');
