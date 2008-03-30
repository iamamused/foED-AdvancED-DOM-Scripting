ADS.addEvent(window,'load',function() {

    // Define an object to move
    var object = document.getElementById('follow');
    
    // Set it to use absolute positioning
    object.style.position = 'absolute';
    
    // Create an event listener for the document's mousemove event
    function eventListener(W3CEvent) {
        var pointer = ADS.getPointerPositionInDocument(W3CEvent);
    
        // Position the object relative to the pointer
        object.style.left = pointer.x + 'px';
        object.style.top = pointer.y + 'px';
    
    }
    // Attach the event listener to the document object's mousemove event
    ADS.addEvent(document,'mousemove',eventListener);

    
});
