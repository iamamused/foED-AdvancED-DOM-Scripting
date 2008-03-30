// Regular addEvent for the window's load event
ADS.addEvent(window,'load',function(W3CEvent) {
    ADS.log.write('ADS.addEvent(window,load,...) invoked');
});

// The alternate addLoadMethod
ADS.addLoadEvent(function(W3CEvent) {
    ADS.log.write('ADS.addLoadEvent(...) invoked');
});

// The alternate addLoadMethod which uses the original addEvent method
ADS.addLoadEvent(function(W3CEvent) {
    ADS.log.write('ADS.addLoadEvent(...,true) invoked');
},true);
