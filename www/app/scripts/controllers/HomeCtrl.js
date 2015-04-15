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
		_loadIssues();
	};

	function _getPosition()
	{
		Map.getPosition(function(lonlat) {
			Map.setCenterMap(lonlat, 12, { transformTo: 'EPSG:4326' });
		}, function(error) {
			alert(error);
		});
	};

	function _onSelectPoint(feature)
	{
		$state.go('issue', { id: feature.data.id }, { reload: true });
	};

	function _loadIssues()
	{
		Aqui.Issue.getLasts()
			.success(function(issues) {
				$scope.issues = issues;
				_addPoints();
			})
			.error(function(error) {
				console.error(error);
			});
	};

	function _addPoints(issues)
	{
		var points = [];

		angular.forEach($scope.issues, function(value, key) {
			var category = Aqui.Category.get(value.category_id);

			points.push({
				id: value.id,
				icon: value.category_icon,
				lon: value.lon,
				lat: value.lat,
			});
		});

		Map.addPoints(points, { transformTo: 'EPSG:4326' });
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
