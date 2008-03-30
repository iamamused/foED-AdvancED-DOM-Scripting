function replaceImage(element) {
    // Retrieve the element
    var element = ADS.$(element);
    // Create an image element
    var image = document.createElement('IMG');
    
    // Only add the span and class if the image loads
    ADS.addEvent(image, 'load', function() {
        
        var s = document.createElement('SPAN');
        // Prepend the span to the element's children
        ADS.prependChild(element,s);
        
        // Create the title attribute as necessary
        if(!element.getAttribute('title')) {
            var i, child;
            var title = '';
            // Loop through the children and assemble the title
            for(i=0 ; child = element.childNodes[i] ; i++ ) {
                if(child.nodeValue) title += child.nodeValue;
            }
            element.setAttribute('title',title);
        }
        // Modify the class name to indicate the change and apply the CSS
        ADS.addClassName(element,'advancED');
    });
    
    
    // Load the image
    var styleSheet = ADS.getStyleSheets('advancED.css')[0];
    if(!styleSheet) return;
      
    var list = styleSheet.cssRules || styleSheet.rules
    if(!list) return;

    var rule;
    for(var j = 0 ; rule = list[j] ; j++) {

        // Look for the rule:
        // either: #element-id.advancED span 
        // or .advancED#element-id span 
        // or as in MSIE: .advancED#element-id SPAN 
        // where element-id is the one passe into this method

        if(
            rule.selectorText.indexOf('#' + element.getAttribute('id')) !== -1 
            && rule.selectorText.indexOf('.advancED') !== -1
            && rule.selectorText.toUpperCase().indexOf(' SPAN') !== -1
        ) {
            // look for a url() in the css using 
            // the regex: /url\(([^\)]+)\)/
            var matches = rule.style.cssText.match(/url\(([^\)]+)\)/);

            // matches[1] will contain the value in the 
            // capturing parenthesis of the regex
            if(matches[1]) {
                image.src = matches[1];
                break;
            }
        }
    }
}

ADS.addEvent(window, 'load', function() {
    replaceImage('advancedHeader');
});
