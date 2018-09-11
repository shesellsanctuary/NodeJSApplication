	
	// SET MAP
	var mymap = L.map('mapid').setView(new L.LatLng(0, 0), 2);
	
	// Layer types
	var Stamen_TonerLite = L.tileLayer('http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png', {
        maxZoom: 17, 
		attribution: 'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="https://carto.com/attribution">CARTO</a>'});
	  
	var CartoDB_Positron = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
		subdomains: 'abcd',
		maxZoom: 19});
	
	var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
		maxZoom: 17,
		attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'});

	var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
		maxZoom: 25});	

	// Add layer
	mymap.addLayer(Esri_WorldImagery);


	// FIELDS DETAILS
	function showDetails (feature,layer){ 
		
		// Get bounds of polygon
		var bounds = layer.getBounds();
		// Get center of bounds
		var center = bounds.getCenter();
		// Get Icon according to crop
		var Icon = new L.Icon({ iconUrl:'icons/' + feature.properties.crop + '.png',
						iconSize: [30, 30],});
		// Use center to put marker on map
		var marker = L.marker(center, {icon: Icon}).addTo(mymap);
		
		// Weather API
		var weather;
		var lat, lon, api_url;
		lat = center.lat;
		lon = center.lng;
		
		api_url = 'http://api.openweathermap.org/data/2.5/forecast?lat=' +
				  lat + '&lon=' + 
				  lon + '&units=metric&APPID=ecab3891398a9659ae1104d2cadfc7a4';
		
		$.ajax({
		  url : api_url,
		  method : 'GET',
		  success : function (data) {

			weather = []; 
			// Array with indexes for today,tomorrow and next day
			var days = [0,4,12]; 
			
			// Push forecast to field weather 
			for(i = 0; i < days.length; i++){
				weather.push({
					city: data.city.name,
					desc: data.list[days[i]].weather[0].description,
					tempmin: data.list[days[i]].main.temp_min,
					tempmax: data.list[days[i]].main.temp_max
				});
			}	
			// Create popup
			layer.bindPopup("<h1 class= 'detailsHeader'>" + feature.properties.crop + "</h1><p class='detailsHeader'> Status: " + feature.properties.status + 
						"</p><h1 class='forecastHeader'> Forecast " +weather[0].city+ "</h1><p class='forecastParagraph'> Today: " +weather[0].desc+ "<br>Min: "+ weather[0].tempmin+ "<br>Max: " + weather[0].tempmax +
						"<br>Tomorrow: " +weather[1].desc+ "<br>Min: " +weather[1].tempmin+ "<br>Max: " +weather[1].tempmax+ "<br>Next day: "+weather[2].desc+ "<br>Min: "+weather[2].tempmin+ "<br>Max: "+weather[2].tempmax+"</p>");
		  }
		});
	};
	
	// ADD FIELDS
	L.geoJson(Fields, {

		// Color polygon
		style: function(feature) {
	        switch (feature.properties.crop) {
	            case 'corn': 	 return {color: "#FFF400"};
	            case 'potato':   return {color: "#C7007D"};
	            case 'wheat':    return {color: "#FFC600"};
	            case 'tomato':   return {color: "#FF0000"};
	            case 'orange':   return {color: "#FF7400"};
	            case 'onion':    return {color: "#8C04A8"};
	        }
		},

		onEachFeature: showDetails
		
	}).addTo(mymap);