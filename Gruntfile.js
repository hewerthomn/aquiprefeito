module.exports = function(grunt) {

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

					'www/app/directives/fb-user/fb-user.js',

					'www/app/services/AquiService.js',
					'www/app/services/CameraService.js',
					'www/app/services/CategoryService.js',
					'www/app/services/FBService.js',
					'www/app/services/GeocoderService.js',
					'www/app/services/IssueService.js',
					'www/app/services/MapService.js',
					'www/app/services/UtilService.js'
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
				files: [{
					expand: true,
					flatten: true,
					src: ['www/lib/ionic/fonts/**.*'],
					dest: 'www/build/fonts'
				}]
			},
			font: {
				files: [{
					expand: true,
					flatten: true,
					src: ['www/font/**.*'],
					dest: 'www/build/font'
				}]
			}
		},

		concat_css: {
			all: {
				dest: 'www/build/css/app.min.css',
				src: [
					'www/lib/ionic/css/ionic.min.css',
					'www/css/aquiprefeito.css',
					'www/css/app.css',
				]
			}
	  },

	  cssmin: {
	  	target: {
		    files: {
		      'www/build/css/app.min.css': ['www/build/css/app.min.css']
		    }
		  }
	  },

		watch: {
			min: {
				files: ['Gruntfile.js', 'www/app/**/*.js', 'www/css/**/*.css'],
				tasks: ['concat:app', 'concat_css'],
				options: {
					atBegin: true,
					liveReload: true
				}
			}
		}
	});

	grunt.registerTask('dev', ['concat:app', 'concat_css']);
	grunt.registerTask('default', ['concat:app', 'concat_css', 'cssmin', 'copy']);

	require('time-grunt')(grunt);
	require('jit-grunt')(grunt);
};
