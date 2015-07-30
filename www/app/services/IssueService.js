(function(angular, undefined) {
	'use strict';

	/**
	 * Issue Service
	 */
	angular
		.module('app')
		.service('Issue', IssueService);

	function IssueService($http, $localStorage, $cordovaFileTransfer, URL) {

		this.new = function(issue) {
			return {
				photo: '',
				comment: '',
				username: '',
				category_id: 0,
				lonlat: { lon: 0, lat: 0 }
			};
		};

		this.get = function(id) {
			return $http.get(URL.API + 'issue/' + id);
		};

		this.getPoints = function() {
			return $http.get(URL.API + 'issue/map', {
				params: { city_name: $localStorage.city.name }
			});
		};

		this.getIssues = function(params) {
			return $http.get(URL.API + 'issue', {
				params: {
					page: params.page,
					city_name: $localStorage.city.name
				}
			});
		};

		this.like = function(id) {
			var data = {
				facebook_id: $localStorage.user.id
			};
			return $http.post(URL.API + 'issue/' + id + '/like', data);
		};

		this.checkLike = function(id) {
			return $http.get(URL.API + 'issue/' + id + '/like', {
				params: { facebook_id: $localStorage.user.id }
			});
		};

		this.getComments = function(id) {
			return $http.get(URL.API + 'issue/' + id + '/comment');
		};

		this.comment = function(id, text) {
			var data = {
				issue_id: id,
				comment: text,
				username: $localStorage.user.name,
				facebook_id: $localStorage.user.id
			};
			return $http.post(URL.API + 'issue/' + id + '/comment', data);
		};

		this.save = function(issue, successCallback, errorCallback, progressCallback) {
			var url = URL.API + 'upload';
			var trustHosts = false;
			var options = {
				chunkedMode: false,
				params: {
					city: $localStorage.city.name,
					email: $localStorage.user.email,
					username: $localStorage.user.name,
					facebook_id: $localStorage.user.id,
					comment: issue.comment,
					category_id: issue.category_id,
					lonlat: issue.lonlat.lon + " " + issue.lonlat.lat
				}
			};

			document.addEventListener('deviceready', function() {
				return $cordovaFileTransfer
									.upload(url, issue.photo, options, trustHosts)
									.then(successCallback, errorCallback, progressCallback);
			}, false);
		};
	}

})(window.angular);
