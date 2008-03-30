ADS.addEvent(window,'load',function() {

    // Use a modified addEvent method to illustrate
    // a problem. See the text for an explanation.
    function modifiedAddEvent( obj, type, fn ) {
        if(obj.addEventListener) {
            // The W3C Way
            
            // This method has been modified from the original 
            // add event in Chapter 1 to eable capturing rather than
            // bubbling.
            obj.addEventListener( type, fn, true );

        } else if ( obj.attachEvent ) {
            //The Microsoft Way
            obj['e'+type+fn] = fn;
            obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
            obj.attachEvent( 'on'+type, obj[type+fn] );
        } else {
            return false;
        }
    }
    
    var counter = 0;
    
    // Grab all the unordered lists
    var lists = document.getElementsByTagName('ul');
    for(var i = 0 ; i < lists.length ; i++ ) {
        
        // Register an event listener for the click event
        modifiedAddEvent(lists[i],'click',function() {
            // Append the click order to the paragraph
            var append = document.createTextNode(':' + counter++);
            this.getElementsByTagName('p')[0].appendChild(append) ;
            
            // Change the class name to reveal the clicked elements
            this.className = 'clicked';
        });
    }
    
});
