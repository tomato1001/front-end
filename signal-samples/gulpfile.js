var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sourcemaps = require('gulp-sourcemaps'),
	browserify = require('browserify'),
	watchify = require('watchify'),
	buffer = require('vinyl-buffer'),
	source = require('vinyl-source-stream'),
	assign = require('lodash.assign'),
	webserver = require('gulp-webserver');


gulp.task('default', ['build']);

gulp.task('build', function() {
	watchifyJS('./src/app.js', 'app.js');
});

function watchifyJS(input, out, enableWatchify) {
    var customOpts = {
        entries: input,
        debug: true
    };
    var opts = assign({}, watchify.args, customOpts);
    var b = enableWatchify ? watchify(browserify(opts)) : browserify(opts);
    bundle(b, out);
    if (enableWatchify) {
        b.on('update', function() {
            bundle(b, out);
        }); // on any dep update, runs the bundler		
    };
    b.on('log', gutil.log); // output build logs to terminal
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
        .pipe(gulp.dest('./app'));
}