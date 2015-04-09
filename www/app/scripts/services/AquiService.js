/**
 * Aqui Service
 */
function AquiService($http)
{
	return {

		Category:
		{
			getAll: function()
			{
				return [
					{ id: 0, name: 'Selecione a categoria' },
					{ id: 1, name: 'Pavimentação', icon: 'img/categories/1.png' },
					{ id: 2, name: 'Iluminação Pública', icon: 'img/categories/2.png' },
					{ id: 3, name: 'Queimada Urbana', icon: 'img/categories/3.png' },
					{ id: 4, name: 'Limpeza Urbana', icon: 'img/categories/4.png' },
					{ id: 5, name: 'Transporte Público', icon: 'img/categories/5.png' },
					{ id: 6, name: 'Sinalização de Trânsito', icon: 'img/categories/6.png' },
				];
			}
		},

		Issue:
		{
			new: function(issue)
			{
				return {
					image: 'http://placehold.it/1',
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
