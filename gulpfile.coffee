gulp = require('gulp')
$ = require('gulp-load-plugins')()
del = require('del')
runSequence = require('run-sequence')

gulp.task 'scripts', ->
  coffeeStream = $.coffee(bare: yes)
  coffeeStream.on 'error', (error) ->
    $.util.log(error)
    coffeeStream.end()
  gulp.src('src/**/*.coffee')
  .pipe(coffeeStream)
  .pipe($.angularFilesort())
  .pipe($.ngAnnotate())
  .pipe($.concat('ng-simple-daterangepicker.js'))
  .pipe(gulp.dest('dist'))
  .pipe($.uglify())
  .pipe($.concat('ng-simple-daterangepicker.min.js'))
  .pipe(gulp.dest('dist'))

gulp.task 'clean', (done) ->
  del(['dist/**'], done)

gulp.task 'default', (done) ->
  runSequence 'clean', 'scripts', done
