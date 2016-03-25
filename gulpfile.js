var gulp = require('gulp'),
	browserify = require('browserify'),
	babelify = require('babelify'),
	source = require('vinyl-source-stream'),
	gutil = require('gulp-util'),
    jshint = require('gulp-jshint');
 
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
    .pipe(gulp.dest('./build'));
});

gulp.task('watch',function() {
	gulp.watch('./app/**/*.js',['es6']);
});
 
gulp.task('default', ['watch']);