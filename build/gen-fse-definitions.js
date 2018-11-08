const fs = require('..');

const aliases = {
  createFile: 'ensureFile',
  createFileSync: 'ensureFile-sync',
  mkdirs: 'ensureDir',
  mkdirsSync: 'ensureDir-sync',
  mkdirp: 'ensureDir',
  mkdirpSync: 'ensureDir-sync',
}

const rawapi = [
  'access',
  'appendFile',
  'chmod',
  'chown',
  'close',
  'copyFile',
  'fchmod',
  'fchown',
  'fdatasync',
  'fstat',
  'fsync',
  'ftruncate',
  'futimes',
  'lchown',
  'lchmod',
  'link',
  'lstat',
  'mkdir',
  'mkdtemp',
  'open',
  'readFile',
  'readdir',
  'readlink',
  'realpath',
  'rename',
  'rmdir',
  'stat',
  'symlink',
  'truncate',
  'unlink',
  'utimes',
  'writeFile',
  'read',
  'write',

  'accessSync',
  'appendFileSync',
  'chmodSync',
  'chownSync',
  'closeSync',
  'copyFileSync',
  'fchmodSync',
  'fchownSync',
  'fdatasyncSync',
  'fstatSync',
  'fsyncSync',
  'ftruncateSync',
  'futimesSync',
  'lchownSync',
  'lchmodSync',
  'linkSync',
  'lstatSync',
  'mkdirSync',
  'mkdtempSync',
  'openSync',
  'readFileSync',
  'readdirSync',
  'readlinkSync',
  'realpathSync',
  'renameSync',
  'rmdirSync',
  'statSync',
  'symlinkSync',
  'truncateSync',
  'unlinkSync',
  'utimesSync',
  'writeFileSync',
];

(async () => {
  function find(name) {
    let attempt = `docs/${name.replace('Sync', '-sync')}.md`
    if (fs.pathExistsSync(attempt)) return attempt;

    attempt = `docs/${aliases[name]}.md`
    if (fs.pathExistsSync(attempt)) return attempt;

    return null;
  }

  let template = await fs.readText('fs-extra.template.d.ts');
  const eol = '\n';
  if (template.includes('\r\n')) eol = '\r\n';

  template = template.replace(/export function (\w+)/g, ($, $1) => {
    const docFile = find($1);
    if (docFile != null) {
      let doc = fs.readLinesSync(docFile).map(e => ('  ' + e).trimRight());
      return `/**${eol}${doc.join(eol)}${eol} */${eol}export function ${$1}`;
    } else if (rawapi.includes($1)) {
      return `/** See https://nodejs.org/api/fs.html for documentation. */${eol}export function ${$1}`;
    } else {
      console.warn('missing ' + $1);
    }
  });

  template = template.replace(/```js/g, '```');

  await fs.writeFile('fs-extra.d.ts', template);
})();
