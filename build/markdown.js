'use strict';
const fs = require('../');

(async () => {
  let readme = await fs.readFile('./README.md', 'utf8');

  readme = await cum(readme);

  readme = await cum2(readme);

  for (let e of [
    'ending',
    'heading',
    'installation',
    'syncinfo',
    'usage',
  ]) {
    readme = await cum3(e, readme);
  }

  await fs.writeFile('./README.md', readme);
})();

async function cum(readme) {
  const fseDocs = await fs.readdir('./docs/fs-extra');
  const docs = [];
  fseDocs.forEach((e) => {
    let doc = fs.readFileSync('./docs/fs-extra/' + e, 'utf8');
    doc = doc.replace(/^(#+)/gm, '#$1');
    docs.push(doc);
  });
  return readme.replace(/ ?<!-- BEGIN fsextra -->[\s\S]*?<!-- ENDIN fsextra --> ?/, ' <!-- BEGIN fsextra --> ' + docs.join('\n') + ' <!-- ENDIN fsextra --> ');
}

async function cum2(readme) {
  const nodeDocs = await fs.readFile('./docs/fs.md', 'utf8');
  return readme.replace(/ ?<!-- BEGIN nodejsfs -->[\s\S]*?<!-- ENDIN nodejsfs --> ?/, ' <!-- BEGIN nodejsfs --> ' + nodeDocs + ' <!-- ENDIN nodejsfs --> ');
}

async function cum3(fname, readme) {
  return readme.replace(new RegExp(' ?<!-- BEGIN ' + fname + ' -->[\\s\\S]*?<!-- ENDIN ' + fname + ' --> ?'), ' <!-- BEGIN ' + fname + ' --> ' + (await fs.readFile('./docs/' + fname + '.md')) + ' <!-- ENDIN ' + fname + ' --> ');
}
