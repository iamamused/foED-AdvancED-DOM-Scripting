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

// The image editor object upon which the static members will be added
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
    var forms = ADS.getElementsByClassName('ADSImageEditor', 'FORM');

    for( var i=0 ; i < forms.length ; i++ ) {
                
        // Locate the image in the form
        var images = forms[i].getElementsByTagName('img');
        if(!images[0]) {
            // This form doesn't have an image so skip it
            continue;
        }
                
        // add the imageEditor.imageClick event to the image
        ADS.addEvent(images[0],'click',imageEditor.imageClick);
        
        // Modify the class so that the CSS can modify 
        // the style as necessary
        forms[i].className += ' ADSImageEditorModified';
        
        // The CSS file includes additional rules to modify the 
        // style of the page if the form is modified.
        
    }
};

// The method to remove the editor from the document
imageEditor.unload = function(W3CEvent) {
    // Remove the editor and backdrop
    document.body.removeChild(imageEditor.elements.editor);
    document.body.removeChild(imageEditor.elements.backdrop);
};


// The method to create the editor in the DOM document.
// Acts as the click event listeners on the images.
imageEditor.imageClick = function(W3CEvent) {
    
    // create a new JavaScript Image object so that
    // you can determine the width and height of the image.
    var image = new Image();
    
    // This references the clicked image element
    image.src = imageEditor.info.imgSrc = this.src;
    
    // Retrieve the page size for the backdrop and centering the editor
    var windowSize = getWindowSize();
        
    /* 
    Build the DOM structure and append it to the document
    This will reproduce the following markup with size based
    around the clicked image's size:

    <div><!-- backdrop --></div>
    <div>
        <!-- editor -->
        <div><!-- resize handle --></div>
        <img src="/path/to/image.jpg">
        <div><!-- translucent cover --></div>
        <div>
            <!-- crop area -->
            <img src="/path/to/image.jpg">
            <div><!-- crop size display --></div>
            <div><!-- crop handle --></div>
            <div><!-- save handle --></div>
            <div><!-- cancel handle --></div>
        </div>
    </div> 
    */
    
    // Create the backdrop div and
    // make it the size of the entire page
    var backdrop = document.createElement('div');
    imageEditor.elements.backdrop = backdrop; 
    ADS.setStyle(backdrop,{
        'position':'absolute',
        'background-color':'black',
        'opacity':'0.8',
        'width':'100%',
        'height':'100%',
        'z-index':10000,
        // for MSIE we need to use a filter
        'filter':'alpha(opacity=80)'
        
    });
    setNumericStyle(backdrop,{
        'left':0,
        'top':0,
        'width':windowSize.width,
        'height':windowSize.height
    });

    document.body.appendChild(backdrop);

    // Create the editor div to contain the editing GUI
    var editor = document.createElement('div');
    imageEditor.elements.editor = editor;
    ADS.setStyle(editor,{
        'position':'absolute',
        'z-index':10001
    });
    setNumericStyle(editor,{
        'left': Math.ceil((windowSize.width-image.width)/2),
        'top': Math.ceil((windowSize.height-image.height)/2),
        'width':image.width,
        'height':image.height   
    });
    // Append the editor to the document.
    document.body.appendChild(editor);

    // Create the resize handle
    var resizeHandle = document.createElement('div');
    imageEditor.elements.resizeHandle = resizeHandle;
    ADS.setStyle(resizeHandle,{
        'position':'absolute',
        'background':'transparent url(interface/handles.gif) no-repeat 0 0'
    });
    setNumericStyle(resizeHandle,{
        'left':(image.width - 18),
        'top':(image.height - 18),
        'width':28,
        'height':28
    });
    // Append the handle to the editor
    editor.appendChild(resizeHandle);
        
    // Create the resizable image
    var resizee = document.createElement('img');
    imageEditor.elements.resizee = resizee;
    resizee.src = imageEditor.info.imgSrc;

    // Get rid of any CSS applied to an img element
    ADS.setStyle(resizee,{
        'position':'absolute',
        'margin':0,
        'padding':0,
        'border':0
    });
    setNumericStyle(resizee,{
        'left':0,
        'top':0,
        'width':image.width,
        'height':image.height
    });
    
    
    editor.appendChild(resizee);

    // Create the translucent cover
    var resizeeCover = document.createElement('div');
    imageEditor.elements.resizeeCover = resizeeCover;
    ADS.setStyle(resizeeCover,{
        'position':'absolute',
        'background-color':'black',
        'opacity':0.5,
        // for MSIE we need to use a filter
        'filter':'alpha(opacity=50)'
    });
    setNumericStyle(resizeeCover,{
        'left':0,
        'top':0,
        'width':image.width,
        'height':image.height
    });

    editor.appendChild(resizeeCover);



    // Create the crop size display
    var cropSizeDisplay = document.createElement('div');
    imageEditor.elements.cropSizeDisplay = cropSizeDisplay;
    ADS.setStyle(cropSizeDisplay,{
        'position':'absolute',
        'background-color':'black',
        'color':'white'
    });

    setNumericStyle(cropSizeDisplay,{
        'left':0,
        'top':0,
        'font-size':10,
        'line-height':10,
        'padding':4,
        'padding-right':4
    });
    
    cropSizeDisplay.appendChild(document.createTextNode('size'));

    // Create the crop area container
    var cropArea = document.createElement('div');
    imageEditor.elements.cropArea = cropArea;
    ADS.setStyle(cropArea,{
        'position':'absolute',
        'overflow':'hidden',
        'background-color':'transparent'
    });
    
    // Set the dinemsions and update the size display box
    setNumericStyle(cropArea,{
        'left':0,
        'top':0,
        'width':image.width,
        'height':image.height
    },true);
    
    editor.appendChild(cropArea);
    
    // Create the clone of the image in the crop area
    var resizeeClone = resizee.cloneNode(false);
    imageEditor.elements.resizeeClone = resizeeClone;

    cropArea.appendChild(resizeeClone); 
    
    cropArea.appendChild(cropSizeDisplay);
    
    // Create the crop resize handle
    var cropResizeHandle = document.createElement('div');
    imageEditor.elements.cropResizeHandle = cropResizeHandle;
    ADS.setStyle(cropResizeHandle,{
        'position':'absolute',
        'background':'transparent url(interface/handles.gif) no-repeat 0 0'
    });
    setNumericStyle(cropResizeHandle,{
        'right':0,
        'bottom':0,
        'width':18,
        'height':18
    });

    cropArea.appendChild(cropResizeHandle);

    // Create the save handle
    var saveHandle = document.createElement('div');
    imageEditor.elements.saveHandle = saveHandle;
    ADS.setStyle(saveHandle,{
        'position':'absolute',
        'background':'transparent url(interface/handles.gif) no-repeat -40px 0'
    });
    setNumericStyle(saveHandle,{
        'left':0,
        'bottom':0,
        'width':16,
        'height':18
    });

    cropArea.appendChild(saveHandle);
    
    // Create the cancel resize handle
    var cancelHandle = document.createElement('div');
    imageEditor.elements.cancelHandle = cancelHandle;
    ADS.setStyle(cancelHandle,{
        'position':'absolute',
        'background':'transparent url(interface/handles.gif) no-repeat -29px -11px'
    });
    setNumericStyle(cancelHandle,{
        'right':0,
        'top':0,
        'width':18,
        'height':16
    });

    cropArea.appendChild(cancelHandle);

    // Add the events to the DOM elements

    // Resize handle rollovers
    ADS.addEvent(resizeHandle,'mouseover',function(W3CEvent) {
        ADS.setStyle(this,{'background-position':'0px -29px'});
    });
    ADS.addEvent(resizeHandle,'mouseout',function(W3CEvent) {
        ADS.setStyle(this,{'background-position':'0px 0px'});
    });
    
    // Crop handle rollovers
    ADS.addEvent(cropResizeHandle,'mouseover',function(W3CEvent) {
        ADS.setStyle(this,{'background-position':'0px -29px'});
    });
    ADS.addEvent(cropResizeHandle,'mouseout',function(W3CEvent) {
        ADS.setStyle(this,{'background-position':'0px 0px'});
    });
    
    // Save handle rollovers
    ADS.addEvent(saveHandle,'mouseover',function(W3CEvent) {
        ADS.setStyle(this,{'background-position':'-40px -29px'});
    });
    ADS.addEvent(saveHandle,'mouseout',function(W3CEvent) {
        ADS.setStyle(this,{'background-position':'-40px 0px'});
    });
    
    // Cancel handle rollovers
    ADS.addEvent(cancelHandle,'mouseover',function(W3CEvent) {
        ADS.setStyle(this,{'background-position':'-29px -40px'});
    });
    ADS.addEvent(cancelHandle,'mouseout',function(W3CEvent) {
        ADS.setStyle(this,{'background-position':'-29px -11px'});
    });

    /* Mouse events for the handles */

    // Start the image resizing event flow
    ADS.addEvent(resizeHandle,'mousedown',imageEditor.resizeMouseDown);

    // Start the crop area drag event flow   
    ADS.addEvent(cropArea,'mousedown',imageEditor.cropMouseDown);
    
    // Start the crop area resize event flow
    ADS.addEvent(cropResizeHandle,'mousedown',function(W3CEvent) {
        imageEditor.info.resizeCropArea = true;
    });

    // Prevent the save handle from starting the crop drag flow
    ADS.addEvent(saveHandle,'mousedown',function(W3CEvent) {
            ADS.stopPropagation(W3CEvent);
    });
    // Save the image on click of the save handle or dblckick of the crop area
    ADS.addEvent(saveHandle,'click',imageEditor.saveClick);
    ADS.addEvent(cropArea,'dblclick',imageEditor.saveClick);

    // Prevent the cancel handle from starting the crop drag flow
    ADS.addEvent(cancelHandle,'mousedown',function(W3CEvent) {
            ADS.stopPropagation(W3CEvent);
    });
    // Cancel the changes on click
    ADS.addEvent(cancelHandle,'click',imageEditor.cancelClick);
    
    // Resize the backdrop if the window size changes 
    ADS.addEvent(window,'resize',function(W3CEvent) {
        var windowSize = getWindowSize();
        setNumericStyle(backdrop,{
            'left':0,
            'top':0,
            'width':windowSize.width,
            'height':windowSize.height
        });
    });
};

// The event listener for the mousedown on the resize handle
imageEditor.resizeMouseDown = function(W3CEvent) {

    // Save the current positions and dimensions     
    imageEditor.info.pointerStart = ADS.getPointerPositionInDocument(W3CEvent)
    imageEditor.info.resizeeStart = getDimensions(
        imageEditor.elements.resizee
    );
    imageEditor.info.cropAreaStart = getDimensions(
        imageEditor.elements.cropArea
    );
        
    // Register the rest of the events to enable dragging  
    ADS.addEvent(document,'mousemove',imageEditor.resizeMouseMove);
    ADS.addEvent(document,'mouseup',imageEditor.resizeMouseUp);

    // Stop the event flow    
    ADS.stopPropagation(W3CEvent);
    ADS.preventDefault(W3CEvent);
    
};

// The event listener for the mousemove on the resize handle
imageEditor.resizeMouseMove = function (W3CEvent) {
    var info = imageEditor.info;
    
    // Retrieve the current pointer position
    var pointer = ADS.getPointerPositionInDocument(W3CEvent);

    // Calculate the new width and height for the image based on the pointer
    var width = (info.resizeeStart.width 
        + pointer.x - info.pointerStart.x);
    var height = (info.resizeeStart.height  
        + pointer.y - info.pointerStart.y);
        
    // Minimum size is 42 square
    if(width < 42) { width = 42; }
    if(height < 42) { height = 42; }
        
    // Calculation the percentage from original
    var widthPercent = (width / info.resizeeStart.width);
    var heightPercent = (height / info.resizeeStart.height);

    // If the shift key is press, resize proportionally
    if(ADS.getEventObject(W3CEvent).shiftKey) {
        if(widthPercent > heightPercent) {
            heightPercent = widthPercent;
            height = Math.ceil(info.resizeeStart.height * heightPercent); 
        } else {
            widthPercent = heightPercent;
            width = Math.ceil(info.resizeeStart.width * widthPercent);          
        }
    }

    // Calculation the new size for the crop area 
    var cropWidth = Math.ceil(info.cropAreaStart.width * widthPercent);
    var cropHeight = Math.ceil(info.cropAreaStart.height * heightPercent);
    var cropLeft =  Math.ceil(info.cropAreaStart.left * widthPercent);
    var cropTop  =  Math.ceil(info.cropAreaStart.top * heightPercent);

    // Resize the objects
    setNumericStyle(
        imageEditor.elements.resizee,
        {'width':width,'height':height}
    );
    setNumericStyle(
        imageEditor.elements.resizeeCover,
        {'width':width,'height':height}
    );
    setNumericStyle(
        imageEditor.elements.resizeHandle,
        {'left':(width - 18),'top':((height - 18))}
    );
    setNumericStyle(
        imageEditor.elements.cropArea,
        {'left':cropLeft,'top':cropTop,
        'width':cropWidth,'height':cropHeight},
        true
    );  
    setNumericStyle(
        imageEditor.elements.resizeeClone,
        {'left':(cropLeft * -1),'top':(cropTop * -1),
        'width':width,'height':height}
    );

    // Stop the event flow    
    ADS.stopPropagation(W3CEvent);
    ADS.preventDefault(W3CEvent);

};

// The event listener for the mouseup on the resize handle
imageEditor.resizeMouseUp = function (W3CEvent) {
    
    // Remove the event listeners to stop the dragging
    ADS.removeEvent(document,'mousemove',imageEditor.resizeMouseMove);
    ADS.removeEvent(document,'mouseup',imageEditor.resizeMouseUp);

    // Stop the event flow    
    ADS.stopPropagation(W3CEvent);
    ADS.preventDefault(W3CEvent);
};

// The event listener for the mousedown on the crop area
imageEditor.cropMouseDown = function(W3CEvent) {

    imageEditor.info.pointerStart = ADS.getPointerPositionInDocument(W3CEvent)
    imageEditor.info.cropAreaStart = getDimensions(
        imageEditor.elements.cropArea
    );
    
    // Include the resizee to limit the movement of the crop area
    var resizeeStart = getDimensions(imageEditor.elements.resizee);
    imageEditor.info.maxX = resizeeStart.left + resizeeStart.width;
    imageEditor.info.maxY = resizeeStart.top + resizeeStart.height;
    
    ADS.addEvent(document,'mousemove', imageEditor.cropMouseMove);
    ADS.addEvent(document,'mouseup', imageEditor.cropMouseUp);

    // Stop the event flow    
    ADS.stopPropagation(W3CEvent);
    ADS.preventDefault(W3CEvent);
};

// The event listener for the mousemove on the crop area
imageEditor.cropMouseMove = function(W3CEvent) {
    
    var pointer = ADS.getPointerPositionInDocument(W3CEvent);
    
    if(imageEditor.info.resizeCropArea) {
        
        // Resize the crop area
        var width = (
            imageEditor.info.cropAreaStart.width 
            + pointer.x 
            - imageEditor.info.pointerStart.x
        );
        
        var height = (
            imageEditor.info.cropAreaStart.height  
            + pointer.y 
            - imageEditor.info.pointerStart.y
        );      
        
        // If the shift key is press, resize proportionally
        // calculation the percentage from original
        var widthPercent = (width / imageEditor.info.cropAreaStart.width);
        var heightPercent = (height / imageEditor.info.cropAreaStart.height);
        if(ADS.getEventObject(W3CEvent).shiftKey) {
            if(widthPercent > heightPercent) {
                heightPercent = widthPercent;
                height = Math.ceil(imageEditor.info.cropAreaStart.height 
                    * heightPercent); 
            } else {
                widthPercent = heightPercent;
                width = Math.ceil(imageEditor.info.cropAreaStart.width 
                    * widthPercent);            
            }
        }
        
        
        // Check if the new position would be out of bounds
        if(imageEditor.info.cropAreaStart.left + width > imageEditor.info.maxX) {
            width = imageEditor.info.maxX 
                - imageEditor.info.cropAreaStart.left;
        } else if(width < 36) {
            width = 36;
        }
        if(imageEditor.info.cropAreaStart.top + height > imageEditor.info.maxY) {
            height = imageEditor.info.maxY 
                - imageEditor.info.cropAreaStart.top;
        } else if(height < 36) {
            height = 36;
        }
        
        setNumericStyle(
            imageEditor.elements.cropArea,
            {'width':width,'height':height},
            true
        );
        
    } else {
        
        // Move the crop area
        var left = (
            imageEditor.info.cropAreaStart.left 
            + pointer.x 
            - imageEditor.info.pointerStart.x
        );
        
        var top = (
            imageEditor.info.cropAreaStart.top 
            + pointer.y 
            - imageEditor.info.pointerStart.y
        );
        
        // Check if the new position would be out of 
        // bounds and limit if necessary        
        var maxLeft = imageEditor.info.maxX 
            - imageEditor.info.cropAreaStart.width;
        
        if(left < 0) { left = 0; }
        else if (left > maxLeft) { left = maxLeft;  }

        var maxTop = imageEditor.info.maxY 
            - imageEditor.info.cropAreaStart.height;
        
        if(top < 0) { top = 0; }
        else if (top > maxTop) { top = maxTop;  }
        
        setNumericStyle(
            imageEditor.elements.cropArea,
            {'left':left,'top':top}
        );
        setNumericStyle(
            imageEditor.elements.resizeeClone,
            {'left':(left * -1),'top':(top * -1)}
        );
    }

    // Stop the event flow    
    ADS.stopPropagation(W3CEvent);
    ADS.preventDefault(W3CEvent);
};

// The event listener for the mouseup on the crop area
imageEditor.cropMouseUp = function(W3CEvent) {
    // Remove all the events
    var eventObject = ADS.getEventObject(W3CEvent);
    imageEditor.info.resizeCropArea = false;
    
    ADS.removeEvent(document,'mousemove', imageEditor.cropMouseMove);
    ADS.removeEvent(document,'mouseup', imageEditor.cropMouseUp);
    
    // Stop the event flow    
    ADS.stopPropagation(W3CEvent);
    ADS.preventDefault(W3CEvent);
};

// The event listener for the click on the save handle
imageEditor.saveClick = function(W3CEvent) {

    // For now we'll just alert
    alert('This should save the information back to the server.');
    
    // If successful unload the editor
    imageEditor.unload();
};

// The event listener for the click on the cancel handle
imageEditor.cancelClick = function(W3CEvent) {
    if(confirm('Are you sure you want to cancel your changes?')) {
        // Unload the editor
        imageEditor.unload();
    }
};

window['ADS']['imageEditor'] = imageEditor;


})();

// Add the load event to the window object using the ADS.addLoadEvent()
// method because this page may contain a lot of images
ADS.addLoadEvent(ADS.imageEditor.load);
