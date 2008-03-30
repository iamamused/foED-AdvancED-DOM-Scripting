<?php

// Iterate through the upload directory to retrieve
// the files that have already been uploaded
$uploads = new DirectoryIterator('./uploads');
$files = array();
foreach($uploads as $file) {

    // Skip . and ..
    if(!$file->isDot() && $file->isFile()) {
        
        // Append to the array. This will be concatenated together
        // later in the HTML
        $files[] = sprintf(
            '<li><a href="uploads/%s">%s</a> <em>%skb</em></li>',
            $file->getFilename(),
            $file->getFilename(),
            round($file->getSize()/1024)
        );
    }
}

// Output the page
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Image Uploader with Progress (php5-APC)</title>

    <!-- Inclue some CSS style sheet to make 
    everything look a little nicer -->
    <link rel="stylesheet" type="text/css" 
        href="../../../shared/source.css" />
    <link rel="stylesheet" type="text/css" 
        href="../../chapter.css" />
    <link rel="stylesheet" type="text/css" href="style.css" />

    <!-- Your ADS library with the common JavaScript objects -->
    <script type="text/javascript" 
        src="../../../ADS-final-verbose.js"></script>

    <!-- Progress bar script -->
    <script type="text/javascript" src="uploader.js"></script>

    <!-- load script -->
    <script type="text/javascript" src="load.js"></script>

</head>
<body>
    <h1>Image Uploader with Progress (php5-APC)</h1>
    <div id="content">
        <form action="actions/" enctype="multipart/form-data" 
            method="post" id="uploadForm">
            
            <fieldset>
                <legend>Upload a new image</legend>
                <p>Only jpg/gif/png files less than 100kb allowed.</p>
                <div class="fileSelector">
                    <label for="newFile1">File 1</label>
                    <input type="file" id="newFile1" name="newFile1" 
                        accept="image/jpeg,image/gif,image/png"/>
                </div>
                <div class="fileSelector">
                    <label for="newFile2">File 2</label>
                    <input type="file" id="newFile2" name="newFile2" 
                        accept="image/jpeg,image/gif,image/png"/>
                </div>
                <div class="fileSelector">
                    <label for="newFile3">File 3</label>
                    <input type="file" id="newFile3" name="newFile3" 
                        accept="image/jpeg,image/gif,image/png"/>
                </div>
                <input id="submitUpload" name="submitUpload" 
                    type="submit" value="Upload Files" />
            </fieldset>
            
        </form>
    
        <div id="browserPane">
            <h2>
                <span id="fileCount">
                    <?php echo count($files); ?>
                </span>
                Existing Files in <em>uploads/</em>
            </h2>
            <ul id="fileList">
                <?php echo join($files,"\n\t\t\t\t"); ?>
            </ul>
        </div>
    </div>

<div id="where-from">
	From <a href="http://advanceddomscripting.com" title="AdvancED DOM Scripting">AdvancED DOM Scripting</a> 
	| <a href="http://www.amazon.com/exec/obidos/ASIN/1590598563/jeffreysamb05-20" title="Buy it on Amazon">Paperback</a>
</div>
</body>

</html>