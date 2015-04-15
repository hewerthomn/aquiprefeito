module.exports = function(grunt) {

	require('time-grunt')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: ';',
				stripBanners: { block: true, line: true },
			},
			app: {
				dest: 'www/build/js/app.min.js',
				src: [

					'www/lib/angular/angular.min.js',
					'www/lib/angular-animate/angular-animate.min.js',
					'www/lib/angular-focus-it/angular-focus-it.min.js',
					'www/lib/angular-sanitize/angular-sanitize.min.js',
					'www/lib/angular-touch/angular-touch.min.js',
					'www/lib/ngstorage/ngStorage.min.js',
					'www/lib/angular-ui-router/release/angular-ui-router.min.js',
					'www/lib/ionic/js/ionic.min.js',
					'www/lib/ionic/js/ionic-angular.min.js',
					'www/lib/ngCordova/dist/ng-cordova.min.js',

					'www/app/scripts/directives/main.js',

					'www/app/scripts/controllers/main.js',
					'www/app/scripts/controllers/HomeCtrl.js',
					'www/app/scripts/controllers/UploadCtrl.js',
					'www/app/scripts/controllers/IssueCtrl.js',
					'www/app/scripts/controllers/GalleryCtrl.js',

					'www/app/scripts/services/main.js',
					'www/app/scripts/services/AquiService.js',
					'www/app/scripts/services/MapService.js',
					'www/app/scripts/services/CameraService.js',
					'www/app/scripts/services/GeocoderService.js',

					'www/app/scripts/app.js'
				]
			}
		},

		uglify: {
			app: {
				options: { mangle: false },
				files: {
					'www/build/js/app.min.js': ['www/build/js/app.min.js']
				}
			}
		},

		copy: {
			fonts: {
				files: [
					{
						expand: true,
						flatten: true,
						src: ['www/lib/ionic/fonts/**.*'],
						dest: 'www/build/fonts'
					}
				]
			}
		},

		cssmin: {
			combine: {
				files: {
					'www/build/css/app.min.css': [
						'www/lib/ionic/css/ionic.min.css',
						'www/css/app.css',
					]
				}
			}
		},

		watch: {
			min: {
				files: ['Gruntfile.js', 'www/app/scripts/**/*.js', 'www/css/**/*.css'],
				tasks: ['concat:app', 'cssmin'],
				options: {
					atBegin: true
				}
			}
		}
	});

	grunt.registerTask('dev', ['concat:app', 'cssmin']);
	grunt.registerTask('default', ['concat:app', 'cssmin', 'copy:fonts']);

	require('jit-grunt')(grunt);
};
