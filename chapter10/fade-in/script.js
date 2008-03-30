
jQuery.noConflict();


ADS.addEvent(window,'load',function() {

// Display a transition on the #start-css element
// from transparent to opaque using moo.fx
var myFx = new Fx.Style(
    'start-css',
    'opacity', 
    {duration:2000}
).start(0,1);


});