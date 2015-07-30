(function(angular, undefined) {
	'use strict';

	/**
	 * Tabs Controller
	 */
	angular
		.module('app')
		.controller('TabsController', TabsController);

	function TabsController ($scope) {

		function _init() {
			$scope.galleryNotifications = 1;

			/**
			 * TODO: function com timeout que verifica se tem notificacao nova a partir de id de ultima issue
			 */
		}

		_init();
	}

})(window.angular);
