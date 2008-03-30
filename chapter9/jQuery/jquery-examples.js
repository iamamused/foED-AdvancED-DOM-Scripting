/**
* jQuery example file from Advanced DOM Scripting
* http://advanceddomscripting.com
*
* @projectDescription A test file for the jQuery library
* @author Jeffrey Sambells jeff@advanceddomscripting.com
* @version $Id$
* @see http://advanceddomscripting.com/source/chapter9
* @namespace jQUery
*/

// Prevent jQuery from conflicting
jQuery.noConflict();

jQuery(document).ready( function() {

	// jQuery library (using method chaining)
	// Locate all the a.browser anchors within the #browserList id
	var browserAnchors = jQuery('#browserList').find('a.browser');

	JSLog.header('#browserList anchor links using find():');
	browserAnchors.each(function(i){
		JSLog.write(this);
	});

	// jQuery library (using method chaining)
	// Locate all the a.browser anchors within the #browserList id
	// and retrieve the nodeValue of the first node
	// Ths will fail if there is no #browserList of .browser children
	var value = jQuery('#browserList').find('a.browser')[0].getAttribute('href');

	JSLog.header('#browserList first anchor value:');
	JSLog.write(value);

	// jQuery library advanced selectors
	// Locate all the a.browser anchors within the #browserList id
	var browserAnchors = jQuery('#browserList a.browser');

	JSLog.header('Advanced selector #browserList anchor links:');
	browserAnchors.each(function(i){
		JSLog.write(this);
	});

	// jQuery library callback filter
	// Using a callback locate all the anchors with a single image as a child
	var singleImageAnchors = jQuery('a').filter(function(i) {
		return (jQuery('img',this).length == 1);
	});

	JSLog.header('Single image anchor links:');

	// jQuery library iteration using each()
	// Iterate over the list of singleImageAnchors and add a hasOneImage class
	singleImageAnchors.each(function(i){
		JSLog.write(this);
		jQuery(this).addClass('hasOneImage');
	});

	/* Additional library highlights */

	// Find all the <li> elements in ul#list1 and
	// relocate them to children of the ul#list2
	JSLog.header('Move list items from #list1 to #list2:');
	JSLog.write('Before move: list1 has '
	+ jQuery('ul#list1').children().length + ' Nodes and list2 has '
	+ jQuery('ul#list2').children().length + ' Nodes');

	// Move them
	$('ul#list1 li').appendTo("ul#list2");

	JSLog.write('After move: list1 has '
	+ jQuery('ul#list1').children().length + ' Nodes and list2 has '
	+ jQuery('ul#list2').children().length + ' Nodes');
});

// jQuery library event registration
// Use a window load event to add a click event listener
// to open the #source link in a new window
jQuery(document).ready( function() {
	JSLog.header('Event Registration:');
	JSLog.write('Added a click event to the #source anchor');

	$('#source').click( function(event) {
		// Open the new widow using the existing href value;
		window.open(this.getAttribute('href'));
		jQuery(this).addClass('popup');
		// Prevent defult action of the link
		return false;
	});
});

// jQuery library custom event registration
jQuery(document).ready( function() {
	JSLog.header('Custom events:');
	JSLog.write('Registered a changecolor event on all paragraphs');
	// Register a change color event on all <p> elements
	$('p').bind('changeColor', {}, function(event,newColor) {
		this.style.color = newColor;
	});

	JSLog.write('Trigger changecolor event with "green"');
	// Trigger the event on a <p> elements
	$('p').trigger('changeColor',['green']);

});

/*
// jQuery library custom event registration
// Register an event listener fr the editComplete method
$('the-image').bind(
'editComplete',
function(event,imageWidth,imageHeight,cropTop,cropLeft,cropWidth,cropHeight) {
// Do something with imageWidth ect.
}
);

// jQuery library invoke a custom event with arguments
// Invoke editComplete with the appropriate properties
imageEditor.saveClick = function(W3CEvent) {
	$(imageEditor.DOMObjects.originalImage).trigger(
		'editComplete',[
		imageEditor.DOMObjects.resizee.style.width,
		imageEditor.DOMObjects.resizee.style.height,
		imageEditor.DOMObjects.cropArea.style.top,
		imageEditor.DOMObjects.cropArea.style.left,
		imageEditor.DOMObjects.cropArea.style.width,
		imageEditor.DOMObjects.cropArea.style.height
	])
imageEditor.unload();
}


*/
// jQuery library Ajax
jQuery(document).ready( function() {

	// jQuery.get() for quick ajax calls
	// Create a one time request and log its success
	jQuery.get('../ajax-test-files/request.json',
	{ key: 'value' },
	function(responseText,status){
		JSLog.header('jQuery.get()');
		JSLog.write('status: ' + status);
		JSLog.write('succesful: ' + responseText);
	}
	);

	// jQuery.getJSON() to load a JSON object
	// Create a one time requst to load a JSON file and log its success
	jQuery.getJSON('../ajax-test-files/request.json', function(json){
		JSLog.header('jQuery.getJSON()');
		JSLog.write('succesful: ' + json.type);
	});

	// jQuery(..).load() to automatically populate an element
	// Create a one time request that popultes the #ajax-updater-target
	// element with the content of the responseText
	jQuery("#ajax-updater-target").load(
	'../ajax-test-files/updater.json',
	{ key: 'value' },
	function(responseText,status) {
		JSLog.header('jQuery(...).load()');
		JSLog.write('status: ' + status);
		JSLog.write('succesful: ' + responseText);
		JSLog.write('jQuery(\'#ajax-updater-target\').load succesful');
	}
	);

	// autosave using jQuery
	// Save the content of the #autosave-form every 10 seconds
	// and update the #autosave-status to indicate the save
	setInterval(function() {
		jQuery('#autosave-status').load(
		'../ajax-test-files/autosave.json',
		jQuery.param({
			title:jQuery('#autosave-form input[@name=title]').val(),
			story:jQuery('#autosave-form textarea[@name=story]').val()
		})
		);
	},10000);

});


// Rollover redux from Chapter 1 using jQuery
jQuery(document).ready( function() {
	jQuery('a.multiStateAnchor').each(function() {
		// Keep anchorImage in this scope
		var anchorImage;
		if(!(anchorImage = jQuery('img:first',this))) return;

		// Parse the extension
		var src = anchorImage.attr('src');
		var extensionIndex = src.lastIndexOf('.');
		var path = src.substr(0,extensionIndex);
		var extension = src.substring(
		extensionIndex,
		src.length
		);

		// Preload the images
		var imageMouseOver = new Image()
		imageMouseOver.src = path + '-over' + extension;
		var imageMouseDown = new Image()
		imageMouseDown.src = path + '-down' + extension;

		// Register the event listeners
		jQuery(this).hover(
		function() {
			JSLog.write('over: ' + anchorImage);
			anchorImage.attr('src',imageMouseOver.src);
		},
		function() {
			anchorImage.attr('src',path + extension);
		}
		);
		jQuery(this).mousedown(function() {
			anchorImage.attr('src',imageMouseDown.src);
		});
		jQuery(this).mouseup(function() {
			anchorImage.attr('src',path + extension);
		});
	});
});
