/*
 * Gallery Controller
 */
function GalleryCtrl($scope, $state, Aqui)
{
	function _init()
	{
		$scope.issues = null;
		$scope.last_id = 0;

		Aqui.Issue.getLasts()
			.success(function(issues) {
				$scope.issues = issues;
				$scope.last_id = (issues.length > 0) ? issues[issues.length - 1].id : 0;
			})
			.error(function(error){
				console.error(error);
			});
	};

	$scope.photo = function(issue)
	{
		return (issue != null && issue.photo != '') ? Aqui.Site.url + 'img/issues/sm/' + issue.photo : '';
	};

	$scope.select = function(issue_id)
	{
		$state.go('issue', { id: issue_id }, { reload: true });
	};

	_init();
};

angular
	.module('app.controllers')
	.controller('GalleryCtrl', ['$scope', '$state', 'Aqui', GalleryCtrl]);
