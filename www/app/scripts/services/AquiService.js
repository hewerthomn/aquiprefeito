/**
 * Aqui Service
 */
function AquiService($rootScope, $http, $localStorage, $cordovaDevice, $cordovaFileTransfer, Map, Geocoder)
{
	function _apply()
	{
		if(!$rootScope.$$phase) $rootScope.$apply();
	};

	function _onDeviceReady(callback)
	{
		document.addEventListener('deviceready', callback, false);
	}

	var url_site = 'http://aquiprefeito.com.br/';
	var url_api  = url_site + 'api/';

	$localStorage.$default({
		city: {
			name: '...',
			lonlat: {
				lon: -5801876.194150391,
				lat: -1027313.6600097648
			}
		}
	});

	return {

		init: function()
		{
			Map.getPosition(function(lonlat) {
				Geocoder.getPlaceInfo(lonlat)
					.success(function(response) {
						if(response.hasOwnProperty('results'))
						{
							$localStorage.city = {
								lonlat: lonlat,
								name: response.results[0].address_components[4].long_name
							};
						}
					});
			});

			_onDeviceReady(function(){
				$localStorage.device = $cordovaDevice.getDevice();
			});
		},

		Storage:
		{
			get: function()
			{
				return $localStorage;
			}
		},

		Site:
		{
			url: url_site
		},

		Category:
		{
			get: function(id)
			{
				return $http.get(url_api + 'category/' + id);
			},

			getAll: function()
			{
				return $http.get(url_api + 'category');
			}
		},

		Issue:
		{
			new: function(issue)
			{
				return {
					photo: '',
					comment: '',
					username: '',
					category_id: 0,
					lonlat: { lon: 0, lat: 0 }
				};
			},

			get: function(id)
			{
				return $http.get(url_api + 'issue/' + id);
			},

			getPoints: function()
			{
				return $http.get(url_api + 'issue/map', {
					params: { city_name: $localStorage.city.name }
				});
			},

			getLasts: function()
			{
				return $http.get(url_api + 'issue', {
					params: { city_name: $localStorage.city.name }
				});
			},

			like: function(id, userfacebook)
			{
				var data = {
					facebook_id: userfacebook.id
				};
				return $http.post(url_api + 'issue/' + id + '/like', data);
			},

			checkLike: function(id, userfacebook)
			{
				return $http.get(url_api + 'issue/' + id + '/like', {
					params: { facebook_id: userfacebook.id }
				});
			},

			comment: function(id, comment)
			{
				var data = {
					issue_id: id,
					comment: comment.text,
					username: comment.userfacebook.name,
					facebook_id: comment.userfacebook.id
				};
				return $http.post(url_api + 'issue/' + id + '/comment', data);
			},

			save: function(issue, successCallback, errorCallback, progressCallback)
			{
				var url = url_api + 'upload';
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

				_onDeviceReady(function() {

					return $cordovaFileTransfer
										.upload(url, issue.photo, options, trustHosts)
										.then(successCallback, errorCallback, progressCallback);
				});

			}
		}
	}
};

angular
	.module('app.services')
	.service('Aqui', ['$rootScope', '$http', '$localStorage', '$cordovaDevice', '$cordovaFileTransfer', 'Map', 'Geocoder',  AquiService]);
