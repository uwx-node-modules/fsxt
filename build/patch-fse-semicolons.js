'use strict';

const esformatter = require('esformatter');
const fs = require('..');

for (let file of fs.diveSync('./lib')) {
  if (!file.endsWith('.js')) continue;
  try {
    fs.writeFileSync('./' + file, 
      esformatter.format(fs.readFileSync('./' + file, 'utf8'), {
        //extends: [ require('esformatter/lib/preset/default.js') ],
        plugins: 'esformatter-semicolons',
      })
    );
  } catch (e) {
    console.error('Failed in file', file);
    console.error(e);
  }
}