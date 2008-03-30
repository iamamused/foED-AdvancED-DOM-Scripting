function isPostalCode(s) {
    return s.toUpperCase().match( /[A-Z][0-9][A-Z]\s*[0-9][A-Z][0-9]/i );
}

ADS.addEvent(window,'load',function() {

    ADS.addEvent(
        document.getElementById('canadianAddress'),
        'submit',
        function(W3CEvent) {

            var postalCode = document.getElementById('postalCode').value;

            // check if it's valid using a regular expression
            if (!isPostalCode(postalCode)) {
                alert('That\'s not a valid Canadian postal code!');
                
                // This will also cancel the submit action using the
                // ADS.preventDefalt() method discussed later in the chapter
                ADS.preventDefault(W3CEvent);
            }
        }
    );

});


ADS.addEvent(window,'load',function() {
    // Initially style it
    var postalCode = document.getElementById('postalCode');
    postalCode.className = 'inputMissing';

    // When in focus change the class to editing
    ADS.addEvent(postalCode,'focus',function(W3CEvent) {
        //change the class to indicat the user is editing the field
        this.className = 'inputEditing';
    });
    
    // When blurred verify and restyle depending on the value
    ADS.addEvent(postalCode,'blur',function(W3CEvent) {
        if(this.value == '') {
            // Change the class to indicate the content is missing
            this.className = 'inputMissing';
        } else if(!isPostalCode(this.value)) {
            // Change the class to indicate the content is invalid
            this.className = 'inputInvalid';        
        } else {
            // Change the class to indicate the content is complete
            this.className = 'inputComplete';
        }
        
    });

});


ADS.addEvent(window,'load',function() {
    var postalCode = ADS.$('postalCode');

    ADS.addEvent(postalCode,'change',function(W3CEvent) {

        var newPostalCode = this.value

        if(!isPostalCode(newPostalCode)) return;
        
        var req = new XMLHttpRequest();
        req.open('POST', 'server.js?postalCode=' + newPostalCode, true);
        req.onreadystatechange = function() {
            if (req.readyState == 4) {
                eval(req.responseText);
                
                if(ADS.$('street').value == '') {
                    ADS.$('street').value = street;
                }
                if(ADS.$('city').value == '') {
                    ADS.$('city').value = city;     
                }
                if(ADS.$('province').value == '') {
                    ADS.$('province').value = province;     
                }
            }
        }
        req.send();

    });
});
