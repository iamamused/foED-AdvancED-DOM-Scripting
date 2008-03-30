function myConstructor(message) {
    this.myMessage = message;
    var separator = ' -';
    var myOwner = this;

    function alertMessage() {
        alert(myOwner.myMessage);
    }
    alertMessage();

	// A privileged method
    this.appendToMessage = function(string) {
        this.myMessage += separator + string;
        alertMessage();
    }
}

var myObject = new myConstructor('Hello World!');
myObject.appendToMessage('Jeff');


// This will fail
myObject.alertMessage();