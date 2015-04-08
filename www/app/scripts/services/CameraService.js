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
		      quality: 95,
		      allowEdit: true,
		      destinationType: Camera.DestinationType.FILE_URI,
		      sourceType: Camera.PictureSourceType.CAMERA,
		      encodingType: Camera.EncodingType.JPEG,
		      popoverOptions: CameraPopoverOptions,
		      saveToPhotoAlbum: true
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
