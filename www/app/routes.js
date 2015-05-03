'use strict';
/**
 * Route Config
 */
function routeConfig($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('tabs', {
			url: '/tabs',
			abstract: true,
			controller: 'TabsController',
			templateUrl: 'app/components/tabs/tabs.html'
		})
		.state('tabs.home', {
			url: '/home',
			views: {
				'tabs.home': {
					controller: 'HomeController',
					templateUrl: 'app/components/home/home.html'
				}
			}
		})
		.state('tabs.upload', {
			url: '/upload',
			views: {
				'tabs.upload': {
					controller: 'UploadController',
					templateUrl: 'app/components/upload/upload.html'
				}
			}
		})
		.state('tabs.gallery', {
			url: '/gallery',
			views: {
				'tabs.gallery': {
					controller: 'GalleryController',
					templateUrl: 'app/components/gallery/gallery.html'
				}
			}
		})
		.state('issue', {
			url: '/issue/:id',
			controller: 'IssueController',
			templateUrl: 'app/components/issue/issue.html'
		})
		.state('help', {
			url: '/help',
			templateUrl: 'app/components/help/help.html'
		});

	$urlRouterProvider.otherwise('/tabs/gallery');
};

angular
	.module('app')
	.config(routeConfig);
