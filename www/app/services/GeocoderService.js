(function(angular, undefined) {
	'use strict';

	/**
	 * Geocoder Service
	 */
	angular
		.module('app')
		.service('Geocoder', GeocoderService);

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
	}

})(window.angular);
