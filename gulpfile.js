// Requirements
var gulp 		= require('gulp')
	sass 		= require('gulp-sass')
	browserSync = require('browser-sync').create()
	useref		= require('gulp-useref')
	uglify		= require('gulp-uglify')
	gulpIf		= require('gulp-if')
	cssnano		= require('gulp-cssnano');

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

// Sass
gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children directories
		.pipe(sass())
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

// Transfer images to Dist
gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(gulp.dest('dist/images'))
});

// Watch
gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});