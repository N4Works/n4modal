"use strict";

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var coveralls = require('gulp-coveralls');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var karma = require('karma').server;

var _coverage = 'coverage/**/lcov.info';
var _app = 'src/n4modal.js';
var _css = 'src/n4modal.css';
var _appMin = 'n4modal.min.js';
var _dist = 'dist';

gulp.task('build-css', function () {
  return gulp.src(_css)
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist'));
})

gulp.task('build', ['unit_test', 'build-css'], function()
{
    gulp
        .src(_app)
        .pipe(uglify())
        .pipe(rename(_appMin))
        .pipe(gulp.dest(_dist));
})

gulp.task('unit_test', function(done)
{
    var _opts = {
                  configFile: __dirname + '/karma.conf.js',
                  singleRun: true,
                  browsers: ['PhantomJS']
               };

    karma.start(_opts, done);
})

gulp.task('coverage', ['unit_test'], function()
{
    gulp
        .src(_coverage)
        .pipe(coveralls());
})
