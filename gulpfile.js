var gulp = require('gulp'),
		batch = require('gulp-batch'),
		concat = require('gulp-concat'),
		cssmin = require('gulp-cssmin'),
		rename = require('gulp-rename'),
		concatCss = require('gulp-concat-css'),
		copy = require('gulp-copy'),
		watch = require('gulp-watch');

gulp.task('jsconcat', function() {
	return gulp.src([
		'www/lib/angular/angular.min.js',
		'www/lib/angular-i18n/angular-locale_pt-br.js',
		'www/lib/angular-animate/angular-animate.min.js',
		'www/lib/angular-focus-it/angular-focus-it.min.js',
		'www/lib/angular-sanitize/angular-sanitize.min.js',
		'www/lib/angular-touch/angular-touch.min.js',
		'www/lib/ngstorage/ngStorage.min.js',
		'www/lib/angular-ui-router/release/angular-ui-router.min.js',
		'www/lib/ionic/js/ionic.min.js',
		'www/lib/ionic/js/ionic-angular.min.js',
		'www/lib/ngCordova/dist/ng-cordova.min.js',

		'www/app/app.js',
		'www/app/config.js',
		'www/app/constants.js',
		'www/app/routes.js',
		'www/app/run.js',

		'www/app/components/home/HomeController.js',
		'www/app/components/issue/IssueController.js',
		'www/app/components/gallery/GalleryController.js',
		'www/app/components/upload/UploadController.js',

		'www/app/services/AquiService.js',
		'www/app/services/CameraService.js',
		'www/app/services/CategoryService.js',
		'www/app/services/FBService.js',
		'www/app/services/GeocoderService.js',
		'www/app/services/IssueService.js',
		'www/app/services/MapService.js'
	])
	.pipe(concat('app.min.js', {newLine: ';'}))
	.pipe(gulp.dest('www/build/js/'));
});

gulp.task('cssconcat', function() {
	return gulp.src([
		'www/lib/ionic/css/ionic.css',
		'www/css/aquiprefeito.css',
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

gulp.task('copyfonts', function() {
	return gulp.src([
		'www/lib/ionic/fonts/**.*'
	])
	.pipe(gulp.dest('www/build/fonts'));
});
gulp.task('copyfont', function() {
	return gulp.src([
		'www/font/**.*'
	])
	.pipe(gulp.dest('www/build/font'));
});

gulp.task('watch', ['jsconcat', 'cssconcat'], function() {
	var files = ['gulpfile*','www/app/**/*.js', 'www/css/**/*.css'];
	watch(files, batch(function() {
		gulp.start('dev');
		gulp.start('watch');
	}));
});

gulp.task('dev', ['jsconcat', 'cssconcat']);
gulp.task('default', ['jsconcat', 'cssconcat', 'cssmin', 'copyfonts', 'copyfont']);
