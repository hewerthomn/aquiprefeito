/*
 * App Controller
 */
function AppCtrl($scope, $location, $timeout, $ionicActionSheet, $ionicModal, Camera, Map)
{
	/* private methods */
	function _init()
	{
		$scope.categories = [
		{ id: 0, name: 'Selecione a categoria' },
		{ id: 1, name: 'Pavimentação', icon: 'img/categories/1.png' },
		{ id: 2, name: 'Iluminação Pública', icon: 'img/categories/2.png' },
		{ id: 3, name: 'Queimada Urbana', icon: 'img/categories/3.png' },
		{ id: 4, name: 'Limpeza Urbana', icon: 'img/categories/4.png' },
		{ id: 5, name: 'Transporte Público', icon: 'img/categories/5.png' },
		{ id: 6, name: 'Sinalização de Trânsito', icon: 'img/categories/6.png' },
		];

		$scope.issue = {
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

	};

	function _apply()
	{
		if(!$scope.$$phase) $scope.$apply();
	};

	function _takePhoto()
	{
		Map.getPosition(function(lonlat) {
			$scope.issue.location = lonlat;
		}, function(error) {
			alert(error);
		});

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
		console.log('issue', issue);
		alert(JSON.stringify(issue));
	};

	_init();
};

angular
	.module('app.controllers')
	.controller('AppCtrl', ['$scope', '$location', '$timeout', '$ionicActionSheet', '$ionicModal', 'Camera', 'Map', AppCtrl]);
