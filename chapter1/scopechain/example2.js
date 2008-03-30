function registerListener(anchor, i) {
    ADS.addEvent(anchor, 'click', function() {
        alert('My id is anchor' + i);
    });
}
function initAnchors(W3CEvent) {
    for ( i=1 ; i<=5 ; i++ ) {
        var anchor = document.getElementById('anchor'+i);
        registerListener(anchor,i);
    }
}
ADS.addEvent(window, 'load', initAnchors); 
