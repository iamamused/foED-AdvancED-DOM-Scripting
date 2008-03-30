initPage() {
    function doubleCheck() {
        this.message = 'Are you sure you want to leave?';
    }
    doubleCheck.prototype.sayGoodbye = function() {
        return confirm(this.message);
    }
    var clickedLink = new doubleCheck();
    var links = document.getElementsByTagName('a');

    for (var i=0 ; i<links.length ; i++) {
        // remember not to include the () on the funciton 
        // as you don’t want to execute it.
        ADS.addEvent(
            links[i],
            'click',
            ADS.bindFunction(clickedLink, clickedLink.sayGoodbye)
        );
    }
}
addEvent(window,'load',initPage);
