<?
//iterate through the upload directory to retrieve
//the files that have already been uploaded
$uploads = new DirectoryIterator('./uploads');
$files = array();
foreach($uploads as $file) {
    if(!$file->isDot() && $file->isFile()) {
        $files[] = '<li><a href="uploads/'.
        	$file->getFilename().'">'.
        	$file->getFilename().
        	'</a> <em>~'.
        	round($file->getSize()/1024).
        	'kb</em></li>';
    }
}

//output the page
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<title>Uploader</title>
	<link rel="stylesheet" title="Photo Gallery" type="text/css" href="uploader.css" media="screen" />

	<script type="text/javascript" src="http://jeffreysambells.com/openprojects/JavaScript/JSLog.js"></script>
	<script type="text/javascript" src="/source/ADS.js"></script>
	<script type="text/javascript" src="uploader.js"></script>
</head>
<body>
	<div id="content">
		<ul id="message"><?php echo $message; ?></ul>
		<h1>Image Uploader</h1>
		<form action="actions/" enctype="multipart/form-data" method="post" id="uploadForm">
			<h2>Upload an image</h2>
			<p>(only jpg files less than 100kb allowed)</p>
	
			<fieldset>
				<legend>Add New Files</legend>
				<div class="fileSelector">
					<label for="newFile1">File 1</label><input type="file" id="newFile1" name="newFile1" accept="image/jpeg,image/gif,image/png,image/tiff"/>
				</div>
				<div class="fileSelector">
					<label for="newFile2">File 2</label><input type="file" id="newFile2" name="newFile2" accept="image/jpeg,image/gif,image/png,image/tiff"/>
				</div>
				<div class="fileSelector">
					<label for="newFile3">File 3</label><input type="file" id="newFile3" name="newFile3" accept="image/jpeg,image/gif,image/png,image/tiff"/>
				</div>
				<input id="submitUpload" name="submitUpload" type="submit" value="Upload Files" />
			</fieldset>
		</form>
	
		<div id="browserPane">
			<h2><span id="fileCount"><?php echo count($files); ?></span> Existing Files</h2>
			<ul id="fileList">
				<?php echo join($files,"\n\t\t"); ?>
			</ul>
		</div>
	</div>

<div id="where-from">
	From <a href="http://advanceddomscripting.com" title="AdvancED DOM Scripting">AdvancED DOM Scripting</a> 
	| <a href="http://www.amazon.com/exec/obidos/ASIN/1590598563/jeffreysamb05-20" title="Buy it on Amazon">Paperback</a>
</div>
</body>

</html>


