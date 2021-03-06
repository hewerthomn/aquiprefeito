(function(angular, undefined) {
	'use strict';

	/**
	 * FB User Directive
	 */
	angular
		.module('app')
		.directive('fbUser', fbUser);

	function fbUser($localStorage, FB) {
		return {
			restrict: 'AE',
			link: function(scope, element, attrs, controllers) {
				scope.$storage = $localStorage;

				scope.login = function() {
					FB.login();
				};

				scope.logout = function() {
					scope.$storage.user = null;
					FB.logout();
				};
			},
			templateUrl: 'app/directives/fb-user/fb-user.html',
		};
	}

})(window.angular);
