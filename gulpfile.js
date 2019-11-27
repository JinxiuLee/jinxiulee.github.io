var gulp = require('gulp')
var gutil = require('gulp-util')
var gulpif = require('gulp-if')
var autoprefixer = require('gulp-autoprefixer')
var cssmin = require('gulp-cssmin')
var less = require('gulp-less')
var concat = require('gulp-concat')
var plumber = require('gulp-plumber')
var buffer = require('vinyl-buffer')
var source = require('vinyl-source-stream')
var babelify = require('babelify')
var browserify = require('browserify')
var watchify = require('watchify')
var uglify = require('gulp-uglify')
var livereload = require('gulp-livereload')
var sourcemaps = require('gulp-sourcemaps')

var production = process.env.NODE_ENV === 'production'
var dependencies = [

]

/*
 |--------------------------------------------------------------------------
 | Compile only project files, excluding all third-party dependencies.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify', function() {
  return browserify({ entries: 'js/main.js', debug: true })
    .external(dependencies)
    .transform(babelify, {presets: ['es2015']})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulpif(production, uglify({ mangle: false })))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/js'))
})

/*
 |--------------------------------------------------------------------------
 | Same as browserify task, but will also watch for changes and re-compile.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify-watch', function() {
  var bundler = watchify(browserify({ entries: 'js/main.js', debug: true }, watchify.args))
  bundler.external(dependencies)
  bundler.transform(babelify, {presets: ['es2015']})
  bundler.on('update', rebundle)
  return rebundle()

  function rebundle() {
    var start = Date.now()
    return bundler.bundle()
      .on('error', function(err) {
        gutil.log(gutil.colors.red(err.toString()))
      })
      .on('end', function() {
        gutil.log(gutil.colors.green('Finished rebundling in', (Date.now() - start) + 'ms.'))
      })
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('public/js/'))
      .pipe(livereload())
  }
})


/*
 |--------------------------------------------------------------------------
 | Compile LESS stylesheets.
 |--------------------------------------------------------------------------
 */
gulp.task('styles', function() {
  return gulp.src('less/main.less')
    .pipe(plumber())
    .pipe(less().on('error', function(err) {
      gutil.log(err)
      this.emit('end')
    }))
    .pipe(autoprefixer())
    .pipe(gulpif(production, cssmin()))
    .pipe(gulp.dest('public/css'))
    .pipe(livereload())
})

gulp.task('watch', function() {
  livereload.listen()
  gulp.watch('less/*.less', ['styles'])
})

gulp.task('default', ['styles', 'browserify-watch', 'watch'])
gulp.task('build', ['styles', 'browserify'])
