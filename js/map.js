var chiMap = {
	map: null,
	markers: null,
	dollarIcons: [],
	icons: [],
	markerContent: [],
	markerData: [],
	
	resizeMap: function()
	{
		var new_width = $(window).width();
		if (new_width >= 700) {
			new_width -= 500;
		}
		$('#'+chiMap.mapId).css('width', new_width);
	},

};

chiMap.initMap = function(mapId)
{
	if (chiMap.map) return;

	chiMap.markerPopup = $('<div id="markerPopup"></div>').appendTo('body');

	// creat map
	chiMap.mapId = mapId;

    var mapOptions = {
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true,
		mapTypeControl: false,
		navigationControl: true,
		scrollwheel: false,
		center: new google.maps.LatLng(43.537761,-89.300117)
    };
    chiMap.map = new google.maps.Map(document.getElementById(chiMap.mapId), mapOptions);

    chiMap.mapContainer = $('#'+chiMap.mapId);

    // place markers
    chiMap.placeMarkers();

    // tie in left list tiles
    $('#marker-container').on('mouseover', '.marker-detail-container', function() {
		var id = this.id;

		chiMap.markerActive(id, true);
		chiMap.showMarkerPopup(id);

		/*clearTimeout(pwMap.timer);
		chiMap.timer = setTimeout(function() {
			chiMap.goToMarker(id);
		}, 200);*/

	}).on('mouseout', '.listing-row', function() {
		chiMap.markerActive(this.id, false);
		chiMap.hideMarkerPopup();
	});


	// set map resizing
	this.resizeMap();
	$(window).on('resize', this.resizeMap);
	
}

chiMap.placeMarkers = function() {

	chiMap.markers = [];

	var reception_location = {
		lat: 41.960618,
		lng: -87.673498,
		id: 0,
		content: "Architectural Artifacts"
	};
	var hotel_monaco = {
		lat: 41.886544,
		lng: -87.626014,
		id: 1,
		content: "Hotel Monaco"
	};
	var brady_peltz = {
		lat: 41.954277,
		lng: -87.676874,
		id: 2,
		content:  "Peltz/Brady Residence"
	};
	var archi_cruise = {
		lat: 41.891981,
		lng: -87.609598,
		id: 3,
		content:  "Architecture Cruise"
	};
	var the_bean = {
		lat: 41.882805,
		lng: -87.623321,
		id: 4,
		content:  "The Bean"
	};
	var nordstroms = {
		lat: 41.892079,
		lng: -87.624400,
		id: 5,
		content:  "Nordstroms"
	};
	var david_burke = {
		lat: 41.892854,
		lng: -87.625436,
		id: 6,
		content:  "David Burke's Primehouse"
	};
	var public_house = {
		lat: 41.889551,
		lng: -87.628194,
		id: 7,
		content:  "Public House"
	};
	var bar_toma = {
		lat: 41.897669,
		lng: -87.625153,
		id: 8,
		content:  "Bar Toma"
	};
	var shaws_crab = {
		lat: 41.889929,
		lng: -87.627234,
		id: 9,
		content:  "Shaw's Crabhouse"
	};
	var fado = {
		lat: 41.891799,
		lng: -87.631328,
		id: 10,
		content:  "Fado Irish Pub"
	};
	var wrigley_field = {
		lat: 41.947304,
		lng: -87.656447,
		id: 11,
		content:  "Wrigley Field"
	};


	chiMap.markers = [reception_location, hotel_monaco, brady_peltz, archi_cruise, the_bean, nordstroms, david_burke, public_house, bar_toma, shaws_crab, fado, wrigley_field];

	for (var i in chiMap.markers) {
		var md = chiMap.markers[i];

		var point = new google.maps.LatLng(md.lat, md.lng);
		var marker = new google.maps.Marker({
			position: point,
			map: chiMap.map,
			cursor:"default"
		});
		marker.set('id', md.id);


		if (md.content) {
			var wrapper = $('<div/>', { 'class': 'listing-map-popup', 'html': md.content });
			chiMap.markerContent[md.id] = wrapper;
			google.maps.event.addListener(marker, 'mouseover', function(event){
				chiMap.showMarkerPopup(this.get('id'));
				chiMap.markerActive(this.get('id'), true);
			});
			google.maps.event.addListener(marker, 'mouseout', function(event){
				chiMap.hideMarkerPopup();
				chiMap.markerActive(this.get('id'), false);
			});
		}


		chiMap.markers[md.id] = marker;
	}
}



chiMap.showMarkerPopup = function(id)
{
	if (!chiMap.markerContent[id] || !chiMap.markers[id]) return;

	chiMap.markerPopup.html(chiMap.markerContent[id]).show();


	var mapOffset = {left: 500, top: 135}
	var marker = chiMap.markers[id];
	var markerPostion = chiMap.latLngToPixels(marker.getPosition());
	var popupPosition = { top: mapOffset.top + markerPostion.y,
						 left: mapOffset.left + markerPostion.x,
						 position: "absolute"};

	// decide which side of the marker the popup should appear on
	var threshold = (chiMap.mapContainer.width()/2);
	if (markerPostion.x < threshold) {
		chiMap.markerPopup.removeClass('right');
	} else {
		chiMap.markerPopup.addClass('right');
	}

	/*if (marker.getIcon().size.width < 23) {
		chiMap.markerPopup.addClass('small');
	} else {
		chiMap.markerPopup.removeClass('small');
	}*/

	chiMap.markerPopup.css(popupPosition);
}
chiMap.hideMarkerPopup = function()
{
	chiMap.markerPopup.hide();
}

chiMap.markerActive = function(id, isActive)
{
	if (!chiMap.markers[id]) return;

	if (chiMap.icons[id]) { // dealing with $$ icons
		var icon = chiMap.icons[id];
	} else { // plain icons
		var icon = chiMap.icons;
	}

	var state = (isActive) ? 'white' : 'blue';
	var lat = (isActive) ? 0 : chiMap.markers[id].getPosition().lat();
	chiMap.markers[id].setIcon(icon[state]);
	//chiMap.markers[id].setZIndex(chiMap.zIndexFromLat(lat));
}

chiMap.latLngToPixels = function(latLng)
{
	if (!chiMap.map) return;

	var scale = Math.pow(2, chiMap.map.getZoom());
	var nw = new google.maps.LatLng(
		chiMap.map.getBounds().getNorthEast().lat(),
		chiMap.map.getBounds().getSouthWest().lng()
	);
	var worldCoordinateNW = chiMap.map.getProjection().fromLatLngToPoint(nw);
	var worldCoordinate = chiMap.map.getProjection().fromLatLngToPoint(latLng);
	var pixelOffset = new google.maps.Point(
	    Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
	    Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
	);

	return pixelOffset;
}
