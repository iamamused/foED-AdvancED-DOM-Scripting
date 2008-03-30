<?php

switch($_GET['type']) {
	default:
	case 'html';
		header('Content-Type: text/html; charset=ISO-8859-4');
		echo '<div>Test</div>';
	break;
	default:
	case 'javascript';
		header('Content-Type: application/javascript; charset=ISO-8859-4');
		echo 'var test = "boo"; alert(test);';
	break;
	default:
	case 'json';
		header('Content-Type: application/json; charset=ISO-8859-4');
		echo '{test:true,"foo":"bar"}';
	break;
	default:
	case 'xhtml';
		header('Content-Type: application/xhtml+xml; charset=ISO-8859-4');
		echo '<div>Test</div>';
	break;
}

?>