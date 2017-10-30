Sync vs Async
-------------
Most methods are asynchronous by default (they take a callback with an `Error` or `null` as first argument, and some form of data as the second).
All async methods will return a Promise if the callback isn't passed.

Synchronous methods on the other hand will throw if an error occurs, and return the second parameter of what would be in the async callback.

Example:

```js
const fs = require('fsxt');

fs.copy('/tmp/myfile', '/tmp/mynewfile', function (err) {
  if (err) return console.error(err)
  console.log("success!");
});

try {
  fs.copySync('/tmp/myfile', '/tmp/mynewfile');
  console.log("success!");
} catch (err) {
  console.error(err);
}
```