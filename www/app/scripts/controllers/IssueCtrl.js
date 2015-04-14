/*
 * Issue Controller
 */
function IssueCtrl($scope, $stateParams, $ionicHistory, $cordovaDevice, Aqui)
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

	$scope.goBack = function()
	{
		$ionicHistory.goBack();
	};

	_init();
};

angular
	.module('app.controllers')
	.controller('IssueCtrl', ['$scope', '$stateParams', '$ionicHistory', '$cordovaDevice', 'Aqui', IssueCtrl]);
