Third Party
-----------

## File / Directory Watching

If you want to watch for changes to files or directories, then you should use [chokidar](https://github.com/paulmillr/chokidar).


## Misc.

- [mfs](https://github.com/cadorn/mfs) - Monitor your fsxt calls.

Hacking on fsxt
-------------------

Do you want to hack on fsxt? Well, that's pretty dumb. Still, you can go ahead and send a PR.

fsxt uses the [Google Style](https://google.github.io/styleguide/jsguide.html). It's good-looking and safe JavaScript as God (Brendan Eich) intended.

## Running the Test Suite

fsxt contains hundreds of tests that don't work.

- `npm run lint`: runs eslint
- `npm run unit`: runs the unit tests
- `npm test`: runs both the linter and the tests

## Windows

If you run the tests on the Windows and receive a lot of symbolic link `EPERM` permission errors, it's
because on Windows you need elevated privilege to create symbolic links. You can add this to your Windows's
account by following the instructions here: http://superuser.com/questions/104845/permission-to-make-symbolic-links-in-windows-7
However, I didn't have much luck doing this.

Since I develop on Mac OS X, I use VMWare Fusion for Windows testing. I create a shared folder that I map to a drive on Windows.
I open the `Node.js command prompt` and run as `Administrator`. I then map the network drive running the following command:

    net use z: "\\vmware-host\Shared Folders"

I can then navigate to my `fsxt` directory and run the tests.

Naming
------

eh just go with whatever feels good

License
-------

Licensed under MIT

`fs-extra` is copyright (c) 2011-2017 [JP Richardson](https://github.com/jprichardson)

`fsxt` is copyright © 2016-2017 [chrishansen69/rafa1231518](https://github.com/rafa1231518), some rights reserved.

Parts of the documentation have been completely stolen from [create-readdir-stream](https://github.com/tunnckoCore/create-readdir-stream/),
[diveSync](https://github.com/pvorb/node-diveSync), [dive](https://github.com/pvorb/node-dive) and the Node.js `fs` module.

`fs-extra` and `fsxt` are not endorsed by or affiliated with Joyent or the Node.js Foundation.
`fsxt` is not endorsed by or affiliated with JP Richardson, but who would want that, anyway?
