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

    // Find all the file input elements

    // If there are no file input then stop

    // Add a change event to verify the extension based 
    // on the mime types

    // Append the target iframe for the upload
    // In IE the name attribute doesn't set properly using DOM
    // such as:
    // var uploadTargetFrame = document.createElement('iframe');
    // uploadTargetFrame.setAttribute('id','uploadTargetFrame');
    // uploadTargetFrame.setAttribute('name','uploadTargetFrame');
    // To work around this create a div and use the innerHTML 
    // property which will render the name correctly in IE and
    // other browsers.


    // Modify the target of the form to be the new iframe
    // This will prevent the page from reloading

    // Create a unique ID to track uploading

    // Add the unique ID as the APC_UPLOAD_PROGRESS key
    // It must be added before the file inputs so that the server
    // will receive it first and trigger the progress information

    // Create the different pieces for the progress indicator
    
    // The bar

    // The inner background container

    // Check for an existing anchor point.
    // It must be a span with the progressContainer class

    // If it doesn't exist create one and append it to the form

    // Set the container to a block style

    // Append the rest of the progress bar

    // Add a progress message area as well

    // Create a private method that will be used below by the
    // progress watcher to update the progress bar and message

    // Initiate the bar at 0% and waiting

    // Add a the submit event to the form that will verify the form
    // information and update the progress bar

}

