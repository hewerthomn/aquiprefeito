'use strict';
/**
 * Issue Service
 */
function IssueService($http, $localStorage, $cordovaFileTransfer, URL)
{
	this.new = function(issue)
	{
		return {
			photo: '',
			comment: '',
			username: '',
			category_id: 0,
			lonlat: { lon: 0, lat: 0 }
		};
	};

	this.get = function(id)
	{
		return $http.get(URL.API + 'issue/' + id);
	};

	this.getPoints = function()
	{
		return $http.get(URL.API + 'issue/map', {
			params: { city_name: $localStorage.city.name }
		});
	};

	this.getLasts = function()
	{
		return $http.get(URL.API + 'issue', {
			params: { city_name: $localStorage.city.name }
		});
	};

	this.like = function(id, facebook_id)
	{
		var data = {
			facebook_id: facebook_id
		};
		return $http.post(URL.API + 'issue/' + id + '/like', data);
	};

	this.checkLike = function(id, facebook_id)
	{
		return $http.get(URL.API + 'issue/' + id + '/like', {
			params: { facebook_id: facebook_id }
		});
	};

	this.getComments = function(id)
	{
		return $http.get(URL.API + 'issue/' + id + '/comment');
	};

	this.comment = function(id, comment)
	{
		var data = {
			issue_id: id,
			comment: comment.text,
			username: comment.userfacebook.name,
			facebook_id: comment.userfacebook.id
		};
		return $http.post(URL.API + 'issue/' + id + '/comment', data);
	},

	this.save = function(issue, successCallback, errorCallback, progressCallback)
	{
		var url = URL.API + 'upload';
		var trustHosts = false;
		var options = {
			chunkedMode: false,
			params: {
				city: $localStorage.city.name,
				comment: issue.comment,
				email: issue.userfacebook.email,
				username: issue.userfacebook.name,
				facebook_id: issue.userfacebook.id,
				category_id: issue.category_id,
				lonlat: issue.lonlat.lon + " " + issue.lonlat.lat
			}
		};

		document.addEventListener('deviceready', function()
		{
			return $cordovaFileTransfer
								.upload(url, issue.photo, options, trustHosts)
								.then(successCallback, errorCallback, progressCallback);
		}, false);
	};
};

angular
	.module('app')
	.service('Issue', IssueService);
