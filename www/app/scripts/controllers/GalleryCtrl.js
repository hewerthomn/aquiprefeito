/*
 * Gallery Controller
 */
function GalleryCtrl($scope, Aqui)
{
	function _init()
	{
		$scope.issues = Aqui.Issue.getLasts();
	};

	function _apply()
	{
		if(!$scope.$$phase) $scope.$apply();
	};

	_init();
};

angular
	.module('app.controllers')
	.controller('GalleryCtrl', ['$scope', 'Aqui', GalleryCtrl]);
