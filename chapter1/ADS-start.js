/**
 * ADS Library Initial Starting Point
 * http://advanceddomscripting.com/chapter1/ADS-start.js
 */

(function(){

//The ADS namespace
window['ADS'] = {};

function isCompatible(other) { };
window['ADS']['isCompatible'] = isCompatible;

function $() { };
window['ADS']['$'] = $;

function addEvent(node, type, listener) { };
window['ADS']['addEvent'] = addEvent;

function removeEvent(node, type, listener) { };
window['ADS']['removeEvent'] = removeEvent;

function getElementsByClassName(className, tag, parent){ };
window['ADS']['getElementsByClassName'] = getElementsByClassName;

function toggleDisplay(node,value) { };
window['ADS']['toggleDisplay'] = toggleDisplay;

function insertAfter(node, referenceNode) { };
window['ADS']['insertAfter'] = insertAfter;

function removeChildren(parent) { };
window['ADS']['removeChildren'] = removeChildren;

function prependChild(parent, newChild) { }; 
window['ADS']['prependChild'] = prependChild;

})();
