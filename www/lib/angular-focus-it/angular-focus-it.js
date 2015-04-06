angular.module('focusIt', [])
	.factory('focus', ['$timeout', function($timeout)
	{
		return function(id) {
			$timeout(function() {
				var element = document.getElementById(id);
				console.log('element', element);
				console.log('focus', element.focus());
				if(element) element.focus();
			}, 500);
		};
	}])
	.directive('focusOn', ['focus', function(focus) {
		return function($scope, $elem, $attrs)
		{
			$elem.on($attrs.focusOn, function() {
				focus($attrs.focusId);
			});
			$scope.$on('$destroy', function() {
				$elem.off($attrs.focusOn);
			});
		};
	}]);
