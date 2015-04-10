/*
 * Home Controller
 */
function HomeCtrl($scope, $window, Aqui, Map)
{
	function _init()
	{
		$scope.zoom = 4;
		$scope.startLonlat = {
			lon: -5801876.194150391,
			lat: -1027313.6600097648
		};

		$scope.issues = [];

		$scope.categories = Aqui.Category.getAll();

		Map.init({
			id: 'map',
			offset: 90,
			startZoom: $scope.zoom,
			startLonlat: $scope.startLonlat,
			onSelectPoint: _onSelectPoint
		});

		$scope.getPosition();

		_loadIssues();

		angular.element($window).bind('resize', function() { Map.fixMapHeight(); });
	}

	function _onSelectPoint(feature)
	{
		var point = feature.data;

		console.log('point', point);
	};

	function _loadIssues()
	{
		var points = [];

		$scope.issues = Aqui.Issue.getLasts();

		angular.forEach($scope.issues, function(value, key) {
			var category = Aqui.Category.get(value.category_id);

			points.push({
				id: value.id,
				icon: category.icon,
				lon: value.lonlat.lon,
				lat: value.lonlat.lat,
			});
		});

		var options = { transformTo: 'EPSG:4326' };

		Map.addPoints(points, options);
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
	.controller('HomeCtrl', ['$scope', '$window', 'Aqui', 'Map', HomeCtrl]);
