
jQuery.noConflict();

jQuery(document).ready( function() {
	
/* Indicating Auto Save (From Chapter 9) */

// Autosave using jQuery from Chpater 9 using getJSON
setInterval(function() {
    jQuery.getJSON(
        '../../chapter9/ajax-test-files/autosave.json',
        jQuery.param({
            title:jQuery('#autosave-form input[@name=title]').val(),
            story:jQuery('#autosave-form textarea[@name=story]').val()
        }),
        function(response, status) {
            if(status == 'success') {
                var color = '#00ff00';
            } else {
                var color = '#ff0000';
            }
            jQuery('#autosave-status').html(response.message)
            var myFx = new Fx.Styles(
                'autosave-status', 
                {duration:2000}
            ).start({
                'background-color':[color,'#ffffff'],
                'opacity':[1,0]
            });
        }
    );
},5000);
	

	
});