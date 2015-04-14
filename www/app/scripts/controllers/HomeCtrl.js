/*
 * Home Controller
 */
function HomeCtrl($scope, $window, $state, Aqui, Map, Geocoder)
{
	function _init()
	{
		$scope.zoom = 4;
		$scope.issues = [];
		$scope.city = {
			name: '...',
			lonlat: {
				lon: -5801876.194150391,
				lat: -1027313.6600097648
			}
		};

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
			startZoom: $scope.zoom,
			startLonlat: $scope.city.lonlat,
			onSelectPoint: _onSelectPoint
		});

		$scope.getPosition();

		_getCity();
		_loadIssues();

		angular.element($window).bind('resize', function() { Map.fixMapHeight(); });
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

	function _getCity()
	{
		Map.getPosition(function(lonlat) {
			_getCityInfo(lonlat);
		}, function(error) {
			alert(error);
			console.log(error);
		});
	};

	function _getCityInfo(lonlat)
	{
		$scope.city.lonlat = lonlat;

		Geocoder
			.getPlaceInfo(lonlat)
			.success(function(response) {
				if(response.hasOwnProperty('results'))
				{
					$scope.city.name = response.results[0].address_components[4].long_name;
				}
			})
			.error(function(error){
				console.error(error);
				alert(error);
			});
	};

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
	.controller('HomeCtrl', ['$scope', '$window', '$state', 'Aqui', 'Map', 'Geocoder', HomeCtrl]);
