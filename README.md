gulp-rev-append-all
---
> gulp plugin for cache-busting files using query string file hash

[![Build Status](https://travis-ci.org/bustardcelly/gulp-rev-append.png?branch=master)](https://travis-ci.org/bustardcelly/gulp-rev-append)

installation
---
```
$ npm install gulp-rev-append-all2 --save-dev
```

how?
---
_gulpfile.js_
```
var rev = require('gulp-rev-append-all2');

gulp.task('rev', function() {
  gulp.src('./index.html')
    .pipe(rev())
    .pipe(gulp.dest('.'));
});

```

_terminal_
```
$ gulp rev
```

what?
---
The [gulp-rev-append-all] is base on [gulp-rev-append](https://github.com/bustardcelly/gulp-rev-append) plugins allows for appending a query-string file hash to dependencies declared in html files defined using the following regex: `(?:href=|src=|url\()['|"]([^\s>"']+?)['|"]`

That's fancy talk for any stylesheet or script declarations that are declared in an html file such as the following:

```
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="style/style-one.css">
    <script src="script/script-one.js"></script>
    <script src="script/script-two.js"></script>
  </head>
  <body>
    <div><p>hello, world!</p></div>
    <script src="script/script-three.js"></script>
  </body>
</html>
```

will turn into something similar as the following after running `gulp-rev-append-all2`:
```
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="style/style-one.css?v=d65aaba987e9c1eefeb4be9cfd34e0de">
    <script src="script/script-one.js?v=17a5da6c8a2d875cf48aefb722eefa07"></script>
    <script src="script/script-two.js?v=d65aaba987e9c1eefeb4be9cfd34e0de"></script>
  </head>
  <body>
    <div><p>hello, world!</p></div>
    <script src="script/script-three.js?v=5cadf43edba6a97980d42331f9fffd17"></script>
  </body>
</html>
```

License
---
Copyright (c) 2014 Todd Anderson

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
