ADS.addEvent(window,'load',function() {
    
    new GSmapSearchControl(
        document.getElementById("mapsearch"),
        "Toronto, Ontario, Canada",
        {
            zoomControl : GSmapSearchControl.ZOOM_CONTROL_ENABLE_ALL,
            idleMapZoom : GSmapSearchControl.ACTIVE_MAP_ZOOM,
            activeMapZoom : GSmapSearchControl.ACTIVE_MAP_ZOOM
        }
    );

});

ADS.addEvent(window,'unload',GUnload);