'use strict';
/**
 * Category Service
 */
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
};

angular
	.module('app')
	.service('Category', CategoryService);
