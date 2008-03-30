ADS.addEvent(window, 'load', function() {

	// set style By ID
	ADS.setStyleById('test',{
		'background-color':'green',
		'border':'2px solid black',
		'color':'white',
		'display':'inline'
	});
	
	// set style by Tag
	ADS.setStylesByTagName('unorderedList',{
		'background-color':'gray'
	});

	// set style by TAg within an ID
	ADS.setStylesByTagName(
		'li',
		{
			'background-color':'green',
			'border':'2px solid black',
			'color':'white',
			'display':'inline'
		},
		'unorderedList'
	);
	
	// set style by className
	ADS.setStylesByClassName(
		'unorderedList',
		'*',
		'findme',
		{'background-color':'red'}
	);

	// get style by ID
	ADS.log.write(ADS.getStyleById('test','color'));
	

});