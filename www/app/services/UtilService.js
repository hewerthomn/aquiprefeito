(function(angular, undefined) {
	'use strict';

	/**
	 * Util Service
	 */
	angular
		.module('app')
		.service('Util', UtilService);

	function UtilService() {

		this.error = function(err) {
			console.error(err);
			alert(JSON.stringify(err));
		};
	}

})(window.angular);
