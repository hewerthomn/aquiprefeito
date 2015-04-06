/*
 * Gallery Controller
 */
function GalleryCtrl($scope)
{
	function _init()
	{

	}

	function _apply()
	{
		if(!$scope.$$phase) $scope.$apply();
	};

	_init();
};

angular
	.module('app.controllers')
	.controller('GalleryCtrl', ['$scope', GalleryCtrl]);
