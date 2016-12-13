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
	runSequence	= require('run-sequence'),
	realFavicon = require ('gulp-real-favicon'),
	fs = require('fs');

// File where the favicon markups are stored
var FAVICON_DATA_FILE = 'faviconData.json';

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
			outputStyle: 'compressed'
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


// Generate the favicons. This task takes a few seconds to complete.
// You should run it at least once to create the favicons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function(done) {
	realFavicon.generateFavicon({
		masterPicture: 'app/images/favicon.png',
		dest: 'dist',
		iconsPath: '/',
		design: {
			ios: {
				masterPicture: {
					type: 'inline',
					content: 'iVBORw0KGgoAAAANSUhEUgAAAggAAAIICAMAAAA8IuZRAAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/Pz8MxO7YgAAAP90Uk5TAAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+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'
				},
				pictureAspect: 'backgroundAndMargin',
				backgroundColor: '#525252',
				margin: '42%',
				assets: {
					ios6AndPriorIcons: false,
					ios7AndLaterIcons: false,
					precomposedIcons: false,
					declareOnlyDefaultIcon: true
				}
			},
			desktopBrowser: {},
			windows: {
				masterPicture: {
					type: 'inline',
					content: 'iVBORw0KGgoAAAANSUhEUgAAAggAAAIICAMAAAA8IuZRAAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/Pz8MxO7YgAAAP90Uk5TAAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+6wjZNQAAFPhJREFUeNrt3YmDT/X+x/Ezq5nBTMNg7GONbCVyo5Iil66lqFSWmERluviVuohGiFG2iyzhisrcX1zbzeiSpfxEEslSMWMZ+xjGGGPMcn7okplm+X5nzutzPm/n9fwHzufz+T7mM9/v+Z7zPYZRcKbqdhm3X6VMu7po2RxaL89UPPZ2hGBZ37a1cBZhUWeVDn41IVjUVqv/pgKj0hQOP7M2IVjRgY6AmdRcoXAG0wih6F0a4YeZy2NxyuZwLpAQitqKarDJBC1WNotBhFC0kntDp9PnoqJ57CWEIrWlBng+dXYpmklHQih8WZFe8AmVjFEzl7WEUPh/C51UzMj7IzWoaxBCIYtroGhOw5VMZxYhFK5vyiibVC8Vp5wvBBNCYVrjr3BWPVRIGEIIhWh5MaXT6p2Fn9IvHoTgdou9Fc+rrwIJXQjB3ZZ5KZ/Yy/hZbSQEd98n+tkws0j8vOoQglvtsef99UL4xOYRgjsdq2zP1Hw3wC+yCiIE17vSwq65Be9Dz20YIbjeQPsmV/0MeG7xnoTgatF2zq4N+sRSN0JwsV9L2Do99NcO/0cILn5H96C90/NYBZbQgBBcaord8wuOxU5wISG40oEA2yd4Typ0hpfKEYILtdJghgOwW8I7hFBwS7SY4moohKNehFBQaXpczRWKPZvQgxAKaoImc+wMhfAtIRRQgjZn4rGXszYnhPwboc0kSxyAXnRDCPmWrNHFnS2R1yullSWE/IrSaZozkVvCGELIp8uhOk0zMB4I4bgPIeTdAr3m2QG5JfQhhLx7ULOJIu+Y30oIebZft4mWTQBKaEkIefW6djMNv+3PpesIIb2MdjP1+BZ4XWZ5Qsi9rzScamPgdWtRhJB7ETrOdQYOwulihJBrVXScazDwa8h+hJBb2/WcbB8chJ2EkFuRek4W+X6xNSHk0qOazvZ+HIQVhJDLp6kAXaeLO7+YUZkQBF20E3YZJmESIUj6VD0OBiHRnxBypvFvygSehkkYQAg50/mXRPrDIOwmhJzXbnlrPGGvvTAJ7Qghez9qPWPcxe2rCSF7n+o9ZdhZpaxqhJCtUXpPuRVsS5hGCNnqr/mc16AgnC9OCLem+zMtGsPuchhECLfWVPdJR6Mg7CeEW6uo+6Rrp6MkdCSEW/LVftbzURDWEsLvZeo/6+qoLSGrFiHcLEXAtOeitoRZhHCzBAHTrnYFBCE5kBBuFC9h3nNQW8IQQrjRQQnzroraEg54EMKNpRAx8VmoLaELIYiCUAW1JWwkBFEQcB8c7iIEURBqoW6FnEcIoiAYn4EgpAQTgigIDVBfQg4jBFEQjGUgCIe8CEEUhKaot4vdCEEUBNilSlsIQRYE2NWLTQhBFARjOwjCQkKQBaEbCEJqCCGIguAVB5LwDiGIgmD8FQQh3psQREEongiS0IMQREEwxoIgbCYEWRBCUT+h0pwQREGAfRu9mBBkQagL+uoprRwhyFoB1GPExxCCrBVoCYJw0pcQZLUNJKEPIcjqaRCE7whBVl6xIAktCUFWESAISwlBVqjzzOlVCEFWqPPMUYQgq0qgn0s440cIsloE2hL6EYKsUNcz7yQEYX0NktCaEGT1JAjCSkIQdlLpEAZCRlVCkNUg0JYwiRBkFZSMgZAYQAiymgTaEgYQgqxqgH43Yw8hCGspaEtoRwiyehAEIYYQhLUDAyGzBiHIqjtoS5hOCLLyPYGBkFSCEGQ1DLQlDCIEWYWkYiD87EEIskL9PnNHQpBVPRCEdYQgrBgMhKw7CUFWbUFbwmxCkJXHPgyE5CBCkNVLoC1hCCHIKuAsBsJBT0KQ1WjQltCFEGRVEfSEn02EIKyFoC2hPiHIqgkIwnxCENYmDIRLpQhBVk+AtoThhCAr1A91H/YiBFkNBG0J3QhBVoEXMBC2EIKwJoK2hHsIQVbVQfe6LCIEYS3BQLhchhBk9QDof0MkIQjrewyEYz6EIKvnQVtCD0KQlc9xx32CJIRc+xtoS2hOCLIKuYSBEE0IwpqJgXAllBBkdRfof8NYQhDWagyEU76EIKvHQFtCOCHIymMvBsL3hCCsvqAtoSUhyMo/AQNhKSEI610MhPRKhCCrCqB7XSYQgrA+xkBI8CMEWd0LervYnxCEtQED4UdCEFZn0JbQmhBk5Ql6WPBKQhDWaxgImWGEIKuSSRgJkwlBWB9gIJwrTgiyqga61yWCEIT1OQbCXkIQVgvQJ8j2hCCs7RgIMYQgrOcwELJqEoKsfI5hJEwnBGG9hYFwoSQhyKo06F6XwYQgrA8xEH71IARZ1c3CSOhECML6NwbCOkIQVhvQSaW6hCCsPRgIswlBWOEYCBfvIARZ+Z3BSHiTEIQ1CgMhzpMQZFU+DSOhKyEIawEGwiZCENY9oE+QDQlBWOsxEOYTgrA6YSCkliYEWXkexEgYTgjCisBAOOpNCLJC3evyLCEI630MhC2EIKywDIyEewlBWP/EQFhECMJqjoGQVpYQhLUNIyGSEITVDQPhhA8hyMonHiOhJyEI600MhK2EIKxSKRgJLQhBWDMwEKIJQVh1MPe6XKlACMJahdkSxhKCsFpjIJwuRgjC2o2REE4IwuqDgbCDEITldxoj4WFCEFYkBsJSQhBWKOZel4wqhCCs+ZgtYQIhCOtuDISz/oQgrK8wEvoTgrA6YCDsJgRheR7ASGhDCMIagIGwkhCEVeI8BEJmdUIQ1gTMljCZEIRVFXOvy/kShCCsaMyWEEEIwrofA2G/ByEIaytGQntCENYzGAgxhCAs76MQCFm1CUFYQzBbwnRCEFYw5l6X5EBCENY0zJYwmBCEVRtzr8sBT0IQ1krMltCJEIT1CAbCOkKQ1o8YCfUIQVi9MRBmE4Kwip2CQEgJJgRhvYPZEt4kBGGVuwyBcMiLEIQ1D7MldCUEYTXCQNhECNJah5HQiBCE9RcMhPmEICzPXyAQUkMIQVivYraE4YQgrOLnIBDivQlBWOMxW8KzhCCsKukQCFsIQVqLMVtCU0IQ1p8wEBYRgrS2QCCkhRKCsJ7GbAmRhCAs7yMQCCd9CUFYb2C2hJ6EIKw7LkIgfEcI0vo7ZktoQQjCqoW51yWaEKS1AgIhvSIhCKsV5n/DWEKQ1i4IhDN+hCCsFzBbQjghCAt0r8tOQpDWCMyW8DAhCKss5l6XpYQgrbkQCBlVCUFYDTH/GyYQgrTWQiAkBhCCsB7HbAn9CUFYHj9DIOwhBGm9gtkS2hCCsIonQiCsIgRpjYNAyKxBCMKqjLnXZTIhSOszCISkkoQgrGaYt4sRhCCtzRAIv3gQgrCewmwJ7QlBWF6HIRDWEIK0/gcCIasOIQjrjmSIhOmEIK2pEAgXgwhBWDUzIRIGE4K0lkMgxHoSgrAexnyC7EQI0toJgfAVIUirF2ZLqE8IwvI9CYEwhxCk9TYEwqVShCCsMqkQCW8SgrQ+gkA44kUIwqqPebvYhBCk9aXEc0qEYH3tERBe53sEcXns56cGQrhWf+sXdS7PIwgswPp7XRoTgsTes3pNNxuEILFKVt/r8hwhyOxTa5f0lC8hyOw+a5f0XYMQhPaNlSuaUYkQpNbVyhX93CAEqXkdsnBFHyYEuQ22bkGV/HwOIYAKsu5el5cJQXJTrFrPpBKEILkaVt3rMtUgBNH9y6L1rEMI1ld+2iPKjtXSmuX8j0EIiDN+b6s72A4hNzk5EcKjZpS6g/WwYjUPexECoCfMmeoO5nvCgtV8yyAEQD3NTxUebXjRF/NyGUJANMBcqfBoIUW/12WBQQiI/mZuVHm4OUVezKaEAOk98weVh6tX1LXcZhACpI/MeKXHW1PEtexJCJhizExvlcdrV7SlVPgsWIdB+Mk0q6g8nse+Ii3lewYhYDpvms2VHrBfUVYysyohYCp+dXjPKD1iwNkirOQygxAw3Wni7ybN0dgirGRrQgD1qKnsiSg3qnil0Au534MQQL14dXgrFB/zk0IvZIRBCKAmXh1erOJjNinsOiYHEgLy/E5WCcUH/bqQ6zhD6ShDrIcQqy+E+Gvja6b4oE8Wch3rKx1lJeshHNfWQdD18YUrPqpXXKGWcb3aUdayHsI5bSE0vz6+yaoPO6hQy9hF7SAbWg8hVVsIfa+Pb63qwwZeKMQqxnurHSTgWYVZHrpCmHF9fGeVj29yIVZxuOIxtrIeghmgK4SddrwLu1p19+91SSuneIzPAiBU09RBYKbCewmztdTtNfxE9RBfB0BooSmEx/47vs+UH/kht9ewueohTgRA6KophMgb78PUH/p7N5dwh/IRRgMgvKYphLX2/e/q7uYShisfIeK51uP1dOB98xcLeik/tu9xt1Yw0V/5CM8CICzXE8Lv/6ij1R98mFsrOEH5+CoAHOj6rVPUzQFe8FV+8JBL7lyiVl35+NoiIGT6awlh7+8j/LP6o89yYwFXqR8e5vHmjXV0UP2WAc5Uf/i73Fi/duqHtwACoZeOEF679QtSG86Cx7j+r9WG0R2EQJilI4RsD9hppv74rv8XHqx+cJUgDsy9GjoIyXYR6ST1A/DY6+LqpQSrH9zzGAhmiH4QIrLfS6b+c4PxkouLN9uG1ZkNgvCEfhC+yz7Cp9SPwD/BtcVrZMPqHABBmKKdg7o5RhhjwxjGuLR2X9swMtCjKk0zTjsIOR+uk1lF/RgquHSvSzcbVmckCoIt21t+eR7NOcKRNoxioQsrd8LHhoHtgkF4RzMIHf8wwmPF1I/iXhdWLtKG1akJc2Du1AzChj8Osa8Nw9hU4MKlV7BhWG/jIJh3auWgcS4j/NVT/TieKHDd/mnH/83DQAgTtIKwKLchPmPDkscWtG4P2bA67YEOzNM+GjnI/db0H2wYycAClu1HO5ZnORKCVhcujs99iO3VjyQwKf9V62fD6lTKgEJYo4+D0JTch7jbS/1Y8r9Y+HxxG5ZnEtSBmdVQGwjT8xrjS+rHUi3fe10m27A6ZVOwEJT++nW+Vc/zhN6pkupHsyS/P57aNizPOLADM6OGzh8Zfus99aN5QLN/p6WS0RBs+To1lxrmsxmnhqkfz/a8h9PBhuWJgjsw07TYEjw25jdGG76EzPsakDgbTnHVTMNDMJfoAKFP/mN8UfmAfI7lNZYhNizPClNFD9nvoEwBd/AkVVY+pKF5/Z8qrX55HlPiwPze/p/M+Fi/8x2l87jXZb761Sm2Tw0EW77hy9ajBY9R/cmEmbkP5F71yzNBkQMzqZK9DkodLXiMl+5WPaq6WbmN41v1y9MiUxUEc7W9EFx6Km+s8svHV+c2jO7KVyfgV1Ndfex08IprY/xC9ce23N6inVZ/xdRMhQ7M8zb+oFIDV5+2N0r1yPb8cQxjlC/PC6bSdvjZ5SDI5bfEWarvcuj7xxPyyj/GNk5VC8Gca5MD7/+4cRK0tdqx+Z/JOYKlyj/EHjJV96I9ENz5QQIz+T61gxudcwCPqD6DsEG5A/Pyg3Y4GOzeIBPqKh1d+Ryn+FXfNuy11LShc/XVO+ji7kfkozXtPOP5quLlmW3aUrzyd0Kd3H+S0kmld2dlv8D+guIrZMaaNrVX8fcpHQrzRK3zD6gcYrZvx6epXZ7xpm3tVvob048X7kv2Syova+5865GVvkHxmGHa2M8Kv3V46nIhB5mu8Gpyz1t+tWid0veJH5u2FqvsFOMbWYUf5Tx1p7/++vtRVf6uSNBq0+aOq/kBK++inUHfruxxzCVv3utyROH9FXfuN20vtbsE8AnKfozzgxuHHKrOwZ/Pmzo0Dv41X7M4C66+VvTgzbD/3mqWVlbZWfdRmaYefVke+354SLoVozzSVs3r8vlvh1uoykHtbaY2JXQGTjR0jWVflCm5VqXFbwf7kyIH/VJMnZqDus/T8xUL//8lDlbxQ4zXf/JvuxoG9TeYmnX4Scw5W4v3vdhu+Euwn7t2oBdUMAicmG7qV4z193qGTrf+Jv9tf0FT8Ln6rOoEBWcuvMNPmFqWNq6UpRMt+8ElyDj39QW/Sm+peO6Rd++DprZdGG3h27HxuHdBp7APZC2VkhkG/1JDYwbXSrLuFy83AwM/s33E3+EbwrjNmqf8Wd2MMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcZsasQUpqbOekOIM5mS/teXEJhpzvQ0CIGZ72r/HoEQFJQVYRACM688axACMy+2NQiBmcfuMwiBmevLGYTAzCgvgxBY0pNiTjETArCfahuEwMxPixuEwK5EGAYhsJ2NDEJg6ZE+BiGwXfeIuzCFEADbwbs+BiGw3Y0lXqpGCFZvB6N9DUJgXzUQevEqIVjZoa5ir2ImBOtKGeFnEAJbXFnyfQ2EYFE/PGgYhOD4TrzkaRCC4zvzeoBhEILTOzu0hGEQgtM7PzLQMAjB6SWPDjYMQnD8iYPxIYZBCE7v5PDShkEITm9PeDHDIASnt66dh2EQgsO7svBu47aLENztXFQlwyAEp7e5l79hEILTN4Op9YzbNUJwuW96+hsGITi8xCn1jNs6QnChjJju/oZBCA5v62vljNs/Qsi/X0bWMhwRIeT3bcKU+wynRAh5lTCvrZdhEIKzOzK1lZMUEEKu7R/b1HBchJCj7cPqGk6MEG4pZdWrVQyHRgg32jexTTHDuRHCtS6ueDnMcHaEkLX7/da+huNzOISfP3y6DBE4HELs3OcrEIDDIRz9uHcYX3xnQ8j4YfpzROBwCBe+HNmmJF90Z0M4uOiVRp58wR0NIX7ZsLal+Fo7GsKZ1aM6lufL7GgIR1eN6cp3hY6GkLbzH4MeKc0X18kQ4r/8oEdDH76uDoZwNGbii/cH8RV1LoSMg1+836dZIF9L50I4vmHOG53q8qtDx0LIOvb1ghHdGvMcoWMhJO9aNnFA+zp+fN0cCuHUd0smDerSlJcOOBNC1pmdX8wZ2ad1Le4AjoSQuHf9JxMGPtUijO8CnQch/eRP66OnDg1/vEllvvwOg5B6bPfGZfPefyu8U/PawR58JZwCIT3x8E9bYqJnRQ0b0L3DQ/Ur+nPtb18I6ZeSzhyL279r26Y1yxf/48NJY4YO7Pt85zbNG1Yrw/d7mhdSrqiFhpYrGxIcVNzPm6uprP8HSzmVXfJugvkAAAAASUVORK5CYII='
				},
				pictureAspect: 'noChange',
				backgroundColor: '#525252',
				onConflict: 'override',
				assets: {
					windows80Ie10Tile: false,
					windows10Ie11EdgeTiles: {
						small: false,
						medium: true,
						big: false,
						rectangle: false
					}
				}
			},
			androidChrome: {
				pictureAspect: 'noChange',
				themeColor: '#525252',
				manifest: {
					display: 'standalone',
					orientation: 'notSet',
					onConflict: 'override',
					declared: true
				},
				assets: {
					legacyIcon: false,
					lowResolutionIcons: false
				}
			},
			safariPinnedTab: {
				masterPicture: {
					type: 'inline',
					content: 'iVBORw0KGgoAAAANSUhEUgAAAggAAAIICAMAAAA8IuZRAAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/Pz8MxO7YgAAAP90Uk5TAAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+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'
				},
				pictureAspect: 'blackAndWhite',
				threshold: 93.125,
				themeColor: '#525252'
			}
		},
		settings: {
			scalingAlgorithm: 'Mitchell',
			errorOnImageTooSmall: false
		},
		markupFile: FAVICON_DATA_FILE
	}, function() {
		done();
	});
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function() {
	return gulp.src([ 'app/*html' ])
		.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
		.pipe(gulp.dest('dist'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
	var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
	realFavicon.checkForUpdates(currentVersion, function(err) {
		if (err) {
			throw err;
		}
	});
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
		['useref', 'sass', 'images', 'fonts', 'generate-favicon', 'inject-favicon-markups'],
		callback
	);
});