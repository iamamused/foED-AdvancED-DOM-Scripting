/**
 * Yahoo YUI example file from Advanced DOM Scripting
 * http://advanceddomscripting.com
 *
 * @projectDescription A test file for the Yahoo YUI library
 * @author Jeffrey Sambells jeff@advanceddomscripting.com
 * @version $Id$
 * @see http://advanceddomscripting.com/source/chapter9
 * @namespace YAHOO
 */

YAHOO.util.Event.addListener(window,'load',function() {

	// YUI library
	// Locate all the a.browser anchors within the #browserList id
	var browserAnchors = YAHOO.util.Dom.getElementsByClassName(
		'browser',
		'a',
		YAHOO.util.Dom.get('browserList')
	);

	JSLog.header('#browserList anchor links:');
	for(var i=0 ; (a=browserAnchors[i]) ; i++) {
		JSLog.write(a);
	}	

	// YUI library callback filter
	// Using a callback locate all the anchors with a single image as a child
	var singleImageAnchors = YAHOO.util.Dom.getElementsBy(function(e) {
    		return (e.nodeName == 'A' && e.getElementsByTagName('img').length === 1);
	});

	JSLog.header('Single image anchor links:');

	// YUI library iteration using regular for()
     // Iterate over the list of singleImageAnchors and add a hasOneImage class
	for(var i=0 ; (a=singleImageAnchors[i]) ; i++) {
		JSLog.write(a);
		YAHOO.util.Dom.addClass(a, 'hasOneImage');
	}	

	/* Additional library highlights */
	JSLog.header('Regions:');
	var region1 = YAHOO.util.Dom.getRegion('region1');
	JSLog.write(region1);
	var region2 = YAHOO.util.Dom.getRegion('region2');
	JSLog.write(region2);
	if(region1.intersect(region2)) {
	    JSLog.write('The regions intersect!');
	} else {
	    JSLog.write('The regions do not intersect!');		
	}

});


// YUI library event registration
// Use a window load event to add a click event listener 
// to open the #source link in a new window
YAHOO.util.Event.addListener(window,'load',function() {
	JSLog.header('Event Registration:');
	JSLog.write('Added a click event to the #source anchor');

	YAHOO.util.Event.addListener('source', 'click', function(event) {
		// Open the new widow using the existing href value
		window.open(this.href);
		YAHOO.util.Dom.addClass(this, 'popup');
		// Prevent defult action of the link
		YAHOO.util.Event.preventDefault(event);
	});
});


// Yahoo YUI Library Ajax request
// called on window load
YAHOO.util.Event.addListener(window,'load',function() {
	// Create a new asyncronous GET request
	YAHOO.util.Connect.asyncRequest(
		'GET',
		'../ajax-test-files/request.json',
		{
			success: function(transport) {
				// The request succeeded
				JSLog.write('YAHOO.util.Connect.asyncRequest succesful: ' 
					+ transport.responseText);
			},
			failure: function(transport) {
				// The request failed
				JSLog.write('YAHOO.util.Connect.asyncRequest failed : '
					+ transport.statusText);
			}
		},
		null
	);	
});


// Yahoo autocomplete
//http://developer.yahoo.com/yui/examples/autocomplete/ysearch_flat.html
YAHOO.util.Event.addListener(window,'load',function() {
	ACDS = new YAHOO.widget.DS_XHR("../ajax-test-files/autocomplete.json", ["\n", "\t"]); 
	ACDS.responseType = YAHOO.widget.DS_XHR.TYPE_FLAT; 
	ACDS.maxCacheEntries = 60; 
	ACDS.queryMatchSubset = true; 
	var ac = new YAHOO.widget.AutoComplete(
		'autocomplete-input',
		'autocomplete-results', 
		ACDS
	);
	ac.delimChar = ";"; 
	ac.queryDelay = 0.5; 
	ac.prehighlightClassName = "prehighlight";
	ac.formatResult = function(result, query) { 
		JSLog.write(result);
		var term = result[0]; 
		var termHighlight = term.substr(0, query.length); 
		var termRemainder = term.substr(query.length); 
		return '<div id="search-result">' 
			+ '<span class="matched">' 
			+ termHighlight 
			+ '</span>'
			+ termRemainder
			+ "</div>"; 
	};
});


