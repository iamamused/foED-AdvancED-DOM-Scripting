ADS.addEvent(window, 'load', function() {

	var options = {
		loadListener:function() { 
			//ADS.log.write('loadListener'); 
		},
		loadedListener:function() {
			//ADS.log.write('loadedListener'); 
		},
		ineractiveListener:function() { 
			//ADS.log.write('ineractiveListener'); 
		},
		jsResponseListener:function(response) { 
			ADS.log.write('jsResponseListener'); 
			ADS.log.write(typeof response);
			ADS.log.write(response); 
		},
		jsonResponseListener:function(response) { 
			ADS.log.write('jsonResponseListener'); 
			ADS.log.write(typeof response);
			ADS.log.write(response); 
		},
		xmlResponseListener:function(response) { 
			ADS.log.write('xmlResponseListener'); 
			ADS.log.write(typeof response);
			ADS.log.write(response); 
		},
		htmlResponseListener:function(response) { 
			ADS.log.write('htmlResponseListener'); 
			ADS.log.write(typeof response);
			ADS.log.write(response); 
		},
		completeListener:function() { 
			//ADS.log.write('completeListener'); 
		},
		errorListener:function(response) { 
			ADS.log.write('errorListener');
			ADS.log.write(typeof response);
			ADS.log.write(response); 
		}
	}
	
	ADS.ajaxRequest('server.php?type=html',options);
	ADS.ajaxRequest('server.php?type=xml',options);
	ADS.ajaxRequest('server.php?type=json',options);
	ADS.ajaxRequest('server.php?type=javascript',options);
	ADS.ajaxRequest('server.php?type=none',options);

});