'use strict';
/*
 * Upload Controller
 */
function UploadController($scope, $state, $cordovaToast, Category, Camera, Issue, FB, Map)
{
	function _init()
	{
		$scope.issue = Issue.new();
		$scope.sending = false;
		$scope.userfacebook = null;
		$scope.facebookLogged = false;

		Category.getAll()
			.success(function(categories) {
				$scope.categories = categories;
			});

		_checkLogin();
	};

	function _apply()
	{
		if(!$scope.$$phase) $scope.$apply();
	};

	function _checkLogin()
	{
		FB.status()
			.then(function(responseStatus) {
				if(responseStatus.status == "connected")
				{
	    		$scope.facebookLogged = true;
					_getUserFacebook();
				}
				else /* not connect on facebook */
				{
	    		_logout();
				}
			});
	};

	function _login()
	{
		FB.login()
			.then(function(responseLogin) {
				_getUserFacebook();
			});
	};

	function _logout()
	{
		FB.logout();

		$scope.userfacebook = null;
		$scope.facebookLogged = false;
	};

	function _getUserFacebook()
	{
		FB.me()
			.then(function(responseMe) {
				$scope.userfacebook = responseMe;
				$scope.userfacebook.avatar = FB.avatar(responseMe.id);
				$scope.facebookLogged = true;
				_apply();
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

	function _takePhoto(issue)
	{
		$scope.issue = issue || Issue.new();

		Camera.getPicture(function(imageUri) {
			$scope.issue.photo = imageUri;
			_apply();
		});
	};

	function _showToastError(error)
	{
		var msg = 'Ops, algum erro ao reportar problema...\n';
		if(error) msg += 'Error code: ' + error.responseCode + "\n" + error.response;
		return msg;
	};

	function _send(issue)
	{
		$scope.sending = true;
		$scope.uploadProgress = 0;
		issue.userfacebook = $scope.userfacebook;

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

			$state.go('gallery', {}, { reload: true });
		}, function(error) {
			$scope.sending = false;
			_showToastError(error);

		}, function(progress) {
			$scope.uploadProgress = parseInt((progress.loaded / progress.total) * 100, 10);
		});
	};

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

	$scope.login = function()
	{
		_login();
	};

	$scope.logout = function()
	{
		_logout();
	};

	$scope.takePhoto = function(issue)
	{
		_getPosition();
		_takePhoto(issue)
	};

	$scope.send = function(issue)
	{
		if(!$scope.userfacebook)
		{
			alert('Entre com a conta do Facebook');
		}
		else if(issue.category_id == 0)
		{
			alert('Selecione a categoria do problema');
		}
		else if(issue.photo == '' && $scope.photo != 'img/camera.png')
		{
			alert('Toque na câmera para tirar foto');
		}
		else
		{
			_send(issue);
		}
	};

	_init();
};

angular
	.module('app')
	.controller('UploadController', UploadController);
