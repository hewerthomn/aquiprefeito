/*
 * Issue Controller
 */
function IssueCtrl($scope, $stateParams, $ionicHistory, Aqui)
{
	function _init()
	{
		$scope.uuid = null;
		$scope.issue = null;
		$scope.liked = false;

		Aqui.Issue.get($stateParams.id)
			.success(function(issue) {
				$scope.issue = issue;
			})
			.error(function(error){
				console.error(error);
			});

		Aqui.Issue.checkLike($stateParams.id)
			.success(function(liked) {
				$scope.liked = liked;
			});
	};

	$scope.photo = function(issue)
	{
		return (issue != null && issue.photo != '') ? Aqui.Site.url + 'img/issues/lg/' + issue.photo : '';
	};

	$scope.like = function()
	{
		$scope.liked = true;
		Aqui.Issue.like($scope.issue.id);
	};

	$scope.goBack = function()
	{
		$ionicHistory.goBack();
	};

	_init();
};

angular
	.module('app.controllers')
	.controller('IssueCtrl', ['$scope', '$stateParams', '$ionicHistory', 'Aqui', IssueCtrl]);
