var counter=0;

ADS.addEvent(window,'load',function() {
	ADS.addEvent(ADS.$('submit'),'click',function() {
		(function () {
			var num = ++counter;
			ADS.ajaxRequest('latency.php?num='+num,{
				completeListener:function(){
					ADS.$('ajaxRequestList').innerHTML += '<li>Request <strong>' + num + '</strong> <em>(took ' + this.responseText + ' seconds)</em></li>';
				}
			});
		})();
	});
});