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
		alert('take photo!');
		console.log('Photo!');
	};

	_init();
};

angular
	.module('app.controllers')
	.controller('AppCtrl', ['$scope', AppCtrl]);
