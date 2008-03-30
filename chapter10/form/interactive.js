// Prevent conflicts
jQuery.noConflict();

// The load event
jQuery(document).ready( function() {

    // Add a non-breaking space to the error message elements to ensure
    // they have a height.
    jQuery('.error').html('&nbsp;');

    var form = jQuery('#customer-form');
    
    // Append an error slider to cover the submit button if
    // there's an error
    jQuery('#customer-form .buttons').prepend(
    	'<div id="slider-wrapper"><div id="error-slider"><span>Oops! It seems you forgot something.</span></div></div>'
    );

    // instantiate the slider effect
    var mySlider = new Fx.Slide('error-slider', {
        duration: 1500,
        wait:true,
        transition:Fx.Transitions.elasticOut
    });
    
    // Hide the slider to start
    mySlider.hide();

    // Instantiate a fade effect on the slider element
    var mySliderFade = new Fx.Style('error-slider', 'opacity', {
        duration: 500,
        wait:true,
        transition:Fx.Transitions.sineIn,
        onComplete: function() {
            // When the fade completes, hide the slider and
            // reset the opacity back to 100%
            mySlider.hide();
            mySliderFade.set(1);
        }
    });

    // Add some simple error checking to the inputs that are
    // in .required
    var inputs = jQuery('.required input',form);
    
    // On focus, clear the error message
    inputs.focus(function() {
        jQuery('#' + jQuery(this).attr('id') + '-error').html('');
        
        // Fade out the warning slider if there is one
        mySliderFade.start(0);
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
            // If there is an error, slide up the box to make it obvious
            jQuery('#slider-wrapper').css('display','block');
            mySlider.slideIn();
            setTimeout(function() {
                // Fade out the box automatically after 3.5 seconds
                mySliderFade.start(0);
                
            },3500);
            
            // Return false to prevent the default action in jQuery.
            return false;
        }

        return true;        
        
    }); 

});