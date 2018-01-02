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
		.pipe(sass({
			outputStyle: 'nested'
		}))
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
		// Minifies only if it's a CSS file
		.pipe(gulpIf('*.css', cssnano()))
		// Minifies only if it's a JavaScript file
		.pipe(gulpIf('*.js', uglify()))
		.pipe(gulp.dest('dist'))
});

// Transfer sourcemap to Dist
gulp.task('transfer-sourcemap', function() {
	return gulp.src('app/css/main.css.map')
	.pipe(gulp.dest('dist/css'))
});

// Transfer fonts to Dist
gulp.task('transfer-fonts', function() {
	return gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))
});

// Transfer images to Dist
gulp.task('transfer-images', function() {
	return gulp.src('app/images/**/*')
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

// Default sequence
gulp.task('default', function(callback) {
	runSequence(['sass', 'browserSync', 'watch'],
		callback
	)
});

// Build sequence
gulp.task('build', function(callback) {
	runSequence('clean:dist',
		['sass', 'useref', 'transfer-sourcemap', 'transfer-images', 'transfer-fonts'],
		callback
	);
});