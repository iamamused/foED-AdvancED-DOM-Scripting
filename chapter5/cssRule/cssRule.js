ADS.addEvent(window,'load',function() {

	
	ADS.editCSSRule('a',{
		'font-weight':'bold'
	});

	ADS.editCSSRule('a:link',{
		'text-decoration':'none'
	});
	
	ADS.addCSSRule('a:hover',{
		'text-decoration':'underline'
	});
	
	/* will hang IE if you try it */
	if(document.styleSheets[0].cssRules) {
		ADS.addCSSRule('a[href]:after',{
			'content':'" (" attr(href) ") "',
			'font-size': '0.9em',
			'color': '#16009b'
		});
	}

});