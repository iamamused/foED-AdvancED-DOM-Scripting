ADS.addEvent(window, 'load', function() {

	testElement = document.getElementById('test');
	
	// Retrieve the classes
	ADS.log.write('assigned classes: ' + ADS.getClassNames(testElement));

	// Add a newClass
	ADS.addClassName(testElement,'newClass');
	ADS.log.write('added newClass');

	// Check if newClass was added
	ADS.log.write('has newClass? ' + ADS.hasClassName(testElement,'newClass'));
	ADS.log.write('now has classes: ' + ADS.getClassNames(testElement));

	// Remove the newClass
	ADS.removeClassName(testElement,'newClass');
	ADS.log.write('removed newClass');

	// Retrieve the classes
	ADS.log.write('now has classes: ' + ADS.getClassNames(testElement));
	
	// Remove testClass
	ADS.removeClassName(testElement,'testClass');
	ADS.log.write('removed testClass');

	// Retrieve the classes
	ADS.log.write('now has classes: ' + ADS.getClassNames(testElement));

	// Add a newCLass
	ADS.addClassName(testElement,'newClass');
	ADS.log.write('added newClass');

	// Check if newClass was added
	ADS.log.write('has newClass? ' + ADS.hasClassName(testElement,'newClass'));
	ADS.log.write('now has classes: ' + ADS.getClassNames(testElement));

	// Remove the newClass
	ADS.removeClassName(testElement,'newClass');
	ADS.log.write('removed newClass');

	// Retrieve the classes
	ADS.log.write('now has classes: ' + ADS.getClassNames(testElement));
	
});
