function doubleCheck() {
    this.message = 'Are you sure you want to leave?';
}
doubleCheck.prototype.sayGoodbye = function() {
    return confirm(this.message);
}
initPage() {    
    var clickedLink = new doubleCheck();
    var links = document.getElementsByTagName('a');

    for (var i=0 ; i<links.length ; i++) {
        ADS.addEvent(links[i], 'click', clickedLink.sayGoodbye);
    }
}
ADS.addEvent(window,'load',initPage);
