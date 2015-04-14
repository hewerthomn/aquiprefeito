/*
 * App Controller
 */
function AppCtrl($scope, $state, $ionicModal, $cordovaToast, Aqui, Camera, Map, Geocoder)
{
	/* private methods */
	function _init()
	{
		$scope.city = {
			name: '...',
			lonlat: { lon: 0, lat: 0 }
		};
		$scope.issue = Aqui.Issue.new();

		Aqui.Category.getAll()
			.success(function(categories) {
				$scope.categories = categories;
			})
			.error(function(error) {
				console.error(error);
			});

		$scope.sending = false;

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
  		_apply();
		}, function(error) {
			alert(error);
		});
	};

	function _showToastError(error)
	{
		var msg = 'Ops, algum erro ao reportar problema...\n';
		msg += 'Error code ' + result.responseCode + "\n" + result.response;
		return msg;
	};

	/* scope methods */
	$scope.goto = function(path)
	{
		$state.go(path);
	};

	$scope.openModal = function()
	{
		$scope.modalPhoto.show();
	};

	$scope.closeModal = function()
	{
		$scope.modalPhoto.hide();
	};

	$scope.categoryIcon = function(category_id)
	{
		if(category_id > 0)
		{
			var icon = '';
			angular.forEach($scope.categories, function(value) {
				if(value.id == category_id) icon = value.icon;
			});
			return icon;
		}
	};

	$scope.actionCamera = function()
	{
		_takePhoto();
	};

	$scope.send = function(issue)
	{
		if(issue.category_id == 0)
		{
			alert('Selecione a categoria do problema');
		}
		else
		{
			$scope.sending = true;

			Aqui.Issue
				.save(issue, $scope.city, function(result) {
					if(result.responseCode == 200)
					{
						$cordovaToast.showShortCenter(result.response);
					}
					else
					{
						$cordovaToast.showShortCenter(_showToastError(result));
					}

					$scope.sending = false;
					$scope.closeModal();

					$state.go('home', null, { reload: true });

				}, function(error) {
					_showToastError(error);
					$scope.sending = false;
					$scope.closeModal();
				}, function(progress) {
					$scope.uploadProgress = parseInt((progress.loaded / progress.total) * 100, 10);
				});
		}
	};

	_init();
};

angular
	.module('app.controllers')
	.controller('AppCtrl', ['$scope', '$state', '$ionicModal', '$cordovaToast', 'Aqui', 'Camera', 'Map', 'Geocoder', AppCtrl]);
