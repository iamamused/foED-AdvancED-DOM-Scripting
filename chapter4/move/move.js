ADS.addEvent(window,'load',function(W3CEvent) {

	// A simple logging method to log the type 
	// of event and object to the log window
	function logit(W3CEvent) {
		switch(this.nodeType) {
			case ADS.node.DOCUMENT_NODE:
				ADS.log.write(W3CEvent.type + ' on the document');
			break;
			case ADS.node.ELEMENT_NODE:
				ADS.log.write(W3CEvent.type + ' on the box');			
			break;
		}
	}

	ADS.addEvent(document,'mousemove',logit);
	ADS.addEvent(document,'mouseover',logit);
	ADS.addEvent(document,'mouseout',logit);
	
	var box = document.getElementById('box');
	ADS.addEvent(box,'mousemove',logit);
	ADS.addEvent(box,'mouseover',logit);
	ADS.addEvent(box,'mouseout',logit);
	
});
