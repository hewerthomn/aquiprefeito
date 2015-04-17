/*
 * Issue Controller
 */
function IssueCtrl($scope, $timeout, $stateParams, $ionicHistory, $ionicScrollDelegate, Aqui, FB)
{
	function _init()
	{
		$scope.issue = null;
		$scope.liked = false;
		$scope.comments = null;

		$scope.logged = false;
		$scope.userfacebook = null;

		$scope.newComment = null;
		$scope.sendingComment = false;
		$scope.commentBoxVisible = false;

		Aqui.Issue.get($stateParams.id)
			.success(function(issue) {
				$scope.issue = issue;
			})
			.error(function(error){
				console.error(error);
			});

		_checkLogin();
	};

	function _apply()
	{
		if(!$scope.$$phase) $scope.$apply();
	};

	function _checkLogin()
	{
		FB.status()
			.then(function(responseStatus) {
				if(responseStatus.status == "connected")
				{
					_getUserFacebook();
				}
				else /* not connect on facebook */
				{
	    		_logout();
				}
			});
	};

	function _login()
	{
		FB.login()
			.then(function(responseLogin) {
				_getUserFacebook();
			});
	};

	function _logout()
	{
		FB.logout();
		$scope.logged = false;
		_apply();
	};

	function _getUserFacebook()
	{
		FB.me()
			.then(function(responseMe) {
				$scope.logged = true;
				$scope.userfacebook = responseMe;
				$scope.userfacebook.avatar = FB.avatar(responseMe.id);
			}, function(errorMe) {
				_logout();
			});
	};

	function _sendComment(text)
	{
		$scope.sendingComment = true;

		var newComment = {
			text: text,
			userfacebook: $scope.userfacebook
		};

		Aqui.Issue
			.comment($scope.issue.id, newComment)
			.success(function(result) {
				$scope.issue.comments.push(newComment);

				$scope.newComment = null;
				$scope.sendingComment = false;
				$scope.commentBoxVisible = false;
			})
			.error(function(error) {
				console.error(error);
				$scope.sendingComment = false;
			});
	};

	$scope.photo = function(issue)
	{
		return (issue != null && issue.photo != '') ? Aqui.Site.url + 'img/issues/lg/' + issue.photo : '';
	};

	$scope.login = function()
	{
		_login();
	};

	$scope.logout = function()
	{
		_logout();
	};

	$scope.avatar = function(facebook_id)
	{
		return FB.avatar(facebook_id);
	};

	$scope.like = function()
	{
		$scope.liked = !$scope.liked;

		Aqui.Issue
			.like($scope.issue.id, $scope.userfacebook.id)
			.success(function(like) {
				$scope.liked = like;
				$scope.issue.likes = (like > 0) ? ($scope.issue.likes +1) : ($scope.issue.likes -1);
			});
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
		if($scope.userfacebook == null)
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
	.module('app.controllers')
	.controller('IssueCtrl', ['$scope', '$timeout', '$stateParams', '$ionicHistory', '$ionicScrollDelegate', 'Aqui', 'FB', IssueCtrl]);
