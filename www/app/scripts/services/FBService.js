/**
 * FB Service
 */
function FBService($cordovaFacebook)
{
	var self = this;

	this.status = function()
	{
		return $cordovaFacebook.getLoginStatus();
	};

	this.login = function()
	{
		return $cordovaFacebook.login(['public_profile', 'email']);
	};

	this.logout = function()
	{
		return $cordovaFacebook.logout();
	};

	this.me = function()
	{
		return $cordovaFacebook.api('me', ['public_profile', 'email']);
	};

	this.avatar = function(me)
	{
		return 'https://graph.facebook.com/' + me.id + '/picture';
	};
};

angular
	.module('app.services')
	.service('FB', ['$cordovaFacebook', FBService]);
