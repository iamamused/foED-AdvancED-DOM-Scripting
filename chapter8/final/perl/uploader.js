function verifyFileType(fileInput) {
    if(!fileInput.value || !fileInput.accept) return true;
    var extension = fileInput.value.split('.').pop().toLowerCase();
    var mimetypes = fileInput.accept.toLowerCase().split(',');
    var type;
    for(var i in mimetypes) {
        type = mimetypes[i].split('/')[1];
        if(type == extension || (type=='jpeg' && extension=='jpg')) {
            return true;
        }
    }
    return false;
}

var addProgressBar = function(form,modificationHandler) {

    // Check if the form exists
    if(!(form = ADS.$(form))) { return false; }


    // Find all the file input elements
    var allInputs = form.getElementsByTagName('INPUT');
    var input;
    var fileInputs = [];
    for(var i=0 ; (input = allInputs[i]) ; i++) {
        if(input.getAttribute('type') == 'file') {
            fileInputs.push(input);
        }
    }

    // If there are no file input then stop
    if(fileInputs.length == 0) { return false; }

    // Add a change event to verify the extension based 
    // on the mime types
    for(var i=0 ; (fileInput = fileInputs[i]) ; i++) {
        // Add file type check using a change event listener
        ADS.addEvent(fileInput,'change',function(W3CEvent) {
            var ok = verifyFileType(this);
            if(!ok) {
                if(!ADS.hasClassName(this,'error')) {
                    ADS.addClassName(this,'error');
                }
                alert('Sorry, that file type is not allowed. Please select one of: ' + this.accept.toLowerCase());
            } else {
                ADS.removeClassName(this,'error');
            }
        });

    }

    // Append the target iframe for the upload
    // In IE the name attribute doesn't set properly using DOM
    // such as:
    // var uploadTargetFrame = document.createElement('iframe');
    // uploadTargetFrame.setAttribute('id','uploadTargetFrame');
    // uploadTargetFrame.setAttribute('name','uploadTargetFrame');
    // To work around this create a div and use the innerHTML 
    // property which will render the name correctly in IE and
    // other browsers.
    var uploadTargetFrame = document.createElement('div');
    uploadTargetFrame.innerHTML = '<iframe name="uploadTargetFrame" id="uploadTargetFrame"></iframe>';
    ADS.setStyleById(uploadTargetFrame,{
        'width':'0',
        'height':'0',
        'border':'0',
        'visibility':'hidden',
        'zIndex':'-1'
    });
    document.body.appendChild(uploadTargetFrame);

    // Modify the target of the form to be the new iframe
    // This will prevent the page from reloading
    form.setAttribute('target','uploadTargetFrame');

    // Create a unique ID to track uploading
    var uniqueID = 'A' + Math.floor(Math.random() * 10000000000000);

    // Add the unique ID as the APC_UPLOAD_PROGRESS key
    // It must be added before the file inputs so that the server
    // will receive it first and trigger the progress information
    var uniqueIDField = document.createElement('input');
    uniqueIDField.setAttribute('type','hidden');
    uniqueIDField.setAttribute('value',uniqueID);
    uniqueIDField.setAttribute('name','APC_UPLOAD_PROGRESS');
    form.insertBefore(uniqueIDField,form.firstChild);

	// Create the different pieces for the progress indicator
	
	// The bar
	var progressBar = document.createElement('span')
	progressBar.className = 'progressBar';
	ADS.setStyle(progressBar,{
		'display':'block'
	});
	
	// The inner background container
	var progressBackground = document.createElement('span')
	progressBackground.className = 'progressBackground';
	ADS.setStyle(progressBackground,{
		'display':'block',
		'height':'10px'
	});
	progressBackground.appendChild(progressBar);
	
	// Check for an existing anchor point.
	// It must be a span with the progressContainer class
	var progressContainer = ADS.getElementsByClassName(
		'progressContainer',
		'span'
	)[0];
	
	// If it doesn't exist create one and append it to the form
	if(!progressContainer) {
		progressContainer = document.createElement('span')
		progressContainer.className = 'progressContainer';
		form.appendChild(progressContainer);
	}
	
	// Set the container to a block style
	ADS.setStyle(progressContainer,{
		'display':'block'
	});
	
	// Append the rest of the progress bar
	progressContainer.appendChild(progressBackground);
	
	// Add a progress message area as well
	var progressMessage = document.createElement('p')
	progressMessage.className = 'progressMessage';
	progressContainer.appendChild(progressMessage);

    // Create a private method that will be used below by the
    // progress watcher to update the progress bar and message
    function updateProgressBar(percent,message,satus) {
        progressMessage.innerHTML = message;
        ADS.removeClassName(progressMessage,'error');
        ADS.removeClassName(progressMessage,'complete');
        ADS.removeClassName(progressMessage,'waiting');
        ADS.removeClassName(progressMessage,'uploading');
        ADS.addClassName(progressMessage,satus);

        // The CSS and className will take
        // care of the status indications
        ADS.setStyle(progressBar,{
            'width':percent
        });
    }

    // Initiate the bar at 0% and waiting
    updateProgressBar('0%','Waiting for upload','waiting');

    // Add a the submit event to the form that will verify the form
    // information and update the progress bar
    ADS.addEvent(form,'submit',function(W3CEvent){

        // Check the inputs again to make sure they have 
        // the right extensions
        var ok = true;
        var hasFiles = false;
        for(var i=0 ; (fileInput = fileInputs[i]) ; i++) {
            if(fileInput.value.length>0) {
                hasFiles = true;
            }
            if(!verifyFileType(fileInput)) {
                // highlight the file input as an error
                if(!ADS.hasClassName(fileInput,'error')) {
                    ADS.addClassName(fileInput,'error');
                }
                ok = false;
            }
        }

        if(!ok || !hasFiles) {
            // If they don't alert the user to fix the problem
            ADS.preventDefault(W3CEvent);
            alert('Please select some valid files.');
            return false;
        }


        // Disable the form elements by alerting a warning messge
        function warning(W3CEvent) {
            ADS.preventDefault(W3CEvent);
            alert('There is an upload in progress. Please wait.');
        }
        for(var i=0 ; (input = allInputs[i]) ; i++) {
           // input.setAttribute('disabled','disabled');
           ADS.addEvent(input,'mousedown',warning);
        }

        // Create a function to re-enable the form after the upload
        // is complete. This will be called from within the Ajax
        // event listeners
        function clearWarnings() {
            // Remove the warning from the form elements
            for(var i=0 ; (input = allInputs[i]) ; i++) {
                ADS.removeEvent(input,'mousedown',warning);
            }

            // Update the ID and form with a new ID number 
            // so that the next upload will not conflict with 
            // this one
            uniqueID = Math.floor(Math.random() * 1000000000000000);
            uniqueIDField.setAttribute('value',uniqueID);
        }

        // Update the progress bar
        updateProgressBar('0%','Beginning','waiting');
        
        // set a counter for the simulation
        var counter = 0;

        // Create an new method to trigger a new progress request
        var progressWatcher = function() {

            // Request the progress using the unique key
            ADS.ajaxRequest(form.action 
                + (form.action.indexOf('?') == -1 ? '?' : '&') 
                + 'key=' + uniqueID + '&sim=' + (++counter) , {

                // The server side script wil be returning the
                // the appropriate headers so we'll use the 
                // json listener
                jsonResponseListener:function(response) {
                    // Check the response to see if there was an
                    // error in the server side script
                    
                    if(!response) {
                        // There was an invalid response
                        updateProgressBar('0%','Invalid response from progress watcher','error');
                        // The request is finished so clear warnings
                        clearWarnings();
                    } else if(response.error) {
                        // An error was reported by the server
                        updateProgressBar('0%',response.error,'error');
                        // The request is finished so clear warnings
                        clearWarnings();
                    } else if(response.done == 1) {
                        // The post has completed
                        updateProgressBar('100%','Upload Complete','complete');
                        // The request is finished so clear warnings
                        clearWarnings();
                        // Pass the new information to the user 
                        // supplied modification handler.
                        if(modificationHandler.constructor == Function) {
                            modificationHandler(response);
                        }
                    } else {
                        // Update the progress bar and return the 
                        // result. The result will be null so the
                        // return will simply stop execution of the
                        // rest of the method.
                        updateProgressBar(
                            Math.round(response.current/response.total*100)+'%',
                            response.current
                                + ' of '
                                + response.total
                                + '. '
                                + 'Uploading file: ' +
                                response.currentFileName,
                            'uploading'
                        );
                        
                        // Execute the progress watcher again
                        setTimeout(progressWatcher,1000);

                    }
                    
                },
                errorListener:function() {
                    // There was an error with the ajax request so 
                    // then the user know
                    updateProgressBar('0%',this.status,'error');
                    
                    // and clear the warnings
                    clearWarnings();
                    
                }
            });

        };
        
        // Start watching...
        setTimeout(progressWatcher,1000);
        
    });
}