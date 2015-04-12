/*
 * Home Controller
 */
function HomeCtrl($scope, $window, $ionicModal, Aqui, Map)
{
	function _init()
	{
		$scope.zoom = 4;
		$scope.startLonlat = {
			lon: -5801876.194150391,
			lat: -1027313.6600097648
		};

		$scope.issue = {};
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
			startZoom: $scope.zoom,
			startLonlat: $scope.startLonlat,
			onSelectPoint: _onSelectPoint
		});

		$scope.getPosition();

		_loadIssues();

		$ionicModal
			.fromTemplateUrl('app/views/modal/issue.html', {
  			scope: $scope,
  			animation: 'slide-in-up'
  		})
  		.then(function(modal) {
  			$scope.modalIssue = modal;
  			// $scope.modalIssue.show();
  		});

		angular.element($window).bind('resize', function() { Map.fixMapHeight(); });
	};

	function _onSelectPoint(feature)
	{
		Aqui.Issue.get(feature.data.id)
			.success(function(issue) {
				$scope.issue = issue;
				$scope.modalIssue.show();
			});
	};

	function _loadIssues()
	{
		Aqui.Issue.getLasts()
			.success(function(issues) {
				$scope.issues = issues;

				var points = [];
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
			})
			.error(function(error) {
				console.error(error);
			});
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
	.controller('HomeCtrl', ['$scope', '$window', '$ionicModal', 'Aqui', 'Map', HomeCtrl]);
