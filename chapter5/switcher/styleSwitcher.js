function setActiveStyleSheet(title) {
   var i, a, main;
   for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
     if(a.getAttribute("rel").indexOf("style") != -1
        && a.getAttribute("title")) {
       a.disabled = true;
       if(a.getAttribute("title") == title) a.disabled = false;
     }
   }
}

ADS.addEvent(window,'load',function() {
    // Retrieve all the link elements
    var list = ADS.$('styleSwitcher');
    var links = document.getElementsByTagName('link');
    var titles = [];
    for (var i=0 ; i<links.length ; i++) {
        
        // Skip <link> element that aren't styles with titles.
        if(links[i].getAttribute("rel").indexOf("style") != -1 
            && links[i].getAttribute("title")) { 
    
            // Append a new item to the list if the title hasn't
            // already been addedd
            var title = links[i].getAttribute("title");
            if(!titles[title]) {
                
                var a = document.createElement('A');
                a.appendChild(document.createTextNode(title));
                a.setAttribute('href','#');
                a.setAttribute('title','Activate ' + title);
                a.setAttribute('rel',title);
                ADS.addEvent(a,'click',function(W3CEvent) {
                    // When clicked activate the style sheet indicated by the
                    // title in the anchor's rel property
                    setActiveStyleSheet(this.getAttribute('rel'));
                    ADS.preventDefault(W3CEvent);
                });

                
                var li = document.createElement('LI');
                li.appendChild(a);
                
                list.appendChild(li);
                
                // Set the titles array to true for this title
                // so that it will be skipped if multiple sheets use 
                // the same title
                titles[title] = true;
            }
        }
    }
});