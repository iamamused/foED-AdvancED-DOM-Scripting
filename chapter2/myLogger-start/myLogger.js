function myLogger(id) {

	id = id || 'ADSLogWindow';
	var logWindow = null;
	
	var createWindow = function () { };
	this.writeRaw = function (message) { };

}

myLogger.prototype = {
	write: function (message) {	},
	header: function (message) { }
};

if(!window.ADS) { window['ADS'] = {}; }
window['ADS']['log'] = new myLogger();

if(!console) var console = ADSLog;

