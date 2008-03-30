<?php
header('Content-type: text/javascript');

// Only allow number and letters and underscores in the callback
$callback = preg_replace('/[^A-Z0-9_]/i','', $_GET['XSS_HTTP_REQUEST_CALLBACK']);

echo "/* XSS request for callback: $callback */\n";

if($callback) {
	$date = date('r');
	echo 
<<<JSON
{$callback}({
   message:'response on {$date}'
});
JSON;

}
?>