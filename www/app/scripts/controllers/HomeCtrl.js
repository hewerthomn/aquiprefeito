/*
 * Home Controller
 */
function HomeCtrl($scope, $window, Map)
{
	function _init()
	{
		$scope.zoom = 4;
		$scope.startLonlat = {
			lon: -5801876.194150391,
			lat: -1027313.6600097648
		};

		Map.init({
			id: 'map',
			offset: 90,
			startZoom: $scope.zoom,
			startLonlat: $scope.startLonlat
		});

		$scope.getPosition();

		angular.element($window).bind('resize', function() { Map.fixMapHeight(); });
	}

	$scope.getPosition = function()
	{
		Map.getPosition(function(lonlat) {
			Map.setCenterMap(lonlat, 12, { transformTo: 'EPSG:4326' });
		}, function(error) {
			alert(error);
		});
	};

	_init();
};

angular
	.module('app.controllers')
	.controller('HomeCtrl', ['$scope', '$window', 'Map', HomeCtrl]);
