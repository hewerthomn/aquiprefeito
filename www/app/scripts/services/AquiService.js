/**
 * Aqui Service
 */
function AquiService($http, $cordovaFileTransfer)
{
	function _onDeviceReady(callback)
	{
		document.addEventListener('deviceready', callback, false);
	}

	var url_api = 'http://aquiprefeito.com.br/api/';

	return {

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
					image: '',
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

			save: function(issue, city, successCallback, errorCallback, progressCallback)
			{
				var url = url_api + 'issue';
				var data = {
					city: city.name,
					comment: issue.comment,
					username: issue.username,
					category_id: issue.category_id,
					lonlat: issue.lonlat.lon + " " + issue.lonlat.lat
				};

				_onDeviceReady(function() {

					return $cordovaFileTransfer
										.upload(url, issue.image, data)
										.then(successCallback, errorCallback, progressCallback);
				});

			}
		}
	}
};

angular
	.module('app.services')
	.service('Aqui', ['$http', '$cordovaFileTransfer',  AquiService]);
