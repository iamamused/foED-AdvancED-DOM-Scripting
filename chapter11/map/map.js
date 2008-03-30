ADS.addEvent(window,'load',function() {

      if (GBrowserIsCompatible()) {

        // Instantiate the map API (version 2)
        var map = new GMap2(document.getElementById("map"));

        // Instantiate a new latitude and longitude coordinate
        var location = new GLatLng(37.4419, -122.1419);
        // Set the center of the map to location with a zoom level of 13
        map.setCenter(location, 13);


        // Instantiate a new marker using the location
        var marker = new GMarker(location);
        
        // Add the marker to the map
        map.addOverlay(marker); 

        // Add a zoom/pan and type control
        map.addControl(new GLargeMapControl());
        map.addControl(new GMapTypeControl());

      }
      
});

ADS.addEvent(window,'unload',GUnload);