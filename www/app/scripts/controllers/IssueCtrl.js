/*
 * Issue Controller
 */
function IssueCtrl($scope, $stateParams, $ionicHistory, Aqui, FB)
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

	function _sendComment(comment)
	{
		$scope.sendingComment = true;

		var newComment = {
			comment: comment,
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
		Aqui.Issue
			.like($scope.issue.id, $scope.userfacebook)
			.success(function(like) {
				$scope.liked = like;
			});
	};

	$scope.toggleCommentBox = function()
	{
		$scope.commentBoxVisible = !($scope.commentBoxVisible);
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
	.controller('IssueCtrl', ['$scope', '$stateParams', '$ionicHistory', 'Aqui', 'FB', IssueCtrl]);
