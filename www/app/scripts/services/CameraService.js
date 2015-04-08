/**
 * Camera Service
 */
function CameraService($cordovaCamera)
{
	function _onDeviceReady(callback)
	{
		document.addEventListener('deviceready', callback, false);
	}

	return {

		getPicture: function(successCallback, errorCallback)
		{
			_onDeviceReady(function() {

				var options = {
		      destinationType: Camera.DestinationType.FILE_URI,
		      sourceType: Camera.PictureSourceType.CAMERA
		    };

		    $cordovaCamera
		    	.getPicture(options)
		    	.then(successCallback, errorCallback);
			});
		}
	}
};

angular
	.module('app.services')
	.service('Camera', ['$cordovaCamera', CameraService]);
