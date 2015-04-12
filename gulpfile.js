var gulp = require('gulp'),
		gutil = require('gulp-util'),
		concat = require('gulp-concat'),
		cssmin = require('gulp-cssmin'),
		rename = require('gulp-rename'),
		concatCss = require('gulp-concat-css'),
		uglify = require('gulp-uglify'),
		copy = require('gulp-copy'),
		watch = require('gulp-watch');

gulp.task('concat', function() {
	return gulp.src([
		'www/lib/angular/angular.js',
		'www/lib/angular-animate/angular-animate.js',
		'www/lib/angular-sanitize/angular-sanitize.js',
		'www/lib/angular-touch/angular-touch.js',
		'www/lib/angular-focus-it/angular-focus-it.js',
		'www/lib/angular-ui-router/release/angular-ui-router.js',
		'www/lib/ionic/js/ionic.js',
		'www/lib/ionic/js/ionic-angular.js',
		'www/lib/ngCordova/dist/ng-cordova.js',

		'www/app/scripts/directives/main.js',

		'www/app/scripts/controllers/main.js',
		'www/app/scripts/controllers/AppCtrl.js',
		'www/app/scripts/controllers/HomeCtrl.js',
		'www/app/scripts/controllers/GalleryCtrl.js',

		'www/app/scripts/services/main.js',
		'www/app/scripts/services/AquiService.js',
		'www/app/scripts/services/MapService.js',
		'www/app/scripts/services/CameraService.js',
		'www/app/scripts/services/GeocoderService.js',

		'www/app/scripts/app.js'
	])
	.pipe(concat('app.min.js', {newLine: ';'}))
	.pipe(gulp.dest('www/build/js/'));
});

gulp.task('cssconcat', function() {
	return gulp.src([
		'www/lib/ionic/css/ionic.css',
		'www/css/app.css',
	])
	.pipe(concatCss('app.css'))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('www/build/css/'));
});

gulp.task('cssmin', function() {
	return gulp.src([
		'www/build/css/app.min.css'
	])
	.pipe(cssmin())
	.pipe(gulp.dest('www/build/css/'));
});

gulp.task('uglify', function() {
	return gulp.src('www/build/js/app.min.js')
	.pipe(uglify({mangle: false}))
	.pipe(gulp.dest('www/build/js/'));
});

gulp.task('copyfonts', function() {
	return gulp.src([
		['www/lib/ionic/fonts/**.*']
	])
	.pipe(gulp.dest('www/build/fonts'));
});

gulp.task('watch', ['concat', 'cssmin'], function() {
	return gulp.src([
		'gulpfile.js',
		'www/app/scripts/**/*.js',
		'www/css/**/*.css'
	])
	.pipe(watch(['gulpfile.js','www/app/scripts/**/*.js', 'www/css/**/*.css']));

});

gulp.task('dev', ['concat', 'cssmin']);
gulp.task('default', ['concat', 'uglify']);
