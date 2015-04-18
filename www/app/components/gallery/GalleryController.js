'use strict';
/*
 * Gallery Controller
 */
function GalleryController($scope, $state, Issue, URL)
{
	function _init()
	{
		$scope.issues = null;

		Issue.getLasts()
			.success(function(issues) {
				$scope.issues = issues;
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

	_init();
};

angular
	.module('app')
	.controller('GalleryController', GalleryController);
