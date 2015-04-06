/*
 * App Controller
 */
function AppCtrl($scope)
{
	function _init()
	{

	}

	function _apply()
	{
		if(!$scope.$$phase) $scope.$apply();
	};

	$scope.takePhoto = function()
	{
		console.log('takePhoto()');
		alert('takePhoto()');
	};

	_init();
};

angular
	.module('app.controllers')
	.controller('AppCtrl', ['$scope', AppCtrl]);
