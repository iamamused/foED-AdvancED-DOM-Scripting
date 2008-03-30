jQuery.noConflict();

ADS.addEvent(window,'load',function() {

    // Display a transition on the #start-css element
    // from transparent to opaque using moo.fx
    var myFx = new Fx.Style(
        'start-css',
        'opacity', 
        {duration:2000}
    ).start(0,1);
    
    // First retrieve the content of the <noscript> and append 
    // it as a sibiling to the noscript element. You could remove the 
    // <noscript> element but it's not necessary.
    var wrapper = jQuery('#start-noscript-wrapper');
    
    var content = wrapper.text() || wrapper.html();
    if(content) {
        jQuery('#start-noscript-wrapper').after(content);
    
        // Display a transition on the #start-noscript element
        // from transparent to opaque using moo.fx
        var myFx = new Fx.Style(
            'start-noscript',
            'opacity', 
            {duration:2000}
        ).start(0,1);
    }

});