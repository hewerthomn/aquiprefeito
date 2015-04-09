/**
 * Geocoder Service
 */
function GeocoderService($http)
{
	return {

	  searchPlace: function(query)
		{
			return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
				params: {
					address: query,
					sensor: false
				}
			});
		},

		getPlaceInfo: function(lonlat)
		{
			return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
				params: {
					latlng: lonlat.lat + ',' + lonlat.lon,
					sensor: false
				}
			});
		}

	};
};

angular
	.module('app.services')
	.service('Geocoder', ['$http', GeocoderService]);
