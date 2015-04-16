/*
 * Upload Controller
 */
function UploadCtrl($scope, $state, $timeout, $cordovaToast, Aqui, Camera, Map)
{
	function _init()
	{
		$scope.issue = Aqui.Issue.new();
		$scope.sending = false;

		Aqui.Category.getAll()
			.success(function(categories) {
				$scope.categories = categories;
			})
			.error(function(error) {
				console.error(error);
			});

		$timeout(function() {
			$scope.takePhoto();
		}, 1000);
	};

	function _apply()
	{
		if(!$scope.$$phase) $scope.$apply();
	};

	function _getPosition()
	{
		Map.getPosition(function(lonlat) {
			$scope.issue.lonlat = lonlat;
		}, function(error) {
			alert(error);
		});
	}

	function _takePhoto(issue)
	{
		$scope.issue = issue || Aqui.Issue.new();

		Camera.getPicture(function(imageUri) {
			$scope.issue.photo = imageUri;
			_apply();
		}, function(error) {
			console.error(error);
		});
	};

	function _showToastError(error)
	{
		var msg = 'Ops, algum erro ao reportar problema...\n';
		if(error) msg += 'Error code: ' + error.responseCode + "\n" + error.response;
		return msg;
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

	$scope.takePhoto = function(issue)
	{
		_getPosition();
		_takePhoto(issue)
	};

	$scope.send = function(issue)
	{
		if(issue.category_id == 0)
		{
			alert('Selecione a categoria do problema');
		}
		else if(issue.photo == '' && $scope.photo != 'img/camera.png')
		{
			alert('Toque na câmera para tirar a foto do problema');
		}
		else
		{
			$scope.sending = true;
			$scope.uploadProgress = 0;

			Aqui.Issue
				.save(issue, function(result) {
					$scope.sending = false;
					if(result.responseCode == 200)
					{
						$scope.issue = null;
						$cordovaToast.showShortCenter(result.response);
					}
					else
					{
						$cordovaToast.showShortCenter(_showToastError(result));
					}

					$state.go('gallery', {}, { reload: true });

				}, function(error) {
					$scope.sending = false;
					console.log(error);
					_showToastError(error);

				}, function(progress) {
					$scope.uploadProgress = parseInt((progress.loaded / progress.total) * 100, 10);
				});
		}
	};

	_init();
};

angular
	.module('app.controllers')
	.controller('UploadCtrl', ['$scope', '$state', '$timeout', '$cordovaToast', 'Aqui', 'Camera', 'Map', UploadCtrl]);
