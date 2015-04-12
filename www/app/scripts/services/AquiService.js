/**
 * Aqui Service
 */
function AquiService($http)
{
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
					image: 'http://placehold.it/122/100',
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

			save: function(issue, city)
			{
				console.log('issue', issue);
				console.log('city', city);

				alert(JSON.stringify(issue));
				alert(JSON.stringify(city));
			}
		}
	}
};

angular
	.module('app.services')
	.service('Aqui', ['$http', AquiService]);
