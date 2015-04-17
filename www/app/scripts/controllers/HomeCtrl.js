/*
 * Home Controller
 */
function HomeCtrl($scope, $state, Aqui, Map)
{
	function _init()
	{
		Aqui.init();

		$scope.$storage = Aqui.Storage.get();

		$scope.issues = [];

		Aqui.Category.getAll()
			.success(function(categories) {
				$scope.categories = categories;
			})
			.error(function(error) {
				console.error(error);
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
	};

	function _getPosition()
	{
		Map.getPosition(function(lonlat) {
			Map.setCenterMap(lonlat, 12, { transformTo: 'EPSG:4326' });
		}, function(error) {
			alert(error);
		});
	};

	function _getPoints()
	{
		Aqui.Issue.getPoints()
			.success(function(points) {
				Map.addPoints(points, { transformTo: 'EPSG:4326' });
			})
			.error(function(error) {
				console.error(error);
			});
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
	.module('app.controllers')
	.controller('HomeCtrl', ['$scope', '$state', 'Aqui', 'Map', HomeCtrl]);
