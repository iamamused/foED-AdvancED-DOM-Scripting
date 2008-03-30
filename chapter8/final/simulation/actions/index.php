<?php

//check if the request is using the ADS.ajaxRequest() method.
if($_SERVER['HTTP_X_ADS_AJAX_REQUEST']) {
    
    // Send some headers to prevent caching of the progress request
    header('Expires: Fri, 13 Dec 1901 20:45:54 GMT') ;
    header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT') ;
    header('Cache-Control: no-store, no-cache, must-revalidate') ;
    header('Cache-Control: post-check=0, pre-check=0', false) ;
    header('Pragma: no-cache') ;
    
    // This will be a JavaScript JSON response
    header('Content-Type:application/json; charset=utf-8' ) ;
    
    $eachRequestBytes = 123; 

    // Simulate the progress for 20 requests.
    $total = $eachRequestBytes * 20;

    // Use the sim counter to determin how far along we are.
    $current = $_GET['sim'] * $eachRequestBytes;
    
    // Initialize the rest of the variables.
    $done = 0;
    $error = 0;
    $filesProcessed = array();
    $currentFileName = $currentFieldName = '';
    $debug = 'Simulation';
    // Modify the response based on teh simulation counter
    if ($_GET['sim'] < 4) {
        $currentFileName = 'simulation_file1.jpg - (Simulation Mode)';
        $currentFieldName = 'newFile1';
    } elseif ($_GET['sim'] < 15) {
        $currentFileName = 'simulation_file2.jpg - (Simulation Mode)';
        $currentFieldName = 'newFile2';
    } elseif ($_GET['sim'] < 20) {
        $currentFileName = 'simulation_file3.jpg - (Simulation Mode)';
        $currentFieldName = 'newFile3';
    } else {
        $filesProcessed = array(
            'newFile1'=>'simulation_file1.jpg',
            'newFile2'=>'simulation_file2.jpg',
            'newFile3'=>'simulation_file3.jpg'
        );    
        $done = 1;
    }
    
    // Compact the variables into an array 
    // and return a JSON encoded response
    $response = compact(
        'total',
        'current',
        'currentFileName',
        'currentFieldName',
        'filesProcessed',
        'error',
        'done',
        'debug'
    );
    echo json_encode($response);
    
} else {
    echo 'The simulation has no real action on upload.';
}

?>