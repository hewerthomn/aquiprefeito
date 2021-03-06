(function(angular, undefined) {
	'use strict';

	/**
	 * Aqui Service
	 */
	angular
		.module('app')
		.service('Aqui', AquiService);

	function AquiService($localStorage, $cordovaDevice, Map, FB, Geocoder) {

		this.init = function() {
			$localStorage.$default({
				user: null,
				isLoggedIn: false,
				city: {
					name: '...',
					lonlat: {
						lon: -5801876.194150391,
						lat: -1027313.6600097648
					}
				}
			});

			Map.getPosition(function(lonlat) {
				Geocoder.getPlaceInfo(lonlat)
					.success(function(response) {
						if(response.hasOwnProperty('results')) {
							var city = {
								lonlat: lonlat,
								name: response.results[0].address_components[4].long_name
							};
							$localStorage.city = city;
						}
					}, function(err) {
						alert(JSON.stringify(err));
					});
			}, function(err) {
				alert(JSON.stringify(err));
			});

			document.addEventListener('deviceready', function() {
				FB.init();
				$localStorage.device = $cordovaDevice.getDevice();
			}, false);
		};

		this.storage = function() {
			return $localStorage;
		};
	}

})(window.angular);
