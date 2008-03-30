<?php

//http://advanceddomscripting.seework.com/projects/914912/todos/list/1739529

function makeRequest($url,$data=null) {
    $url = 'http://advanceddomscripting.seework.com'.$url;
    $authent = 'username:password';

    if($data) {
        $data = ' -d '.escapeshellarg($data);
    }

    $command = "curl -H 'Accept: application/xml' -H 'Content-Type: application/xml' -u {$authent} $data $url";
    $output;

    exec(
        $command,
        $output
    );

    if($output) {
        $xml = new SimpleXMLElement(join($output));
        return $xml;
    }

    return false;
}

switch ($_GET['do']) {

    case 'create' :
        if(!$_GET['todo']) die('');
        $request = <<<REQUEST
<request>
  <content>{$_GET['todo']}</content>
<request>
REQUEST;


    if(($xml = makeRequest('/todos/create_item/1739529',$request))!==false) {
        echo json_encode($xml);
    } else {
        echo 'false';
    }

    break;
case 'list':

    if(($xml = makeRequest('/todos/list/1739529'))!==false) {
        echo json_encode($xml);
    } else {
        echo 'false';
    }
    break;

}


?>
