<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
        "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <title>Recent Flickr Photos!</title>
</head>
<body>
<?php
    $url = 'http://www.flickr.com/services/feeds/photos_public.gne';
    foreach(simplexml_load_file($url)->entry as $item) {
        echo $item->content;
    }
?>
</html>
