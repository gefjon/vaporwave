# Vaporwave - a web design project

This project uses [npm](https://www.npmjs.com/),
[Browserify](http://browserify.org/),
[Babeljs](https://babeljs.io/),
[Sass](http://sass-lang.com/),
plus [Gnu Make](https://www.gnu.org/software/make/) to handle compilation.

Babel & Browserify are handled by npm, but you'll have to install npm, Sass, and
Make for yourself. Install those things, run `make` in the project's root, and
then get an http server of some description to serve `src/demo.html` to see
what's going on. I use
[`http-server`](https://www.npmjs.com/package/http-server) for development, and
I find that the command I'm running the most often is:


```
make clean && make && http-server
```
