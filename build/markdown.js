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
    'node-fs-nav',
    'nav',
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
  return readme.replace(/ ?<!-- BEGIN fsextra -->[\s\S]*?<!-- ENDIN fsextra --> ?/, ' <!-- BEGIN fsextra -->\n' + docs.join('\n') + '\n<!-- ENDIN fsextra --> ');
}

async function cum2(readme) {
  const nodeDocs = await fs.readFile('./docs/fs.md', 'utf8');
  return readme.replace(/ ?<!-- BEGIN nodejsfs -->[\s\S]*?<!-- ENDIN nodejsfs --> ?/, ' <!-- BEGIN nodejsfs -->\n' + nodeDocs + '\n<!-- ENDIN nodejsfs --> ');
}

async function cum3(fname, readme) {
  return readme.replace(new RegExp(' ?<!-- BEGIN ' + fname + ' -->[\\s\\S]*?<!-- ENDIN ' + fname + ' --> ?'), ' <!-- BEGIN ' + fname + ' -->\n' + (await fs.readFile('./docs/' + fname + '.md')) + '\n<!-- ENDIN ' + fname + ' --> ');
}
