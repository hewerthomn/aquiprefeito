(function(angular, undefined) {
	'use strict';

	/*
	 * Gallery Controller
	 */
	angular
		.module('app')
		.controller('GalleryController', GalleryController);

	function GalleryController($scope, $state, Issue, URL) {

		function _init() {
			$scope.page = -1;
			$scope.issues = null;
			$scope.moreDataCanBeLoaded = true;
		}

		function _getIssues() {
			Issue.getIssues({ page: $scope.page })
				.success(function(issues) {

					$scope.issues = ($scope.issues === null) ? [] : $scope.issues;

					if(issues.length === 0) {
						$scope.moreDataCanBeLoaded = false;
						return;
					}

					$scope.issues = $scope.issues.concat(issues);

					$scope.$broadcast('scroll.refreshComplete');
					$scope.$broadcast('scroll.infiniteScrollComplete');
				});
		}

		$scope.photo = function(issue, size) {
			/* TODO: Mover método photo para service Issue */
			return (issue !== null && issue.photo !== '') ? URL.SITE + 'img/issues/' + size + '/' + issue.photo : '';
		};

		$scope.select = function(issue_id) {
			$state.go('issue', { id: issue_id }, { reload: true });
		};

		$scope.refresh = function() {
			$scope.page = 0;
			$scope.issues = null;

			_getIssues();
		};

		$scope.loadMore = function() {
			$scope.page++;
			_getIssues();
		};

		_init();
	}

})(window.angular);
