ADS.addEvent(window, 'load', function() {

	var options = {
		completeListener:function() { 
			ADS.log.write('Complete:' + this.responseText); 
		},
		errorListener:function(response) { 
			ADS.log.write('Error: ' + this.statusText); 
		}
	}
	
	ADS.ajaxRequestQueue(
		'server.php?message=queue1%20Number%201',
		options,
		'queue1'
	);
	ADS.ajaxRequestQueue(
		'server.php?message=queue1%20Number%202',
		options,
		'queue1'
	);


	ADS.ajaxRequestQueue(
		'server.php?message=queue2%20Number%201',
		options,
		'queue2'
	);

	ADS.ajaxRequestQueue(
		'server.broken.php?message=queue1%20Number%203',
		options,
		'queue1'
	);
	ADS.ajaxRequestQueue(
		'server.php?message=queue1%20Number%204',
		options,
		'queue1'
	);
	
	ADS.ajaxRequestQueue(
		'server.php?message=queue1%20Number%205',
		options,
		'queue1'
	);


	ADS.ajaxRequestQueue(
		'server.php?message=queue2%20Number%202',
		options,
		'queue2'
	);
	ADS.ajaxRequestQueue(
		'server.php?message=queue2%20Number%203',
		options,
		'queue2'
	);
	ADS.ajaxRequestQueue(
		'server.php?message=queue2%20Number%204',
		options,
		'queue2'
	);
	

});