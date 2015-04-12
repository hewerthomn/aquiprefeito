/*
 * Gallery Controller
 */
function GalleryCtrl($scope, Aqui)
{
	function _init()
	{
		Aqui.Issue.getLasts()
			.success(function(issues) {
				$scope.issues = issues;
			})
			.error(function(error){
				console.error(error);
			});
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
