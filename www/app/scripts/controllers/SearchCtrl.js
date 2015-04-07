/*
 * Search Controller
 */
function SearchCtrl($scope, focus)
{
	function _init()
	{
		focus('inputSearch');
	}

	function _apply()
	{
		if(!$scope.$$phase) $scope.$apply();
	};

	_init();
};

angular
	.module('app.controllers')
	.controller('SearchCtrl', ['$scope', 'focus', SearchCtrl]);
