// Prevent conflicts
jQuery.noConflict();

// The load event
jQuery(document).ready( function() {

    // Add a non-breaking space to the error message elements to ensure
    // they have a height.
    jQuery('.error').html('&nbsp;');
    
    var form = jQuery('#customer-form');
    
    // Add some simple error checking to the inputs that are
    // in .required
    var inputs = jQuery('.required input',form);
    
    // On focus, clear the error message
    inputs.focus(function() {
        jQuery('#' + jQuery(this).attr('id') + '-error').html('');
    });

    // On blur, check if the field was filled in
    inputs.blur(function() {
        var input = jQuery(this);
        if(!input.val()) {
            jQuery('#' + input.attr('id') + '-error').html('Please fill in ' 
                + input.attr('title') 
                + '.');
        }
    });
    
    // Add a submit event that will also check for errors
    form.submit(function() {
        
        var error = false;
        
        inputs.each(function(e) {
            var input = jQuery(this);
            if(!input.val()) {
                error = true;
                jQuery('#' + input.attr('id') + '-error').html('Please fill in ' 
                + input.attr('title') 
                + '.');
            }
                
        });
        
        if(error) {
        
            // Return false to prevent the default action in jQuery.
            return false;
        }

        return true;        
        
    }); 

});