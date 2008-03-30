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

	ADS.addEvent(document,'mousedown',logit);
	ADS.addEvent(document,'mouseup',logit);
	ADS.addEvent(document,'click',logit);
	ADS.addEvent(document,'dblclick',logit);
	
	var box = document.getElementById('box');
	ADS.addEvent(box,'mousedown',logit);
	ADS.addEvent(box,'mouseup',logit);
	ADS.addEvent(box,'click',logit);
	ADS.addEvent(box,'dblclick',logit);
	
});
