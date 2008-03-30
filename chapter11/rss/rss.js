ADS.addEvent(window,'load',function() {

    ADS.ajaxRequest('proxy.php?do=advanceddomscripting',{
        completeListener:function() {
            // only DOM2 Core methods will work - not DOM2 HTML
            var doc = this.responseXML;
            var posts = doc.getElementsByTagName('item');

            for(i=0; (post = posts[i]) ; i++) {
                var title = post.getElementsByTagName('title')[0];
                var description = post.getElementsByTagName('description')[0];
                var link = post.getElementsByTagName('link')[0];

                var li = document.createElement('li');

                if(title && title.firstChild) {
                    var h4 = document.createElement('h4');
                    if(link && link.firstChild) {
                        var a = document.createElement('a');
                        a.setAttribute('href',link.firstChild.nodeValue);
                        a.setAttribute('title','Read more about: ' + title.firstChild.nodeValue + '');
                        a.appendChild(title.firstChild)
                        h4.appendChild(a);
                    } else {
                        h4.appendChild(title.firstChild);
                    }
                    li.appendChild(h4)
                }
                if(description && description.firstChild) {
                    var p = document.createElement('p');
                    p.appendChild(description.firstChild);
                    li.appendChild(p)
                }

                document.getElementById('rss-feed').appendChild(li);

            }
        }
    });

});