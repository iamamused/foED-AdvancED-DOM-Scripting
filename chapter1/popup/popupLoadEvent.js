
//add a load event to alter the page
ADS.addEvent(window,'load',function(W3CEvent) {
    
    //locate all the anchor tags with the popup class in the document
    var popups = ADS.getElementsByClassName('popup', 'a');
    for(var i=0 ; i<popups.length ; i++ ) {
        //add a click event listener to each anchor
        ADS.addEvent(popups[i],'click',function(W3CEvent) {
            
            //open the window using the href attribute
            window.open(this.href); 
            
            //cancel the default event
            ADS.eventPreventDefault(W3CEvent);
        });
    }
});