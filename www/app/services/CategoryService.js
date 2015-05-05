(function(angular, undefined) {
	'use strict';

	/**
	 * Category Service
	 */
	angular
		.module('app')
		.service('Category', CategoryService);

	function CategoryService($http, URL)
	{
		this.get = function(id)
		{
			return $http.get(URL.API + 'category/' + id);
		};

		this.getAll = function()
		{
			return $http.get(URL.API + 'category');
		}
	}

})(window.angular);
