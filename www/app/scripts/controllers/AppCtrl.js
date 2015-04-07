/*
 * App Controller
 */
function AppCtrl($scope, $location, $timeout, $ionicActionSheet, $ionicModal, Camera)
{
	/* private methods */
	function _init()
	{
		$ionicModal
			.fromTemplateUrl('modal-photo.html', {
  			scope: $scope,
  			animation: 'slide-in-up'
  		})
  		.then(function(modal) {
  			$scope.modalPhoto = modal;
  		});
	};

	function _apply()
	{
		if(!$scope.$$phase) $scope.$apply();
	};

	function _takePhoto()
	{
		Camera.getPicture(function(imageData) {
			$scope.imageData = "data:image/jpeg;base64," + imageData;
  		$scope.openModal();
		}, function(error) {
			console.log(error);
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
		var hideSheet = $ionicActionSheet.show({
				buttons: [
					{ text: "Tirar foto" },
					{ text: "Selecionar da galeria" }
				],
				cancelText: "Cancelar",
				buttonClicked: function(btnIndex) {
					switch(btnIndex)
					{
						case 0: _takePhoto(); break;
						case 1: break;
					}
					return true;
				}
		});
	};

	_init();
};

angular
	.module('app.controllers')
	.controller('AppCtrl', ['$scope', '$location', '$timeout', '$ionicActionSheet', '$ionicModal', 'Camera', AppCtrl]);
