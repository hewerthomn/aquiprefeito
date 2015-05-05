(function(angular, undefined) {
	'use strict';

	/*
	 * Issue Controller
	 */
	angular
		.module('app')
		.controller('IssueController', IssueController);

	function IssueController($scope, $timeout, $stateParams, $ionicHistory, $ionicModal, $ionicScrollDelegate, $cordovaToast, Aqui, Geocoder, Issue, FB, URL)
	{
		function _init()
		{
			$scope.issue = null;
			$scope.liked = false;
			$scope.comments = [];

			$scope.$storage = Aqui.storage();

			_clearComment();

			$ionicModal.fromTemplateUrl('app/partials/modalIssuePhoto.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				$scope.modalIssuePhoto = modal;
			});

			Issue.get($stateParams.id)
				.success(function(issue) {
					$scope.issue = issue;

					_checkLike();
					_getComments();
					_getAddress();
				})
				.error(function(error){
					console.error(error);
				});
		}

		function _apply()
		{
			if(!$scope.$$phase) $scope.$apply();
		}

		function _checkLike()
		{
			if($scope.$storage.isLoggedIn)
			{
				Issue.checkLike($stateParams.id)
					.success(function(like) {
						$scope.liked = like;
					});
			}
		}

		function _getComments()
		{
			Issue.getComments($stateParams.id)
				.success(function(comments) {
					$scope.comments = comments;
				});
		}

		function _getAddress()
		{
			Geocoder.getPlaceInfo({ lon: $scope.issue.lon, lat: $scope.issue.lat })
				.success(function(response) {
					if(response.status === 'OK')
					{
						$scope.issue.address = response.results[0].formatted_address;
					}
				});
		}

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
						facebook_id: newComment.user.id,
						created_at: Date.now() / 1000
					});

					_clearComment();

					$cordovaToast.showShortCenter(result);
				})
				.error(function(error) {
					console.error(error);
					$scope.sendingComment = false;
				});
		}

		function _clearComment()
		{
			$scope.newComment = { text: '' };
			$scope.sendingComment = false;
			$scope.commentBoxVisible = false;
			_apply();
		}

		$scope.photo = function(issue, size)
		{
			return (issue !== null && issue.photo !== '') ? URL.SITE + 'img/issues/' + size + '/' + issue.photo : '';
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
			}
		};

		$scope.share = function()
		{
			FB.share($scope.issue)
				.then(function(result) {
					$cordovaToast.showShortCenter('Problema compartilhado com sucesso!');
				}, function(err) {
					if(err.errorCode != "4201")
					{
						console.error(err);
						$cordovaToast.showShortCenter('Ops, não foi possível compartilhar...');
					}
				});
		};

		$scope.sendComment = function(comment)
		{
			if(!$scope.$storage.isLoggedIn)
			{
				alert('Entre com a conta do Facebook');
				return;
			}

			if(!comment || comment === '')
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
	}

})(window.angular);
