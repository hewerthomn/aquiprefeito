(function(angular, OpenLayers, undefined) {
	'use strict';

	/**
	 * Map Service
	 *
	 */
	angular
		.module('app')
		.service('Map', MapService);

	function MapService($cordovaGeolocation)
	{
		var self = this;

		this.init = function(opts)
		{
			if(google === undefined)
			{
				alert('ERRO: API do Google Maps não foi carregada. Verifique sua conexão de Internet.');
				return;
			}

			self.setup(opts);

			self.setCenterMap();
			self.fixMapHeight();
		};

		/**
	 	* setup method
	 	*/
	  this.setup = function(opts)
	  {
	    OpenLayers.Util.applyDefaults(opts, self.defaultOpts);

	    self._map = new OpenLayers.Map(opts.id, {
	    	theme: null,
	    	projection: 'EPSG:4326',
	    	displayProjection: 'EPSG:4326'
	    });

	    self._startZoom  = opts.startZoom;
	    self._startLonlat = new OpenLayers.LonLat(opts.startLonlat.lon, opts.startLonlat.lat);
	    self._offset = opts.offset | 0;

	    self._layers     = [];
	    self._baselayers = [];
	    self._controls   = [];

	    self.onSelectPoint = opts.onSelectPoint || self.onSelectPoint;

	    self.setupLayers();
	    self.setupControls();
	  };


	  /**
	   * setBaseLayers method
	   */
	  this.setupLayers = function()
	  {
	    self._baselayers = [
				new OpenLayers.Layer.Google('Google Maps', {
					numZoomLevels: 19
				})
			];

			var clusterStrategy = new OpenLayers.Strategy.Cluster({
				distance: 40,
				threshold: 3
			});

			var styleIssues = new OpenLayers.Style({
				label: "${label}",
				externalGraphic: "${icon}",
				graphicWidth: "${graphicWidth}",
				fontSize: '14px',
				fontColor: '#FFF',
				fontWeight: 'bold'
			}, {
				context: {
					label: function(feature) {
						return feature.cluster ? feature.cluster.length : '';
					},
					icon: function(feature) {
						return feature.cluster ? 'img/cluster.png' : feature.data.icon;
					},
					graphicWidth: function(feature) {
						return feature.cluster ? 52 : 28;
					}
				}
			});

			self._layers = {
				issues: new OpenLayers.Layer.Vector('Problemas', {
					strategies: [clusterStrategy],
					styleMap: new OpenLayers.StyleMap({
						'default': styleIssues,
						'select': {
							cursor: 'pointer'
						}
					})
				})
			};

			self._map.addLayers(self._baselayers);
			for(var key in self._layers)
			{
				self._map.addLayer(self._layers[key]);
			}
	  };

	  /**
	   * setControls method
	   */
	  this.setupControls = function()
	  {
	    self._controls = {
	      zoom: new OpenLayers.Control.Zoom(),
	      nav: new OpenLayers.Control.Navigation({
	        documentDrag: true,
	        dragPanOptions: { enableKinetic: true }
	      }),
	      selectPoint: new OpenLayers.Control.SelectFeature([self._layers.issues], {
	      	toggle: true,
	      	autoActivate: true,
	      	onSelect: self.onSelectFeature
	      })
	    };

	    for(var key in this._controls)
	    {
	      this._map.addControl(this._controls[key]);
	    }
	  },

	  /**
		   * setCenterMap method
		   * @param {OpenLayers.LonLat} point
		   * @param {int} zoom
		   */
	  this.setCenterMap = function(point, zoom, opts)
	  {
	  	opts = opts || {};
	  	var defaultOpts = {};

	  	if(point && !point.hasOwnProperty('CLASS_NAME') && point.CLASS_NAME !== 'OpenLayers.LonLat')
	  	{
	  		point = new OpenLayers.LonLat(point.lon, point.lat);
	  	}

	  	if(opts.hasOwnProperty('transformTo'))
	  	{
	  		point = point.transform(opts.transformTo, self._map.getProjection());
	  	}

	    self._map.setCenter(point || self._startLonlat, zoom || self._startZoom);
	  };

		/**
		* Desenha um ponto no mapa
		* @param {Object} ponto simplificado
		* @param {Function} callback function
		*/
		this.addPoints = function(points, opts, callback)
		{
			var opts = opts || {}
			var arrPontos = [];
			var defaultOpts = {
				layer: 'issues',
				clearBefore: true,
			};

			OpenLayers.Util.applyDefaults(opts, defaultOpts);

			for(var key in points)
			{
				var label = points[key].hasOwnProperty('label') ? points[key].label : '';
				var pointOpts = {
					label: label,
					icon:  points[key].icon
				};

				var point = new OpenLayers.Geometry.Point(points[key].lon, points[key].lat);
				if (opts.hasOwnProperty('transformTo'))
				{
					point = point.transform(opts.transformTo, self._map.getProjection());
				};

				var feature = new OpenLayers.Feature.Vector(point, pointOpts);
				feature.data = points[key];

				arrPontos.push(feature);
			}

			if(opts.clearBefore)
			{
				self._layers[opts.layer].destroyFeatures();
			}

			self._layers[opts.layer].addFeatures(arrPontos);

			if(typeof(callback) == 'function') callback();
		};

		/**
		* Desenha um ponto no mapa
		* @param {Object} ponto simplificado
		* @param {Object} opcoes
		* @param {Function} callback function
		*/
		this.addPoint = function(point, opts, callback)
		{
			self.addPoints([point], opts, callback);
		};

		/**
		* onSelectFeature
		* @private
		*/
		this.onSelectFeature = function(feature)
		{
			if(feature.cluster)
			{
				var zoom = self.getZoom() + 1;
				var lonlat = {
					lon: feature.geometry.x,
					lat: feature.geometry.y
				};

				self.setCenterMap(lonlat, zoom);
				return;
			}

			self.onSelectPoint(feature.data);
		};

		this.onSelectPoint = function(callback)
		{
			if(!callback) return;
			self.onSelectPointFeature = callback;
		};

	  this.getPosition =  function(successCallback, errorCallback, alwaysCallback)
	  {
	  	var positionOptions = {
	  		timeout: 10000,
	  		enableHighAccuracy: true
	  	};

	  	$cordovaGeolocation
	  		.getCurrentPosition(positionOptions)
	  		.then(function(position) {
	  			var lonlat = { lon: position.coords.longitude, lat: position.coords.latitude };
	  			successCallback(lonlat);
	  			if(typeof alwaysCallback === 'function') alwaysCallback();
	  		}, function(error) {
	  			errorCallback(error);
	  			alert(JSON.stringify(error));
	  			if(typeof alwaysCallback === 'function') alwaysCallback();
	  		});
	  };

	  this.getCenter = function()
	  {
	  	var center = self._map.getCenter();

	  	return {
	  		lon: center.lon,
	  		lat: center.lat
	  	};
	  };

	  this.getZoom = function()
	  {
	  	return self._map.getZoom();
	  };

		this.getActualZoom = function(callback)
		{
			self._map.events.register('zoomend', self._map, function(e) {
	      callback(zoom);
	    });
		};

	  this.clearLayer = function(layer)
	  {
	  	if(self._layers.hasOwnProperty(layer))
	  	{
	  		self._layers[layer].removeFeatures(self._layers[layer].features);
	  	}
	  };

		/**
			 * Transform latlon hash from projection to anoter
			 *
			 * @param hash lonlat with lon and lat
			 * @param string from from projection
			 * @param string to to projection
			 *
			 * @return hash hash with lon and lat properties
			 */
		this.transform = function(lonlat, from, to)
		{
			var dest = new OpenLayers.LonLat(lonlat.lon, lonlat.lat);
			dest = dest.transform(from, to);

			return { lon: dest.lon, lat: dest.lat };
		};

		this.fixMapHeight = function(offset)
		{
			var height 	= window.innerHeight;
			var element = self._map.div.id;

			if(self._map.div)
			{
				element = document.getElementById(element);
				height -= self._offset || 0;
				element.style.height = height + 'px';
				self._map.updateSize();
			}
		};
	}

})(window.angular, OpenLayers);
