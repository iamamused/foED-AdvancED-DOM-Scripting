<?php

if(strpos($_GET['message'],'queue2') !== false) {
	sleep(5);
	echo 'snooze '.$_GET['message'];
} else {
	echo $_GET['message'];
}

?>