var gulp = require('gulp'),
	browserify = require('browserify'),
	babelify = require('babelify'),
	source = require('vinyl-source-stream'),
	gutil = require('gulp-util'),
    eslint = require('gulp-eslint'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify');

// create a default task and just log a message
gulp.task('start', function() {
  return gutil.log('Gulp is running. Yeah!')
});	

gulp.task('copyHtml', function() {
  gulp.src('./app/assets/*.html').pipe(gulp.dest('build'));
});

gulp.task('lint', function () {
    return gulp.src([
      './app/**/*.js',
      './app/**/*.jsx'
    ])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError());
});

gulp.task('build-css', function() {
  return gulp.src('./app/assets/scss/**/*.scss')
    .pipe(sourcemaps.init())  // Process the original sources
     .pipe(sass())
    .pipe(sourcemaps.write()) // Add the map to modified source.
    .pipe(gulp.dest('build'));
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
    .pipe(gulp.dest('./build'));
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
 
gulp.task('default', ['start','watch']);