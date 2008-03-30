var request = false;
if(window.XMLHttpRequest) {
	var request = new window.XMLHttpRequest();
} else if (window.ActiveXObject) {
	var request = window.ActiveXObject('Microsoft.XMLHTTP');
}

if(request) {
	
	var boundary = '--ExampleBoundaryString';

	var requestBody = 
		boundary + '\n'
		+ 'Content-Disposition: form-data; name="exampleText"\n\n' 
		+ exampleText + '\n\n' 
		+ boundary + '\n'
		+ 'Content-Disposition: form-data; name="myfile"; filename="example.zip"\n' 
		+ 'Content-Type: application/octet-stream\n\n' 
		+ escape(BinaryContent) + '\n'
		+ boundary;
	
	request.open('POST', url, true);
	request.setRequestHeader('Content-Type', 
		'multipart/form-data; boundary="' 
		+ boundaryString 
		+ '"');
	request.setRequestHeader('Connection', 'close');
	request.setRequestHeader('Content-Length', requestBody.length);
	request.send(requestBody);
	
}