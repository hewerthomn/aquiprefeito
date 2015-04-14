/**
 * Aqui Service
 */
function AquiService($http, $cordovaDevice, $cordovaFileTransfer)
{
	function _onDeviceReady(callback)
	{
		document.addEventListener('deviceready', callback, false);
	}

	var uuid = $cordovaDevice.getUUID();
	var url_api = 'http://aquiprefeito.com.br/api/';

	return {

		Site:
		{
			url: 'http://aquiprefeito.com.br/'
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

			like: function(id)
			{
				$http.post(url_api + 'issue/' + id + '/like', {
					params: { uuid: uuid }
				});
			},

			checkLike: function(id)
			{
				return $http.get(url_api + 'issue/' + id + '/like', {
					params: { uuid: uuid }
				});
			}

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
	.service('Aqui', ['$http', '$cordovaDevice','$cordovaFileTransfer',  AquiService]);
