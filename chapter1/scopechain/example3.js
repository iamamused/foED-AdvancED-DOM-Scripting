function registerListener(anchor,myNum) {
	ADS.addEvent(anchor, 'click', function() {
        alert('My id is anchor' + myNum + ' and initAnchors i is ' + i);
	});
}

function initAnchors() {
	for ( i=1 ; i<=5 ; i++ ) {
		var anchor = document.getElementById('anchor'+i);
		registerListener(anchor,i);
	}
}

ADS.addEvent(window, 'load', initAnchors); 