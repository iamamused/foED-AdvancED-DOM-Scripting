/**
* Prototype example file from Advanced DOM Scripting
* http://advanceddomscripting.com
*
* @projectDescription A test file for the Prototype library
* @author Jeffrey Sambells jeff@advanceddomscripting.com
* @version $Id$
* @see http://advanceddomscripting.com/source/chapter9
*/

Event.observe(window, 'load', function(event) {

	// Prototype library (using method chaining)
	// Locate all the a.browser anchors within the #browserList id
	var browserAnchors = $('browserList').getElementsByClassName('browser').findAll(
		function(e) {
			return e.nodeName.toUpperCase() == 'A';
		}
	);

	JSLog.header('#browserList anchor links:');
	for(var i=0 ; (a=browserAnchors[i]) ; i++) {
		JSLog.write(a);
	}

	// Prototype library (using method chaining)
	// Locate all the a.browser anchors within the #browserList id
	// and retrieve the nodeValue of the first node
	// Ths will fail if there is no #browserList of .browser children
	var value = $('browserList').getElementsByClassName('browser').findAll(
	function(e) {
		return e.nodeName.toUpperCase() == 'A';
	}
	)[0].firstChild.nodeValue;

	JSLog.header('#browserList first anchor value:');
	JSLog.write(value);


	// Prototype library advanced selectors
	// Locate all the a.browser anchors within the #browserList id
	var browserAnchors = $$('#browserList a.browser');

	JSLog.header('#browserList anchor links:');
	for(var i=0 ; (a=browserAnchors[i]) ; i++) {
		JSLog.write(a);
	}

	// Prototype library callback filter
	// Using a callback locate all the anchors with a single image as a child
	var singleImageAnchors = $$('a').findAll(function(e) {
		return (e.descendants().findAll(function(e) {
			return (e.nodeName.toUpperCase() == 'IMG');
		}).length == 1);
	});

	JSLog.header('Single image anchor links:');

	// Prototype library iteration using each()
	// Iterate over the list of singleImageAnchors and add a hasOneImage class
	singleImageAnchors.each(function(e,i){
		JSLog.write(e);
		e.addClassName('hasOneImage');
	});

	/* Additional library highlights */

	// Prototype library
	// Remove whitespace nodes from the browser list
	JSLog.header('Remove whitespace nodes:');
	JSLog.write('Pre cleaning: ' + $('browserList').childNodes.length + ' Nodes');
	var node = $('browserList').cleanWhitespace().firstChild;
	JSLog.write('After cleaning: ' + $('browserList').childNodes.length + ' Nodes');

});


// Prototype library event registration
// Use a window load event to add a click event listener
// to open the #source link in a new window
Event.observe(window, 'load', function(event) {
	JSLog.header('Event Registration:');
	JSLog.write('Added a click event to the #source anchor');

	Event.observe($('source'), 'click', function(event) {
		// Open the new widow using the existing href value;
		window.open(this.getAttribute('href'));
		this.addClassName('popup');
		// Prevent defult action of the link
		Event.stop(event);
	});
});


// Prototype library ajax
Event.observe(window, 'load', function(event) {

	// Prototype Ajax.Request
	// Create a new one time request and log its success
	new Ajax.Request(
	'../ajax-test-files/request.json',
	{
		method:'get',
		onSuccess: function (transport) {
			var response = transport.responseText || "no response text";
			JSLog.write('Ajax.Request was successful: ' + response);
		},
		onFailure: function (){
			JSLog.write('Ajax.Request failed');
		}
	}
	);

	// Prototype Ajax.Updater
	// Create a one time request that popultes the #ajax-updater-target
	// element with the content of the responseText
	new Ajax.Updater(
	$('ajax-updater-target'),
	'../ajax-test-files/request.json',
	{
		method: 'get',
		// Append it to the top of the target element
		insertion: Insertion.Top
	}
	);

	// Prototype Ajax.periodicalUpdater
	// Create a periodic request that will automatically populates
	// the #ajax-target-element every 10 seconds
	new Ajax.PeriodicalUpdater(
	$('ajax-periodic-target'),
	'../ajax-test-files/periodic.json',
	{
		method: 'GET',
		// Append it to the top of the existing content
		insertion: Insertion.Top,
		// Run every 10 seconds
		frequency: 10
	}
	);

	// autosave using prototype
	// Save the content of the #autosave-form every 10 seconds
	// and update the #autosave-status to indicate the save
	setTimeout(function() {
		new Ajax.Updater(
		$('autosave-status'),
		'../ajax-test-files/autosave.json',
		{
			method:'post',
			parameters : $('autosave-form').serialize(true)
		}
		);
	},10000);

});




