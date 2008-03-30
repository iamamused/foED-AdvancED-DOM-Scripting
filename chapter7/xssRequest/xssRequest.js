ADS.addEvent(window,'load',function() {
	// This url can go to any website as long 
	// as the response is in the correct format
	ADS.xssRequest('http://advanceddomscripting.com/source/chapter7/xssRequest/responder.php',{
		completeListener:function() {
			ADS.log.write(this.responseJSON.message);
		},
		errorListener:function() {
			ADS.log.write(this.statusText);
		},
		//timeout after 10 seconds
		timeout:10000
	});
	
	//This one will most likely error as the timeout is 1 millisecod
	ADS.xssRequest('http://advanceddomscripting.com/source/chapter7/xssRequest/responder.php',{
		completeListener:function() {
			ADS.log.write(this.responseJSON.message);
		},
		errorListener:function() {
			ADS.log.write(this.statusText);
		},
		//timeout after 1 millisecond
		timeout:1
	});
});