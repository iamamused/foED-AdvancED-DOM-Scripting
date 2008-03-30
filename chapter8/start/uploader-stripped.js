function verfyInputMimeType(fileInput) {
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

var addProgressBar = function(form,modificationHander) {

    // Check if the form exists

    // Find all the file input elements 

    // If there are no file input then stop
    
    // Add an change event to verify the extension based on the mime types

    // Append the target iframe for the upload
    
    // Modify the target of the form to be the new iframe
    // This will prevent the page from reloading
       
    // Create a unique ID to track uploading
       
    // Add the unique ID as the APC_UPLOAD_PROGRESS key
    
    // Create the different pieces for the progress indicator

    // Check for an existing anchor point.
    // It must be a span with the progressContainer class

    // If it doesn't exist create one and append it to the form

    // Set the container to a block style

    // Append the rest of the progress bar
    
    // Create a private method that will be used below by the 
    // progress watcher to update the progress bar and message
    
    // Initiate the bar at 0% and waiting
        
    // Add a the submit event to the form that will verify the form 
    // information and update the progress bar

}


ADS.addEvent(window,'load',function(W3CEvent) {
    
    // Modify the uploadForm as necesary
    addProgressBar('uploadForm',function(files) {
        var fileList = ADS.$('fileList');
        for(var i in files) {
            // Create a new element for the file list
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.setAttribute('href','uploads/' + files[i]);
            a.appendChild(document.createTextNode(files[i]));
            li.appendChild(a);
            fileList.appendChild(li);
        }
        // Update the file count number
        var countContainer = ADS.$('fileCount');
        ADS.removeChildren(countContainer);
        var numFiles = fileList.getElementsByTagName('LI').length;
        countContainer.appendChild(document.createTextNode(numFiles));
    });
});
