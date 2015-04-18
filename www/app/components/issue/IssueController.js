'use strict';
/*
 * Issue Controller
 */
function IssueController($scope, $timeout, $stateParams, $ionicHistory, $ionicScrollDelegate, $cordovaToast, Aqui, Issue, FB, URL)
{
	function _init()
	{
		$scope.issue = null;
		$scope.liked = false;
		$scope.comments = [];

		$scope.$storage = Aqui.storage();

		_clearComment();

		Issue.get($stateParams.id)
			.success(function(issue) {
				$scope.issue = issue;

				_checkLike();
				_getComments();
			})
			.error(function(error){
				console.error(error);
			});
	};

	function _apply()
	{
		if(!$scope.$$phase) $scope.$apply();
	};

	function _checkLike()
	{
		if($scope.$storage.isLoggedIn)
		{
			Issue.checkLike($stateParams.id)
				.success(function(like) {
					$scope.liked = like;
				});
		}
	};

	function _getComments()
	{
		Issue.getComments($stateParams.id)
			.success(function(comments) {
				$scope.comments = comments;
			});
	};

	function _sendComment(text)
	{
		$scope.sendingComment = true;

		var newComment = {
			text: text,
			user: $scope.$storage.user
		};

		Issue.comment($scope.issue.id, text)
			.success(function(result) {

				$scope.comments.unshift({
					comment: newComment.text,
					username: newComment.user.name,
					facebook_id: newComment.user.id
				});

				_clearComment();

				$cordovaToast.showShortCenter(result);
			})
			.error(function(error) {
				console.error(error);
				$scope.sendingComment = false;
			});
	};

	function _clearComment()
	{
		$scope.newComment = { text: '' };
		$scope.sendingComment = false;
		$scope.commentBoxVisible = false;
		_apply();
	};

	$scope.photo = function(issue)
	{
		return (issue != null && issue.photo != '') ? URL.SITE + 'img/issues/lg/' + issue.photo : '';
	};

	$scope.avatar = function(facebook_id)
	{
		return FB.avatar(facebook_id);
	};

	$scope.like = function()
	{
		if($scope.$storage.isLoggedIn)
		{
			$scope.liked = !$scope.liked;

			Issue.like($scope.issue.id)
				.success(function(like) {
					$scope.liked = like;
					$scope.issue.likes = (like > 0) ? ($scope.issue.likes +1) : ($scope.issue.likes -1);
				});
		}
	};

	$scope.toggleCommentBox = function()
	{
		$scope.commentBoxVisible = !($scope.commentBoxVisible);
		if($scope.commentBoxVisible)
		{
			$timeout(function() {
				$ionicScrollDelegate.scrollTo(0, 700, true);
			}, 500);
		};
	};

	$scope.sendComment = function(comment)
	{
		if(!$scope.$storage.isLoggedIn)
		{
			alert('Entre com a conta do Facebook');
			return;
		}

		if(!comment || comment == '')
		{
			alert('Escreva o comentário');
			return;
		}

		_sendComment(comment);
	};

	$scope.goBack = function()
	{
		$ionicHistory.goBack();
	};

	_init();
};

angular
	.module('app')
	.controller('IssueController', IssueController);