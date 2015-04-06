/*
 * Home Controller
 */
function HomeCtrl($scope, $location, $window, Map)
{
	function _init()
	{
		$scope.zoom = 4;
		$scope.startLonlat = { lon: -11.620992573114625, lat: -50.98007812499999 };

		Map.init({
			id: 'map',
			startZoom: $scope.zoom,
			startLonlat: $scope.startLonlat
		});

		Map.getPosition(function(position) {
			Map.setCenterMap(position, 12);
		}, function(error) {
			console.error('error', error);
			alert(error);
		}, function() {
		});

		angular.element($window).bind('resize', function() { Map.fixMapHeight(); });
	}

	function _apply()
	{
		if(!$scope.$$phase) $scope.$apply();
	};

	$scope.goto = function(to)
	{
		$location.path(to);
	};

	_init();
};

angular
	.module('app.controllers')
	.controller('HomeCtrl', ['$scope', '$location', '$window', 'Map', HomeCtrl]);
