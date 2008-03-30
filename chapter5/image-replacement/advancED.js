ADS.addEvent(window, 'load', function() {
    // Retrieve the header
    var header = ADS.$('advancedHeader');
    // Create an image element
    var image = document.createElement('IMG');
    
    // Only add the span and class if the image loads
    ADS.addEvent(image, 'load', function() {
    
        var s = document.createElement('SPAN');
        // Prepend the span to the header's children
        ADS.prependChild(header,s);
        
        // Create the title attribute as necessary
        if(!header.getAttribute('title')) {
            var i, child;
            var title = '';
            // Loop through the children and assemble the title
            for(i=0 ; child = header.childNodes[i] ; i++ ) {
                if(child.nodeValue) title += child.nodeValue;
            }
            header.setAttribute('title',title);
        }
        // Modify the class name to indicate the change and apply the CSS
        header.className = 'advancED';
    });
    
    // Load the image
    // This hardcoded path isn't ideal.
    // You'll revisit this later in the chapter
    image.src = 'http://advancedDOMScripting.com/images/image-replace.png';

});
