(function(){

// Returns an array with 0 index as width and 1 index as height for the browser window
function getWindowSize(){    
    if (self.innerHeight) {
        // Most common
        return { 'width':self.innerWidth,'height':self.innerHeight };
    } else if (document.documentElement 
        && document.documentElement.clientHeight) {
        // MSIE strict
        return {
            'width':document.documentElement.clientWidth, 
            'height':document.documentElement.clientHeight
        };
    } else if (document.body) {
        // MSIE quirks
        return {
            'width':document.body.clientWidth,
            'height':document.body.clientHeight
        };
    }   
};

// Returns an object with the width, height, top and left properties
// of the supplied element
function getDimensions(e) {   
    return {
        top:e.offsetTop,
        left:e.offsetLeft,
        width: e.offsetWidth, 
        height: e.offsetHeight    
    };
};

// Sets the top, left, right, bottom, width and height properties
// of the supplied element
function setNumericStyle(e,dim,updateMessage) {
    
    // Check for a message
    updateMessage = updateMessage || false;
    
    // Assign to a new object so that
    // the original object remains as is.
    var style = {};
    for(var i in dim) {
        if(!dim.hasOwnProperty(i)) continue;
        style[i] = (dim[i]||'0') + 'px';
    }
    ADS.setStyle(e,style);  
    
    // Update the message if there is one
    if(updateMessage) {
        imageEditor.elements.cropSizeDisplay.firstChild.nodeValue = dim.width 
            + 'x' + dim.height;
    }
};

function imageEditor() { };

// A property to store information while editing.
imageEditor.info = {
    resizeCropArea:false,
    pointerStart:null,
    resizeeStart:null,
    cropAreaStart:null,
    imgSrc:null
};

// A property to store the instances of the DOM objects in the editor.
imageEditor.elements = {
    'backdrop': null,
    'editor': null,
    'resizeHandle': null,
    'cropSizeDisplay': null,
    'resizee': null,
    'resizeeCover': null,
    'cropArea': null,
    'resizeeClone': null,
    'cropResizeHandle': null,
    'saveHandle':null,
    'cancelHandle':null
};

// The method to register the events and modifies the DOM as necessary
// This will automatically run on window load.
imageEditor.load = function(W3CEvent) {
    
    // Get all the form elements on the page that have the
    // appropriate ADSImageEditor class name

    // Locate the image in the form
            
    // add the imageEditor.imageClick event to the image
    
    // Modify the class so that the CSS can modify 
    // the style as necessary
    
    // The CSS file includes additional rules to modify the 
    // style of the page if the form is modified.
    

};

imageEditor.unload = function(W3CEvent) {
    // Remove the editor and backdrop
};

imageEditor.imageClick = function(W3CEvent) {
    
    // Create a new JavaScript Image object so that
    // you can determine the width and height of the image.
    
    // This references the clicked image element
    
    // Retrieve the page size for the backdrop and centering the editor
            
    // Create the backdrop div and
    // make it the size of the entire page

    // Create the editor div to contain the editing GUI

    // Create the resize handle
 
    // Create the resizable image

    // Create the translucent cover

    // Create the crop size display

    // Create the crop area container

    // Create the clone of the image in the crop area

    // Create the crop resize handle

    // Create the save handle

    // Create the cancel resize handle

    // Add the events to the DOM elements

    // Resize handle rollovers

    // Crop handle rollovers

    // Save handle rollovers

    // Cancel handle rollovers

    // Start the image resizing event flow

    // Start the crop area drag event flow   

    // Start the crop area resize event flow

    // Prevent the save handle from starting the crop drag flow

    // Save the image on click of the save handle or dblckick of the crop area

    // Prevent the cancel handle from starting the crop drag flow

    // Cancel the changes on click

    // Resize the backdrop if the window size changes 

};

imageEditor.resizeMouseDown = function(W3CEvent) {

    // Save the current positions and dimensions     

    // Add the rest of the event to enable dragging  

    // Stop the event flow    

};

imageEditor.resizeMouseMove = function (W3CEvent) {
    
    // Retrieve the current pointer position

    // Calculate the new width and height for the image based on the pointer

    // Minimum size is 42 square

    // Calculation the percentage from original

    // If the shift key is press, resize proportionally

    // Calculation the new size for the crop area 

    // Resize the objects

    // Stop the event flow    
};
imageEditor.resizeMouseUp = function (W3CEvent) {
    // Remove the event listeners to stop the dragging
    // Stop the event flow    
};
// The event listener for the mousedown on the crop area
imageEditor.cropMouseDown = function(W3CEvent) {
    // Include the resizee to limit the movement of the crop area
    // Stop the event flow    
};
// The event listener for the mousemove on the crop area
imageEditor.cropMouseMove = function(W3CEvent) {
    var pointer = ADS.getPointerPositionInDocument(W3CEvent);
    if(imageEditor.info.resizeCropArea) {
        // Resize the crop area
     
        
        // If the shift key is press, resize proportionally
        // calculation the percentage from original
        
        // Check if the new position would be out of bounds
    } else {
        // Move the crop area

        // Check if the new position would be out of 
        // bounds and limit if necessary        
    }
    // Stop the event flow    
};
imageEditor.cropMouseUp = function(W3CEvent) {
    // Remove all the events
    // Stop the event flow    
};
imageEditor.saveClick = function(W3CEvent) {
    // For now we'll just alert
    // If successful unload the editor
};
imageEditor.cancelClick = function(W3CEvent) {

};
window['ADS']['imageEditor'] = imageEditor;
})();

// Add the load event to the window object using the ADS.addLoadEvent()
// method because this page may contain a lot of images
ADS.addLoadEvent(ADS.imageEditor.load);
