ADS.addEvent(window,'load',function() {

      if (GBrowserIsCompatible()) {

        // Modify the style to show the map
        ADS.setStyle('map',{
            width:'300px',
            height:'300px',
            float:'left'
        });
        
        ADS.setStyle('cities',{
            width:'180px',
            height:'300px',
            overflow:'auto',
            float:'right',
            "list-style":'none',
            margin:0,
            padding:0
        });

        // Instantiate the map API (version 2)
        var map = new GMap2(document.getElementById("map"));

        // Instantiate a new latitude and longitude coordinate
        var location = new GLatLng(0, 0);

        // Set the center of the map to location with a zoom level of 13
        map.setCenter(location, 2);

        // Add a zoom/pan and type control
        map.addControl(new GLargeMapControl());
        map.addControl(new GMapTypeControl());

        // Retrieve all city <li> elements
        var cities = ADS.$('cities').getElementsByTagName('li');
        
        // Use a function to maintain the proper variable 
        // scope for the info window information
        function makeInfoWindow(marker,city) {
            var node = ADS.getElementsByClassName('adr', 'div', city)[0].cloneNode(true);
            GEvent.addListener(marker,'click',function() {
                marker.openInfoWindow(node);
            });
            ADS.addEvent(city,'click',function() {
                GEvent.trigger(marker,'click');
            });
            ADS.addEvent(city,'mouseover',function() {
                ADS.addClassName(city,'hover');
            });
            ADS.addEvent(city,'mouseout',function() {
                ADS.removeClassName(city,'hover');
            });
            
        }
        
        // Loop through each city and retrieve the 
        // lattitude and longitude from the microformat
        for(i=0 ; (city = cities[i]) ; i++ ) {
            
            // This assumes all the elements exist and doesn't do any
            // error checking
            var lattitude = ADS.getElementsByClassName('latitude', 'abbr', city)[0].getAttribute('title');
            var longitude = ADS.getElementsByClassName('longitude', 'abbr', city)[0].getAttribute('title');
            
            // Create and add the marker to the map
            var marker = new GMarker(new GLatLng(lattitude, longitude));
            makeInfoWindow(marker,city);
            map.addOverlay(marker); 
        }
      }
});

ADS.addEvent(window,'unload',GUnload);