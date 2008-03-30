/**
 * @author jeffreysambells
 */
// Create the object
var example = new Object(); //or var example = {};

// Add a property
example.name = 'Jeff';

// Add a method
example.alertName = function() {
   // alert(this.name);
}

// Execute the method
example.alertName();



var example = function() {
	
}
example.alertName = function(){};

var anotherExample = new example();
//anotherExample.alertName();


function CustomObject(message) {
	alert(message);
	this.myMessage = message;	
}
var myObject = new CustomObject('Hello World!');


CustomObject.prototype.appendToMessage = function(string) {
	this.message += ' ' + string;
}

CustomObject.appendToMessage('test');


