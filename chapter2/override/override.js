function override() {
	// Override the alert function
	var alert = function(message) {
		window.alert('overridden:' + message);
	};
	alert('alert');
	
	// Call the original alert from the override() scope
	window.alert('window.alert');
}
override();

// Call the alert in the window scope
alert('alert from outside');
