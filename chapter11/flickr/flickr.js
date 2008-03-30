ADS.addEvent(window,'load',function() {

    var iconInput = ADS.$('icon');
    var preview = document.createElement('img');
    preview.alt = 'Icon preview';
    preview.src = iconInput.value;
    ADS.setStyle(preview,{
        width:'48px',
        height:'48px'
    });
    ADS.insertAfter(preview,iconInput);
    
    function updateInfo(data) {
        var username = ADS.$('username');
        if(data.username && !username.value) {
            username.value = data.username;
        }
        var icon = ADS.$('icon');
        if(data.icon && !iconInput.value) {
            iconInput.value = data.icon;
        }
        preview.src = iconInput.value;
    }
    
    ADS.addEvent(ADS.$('email'),'change',function(W3CEvent) {
        if(this.value) {
            ADS.ajaxRequest('proxy.php?do=getFlickrInfo&email=' + escape(this.value),{
                completeListener:function() {
                    eval('updateInfo(' + this.responseText + ')');
                    
                }
            });
        }       
    });
    
    ADS.addEvent(iconInput,'change',function() {
        preview.src = this.value;
    });
    
});
