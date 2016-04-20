'use strict'

var gulp = require('gulp'),
	browserify = require('browserify'),
	babelify = require('babelify'),
	source = require('vinyl-source-stream'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	server = require('gulp-express'),
	shell = require('gulp-shell'),
	run	= require('run-sequence');

const paths = {
  js: ['./app/**/*.js'],
  destination: './build'
}
	
gulp.task('default', ['copyHtml','es6','build-css','watch']);
	
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
	gulp.watch('./app/**/*.js',['es6','restart']);
	gulp.watch('./app/assets/*.html',['copyHtml']);
	gulp.watch('./app/assets/scss/**/*.scss', ['build-css']);
});
 
///////////////////////////////////

gulp.task('server', function () {
    // Start the server at the beginning of the task 
    server.run(['app/app.js']);
 
    // Restart the server when file changes 
    gulp.watch(['app/**/*.html'], server.notify);
    gulp.watch(['app/styles/**/*.scss'], ['styles:scss']);
    //gulp.watch(['{.tmp,app}/styles/**/*.css'], ['styles:css', server.notify]); 
    //Event object won't pass down to gulp.watch's callback if there's more than one of them. 
    //So the correct way to use server.notify is as following: 
    gulp.watch(['{.tmp,app}/styles/**/*.css'], function(event){
        gulp.run('styles:css');
        server.notify(event);
        //pipe support is added for server.notify since v0.1.5, 
        //see https://github.com/gimm/gulp-express#servernotifyevent 
    });
 
    gulp.watch(['app/scripts/**/*.js'], ['jshint']);
    gulp.watch(['app/images/**/*'], server.notify);
    gulp.watch(['app.js', 'routes/**/*.js'], [server.run]);
});