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
			offset: 90,
			startZoom: $scope.zoom,
			startLonlat: $scope.startLonlat
		});

		Map.getPosition(function(lonlat) {
			Map.setCenterMap(lonlat, 12, { transformTo: 'EPSG:4326' });
		}, function(error) {
			alert(error);
		});

		angular.element($window).bind('resize', function() { Map.fixMapHeight(); });
	}

	_init();
};

angular
	.module('app.controllers')
	.controller('HomeCtrl', ['$scope', '$location', '$window', 'Map', HomeCtrl]);
