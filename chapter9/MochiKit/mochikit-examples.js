/**
* MoochiKit example file from Advanced DOM Scripting
* http://advanceddomscripting.com
*
* @projectDescription A test file for the MochiKit library
* @author Jeffrey Sambells jeff@advanceddomscripting.com
* @version $Id$
* @see http://advanceddomscripting.com/source/chapter9
* @namespace MoochiKit
*/

ADS.addEvent(window,'load',function() {

	MochiKit.Visual.roundElement('round-me',{
		corners: 'bl tr',
	});

	// MochiKit library
	// Locate all the a.browser anchors within the #browserList id
	var browserAnchors = MochiKit.DOM.getElementsByTagAndClassName(
	'a',
	'browser',
	MochiKit.DOM.$('browserList')
	);

	JSLog.header('#browserList anchor links:');
	for(var i=0 ; (a=browserAnchors[i]) ; i++) {
		JSLog.write(a);
	}

	// The MochiKit library's class selector method
	// Locate all the a.browser anchors within the #browserList id
	var browserAnchors = MochiKit.Selector.$$('#browserList a.browser');

	JSLog.header('#browserList anchor links:');
	for(var i=0 ; (ba=browserAnchors[i]) ; i++) {
		JSLog.write(ba);
	}

	// MochiKit library callback filter
	// Using a callback locate all the anchors with a single image as a child
	var singleImageAnchors = MochiKit.Iter.ifilter(function(e) {
		return (e.getElementsByTagName('img').length === 1);
	},document.getElementsByTagName('a'));

	JSLog.header('Single image anchor links:');

	// MochiKit iteration using forEach()
	// Iterate over the list of singleImageAnchors and add a hasOneImage class
	MochiKit.Iter.forEach(singleImageAnchors,function(e){
		JSLog.write(e);
		MochiKit.DOM.addElementClass(e,'hasOneImage');
	});

	/* Additional library highlights */
	var newDiv = MochiKit.DOM.createDOM(
	'DIV',
	{'class': 'justAdded'},
	'I\'m a brand new div!'
	);
	MochiKit.DOM.$('content').appendChild(newDiv);


});

// MochiKit library event registration
// Use a window load event to add a click event listener
// to open the #source link in a new window
MochiKit.Signal.connect(window,'onload',function() {
	JSLog.header('Event Registration:');
	JSLog.write('Added a click event to the #source anchor');

	MochiKit.Signal.connect('source', 'onclick', function(event) {
		// Open the new widow using the existing href value;
		window.open(this.getAttribute('href'));
		MochiKit.DOM.addElementClass(this,'popup');
		// Prevent defult action of the link
		event.preventDefault();
	});
});


// MochiKit library custom event registration
MochiKit.Signal.connect(window,'onload',function() {

	// regiser an event on browserList that when fired, will
	// execute the anaonymous function in teh context of the
	// firefoxListEntry and turn it the given color
	var ident = MochiKit.Signal.connect('browserList', 'myEvent', MochiKit.DOM.$('firefoxListEntry'), function(event) {
		JSLog.write('Custom event was run');
		this.style.backgroundColor = event.event();
		event.preventDefault();
	});

	MochiKit.Signal.signal('browserList', 'myEvent', 'green');

});

/*
// Save the modifications back to the server
imageEditor.saveClick = function(W3CEvent) {
MochiKit.Signal.signal(
imageEditor.DOMObjects.originalImage,
'editComplete',
{
imageWidth:imageEditor.DOMObjects.resizee.style.width,
imageHeight:imageEditor.DOMObjects.resizee.style.height,
cropTop:imageEditor.DOMObjects.cropArea.style.top,
cropLeft:imageEditor.DOMObjects.cropArea.style.left,
cropWidth:imageEditor.DOMObjects.cropArea.style.width,
cropHeight:imageEditor.DOMObjects.cropArea.style.height
}
)
imageEditor.unload();
}
//register with the object:
MochiKit.Signal.connect(
MochiKit.DOM.get('the-image'),
'editComplete',
function(event) {
var properties = event.event();

// Do something with properties.imageWidth ect.
});
*/


// MochiKit Ajax Object
MochiKit.Signal.connect(window,'onload',function() {

	// Create a one time requst to load a JSON file and log its success
	var jsonDoc = MochiKit.Async.loadJSONDoc('../ajax-test-files/request.json');
	var onSuccess = function (json) {
		JSLog.header('MochiKit.Async.loadJSONDoc()');
		JSLog.write('succesful: ' + json.type);
	};
	var onFailure = function (err) {
		JSLog.header('MochiKit.Async.loadJSONDoc()');
		JSLog.write('failed: ' + json.type);
	};

	jsonDoc.addCallbacks(onSuccess, onFailure);

});