// Constructor
function myConstructor(message) {
    this.myMessage = message;
    
    // Private properties
    var separator = ' -';
    var myOwner = this;

    // Private method
    function alertMessage() {
        alert(myOwner.myMessage);
    }
    alertMessage();
    
    // Priviledged method (still public)
    this.appendToMessage = function(string) {
        this.myMessage += separator + string;
        alertMessage();
    }
}

// Public method
myConstructor.prototype.clearMessage = function(string) {
	this.myMessage = '';
}

// Static property
myConstructor.name = 'Jeff';

// Static method
myConstructor.alertName = function() {
    alert(this.name);
}
