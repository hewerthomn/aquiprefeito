/**
 * Aqui Service
 */
function AquiService($http)
{
	var _categories = [
		{ id: 1, name: 'Pavimentação', icon: 'img/categories/1.png' },
		{ id: 2, name: 'Iluminação Pública', icon: 'img/categories/2.png' },
		{ id: 3, name: 'Queimada Urbana', icon: 'img/categories/3.png' },
		{ id: 4, name: 'Limpeza Urbana', icon: 'img/categories/4.png' },
		{ id: 5, name: 'Transporte Público', icon: 'img/categories/5.png' },
		{ id: 6, name: 'Sinalização de Trânsito', icon: 'img/categories/6.png' },
	];

	var _issues = [{
		id: 1,
		photo: "http://placehold.it/340x240",
		lonlat: { lon: -63.89999999999999, lat: -8.766699999999993 },
		category: { name: 'Pavimentação' },
		category_id: 1,
		likes: 0,
		comments: 3,
		comment: 'Esse buraco ta horrível, todos os dias tenho que passar aqui! Ahrrgg',
		created_at: new Date('2015', '04', '08', '09', '46')
	},
	{
		id: 2,
		photo: "http://placehold.it/340x240",
		lonlat: { lon: -63.87768402099619, lat: -8.749055369870185 },
		category: { name: 'Iluminação Pública' },
		category_id: 2,
		likes: 1,
		comments: 0,
		comment: 'Essa rua é uma escuridão sem fim. E sempre rola assalto por aí',
		created_at: new Date('2015', '04', '07')
	},
	{
		id: 3,
		photo: "http://placehold.it/340x240",
		lonlat: { lon: -63.86292114257822, lat: -8.787227793836935 },
		category: { name: 'Transporte Público' },
		category_id: 5,
		likes: 3,
		comments: 5,
		comment: 'Não existe ponto de ônibus aí! E sempre voa lama nas pessoas',
		created_at: new Date('2015', '04', '06')
	},
	{
		id: 4,
		photo: "http://placehold.it/340x240",
		lonlat: { lon: -63.90291824340827, lat: -8.752957619767722 },
		category: { name: 'Queimada Urbana' },
		category_id: 3,
		likes: 2,
		comments: 1,
		comment: 'Toda semana esse cara toca fogo nesse quintal!',
		created_at: new Date('2015', '04', '08', '09', '46')
	}];

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

			get: function(id)
			{
				var issue;
				angular.forEach(_issues, function(value) {
					if(value.id == id) issue = value;
				});
				return issue;
			},

			getLasts: function()
			{
				return _issues;
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
