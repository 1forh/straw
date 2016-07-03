var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var addsrc = require('gulp-add-src');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var plumber = require('gulp-plumber');
var changed = require('gulp-changed');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');

module.exports = function(gulp, config) {
	'use strict';

	gulp.task('scripts', function() {
		return gulp.src(config.sources.scripts)
			.pipe(plumber())
			.pipe(gulpif(config.sourcemaps === true, sourcemaps.init()))
			.pipe(changed(config.destinations.scripts))
			.pipe(gulpif(config.lint === true, jshint()))
			.pipe(gulpif(config.lint === true, jshint.reporter(stylish)))
			.pipe(gulpif(config.ecmascript === 6, babel({"presets": "es2015"})))
			.pipe(addsrc(config.modules.scripts))
			.pipe(concat('main.js'))
			.pipe(gulpif(config.minify === true, uglify()))
			.pipe(gulpif(config.minify === true, rename({suffix: '.min'})))
			.pipe(gulpif(config.sourcemaps === true, sourcemaps.write('.')))
			.pipe(gulp.dest(config.destinations.scripts));
	});
};
