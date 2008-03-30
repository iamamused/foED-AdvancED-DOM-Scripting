<?php
$apiKey = 'YOUR API KEY HERE';

switch ($_GET['do']) {

    case 'getFlickrInfo' :
        if(!$_GET['email']) die('');
        $email = urlencode($_GET['email']);
        if(!$xml1 = simplexml_load_file("http://api.flickr.com/services/rest/?method=flickr.people.findByEmail&api_key={$apiKey}&find_email={$email}")) die('false');
/*
<rsp stat="ok">
    <user id="24149889@N00" nsid="24149889@N00">
    <username>Jeffrey Sambells</username>
</user>
</rsp>
*/
        $nsid = $xml1->user[0]['nsid'];

        if(!$xml2 = simplexml_load_file("http://api.flickr.com/services/rest/?method=flickr.people.getInfo&api_key={$apiKey}&user_id={$nsid}")) die('false');
            
/*
<rsp stat="ok">
    <person id="24149889@N00" nsid="24149889@N00" isadmin="0" ispro="0" iconserver="0" iconfarm="0">
        <username>Jeffrey Sambells</username>
        <realname/>
            <mbox_sha1sum>48185cbcf809b112eb63690fb552ea5716b865b2</mbox_sha1sum>
            <location/>
            <photosurl>http://www.flickr.com/photos/24149889@N00/</photosurl>
            <profileurl>http://www.flickr.com/people/24149889@N00/</profileurl>
            <mobileurl>
                http://www.flickr.com/mob/photostream.gne?id=7084143
            </mobileurl>
            <photos>
                <firstdatetaken/>
                <firstdate/>
                <count>0</count>
            </photos>
    </person>
</rsp>
*/

        if( $xml2->person['iconserver'] > 0) {
            $icon = "http://static.flickr.com/{$xml2->person['iconserver']}/buddyicons/{$nsid}.jpg";
        } else {
            $icon='';
        }

            //escape?
            echo <<<JSON
{
    'username':'{$xml1->user->username}',
    'icon':'{$icon}'
}
JSON;
    

    break;
}


?>
