/**
 * Aqui Service
 */
function AquiService($http, $localStorage $cordovaFileTransfer)
{
	function _onDeviceReady(callback)
	{
		document.addEventListener('deviceready', callback, false);
	}

	var url_api = '/api/';

	return {

		Device:
		{
			get: function()
			{
				_onDeviceReady(function() {
					return $cordovaDevice.getDevice
				});
			}
		},

		Site:
		{
			url: '/site/'
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

			getLasts: function()
			{
				return $http.get(url_api + 'issue');
			},

			like: function(id, uuid)
			{
				return $http.post(url_api + 'issue/' + id + '/like', { uuid: uuid });
			},

			checkLike: function(id, uuid)
			{
				return $http.get(url_api + 'issue/' + id + '/like', {
					params: { uuid: uuid }
				});
			},

			comment: function(id, uuid, username, comment)
			{
				var data = {
					uuid: uuid,
					username: username,
					comment: comment
				};
				return $http.post(url_api + 'issue/' + id + '/comment', data);
			},

			save: function(issue, city, successCallback, errorCallback, progressCallback)
			{
				var url = url_api + 'upload';
				var trustHosts = false;
				var options = {
					chunkedMode: false,
					params: {
						city: city.name,
						comment: issue.comment,
						username: issue.username,
						category_id: issue.category_id,
						lonlat: issue.lonlat.lon + " " + issue.lonlat.lat
					}
				};

				_onDeviceReady(function() {

					return $cordovaFileTransfer
										.upload(url, issue.image, options, trustHosts)
										.then(successCallback, errorCallback, progressCallback);
				});

			}
		}
	}
};

angular
	.module('app.services')
	.service('Aqui', ['$http', '$localStorage', '$cordovaFileTransfer',  AquiService]);
