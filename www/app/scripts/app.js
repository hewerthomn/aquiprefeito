angular.module('app', [
	'ionic',
	'focusIt',

	'app.controllers',
	'app.directives',
	'app.services'
])
.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			controller: 'HomeCtrl',
			templateUrl: 'app/views/home.html'
		})
		.state('search', {
			url: '/search',
			controller: 'SearchCtrl',
			templateUrl: 'app/views/search.html'
		})
		.state('gallery', {
			url: '/gallery',
			controller: 'GalleryCtrl',
			templateUrl: 'app/views/gallery.html'
		})
		.state('help', {
			url: '/help',
			templateUrl: 'app/views/help.html'
		});
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
