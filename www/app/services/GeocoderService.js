'use strict';
/**
 * Geocoder Service
 */
function GeocoderService($http)
{
  this.searchPlace = function(query)
	{
		return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
			params: {
				address: query,
				sensor: false
			}
		});
	};

	this.getPlaceInfo = function(lonlat)
	{
		return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
			params: {
				latlng: lonlat.lat + ',' + lonlat.lon,
				sensor: false
			}
		});
	};
};

angular
	.module('app')
	.service('Geocoder', GeocoderService);
