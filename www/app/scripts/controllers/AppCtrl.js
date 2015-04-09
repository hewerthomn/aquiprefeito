/*
 * App Controller
 */
function AppCtrl($scope, $location, $timeout, $ionicModal, Aqui, Camera, Map, Geocoder)
{
	/* private methods */
	function _init()
	{
		$scope.categories = Aqui.Category.getAll();

		$scope.issue = {
			city: '...',
			image: "http://placehold.it/340x220",
			comment: '',
			category_id: 0,
			location: { lon: 0, lat: 0 }
		};

		$ionicModal
			.fromTemplateUrl('modal-photo.html', {
  			scope: $scope,
  			animation: 'slide-in-up'
  		})
  		.then(function(modal) {
  			$scope.modalPhoto = modal;
  			// $scope.modalPhoto.show();
  		});

  		_getPosition();
	};

	function _apply()
	{
		if(!$scope.$$phase) $scope.$apply();
	};

	function _getPosition()
	{
		Map.getPosition(function(lonlat) {
				_getCity(lonlat);
				$scope.issue.location = lonlat;
			}, function(error) {
				alert(error);
			});
	}

	function _getCity(lonlat)
	{
		Geocoder
			.getPlaceInfo(lonlat)
			.success(function(response) {
				if(response.hasOwnProperty('results'))
				{
					$scope.issue.city = response.results[0].address_components[4].long_name;
				}
			})
			.error(function(error){
				console.error(error);
			});
	};

	function _takePhoto()
	{
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
		Aqui.Issue.save(issue);
		$scope.closeModal();
	};

	_init();
};

angular
	.module('app.controllers')
	.controller('AppCtrl', ['$scope', '$location', '$timeout', '$ionicModal', 'Aqui', 'Camera', 'Map', 'Geocoder', AppCtrl]);
