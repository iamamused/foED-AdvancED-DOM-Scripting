ADS.addEvent(document, 'keydown', function(W3CEvent) {    
    var key = ADS.getKeyPressed(W3CEvent);
    ADS.log.write(key.code + ':' + key.value);
});
