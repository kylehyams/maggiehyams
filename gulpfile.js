// Requirements
var gulp 		= require('gulp')
	sass 		= require('gulp-sass')
	browserSync = require('browser-sync').create();

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

// Watch
gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});