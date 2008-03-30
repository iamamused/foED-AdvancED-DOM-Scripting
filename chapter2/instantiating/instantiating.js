function myConstructor(message) {
	alert(message);
	this.myMessage = message;	
}
var myObject = new myConstructor('Instantiating myObject!');
