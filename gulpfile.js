'use strict';

// Requirements
var gulp 		= require('gulp'),
	sass 		= require('gulp-sass'),
 	sourcemaps	= require('gulp-sourcemaps'),
	browserSync = require('browser-sync').create(),
	useref		= require('gulp-useref'),
	uglify		= require('gulp-uglify'),
	gulpIf		= require('gulp-if'),
	cssnano		= require('gulp-cssnano'),
	imagemin	= require('gulp-imagemin'),
	cache		= require('gulp-cache'),
	del			= require('del'),
	runSequence	= require('run-sequence');

// Test
gulp.task('test', function() {
	console.log('Gulp works!');
});

// Browser Sync
gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
	})
});

// Compile Sass and build a source map
gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children directories
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

// Concatenate and minify
gulp.task('useref', function() {
	return gulp.src('app/*html')
		.pipe(useref())
		// Minifies only if it's a JavaScript file
		.pipe(gulpIf('*.js', uglify()))
		// Minifies only if it's a CSS file
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('dist'))
});

// Transfer fonts to Dist
gulp.task('fonts', function() {
	return gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))
});

// Minify images
gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin()))
  .pipe(gulp.dest('dist/images'))
});

// Cleaning generated files
gulp.task('clean:dist', function() {
	return del.sync('dist');
});

// Watch
gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

// Watch sequence
gulp.task('default', function(callback) {
	runSequence(['sass', 'browserSync', 'watch'],
		callback
	)
});

// Build sequence
gulp.task('build', function(callback) {
	runSequence('clean:dist', 
		['sass', 'useref', 'images', 'fonts'],
		callback
	);
});