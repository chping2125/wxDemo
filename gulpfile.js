var gulp = require('gulp');

var sass = require('gulp-sass');

var rename = require('gulp-rename');

// 引入 gulp-webserver 模块
var webserver = require('gulp-webserver');
// 启动 webserver
gulp.task('webserver', function () {
  gulp.src('./')
    .pipe(webserver({
      host: 'localhost',
      port: 80,
      directoryListing: {
        enable: true,
        path: './'
      },
      livereload: true,
    }));
});

gulp.task('scss', function () {
  gulp.src('./**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename(function (path) {
      path.extname = '.wxss';
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
  gulp.watch('./pages/**/*', ['scss']);
  gulp.watch('./*.scss', ['scss']);
});

gulp.task('default', ['watch', 'webserver'], function () {
  console.log('任务队列执行完毕~');
});
