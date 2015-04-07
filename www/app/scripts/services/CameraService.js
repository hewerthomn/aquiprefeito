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
		      quality: 90,
		      destinationType: Camera.DestinationType.DATA_URL,
		      sourceType: Camera.PictureSourceType.CAMERA,
		      allowEdit: true,
		      encodingType: Camera.EncodingType.JPEG,
		      targetWidth: 320,
		      targetHeight: 120,
		      popoverOptions: CameraPopoverOptions,
		      saveToPhotoAlbum: false
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
