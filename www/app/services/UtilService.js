/**
 * Util Service
 */
function UtilService()
{
	this.error = function(err)
	{
		console.error(err);
		alert(JSON.stringify(err));
	};
};

angular
	.module('app')
	.service('Util', UtilService);
