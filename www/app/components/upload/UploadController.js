(function(angular, undefined) {
	'use strict';

	/*
	 * Upload Controller
	 */
	angular
		.module('app')
		.controller('UploadController', UploadController);

	function UploadController($scope, $state, $cordovaToast, Aqui, Category, Camera, Issue, Map)
	{
		function _init()
		{
			Aqui.init();

			$scope.issue = Issue.new();
			$scope.sending = false;

			$scope.$storage = Aqui.storage();

			Category.getAll()
				.success(function(categories) {
					$scope.categories = categories;
				});
		}

		function _apply()
		{
			if(!$scope.$$phase) $scope.$apply();
		}

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
			$scope.issue = issue || Issue.new();

			Camera.getPicture(function(imageUri) {
				_getPosition();
				$scope.issue.photo = imageUri;
				_apply();
			});
		}

		function _showToastError(error)
		{
			var msg = 'Ops, algum erro ao reportar problema...\n';
			if(error) msg += 'Error code: ' + error.responseCode + "\n" + error.response;
			return msg;
		}

		function _send(issue)
		{
			$scope.sending = true;
			$scope.uploadProgress = 0;

			Issue.save(issue, function(result) {
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

				$state.go('tabs.gallery', {}, { reload: true });
			}, function(error) {
				$scope.sending = false;
				_showToastError(error);

			}, function(progress) {
				$scope.uploadProgress = parseInt((progress.loaded / progress.total) * 100, 10);
			});
		}

		$scope.icon = function(category_id)
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
			_takePhoto(issue);
		};

		$scope.send = function(issue)
		{
			if(!$scope.$storage.user)
			{
				alert('Entre com a conta do Facebook');
			}
			else if(issue.category_id === 0)
			{
				alert('Selecione a categoria do problema');
			}
			else if(issue.photo === '' && $scope.photo !== 'img/camera.png')
			{
				alert('Toque na câmera para tirar foto');
			}
			else
			{
				_send(issue);
			}
		};

		_init();
	}

})(window.angular);
