/*
 * Issue Controller
 */
function IssueCtrl($scope, $stateParams, $ionicHistory, $cordovaDevice, focus, Aqui)
{
	function _init()
	{
		$scope.uuid = null;
		$scope.issue = null;
		$scope.liked = false;

		$scope.comment = null;
		$scope.sendingComment = false;
		$scope.commentBoxVisible = false;

		Aqui.Issue.get($stateParams.id)
			.success(function(issue) {
				$scope.issue = issue;
			})
			.error(function(error){
				console.error(error);
			});

		_onDeviceReady(function() {
			var uuid = $cordovaDevice.getUUID();
			Aqui.Issue.checkLike($stateParams.id, uuid)
				.success(function(liked) {
					$scope.liked = liked;
					_apply();
				});
		});
	};

	function _apply()
	{
		if(!$scope.$$phase) $scope.$apply();
	};

	function _onDeviceReady(callback)
	{
		document.addEventListener('deviceready', callback, false);
	};

	$scope.photo = function(issue)
	{
		return (issue != null && issue.photo != '') ? Aqui.Site.url + 'img/issues/lg/' + issue.photo : '';
	};

	$scope.like = function()
	{
		_onDeviceReady(function() {
			var uuid = $cordovaDevice.getUUID();

			Aqui.Issue.like($scope.issue.id, uuid)
				.success(function() {
					$scope.liked = true;
				})
				.error(function() {
					$scope.liked = false;
				});
		});
	};

	$scope.showCommentBox = function()
	{
		$scope.commentBoxVisible = true;
		focus('username');
	};

	$scope.sendComment = function(comment)
	{
		_onDeviceReady(function() {
			var uuid = $cordovaDevice.getUUID();

			$scope.sendingComment = true;

			Aqui.Issue
				.comment($scope.issue.id, uuid, comment.username, comment.comment)
				.success(function(result) {
					$scope.sendingComment = false;
					$scope.comment = { username: '', comment: '' };
					console.log('result', result);
				})
				.error(function(error) {
					console.error(error);
					$scope.sendingComment = false;
				});
		});
	};

	$scope.goBack = function()
	{
		$ionicHistory.goBack();
	};

	_init();
};

angular
	.module('app.controllers')
	.controller('IssueCtrl', ['$scope', '$stateParams', '$ionicHistory', '$cordovaDevice', 'focus', 'Aqui', IssueCtrl]);
