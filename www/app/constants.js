/**
 * Constants
 */
angular
	.module('app')
	.constant('URL', {
		'SITE': 'http://aquiprefeito.com.br/',
		'API':  'http://aquiprefeito.com.br/api/'
	})
	.constant('angularMomentConfig', {
    preprocess: 'unix', // optional
    timezone: 'AMT' // optional
	});
