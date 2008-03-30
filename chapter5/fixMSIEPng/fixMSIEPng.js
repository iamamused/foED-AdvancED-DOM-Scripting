function fixMSIEPng() {
    if(!document.body.filters) {
        // Not MSIE
        return; 
    }
    if(7 <= parseFloat(navigator.appVersion.split("MSIE")[1])) {
        // 7+ supports PNG
        return; 
    }
    // Fix the inline images
    if(document.images) {
        var images = document.images;
        var img = null;

        for(var i=images.length-1; img=images[i]; i--) {
            
            // Check if it's PNG image
            if(img.src 
                && img.src.substring(
                    img.src.length-3, 
                    img.src.length
                ).toLowerCase() !== 'png'
            ) {
                // Skip it
                continue;
            }
            
            // Build the style property for the outer element
            var inlineStyle = '';
            if (img.align == 'left' || img.align == 'right') {
                inlineStyle += 'float:' + img.align + ';';
            }

            if (img.parentElement.nodeName == 'A') {
                // This image is inside an anchor so show a hand
                inlineStyle += 'cursor:hand;';
            }
            
            // Make the display inline-block so that it can have a width
            // and height yet still be positioned properly
            inlineStyle += 'display:inline-block;';
            
            // Grab any other CSS style applied to the element
            if(img.style && img.style.cssText) {
                inlineStyle += img.style.cssText;
            }
            
            // Wrap a <span> around the image with the appropriate style
            // and information such as className and ID
            img.outerHTML = '<span ' 
            + (img.id ? ' id="' + img.id + '"' : '' )
            + (img.className ? 'class="' + img.className + '" ' : '')
            + ' style="width:' + img.width + 'px; height:' + img.height + 'px;' 
            + inlineStyle 
            + ';filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' 
            + img.src 
            + '\', sizingMethod=\'scale\');"></span>';  
    
        }
    }

    // Create an private method to apply in the next set of loops
    // This sets the appropriate styles for the elements
    function addFilters(e) {
        // Check if the element has style, a background and verify
        // it doesn't already have a filter applied
        if(
            e.style
            && e.style.background
            && !e.style.filter
        ) {
            // Check if it's a PNG
            var src=null;
            if(src = e.style.backgroundImage.match(/^url\((.*\.png)\)$/i)) {
                e.style.backgroundColor = 'transparent';
                e.style.backgroundImage = 'url()';
                e.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" 
                    + src[1] 
                    + "',sizingMethod='"
                    + (( e.style.width && e.style.height ) ? 'scale' : 'crop' )
                    + "')";
            }
        }   
    }

    // Create a private recursive processing method to apply the 
    // addFilters() method to the style sheets
    function processRules(styleSheet) {
        for (var i in styleSheet.rules) {
            addFilters(styleSheet.rules[i]);
        }

        //recurse for @import stylesheets...
        if(styleSheet.imports) {
            for (var j in styleSheet.imports) {
                processRules(styleSheet.imports[j]);
            }
        }
    }
        
    // Process each style sheet
    var styleSheets = document.styleSheets;
    for(var i=0; i < styleSheets.length; i++) {
        processRules(styleSheets[i]);
    }
        
    // Fix the inline style properties
    if(document.all) {
        var all = document.all;
        for(var i=0; i < all.length; i++) {
            addFilters(all[i]);
        }
    }

}
if(window.attachEvent) window.attachEvent("onload", fixMSIEPng);
