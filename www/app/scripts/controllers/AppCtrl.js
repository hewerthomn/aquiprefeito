/*
 * App Controller
 */
function AppCtrl($scope, $location, $timeout, $ionicModal, Aqui, Camera, Map, Geocoder)
{
	/* private methods */
	function _init()
	{
		$scope.city = {
			name: '...',
			position: { lon: 0, lat: 0 }
		};
		$scope.issue = Aqui.Issue.new();
		$scope.categories = Aqui.Category.getAll();

		$ionicModal
			.fromTemplateUrl('app/views/modal/photo.html', {
  			scope: $scope,
  			animation: 'slide-in-up'
  		})
  		.then(function(modal) {
  			$scope.modalPhoto = modal;
  			// $scope.modalPhoto.show();
  		});

		_getCity();
	};

	function _apply()
	{
		if(!$scope.$$phase) $scope.$apply();
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

	function _getPosition()
	{
		Map.getPosition(function(lonlat) {
			$scope.issue.lonlat = lonlat;
		}, function(error) {
			alert(error);
		});
	}

	function _takePhoto()
	{
		$scope.issue = Aqui.Issue.new();

		_getPosition();

		Camera.getPicture(function(imageUri) {
			$scope.issue.image = imageUri;
  		$scope.openModal();
		}, function(error) {
			alert(error);
		});
	};

	/* scope methods */
	$scope.goto = function(path)
	{
		$location.path(path);
	};

	$scope.openModal = function()
	{
		$scope.modalPhoto.show();
	};

	$scope.closeModal = function()
	{
		$scope.modalPhoto.hide();
	};

	$scope.actionCamera = function()
	{
		_takePhoto();
	};

	$scope.send = function(issue)
	{
		Aqui.Issue.save(issue, $scope.city);
		$scope.closeModal();
	};

	_init();
};

angular
	.module('app.controllers')
	.controller('AppCtrl', ['$scope', '$location', '$timeout', '$ionicModal', 'Aqui', 'Camera', 'Map', 'Geocoder', AppCtrl]);
