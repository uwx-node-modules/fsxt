Usage
-----

`fsxt` is a drop in replacement for native [`fs`](http://nodejs.org/docs/latest/api/fs.html). All methods in [`fs`](http://nodejs.org/docs/latest/api/fs.html) are unmodified and attached to `fsxt`.

You don't ever need to include the original [`fs`](http://nodejs.org/docs/latest/api/fs.html) module again:

```js
const fs = require('fs'); // this is no longer necessary
```

you can now do this:

```js
const fs = require('fsxt');
```

or if you prefer to make it clear that you're using `fsxt` and not [`fs`](http://nodejs.org/docs/latest/api/fs.html), you may want
to name your [`fs`](http://nodejs.org/docs/latest/api/fs.html) variable `fse` like so:

```js
const fse = require('fsxt');
```

you can also keep both, but it's redundant:

```js
const fs = require('fs');
const fse = require('fsxt');
```

#### Useful Resources
- [About ](#about-fsread--fswrite)[fs.read()](#fsread)[ & ](#about-fsread--fswrite)[fs.write()](#fswrite)
- [FS Constants](#fs-constants)
- [File Access Constants](#file-access-constants)
- [File Open Constants](#file-open-constants)
- [File Type Constants](#file-type-constants)
- [File Mode Constants](#file-mode-constants)