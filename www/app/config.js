'use strict';
/**
 * App Config
 */
function appConfig($ionicConfigProvider) {

	$ionicConfigProvider.tabs.position('bottom');

};

angular
	.module('app')
	.config(appConfig);
