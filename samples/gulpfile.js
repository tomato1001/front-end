var gulp = require('gulp'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	gutil = require('gulp-util'),
	_ = require('underscore');

var config = {
	bowerPath : './bower_components/',
	appPath : './app/'
};

gulp.task('default', ['css', 'js', 'fonts', 'watch']);

var includeSassPaths = ['src/scss'].concat(
		autoprefixString([
			'bootstrap-sass/assets/stylesheets',
			'components-font-awesome/scss'
		], config.bowerPath)
);

//
// {outputFolder : '', type: 'css', debug : false, src : ''}
function build (opts) {
	var stream = gulp.src(opts.src);
	if (opts.debug) {
		stream = stream.pipe(sourcemaps.init())
	}

	if (opts.type == 'css') {
		stream = stream.pipe(
			sass({
				includePaths : includeSassPaths
			}).on('error', sass.logError)
		);
	}

	if (opts.debug) {
		stream = stream.pipe(sourcemaps.write('./'))
	}

	stream.pipe(gulp.dest(opts.outputFolder, {cwd : config.appPath}));
};


var fonts = autoprefixString([
		'components-font-awesome/fonts/*',
		'bootstrap-sass/assets/fonts/bootstrap/*'
		], config.bowerPath);

gulp.task('fonts', function() {
	build({
		src : fonts,
		outputFolder: 'fonts'
	});
});

gulp.task('css', function() {
	build({
		type: 'css',
		debug: true,
		src : 'src/scss/**/*.scss',
		outputFolder: 'css'
	});
});

var jss = autoprefixString([
		'bootstrap-sass/assets/javascripts/bootstrap.js',
		'jquery/dist/jquery.js'
	], config.bowerPath);

gulp.task('js', function() {
	build({
		type: 'js',
		debug: true,
		src : jss,
		outputFolder: 'js'
	});
});

gulp.task('watch', function() {
	gulp.watch(['src/**/*.scss'], function(evt) {
		buildTimeStatistic(build, {
			type: 'css',
			debug: true,
			src : evt.path,
			outputFolder: 'css'
		});
	});
	gulp.watch(['src/**/*.js'], function(e) {
		buildTimeStatistic(build, {
			type: 'js',
			debug: true,
			src : evt.path,
			outputFolder: 'js'				
		});
	});
});

function buildTimeStatistic (f) {
	var s = new Date().getTime();
	f(arguments[1]);
	var e = new Date().getTime();
	gutil.log('Rebuild complete after ' + (e - s) + 'ms');
}

function autoprefixString (v, prefix) {
	if (typeof v == 'string') {
		return prefix + v;
	}

	if (_.isArray(v)) {
		return _.map(v, function(value) {
			return prefix + value;
		});
	}
}