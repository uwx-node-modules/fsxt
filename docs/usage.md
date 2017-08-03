Usage
-----

`fs-extra+` is a drop in replacement for native [`fs`](http://nodejs.org/docs/latest/api/fs.html). All methods in [`fs`](http://nodejs.org/docs/latest/api/fs.html) are unmodified and attached to `fs-extra+`.

You don't ever need to include the original [`fs`](http://nodejs.org/docs/latest/api/fs.html) module again:

```js
const fs = require('fs'); // this is no longer necessary
```

you can now do this:

```js
const fs = require('fs-extra');
```

or if you prefer to make it clear that you're using `fs-extra` and not [`fs`](http://nodejs.org/docs/latest/api/fs.html), you may want
to name your [`fs`](http://nodejs.org/docs/latest/api/fs.html) variable `fse` like so:

```js
const fse = require('fs-extra');
```

you can also keep both, but it's redundant:

```js
const fs = require('fs');
const fse = require('fs-extra');
```