/*
 * Gallery Controller
 */
function GalleryCtrl($scope)
{
	function _init()
	{
		$scope.issues = [
		{
			id: 1,
			photo: "http://placehold.it/140x120",
			category: { name: 'Pavimentação' },
			comment: 'Lorem Ipsum dolor',
			created_at: new Date('2015', '04', '08', '09', '46')
		},
		{
			id: 2,
			photo: "http://placehold.it/143x123",
			category: { name: 'Iluminação Pública' },
			comment: '',
			created_at: new Date('2015', '04', '07')
		},
		{
			id: 3,
			photo: "http://placehold.it/144x124",
			category: { name: 'Transporte Público' },
			comment: 'Não existe ponto de ônibus!',
			created_at: new Date('2015', '04', '06')
		}
		];
	};

	function _apply()
	{
		if(!$scope.$$phase) $scope.$apply();
	};

	_init();
};

angular
	.module('app.controllers')
	.controller('GalleryCtrl', ['$scope', GalleryCtrl]);
