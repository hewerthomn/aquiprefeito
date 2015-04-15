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
				$scope.issue.comments = [{
					avatar: 'http://api.adorable.io/avatars/80/abott@adorable.png',
					username: 'Aboot Adorable',
					comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, perspiciatis?'
				}, {
					avatar: 'http://api.adorable.io/avatars/80/joee@adorable.io.png',
					username: 'Joe Adorable',
					comment: 'Illum dolore voluptatum consectetur? Hic expedita accusantium mollitia est adipisci recusandae corporis asperiores, similique earum.'
				}];
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
					console.log('result', result);

					$scope.issue.comments.push({
						username: comment.username,
						comment: comment.comment
					});

					$scope.comment = { username: '', comment: '' };
					$scope.sendingComment = false;
					$scope.commentBoxVisible = false;
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
