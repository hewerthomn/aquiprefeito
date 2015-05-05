(function(angular, undefined) {
	'use strict';

	/**
	 * Camera Service
	 */
	angular
		.module('app')
		.service('Camera', CameraService);

	function CameraService($cordovaCamera)
	{
		this.getPicture = function(successCallback, errorCallback)
		{
			document.addEventListener('deviceready', function()
			{
				var options = {
		      destinationType: Camera.DestinationType.FILE_URI,
		      sourceType: Camera.PictureSourceType.CAMERA
		    };

		    $cordovaCamera
		    	.getPicture(options)
		    	.then(successCallback, errorCallback);
			}, false);
		};
	}

})(window.angular);
