ADS.addEvent(window, 'load', function(W3CEvent) {
	for (var i=1 ; i<=3 ; i++ ) {
		
		var anchor = document.getElementById('anchor' + i);
		
		ADS.addEvent(anchor,'click',function() {
			alert('My id is anchor' + i);
		});
	}
});
