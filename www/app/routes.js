'use strict';
/**
 * Route Config
 */
function routeConfig($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			controller: 'HomeController',
			templateUrl: 'app/components/home/home.html'
		})
		.state('upload', {
			url: '/upload',
			controller: 'UploadController',
			templateUrl: 'app/components/upload/upload.html'
		})
		.state('issue', {
			url: '/issue/:id',
			controller: 'IssueController',
			templateUrl: 'app/components/issue/issue.html'
		})
		.state('gallery', {
			url: '/gallery',
			controller: 'GalleryController',
			templateUrl: 'app/components/gallery/gallery.html'
		})
		.state('help', {
			url: '/help',
			templateUrl: 'app/components/help/help.html'
		});
};

angular
	.module('app')
	.config(routeConfig);
