function registerMultiStateAnchorListeners(anchor,anchorImage,path,extension) {
    // Load the over state image
    // the loading will occur asynchronously to the rest of the script
    var imageMouseOver = new Image()
    imageMouseOver.src = path + '-over' + extension;
    
    // Change the image source to the over image on mouseover
    ADS.addEvent(anchor, 'mouseover', function (W3CEvent) { 
        anchorImage.src = imageMouseOver.src; 
    });
    
    // Change the image source to the original on mouseout
    ADS.addEvent(anchor, 'mouseout', function (W3CEvent) { 
        anchorImage.src = path + extension;
    });

    // Load the down state image 
    var imageMouseDown = new Image()
    imageMouseDown.src = path + '-down' + extension; 
    
    // Change the image source to the down state on mousedown
    ADS.addEvent(anchor, 'mousedown', function (W3CEvent) {
        anchorImage.src = imageMouseDown.src;
    });
    
    // Change the image source to the original state on mouseup
    ADS.addEvent(anchor, 'mouseup', function (W3CEvent) {
        anchorImage.src = path + extension;
    });    
}

function initMultiStateAnchors(W3CEvent) {
    
    // Locate all the anchors on the page
    var anchors = ADS.getElementsByClassName('multiStateAnchor','a');
    
    // Loop through the list
    for (var i=0; i<anchors.length ; i++) {
        
        // Find the first child image within the anchor
        var anchorImage = anchors[i].getElementsByTagName('img')[0];
        
        if(anchorImage) {
            
            // If there is an image, parse the source
            var extensionIndex = anchorImage.src.lastIndexOf('.');
            var path= anchorImage.src.substr(0, extensionIndex);
            var extension= anchorImage.src.substring(
                extensionIndex,
                anchorImage.src.length
            );
            
            // Add the various mouse handlers and pre-load the images.
            registerMultiStateAnchorListeners(
                anchors[i],
                anchorImage,
                path,
                extension
            );
        }   
    }
}

// Modified the tagged anchors when the document loads
ADS.addEvent(window,'load',initMultiStateAnchors);