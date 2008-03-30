ADS.addEvent(window,'load',function(W3CEvent) {
    
    // Modify the uploadForm as necesary
    addProgressBar('uploadForm',function(response) {
        var fileList = ADS.$('fileList');
        var files = response.filesProcessed;
        for(var i in files) {

            // Skip empty files
            if(files[i] == null) continue;
            
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
