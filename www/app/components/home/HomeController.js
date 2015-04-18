'use strict';
/*
 * Home Controller
 */
function HomeController($scope, $window, $state, Aqui, Category, Issue, Map)
{
	function _init()
	{
		Aqui.init();
		$scope.$storage = Aqui.storage();

		$scope.issues = [];

		Category.getAll()
			.success(function(categories) {
				$scope.categories = categories;
			});

		Map.init({
			id: 'map',
			offset: 90,
			startZoom: 4,
			startLonlat: $scope.$storage.city.lonlat,
			onSelectPoint: _onSelectPoint
		});

		_getPosition();
		_getPoints();

		angular.element($window).bind('resize', function() { Map.fixMapHeight(); });
	};

	function _getPosition()
	{
		Map.getPosition(function(lonlat) {
			Map.setCenterMap(lonlat, 12, { transformTo: 'EPSG:4326' });
		}, function(err) {
			alert(JSON.stringify(err));
		});
	};

	function _getPoints()
	{
		Issue.getPoints()
			.success(function(points) {
				Map.addPoints(points, { transformTo: 'EPSG:4326' });
			})
	};

	function _onSelectPoint(feature)
	{
		$state.go('issue', { id: feature.data.id }, { reload: true });
	};

	$scope.getPosition = function()
	{
		_getPosition();
	};

	_init();
};

angular
	.module('app')
	.controller('HomeController', HomeController);
