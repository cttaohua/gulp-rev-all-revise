gulp-rev-append-all2
---
> gulp插件用于使用查询字符串文件哈希值加载文件末尾破坏缓存文件

特此说明：
---
本插件是在[gulp-rev-append-all](https://github.com/OuIChien/gulp-rev-append-all)上改进而来，优化了[gulp-rev-append-all](https://github.com/OuIChien/gulp-rev-append-all)在使用过程中可能出现的两个问题      

1、gulp-rev-append-all无法处理绝对路径，因为在绝对路径下它无法找到目标文件，本插件可传参数 'assets': '../public' 解决此问题      
2、gulp-rev-append-all无法第二次使用，原因是带了版本号的文件路径node不能读取，本插件已优化处理


安装
---
```
$ npm install gulp-rev-append-all2 --save-dev
```

如何使用?
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
或者
---
```
var rev = require('gulp-rev-append-all2');

gulp.task('rev', function() {
  gulp.src('./index.html')
    .pipe(rev({
			assets: '../public'   //html和静态资源的相对路径
		}))
    .pipe(gulp.dest('.'));
});

```

_terminal_
```
$ gulp rev
```

原理?
---
[gulp-rev-append-all2] 是基于 [gulp-rev-append-all](https://github.com/OuIChien/gulp-rev-append-all)插件允许给链接追加一个查询文件根据数据摘要算法得到的哈希值，html文件中声明使用以下正则表达式: `(?:href=|src=|url\()['|"]([^\s>"']+?)['|"]`

对于html文件中声明的任何样式表或脚本声明来说，这个可以防止浏览器缓存，如下所示:

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

运行完之后 `gulp-rev-append-all2`:
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

分享
---
在实际的开发中我们处理静态资源加载通常会设置nginx的缓存时间为永不过期，然后我们要给css和js加个后缀，通常是日期，在上线的时候修改后缀，通知浏览器我们更新了css和js，让浏览器重新去加载。
但是这种做法有个弊端，就是假如我们只修改了其中一个文件，但是浏览器要重新加载所有的文件。本插件完美的解决了这个问题，非常适用于使用gulp的多页面应用。
