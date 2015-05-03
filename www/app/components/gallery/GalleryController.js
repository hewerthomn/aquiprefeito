'use strict';
/*
 * Gallery Controller
 */
function GalleryController($scope, $state, Issue, URL)
{
	function _init()
	{
		$scope.issues = null;

		_getLasts();
	};

	function _getLasts()
	{
		Issue.getLasts()
			.success(function(issues) {
				$scope.issues = issues;
				$scope.$broadcast('scroll.refreshComplete');
			});
	};

	$scope.photo = function(issue)
	{
		return (issue != null && issue.photo != '') ? URL.SITE + 'img/issues/sm/' + issue.photo : '';
	};

	$scope.select = function(issue_id)
	{
		$state.go('issue', { id: issue_id }, { reload: true });
	};

	$scope.refresh = function()
	{
		_getLasts();
	};

	_init();
};

angular
	.module('app')
	.controller('GalleryController', GalleryController);
