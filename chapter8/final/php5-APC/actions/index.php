<?php

//check if the request is using the ADS.ajaxRequest() method.
if($_SERVER['HTTP_X_ADS_AJAX_REQUEST']) {
    
    // Return the progress information as a JSON string
	
    // Send some headers to prevent caching of the progress request
    header('Expires: Fri, 13 Dec 1901 20:45:54 GMT') ;
    header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT') ;
    header('Cache-Control: no-store, no-cache, must-revalidate') ;
    header('Cache-Control: post-check=0, pre-check=0', false) ;
    header('Pragma: no-cache') ;
    
    // This will be a JavaScript JSON response
    header('Content-Type:application/json; charset=utf-8' ) ;

    // Retrieve the status using the getStatus() function below	
    echo json_encode(getStatusAPC($_GET['key']));
	
	die();
} 

// Process any files in the PHP $_FILES[] array and return to the
// main script if everything went well. Otherwise we'll display a
// error page.

$allowedExtensions = array('jpg','jpeg','gif','png');
$errorMessage = null ;
$storedFiles = array();


if(count($_FILES) > 0) {
	
	try {
		
		// Process each file
		foreach($_FILES as $key=>$info) {
			if($_FILES[$key]['name']) {
				// storeFile() throws exceptions
				$file = storeFile($key,'../uploads/',$allowedExtensions);
			} else {
				$file = null;
			}

			// Keep track of stored files incase you need to
			// remove them.
			$storedFiles[$key] = $file['basename'];
		}

		if($_POST['APC_UPLOAD_PROGRESS'] && function_exists('apc_store')) {
		
			// Store the file information so it can be 
			// retrieved in the progress watcher			
			apc_store('upload_finished_'.$_POST['APC_UPLOAD_PROGRESS'],$storedFiles);

			// Die. This message will display in the iframe				
			die('Upload complete.');
			
		}
		
		// Everything was successful so redirect back 
		// to the main index page
		header('Location: ../');
		die();
		
	} catch (Exception $e) {
		// There was an error so remove any files that were uploaded
		foreach($storedFiles as $file) {
			if(is_file($file)) unlink('uploads/'.$file);
		}
		$storedFiles = array();



		if($_POST['APC_UPLOAD_PROGRESS'] && function_exists('apc_store')) {
			
			// Store the error message so it can be 
			// retrieved in the progress watcher
			apc_store(
				'upload_error_'.$_POST['APC_UPLOAD_PROGRESS'],
				$e->getMessage()
			);
			
			// Die. This message will display in the iframe
			die('There was an error');
		
		} else {
		
			// Get the error message
			$errorMessage = sprintf(
				'<p>%s failed: %s</p>', 
				$key, 
				$e->getMessage()
			);
			
			// Display a simple error page with a 
			// link back to the main index file
			echo 
<<<XHTML
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>Oops!</title>
</head>
<body>
	<h1>Error</h1>
	<p>The system reported an error with the
	file(s) you were trying to upload:</p>
	{$errorMessage}
	<p><a href="../">Return to the upload page</a></p>

<div id="where-from">
	From <a href="http://advanceddomscripting.com" title="AdvancED DOM Scripting">AdvancED DOM Scripting</a> 
	| <a href="http://www.amazon.com/exec/obidos/ASIN/1590598563/jeffreysamb05-20" title="Buy it on Amazon">Paperback</a>
</div>
</body>

</html>
XHTML;
		}
	}	
}


/**
 * Store a file uploaded through HTTP on the server
 *
 * This function will access the global $_FILES array to retrieve the 
 * information:
 *
 * The original name of the file on the client machine.
 * $_FILES['userfile']['name']
 *
 * The mime type of the file, if the browser provided this information.
 * An example would be 'image/gif'. This mime type is however not checked
 * on the PHP side and therefore don't take its value for granted.
 * $_FILES['userfile']['type']
 *
 * The size, in bytes, of the uploaded file.
 * $_FILES['userfile']['size']
 *
 * The temporary filename of the file in which the uploaded file was stored on the server.
 * $_FILES['userfile']['tmp_name']
 *
 * The error code  associated with this file upload.
 * This element was added in PHP 4.2.0
 * $_FILES['userfile']['error']
 *
 * @param string $key The key in $_FILES that represents the file you wish to 
 * store. This is generally the name attribute from the form.
 * @param string $where The directory on the server where you wish to store 
 * the file. This can be absolute or relative to the location of execution.
 * @param array $extensions An array of acceptable extensions. (white list)
 * @param int $maxBytes The maximum number of bytes
 * @return array
 */
function storeFile($key,$where,$extensions,$maxBytes=null) {

	try {
		
		// Check for the file
		if(!$_FILES[$key]) {
			throw new Exception('The specified key does not exist in the $_FILES array');
		}

		// Check the uplod location 
		if(!$where) {
			throw new Exception('Upload location not specified. If the current directory is desired, use "."');
		} elseif ($where[strlen($where)-1] != DIRECTORY_SEPARATOR) {
			$where .= DIRECTORY_SEPARATOR;
		}
		
		// Check for permissions
		if(!is_writeable($where)) {
			throw new Exception('This page can not access the specified upload directory.');
		}

		// convert the extensions to an array
		// (if a single extension as a string was supplied)
		settype($extensions,'array');
		
		//check for extensions
		if(count($extensions) == 0) {
			throw new Exception('No valid extensions were specified.');
		}
		

		// Convert ini to bytes and store in maxBytes if required
		$maxBytes = ($maxBytes ? $maxBytes  : preg_replace_callback(
		'/([0-9]+)([gmk])/i',
		'toBytes',
		ini_get('upload_max_filesize')
		));

		// check PHP upload errors		
		switch ($_FILES[$key]['error']) {
			case UPLOAD_ERR_OK:
				// everything was fine. Proceed
				break;
			case UPLOAD_ERR_INI_SIZE:
				throw new Exception('The uploaded file exceeds the upload_max_filesize directive ('.ini_get('upload_max_filesize').') in php.ini.');
				break;
			case UPLOAD_ERR_FORM_SIZE:
				throw new Exception('The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form.');
				break;
			case UPLOAD_ERR_PARTIAL:
				throw new Exception('The uploaded file was only partially uploaded.');
				break;
			case UPLOAD_ERR_NO_FILE:
				throw new Exception('No file was uploaded.');
				break;
			case UPLOAD_ERR_NO_TMP_DIR:
				throw new Exception('Missing a temporary folder.');
				break;
			case UPLOAD_ERR_CANT_WRITE:
				throw new Exception('Failed to write file to disk');
				break;
			default:
				throw new Exception('Unknown PHP File Error');
		}

		// Check if the files size is greater than the 
		// file size in the arguments
		if($_FILES['userfile']['size'] > $maxBytes) {
			throw new Exception('The uploaded file exceeds the maximum size specified in the application.');
		}

		// Sanitize the file name
		$cleanName = str_replace(' ','-',$_FILES[$key]['name']);
		$cleanName = preg_replace('/-+/','-',$cleanName);
		$cleanName = preg_replace('/[^a-z0-9_.\/-]/i','',$cleanName);
		$fileNameParts = pathinfo($cleanName);

		// Verify the sanitized name is good
		$fileNameParts['filename'] = str_replace('.','_',$fileNameParts['filename']);
		if(!$fileNameParts['filename']) {
			throw new Exception('The desired file name contains no valid characters.');
		}

		// Verify the extension is valid
		$fileNameParts['extension'] = strtolower($fileNameParts['extension']);
		if(!in_array($fileNameParts['extension'], $extensions)) {
			throw new Exception('The file extension is not one of: '.join($extensions,', '));
		}

		// Postfix the file with a counter to avoid duplicates
		$count = 0;
		$postfix = '';
		while(file_exists($uploadLocation = $where.$fileNameParts['filename'].$postfix.'.'.$fileNameParts['extension'])) {
			$postfix = '-'.++$count;
		}

		// Move the upload into place
		if(!move_uploaded_file($_FILES[$key]['tmp_name'], $uploadLocation)) {
			throw new Exception('Failed to move uploaded tmp file.');
		}

	} catch (Exception $e) {
		// Catch exceptions for garbage collection and error storage

		// Remove the temp file
		if($_FILES[$key] && is_uploaded_file($_FILES[$key]['tmp_name']))  {
			@unlink($_FILES[$key]['tmp_name']);
		}

		// Throw the exception again for developers to catch
		throw $e;
	}

	// Return the information about the new file using pathinfo
	$return = pathinfo($uploadLocation);
	$return['rawname'] = basename($_FILES[$key]['name']);
	return $return;
}

function toBytes($matches) {
	switch(strtolower($matches[2])) {
		case "k": return $matches[1] * 1024; break;
		case "m": return $matches[1] * 1048576; break;
		case "g": return $matches[1] * 1073741824; break;
	}
}


/**
 * PHP 5.2 has a new set of hooks for checking the progress of a file upload
 * with APC 3.5
 *
 * http://viewcvs.php.net/viewvc.cgi/pecl/apc/INSTALL?revision=3.53&view=markup
 * 
 * apc.rfc1867
 * RFC1867 File Upload Progress hook handler is only available
 * if you compiled APC against PHP 5.2.0 or later.  When enabled
 * any file uploads which includes a field called
 * APC_UPLOAD_PROGRESS before the file field in an upload form
 * will cause APC to automatically create an upload_
 * user cache entry where  is the value of the
 * APC_UPLOAD_PROGRESS form entry.
 * (Default: 0)
 * 
 */
function getStatusAPC($key) {
	
	$response = false;
	
	// will return false if not found
	if($status = apc_fetch('upload_'.$_GET['key'])) {
		/*
		status {
		"total":2676099,
		"current":102685,
		"filename":"test_large.jpg",
		"name":"test_file",
		"done":0
		}
		*/
		
		$response = array(
		'total' => $status['total'],
		'current' => $status['current'],
		'currentFileName' => $status['filename'],
		'currentFieldName' => $status['name'],
		'filesProcessed' => null,
		'error' => null,
		'done' => $status['done'],
		'debug'=>null
		);

		if($message = apc_fetch('upload_error_'.$_GET['key'])) {

			$response['error'] = $message;
			$response['debug'] = 'There was an error';

		} else if ($status['done']==1 && ($filesProcessed = apc_fetch('upload_finished_'.$_GET['key']))) {
			//wait until the last file processed matches the one in status
			$response['debug'] = 'Files were processed ';
			if(($last = array_pop(array_keys(((array)$filesProcessed)))) == $status['name']) {
				$response['filesProcessed'] = $filesProcessed;
				$response['debug'] .= ' - all';
			} else {
				// Override the done state because the upload 
				// has finished but the server is still processing
				// the files
				$response['done']= 0;
				$response['debug'] .= " - \"$last\" != \"{$status['name']}\"";
			}
		}

	}

	return $response;	
}

?>
