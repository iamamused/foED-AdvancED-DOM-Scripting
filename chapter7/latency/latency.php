<?
header("Cache-Control: no-cache, must-revalidate");
sleep( $time = (rand(0,6)/2) );
echo "$time";
die();
?>