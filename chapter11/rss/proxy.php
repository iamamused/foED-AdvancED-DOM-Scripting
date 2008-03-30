<?php
if(strpos(strtolower($_SERVER['HTTP_REFERER']),'http://advanceddomscripting.com') !== 0 ) {
    die('Not Allowed');
}
switch($_GET['do']) {
    case 'advanceddomscripting';
        $url = 'http://advanceddomscripting.com/rss';
        break;
    case 'jeffreysambells';
        $url = 'http://jeffreysambells.com/rss';
        break;
    default:
        die();
}

header('Content-type:application/xml');
echo simplexml_load_file($url)->asXML();
?>
