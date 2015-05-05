(function(angular, undefined) {
	'use strict';

	/**
	 * FB Service
	 */
	angular
		.module('app')
		.service('FB', FBService);

	function FBService($localStorage, $cordovaFacebook, Util, URL)
	{
		var self = this;

		function _login()
		{
			document.addEventListener('deviceready', function()
			{
				$cordovaFacebook
					.login(['public_profile', 'email'])
					.then(function(response) {
						$localStorage.isLoggedIn = true;
						_me();
					}, function(err) {
						Util.error(err);
					});

			}, false);
		};

		function _me()
		{
			$cordovaFacebook
				.api('me', ['public_profile', 'email'])
				.then(function(me) {
					$localStorage.user = me;
					$localStorage.user.avatar = self.avatar(me.id);
				}, function(err) {
					$localStorage.user = null;
					Util.err(err);
				});
		};

		function _logout()
		{
			$cordovaFacebook.logout();

			$localStorage.user = null;
			$localStorage.isLoggedIn = false;
		};

		this.init = function()
		{
			document.addEventListener('deviceready', function()
			{
				$cordovaFacebook
					.getLoginStatus()
					.then(function(response) {
						if(response.status === "connected")
						{
							_me();
						}
						else
						{
							_logout();
						}
					}, function(err) {
						$localStorage.isLoggedIn = false;
						Util.err(err);
					})
			}, false);
		};

		this.login = function()
		{
			_login();
		};

		this.logout = function()
		{
			_logout();
		};

		this.avatar = function(id)
		{
			return 'https://graph.facebook.com/' + id + '/picture';
		};

		this.share = function(issue)
		{
			var options = {
				method: 'feed',
				link: URL.SITE + issue.id,
				caption: 'Problema de ' + issue.category_name + ' em ' + $localStorage.city.name
			};
			return $cordovaFacebook.showDialog(options);
		};
	}

})(window.angular);
