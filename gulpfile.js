'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	maps = require('gulp-sourcemaps'),
	 del = require('del'),
cleanCSS = require('gulp-clean-css');

	 

gulp.task('compileSass', function(){
	return gulp.src("scss/application.scss")
		.pipe(maps.init())
		.pipe(sass())
		.pipe(maps.write('./'))
		.pipe(gulp.dest('css'));
});

gulp.task('minifyCss', ["compileSass"], function() {
	return gulp.src("css/application.css")
		.pipe(maps.init())
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(maps.write('./'))
		.pipe(rename('app.min.css'))
		.pipe(gulp.dest('css'));
});

gulp.task("concatScripts", function() {
	return gulp.src([
		'js/jquery.js',
		'js/fastclick.js',
		'js/foundation.js',
		'js/foundation.equalizer.js',
		'js/foundation.reveal.js',
		'js/scripts.js'])
	.pipe(maps.init())
	.pipe(concat("app.js"))
	.pipe(maps.write('./'))
	.pipe(gulp.dest("js"));
});

gulp.task("minifyScripts", ["concatScripts"] /*Added concat Scripts as a dependency of minify scripts*/, function(){
	return gulp.src("js/app.js")
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('js'));
});

gulp.task('clean', function() {
	del(['dist', 'css/application.css*', 'js/app*.js*']);
});

gulp.task("build", ['minifyScripts', 'minifyCss'], function() {
	return gulp.src(["css/**", "js/app.min.js", "img/**"], { base: './'})
			.pipe(gulp.dest('dist'));	
});

gulp.task("default", ['clean'], function() {
	gulp.start('build');
});