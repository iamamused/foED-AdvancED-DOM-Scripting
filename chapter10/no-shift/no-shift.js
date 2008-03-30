
jQuery.noConflict();

jQuery(document).ready( function() {
	
/* Avoiding "The Shift" See the css file as well */
jQuery('a[@title="Without shift"]').click(function() {
    var myFx = new Fx.Style(
        'no-shift',
        'opacity', 
        {duration:500}
    ).start(0,1);
});
jQuery('a[@title="With shift"]').click(function() {
    jQuery('#shift').css({display:'block'});
    var myFx = new Fx.Style(
        'shift',
        'opacity', 
        {duration:500}
    ).start(0,1);
});
	

	
});