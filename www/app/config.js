(function(angular, undefined) {
	'use strict';

	/**
	 * App Config
	 */
	angular
		.module('app')
		.config(appConfig);

	function appConfig($ionicConfigProvider) {

		$ionicConfigProvider.tabs.position('bottom');
	}
})(window.angular);
