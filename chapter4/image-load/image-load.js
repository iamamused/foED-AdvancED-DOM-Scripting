ADS.addEvent(window,'load',function() {

	var content = ADS.$('content');

	// Create an image
    var image = document.createElement('img');
	
	// Append it to the docuemnt body when it loads
    ADS.addEvent(image, 'load', function() { 
        content.appendChild(image);
    });

	// Append a message if it errors
    ADS.addEvent(image, 'error' ,function() {
        var message = document.createTextNode('The image failed to load'); 
        content.appendChild(message);
    });

	// Set the src attribute so the browser can retrieve the image
    image.setAttribute(
        'src',
        'http://advanceddomscripting.com/images/working.jpg'
    );
    
    // The same as above except this image doesn't exist and will error
    var imageMissing = document.createElement('img');
    ADS.addEvent(imageMissing, 'load', function() { 
        content.appendChild(imageMissing);
    });
    ADS.addEvent(imageMissing, 'error' ,function() {
        var message = document.createTextNode('imageMissing failed to load'); 
        content.appendChild(message);
    });
    imageMissing.setAttribute(
        'src',
        'http://advanceddomscripting.com/images/missing.jpg'
    );

    
});
