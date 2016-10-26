var gulp = require('gulp'),
	$ = require('gulp-load-plugins')();


gulp.task('default', ['build', 'watch', 'serve']);

gulp.task('build', ['scss', 'html']);

gulp.task('scss', function() {
	buildSass('src/**/*.scss');
});

function buildSass (src) {
	gulp.src(src)
		.pipe($.sourcemaps.init({loadMaps : true}))
		.pipe($.sass().on('error', $.sass.logError))
		.pipe($.sourcemaps.write('./'))
		.pipe(gulp.dest('./dist/css'));
}

gulp.task('html', function() {
	copyHtml('src/**/*.html');
});

function copyHtml (src) {
	gulp.src(src)
		.pipe(gulp.dest('./dist'));
}

gulp.task('serve', function() {
	gulp.src('./dist')
		.pipe($.webserver({
		  // livereload: true,
		  port : 9200,
		  fallback : 'index.html'
		}));
});

gulp.task('watch', function() {
	gulp.watch('./src/**/*', function(e) {
		var path = e.path;
		if (path.lastIndexOf('.scss') != -1) {
			buildSass(path);
		} else {
			copyHtml(path);
		}
	});
});