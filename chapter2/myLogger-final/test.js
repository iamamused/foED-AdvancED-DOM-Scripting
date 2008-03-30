ADS.addEvent(window, 'load', function() {

	ADS.log.writeRaw('This is raw.');
	
	ADS.log.writeRaw('<strong>This is bold!</strong>');

	ADS.log.header('With a header');

	ADS.log.write('write source: <strong>This is bold!</strong>');
	
});