/*
 * App Controller
 */
function AppCtrl($scope, $location)
{
	function _init()
	{

	}

	function _apply()
	{
		if(!$scope.$$phase) $scope.$apply();
	};

	$scope.goto = function(path)
	{
		$location.path(path);
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
	.controller('AppCtrl', ['$scope', '$location', AppCtrl]);
