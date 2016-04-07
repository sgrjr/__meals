'use strict'

var gulp = require('gulp'),
	browserify = require('browserify'),
	babelify = require('babelify'),
	source = require('vinyl-source-stream'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	server = require('gulp-live-server'),
	shell = require('gulp-shell'),
	run	= require('run-sequence');

const paths = {
  js: ['./app/**/*.js'],
  destination: './build'
}
	
gulp.task('default', ['copyHtml','es6','build-css','server','watch']);
	
///////////////////////////////////////////////////////////////////	
	
gulp.task('copyHtml', function() {
  gulp.src('./app/assets/*.html').pipe(gulp.dest('build'));
});

gulp.task('build-css', function() {
  return gulp.src('./app/assets/scss/**/*.scss')
    .pipe(sourcemaps.init())  // Process the original sources
    .pipe(sass())
    .pipe(sourcemaps.write()) // Add the map to modified source.
    .pipe(gulp.dest(paths.destination));
});

gulp.task('es6', function() {
	browserify({
    	entries: './app/index.js',
    	debug: true
  	})
    .transform(babelify,{
	  presets:["es2015", "react"]
	})
    .on('error',gutil.log)
    .bundle()
    .on('error',gutil.log)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(paths.destination));
});

gulp.task('build-js', function() {
  return gulp.src('./build/*.js')
    .pipe(uglify()) 
    .pipe(gulp.dest('build/min'));
});

gulp.task('watch',function() {
	gulp.watch('./app/**/*.js',['es6']);
	gulp.watch('./app/assets/*.html',['copyHtml']);
	gulp.watch('./app/assets/scss/**/*.scss', ['build-css']);
});
 
///////////////////////////////////////

let express;

gulp.task('server', () => {
  //express = server.new(paths.destination);
  require('./index.js');
});

gulp.task('restart', () => {
  express.start.bind(express)();
});
///////////////////////////////////
