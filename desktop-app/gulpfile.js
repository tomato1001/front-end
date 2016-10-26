var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    babelify = require('babelify'),
    assign = require('lodash.assign'),
    webserver = require('gulp-webserver');

gulp.task('default', ['assets', 'sass', 'js']);

gulp.task('dev', ['watch', 'serve']);

gulp.task('build', ['default']);

gulp.task('watch', function() {
	watchifyJS('./src/app.js', 'app.js', true);
	gulp.watch('./src/**/*.scss', function(evt) {
		buildTimeStatistic(buildSass);
	});
});

gulp.task('serve', function() {
	gulp.src('./app')
	.pipe(webserver({
	  // livereload: true,
	  port : 9200,
	  fallback : 'index.html'
	}));	
});

gulp.task('js', function() {
    watchifyJS('./src/app.js', 'app.js');
});

gulp.task('assets', function() {
	// boostrap
	buildBootstrap();

	// jquery
    gulp.src('./node_modules/jquery/dist/jquery.js')
    	.pipe(sourcemaps.init({loadMaps : true}))
    	.pipe(sourcemaps.write('./'))
    	.pipe(gulp.dest('./app/lib/jquery'));

    // font-awesome
    gulp.src('./node_modules/font-awesome/css/font-awesome.css')
    	.pipe(sourcemaps.init({loadMaps: true}))
    	.pipe(sourcemaps.write('./'))
    	.pipe(gulp.dest('./app/lib/font-awesome/css'));
    gulp.src('./node_modules/font-awesome/fonts/*')
    	.pipe(gulp.dest('./app/lib/font-awesome/fonts'));
    // pace
    gulp.src('./bower_components/pace/pace.js')
        .pipe(gulp.dest('./app/lib/pace'));
    gulp.src('./bower_components/pace/themes/**')
        .pipe(gulp.dest('./app/lib/pace/themes'));
});

/**
 * Build and package bootstrap.
 */
function buildBootstrap () {
	var basePath = './node_modules/bootstrap/dist/',
		outFolder = './app/lib/bootstrap/';

    gulp.src([basePath + 'css/bootstrap.css', basePath + 'css/bootstrap-theme.css'])
    .pipe(sourcemaps.init({loadMaps : true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(outFolder + 'css'));

    gulp.src(basePath + 'js/bootstrap.js', {base: basePath})
    	.pipe(gulp.dest(outFolder));

    gulp.src(basePath + 'fonts/*').pipe(gulp.dest(outFolder + 'fonts'));
}

gulp.task('sass', function() {
	buildSass();
});

function buildSass() {
    gulp.src('src/app.scss')
    	.pipe(sourcemaps.init())
    	.pipe(sass().on('error', sass.logError))
    	.pipe(sourcemaps.write('./'))
    	.pipe(gulp.dest('./app/css'));
}

function buildTimeStatistic (f) {
	var s = new Date().getTime();
	f(arguments[1]);
	var e = new Date().getTime();
	gutil.log('Rebuild complete after ' + (e - s) + 'ms');
}

function watchifyJS(input, out, enableWatchify) {
    var customOpts = {
        entries: input,
        debug: true
    };
    var opts = assign({}, watchify.args, customOpts);
    var b = enableWatchify ? watchify(createBrowserify(opts)) : createBrowserify(opts);
    bundle(b, out);
    if (enableWatchify) {
        b.on('update', function() {
            bundle(b, out);
        }); // on any dep update, runs the bundler		
    };
    b.on('log', gutil.log); // output build logs to terminal
}

function createBrowserify(opts) {
    // As of Babel 6.0.0 there are no plugins included by default. For babelify to be useful, 
    // you must also include some presets and/or plugins.
    // es2015 babel-preset-es2015
    // react babel-preset-react
    return browserify(opts).transform(babelify, {presets: ["es2015", "react"]});
}

function bundle(b, out) {
    return b.bundle()
        // log errors if they happen
        .on('error', gutil.log.bind(gutil, 'Browserify Error')).pipe(source(out))
        // optional, remove if you don't need to buffer file contents
        .pipe(buffer())
        // optional, remove if you dont want sourcemaps
        .pipe(sourcemaps.init({
            loadMaps: true
        })) // loads map from browserify file
        // Add transformation tasks to the pipeline here.
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest('./app/js'));
}