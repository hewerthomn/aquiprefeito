/**
 * Aqui Service
 */
function AquiService($http)
{
	_categories = [
		{ id: 1, name: 'Pavimentação', icon: 'img/categories/1.png' },
		{ id: 2, name: 'Iluminação Pública', icon: 'img/categories/2.png' },
		{ id: 3, name: 'Queimada Urbana', icon: 'img/categories/3.png' },
		{ id: 4, name: 'Limpeza Urbana', icon: 'img/categories/4.png' },
		{ id: 5, name: 'Transporte Público', icon: 'img/categories/5.png' },
		{ id: 6, name: 'Sinalização de Trânsito', icon: 'img/categories/6.png' },
	];

	return {

		Category:
		{
			get: function(id)
			{
				var category;
				angular.forEach(_categories, function(value) {
					if(value.id == id) category = value;
				});
				return category;
			},

			getAll: function()
			{
				return _categories;
			}
		},

		Issue:
		{
			new: function(issue)
			{
				return {
					image: 'http://placehold.it/122/100',
					comment: '',
					username: '',
					category_id: 0,
					lonlat: { lon: 0, lat: 0 }
				};
			},

			getLasts: function()
			{
				return [{
					id: 1,
					photo: "http://placehold.it/140x120",
					lonlat: { lon: -63.89999999999999, lat: -8.766699999999993 },
					category: { name: 'Pavimentação' },
					category_id: 1,
					comment: 'Lorem Ipsum dolor',
					created_at: new Date('2015', '04', '08', '09', '46')
				},
				{
					id: 2,
					photo: "http://placehold.it/143x123",
					lonlat: { lon: -63.87768402099619, lat: -8.749055369870185 },
					category: { name: 'Iluminação Pública' },
					category_id: 2,
					comment: '',
					created_at: new Date('2015', '04', '07')
				},
				{
					id: 3,
					photo: "http://placehold.it/144x124",
					lonlat: { lon: -63.86292114257822, lat: -8.787227793836935 },
					category: { name: 'Transporte Público' },
					category_id: 5,
					comment: 'Não existe ponto de ônibus!',
					created_at: new Date('2015', '04', '06')
				},
				{
					id: 4,
					photo: "http://placehold.it/140x120",
					lonlat: { lon: -63.90291824340827, lat: -8.752957619767722 },
					category: { name: 'Queimada Urbana' },
					category_id: 3,
					comment: 'Lorem Ipsum dolor',
					created_at: new Date('2015', '04', '08', '09', '46')
				}];
			},

			save: function(issue, city)
			{
				console.log('issue', issue);
				console.log('city', city);

				alert(JSON.stringify(issue));
				alert(JSON.stringify(city));
			}
		}
	}
};

angular
	.module('app.services')
	.service('Aqui', ['$http', AquiService]);
