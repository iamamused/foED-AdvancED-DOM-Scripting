/**
 * DOMAssisstant example file from Advanced DOM Scripting
 * http://advanceddomscripting.com
 *
 * @projectDescription A test file for the DOMAssisstant library
 * @author Jeffrey Sambells jeff@advanceddomscripting.com
 * @version $Id$
 * @see http://advanceddomscripting.com/source/chapter9
 * @namespace DOMAssisstant
 */

ADS.addEvent(window,'load',function() {

	/* DOMAssisstant */


	// DOMAssisstant library (using method chaining)
	// Locate all the a.browser anchors within the #browserList id
	var browserAnchors = DOMAssisstantisstant.$('browserList').getElementsByClassName(
		'browser',
		'a'
	);

	JSLog.header('#browserList anchor links:');
	for(var i=0 ; (a=browserAnchors[i]) ; i++) {
		JSLog.write(a);
	}

    // DOMAssisstant library (using method chaining)
	// Locate all the a.browser anchors within the #browserList id
    // and retrieve the nodeValue of the first node
	// Ths will fail if there is no #browserList of .browser children
	var value = DOMAssisstant.$('browserList').getElementsByClassName('browser','a')[0].firstChild.nodeValue;

	JSLog.header('#browserList first anchor value:');
	JSLog.write(value);

	/* Additional library highlights */

	// Create a child <div> element in #content with an id of
	// myDiv and a className of justAdded and set its content
	// to the text "I'm a brand new div!":
	DOMAssisstant.$("content").create("div", {
		id : 'myDiv',
		className : 'justAdded'
	}, true, 'I\'m a brand new div!');
	JSLog.header('Added new div:');
	JSLog.write('I\'m a brand new div!');

});


// DOMAssisstant library event registration
// Use a window load event to add a click event listener
// to open the #source link in a new window
ADS.addEvent(window,'load',function() {
	JSLog.header('Event Registration:');
	JSLog.write('Added a click event to the #source anchor');

	DOMAssisstant.$('source').addEvent('click', function(event) {
        // Open the new widow using the existing href value
		window.open(this.getAttribute('href'));
		DOMAssisstant.$(this).addClass('popup');
        // Prevent defult action of the link
		DOMAssisstant.preventDefault(event);
	});
});