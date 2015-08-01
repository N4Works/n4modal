"use strict";

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var coveralls = require('gulp-coveralls');
var cssmin = require('gulp-cssmin');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var karma = require('karma').server;

var _coverage = 'coverage/**/lcov.info';
var _scripts = 'src/**/*.js';
var _styles = 'src/**/*.css';
var _scriptMin = 'n4modal.min.js';
var _styleMin = 'n4modal.min.css';
var _dist = 'dist';

gulp.task('build-css', function () {
  return gulp.src(_styles)
    .pipe(concat(_styleMin))
    .pipe(cssmin())
    .pipe(gulp.dest(_dist));
})

gulp.task('build', ['unit_test', 'build-css'], function () {
  return gulp.src(_scripts)
    .pipe(concat(_scriptMin))
    .pipe(uglify())
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
