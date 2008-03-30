<?
$request = substr($_SERVER['REDIRECT_URL'],strlen($_SERVER['PHP_SELF'])-9);

define('NUM_PER_PAGE',3);

//need to sanatize
preg_match("#page/([0-9]+)#",$request,$matches);
$page = (int)$matches[1];
preg_match("#photo/([0-9A-Za-z-]+)#",$request,$matches);
$requestedPhoto = $matches[1];


$photos = new DirectoryIterator('./photos');


$fileNames = $currentPageFiles = array();
$photos->rewind();
foreach($photos as $photo) {
	if(!$photo->isDot() && $photo->isFile()) {
		$numFiles++;
		$fileNames[] = $photo->getFilename();
	}
}

$numPages = ceil($numFiles/NUM_PER_PAGE);

if($requestedPhoto && in_array($requestedPhoto.'.jpg',$fileNames)) {
	$exif = exif_read_data('./photos/'.$requestedPhoto.'.jpg');
	$currentPhoto = $exif;
	$currentPhoto['webHref'] = '/source/chapter7/browser/photos/'.$requestedPhoto.'.jpg';
	$currentPage = ceil((array_search($requestedPhoto.'.jpg',$fileNames)+1)/NUM_PER_PAGE);
	$currentPageFiles = array_slice($fileNames,NUM_PER_PAGE*($currentPage-1),NUM_PER_PAGE);
} else {
	$start = (($page>0 && $page<=$numPages) ? ($page-1)*NUM_PER_PAGE : 0);
	$exif = exif_read_data('./photos/'.$fileNames[$start]);
	$currentPhoto = $exif;
	$currentPhoto['webHref'] = '/source/chapter7/browser/photos/'.$fileNames[$start];
	$currentPage = ($page>0 ? $page : 1);
	$currentPageFiles = array_slice($fileNames,$start,NUM_PER_PAGE);
}
//var_dump($_SERVER);
if($_SERVER['HTTP_X_ADS_AJAX_REQUEST'] == 'AjaxRequest') {
	header('Content-type: application/json');
	//$currentPageFiles =  "'".join("','",$currentPageFiles)."'";

	echo json_encode(array(
		'numPages' => $numPages,
		'currentPage' => $currentPage,
		'currentPageFiles' => $currentPageFiles,
		'currentPhoto' => array(
			'webHref' => $currentPhoto['webHref'],
			'file' => $currentPhoto['FileName'],
			'exposure' => $currentPhoto['ExposureTime'],
			'fStop' => $currentPhoto['FNumber'],
			'iso' => $currentPhoto['ISOSpeedRatings']
		)
	));

	die();
}

$pages = null;
for ($i=1 ; $i<=$numPages ; $i++) {
	$pages .= '<li><a href="/source/chapter7/browser/page/'.$i.'/" class="ajaxify">'.$i.'</a></li>';
}


$thumbnails = null;
$thumbCount = 0;
foreach ($fileNames as $i=>$file) {
	if(ceil(++$i/NUM_PER_PAGE) == $currentPage) {
		$thumbnails .= '<li id="photo'.(++$thumbCount).'"><a href="/source/chapter7/browser/photo/'.substr($file,0,strrpos($file,'.')).'" class="ajaxify"><img id="photo'.$i.'Thumb" src="/source/chapter7/browser/thumbs/'.$file.'" alt="Photo: '.$file.'"/></a></li>';
	}
}

for($i=($thumbCount+1) ; $i<=NUM_PER_PAGE ; $i++) {
		$thumbnails .= '<li id="photo'.$i.'" class="noFile"><a href="" class="ajaxify"><img id="photo'.$i.'Thumb" src="" alt="No Image"/></a></li>';
}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>A Photo Gallery</title>
	
	<link rel="stylesheet" title="Photo Gallery" type="text/css" href="/source/chapter7/browser/browser.css" media="screen">

	<script type="text/javascript" src="http://jeffreysambells.com/openprojects/JavaScript/JSLog.js"></script>
	<script type="text/javascript" src="/source/ADS-final-verbose.js"></script>
	<script type="text/javascript" src="/source/chapter7/browser/browser.js"></script>
	
</head>
<body>
	<h1>Photo Browser</h1>
	<div id="content">
		<ul id="pages">
			<?php echo $pages; ?>
		</ul>
		<div id="gallery">
			<ul id="list">
				<?php echo $thumbnails ?>
			</ul>
			<div id="preview">
				<div id="previewPhotoFrame"><img id="previewPhoto" src="<?php echo $currentPhoto['webHref'] ?>" alt="Photo: <?php echo $currentPhoto['FileName'] ?>"></div>
				<div id="photoInfo">
				<dl>
					<dt>File Name</dt>
					<dd id="photoFile"><?php echo $currentPhoto['FileName'] ?></dd>
					<dt>Exposure Time</dt>
					<dd id="photoExposure"><?php echo $currentPhoto['ExposureTime'] ?></dd>
					<dt>F-Stop</dt>
					<dd id="photoFStop"><?php echo $currentPhoto['FNumber'] ?></dd>
					<dt>ISO Speed Ratings</dt>
					<dd id="photoISO"><?php echo $currentPhoto['ISOSpeedRatings'] ?></dd>
				</dl>
				</div>
			</div>
		</div>
	</div>

<div id="where-from">
	From <a href="http://advanceddomscripting.com" title="AdvancED DOM Scripting">AdvancED DOM Scripting</a> 
	| <a href="http://www.amazon.com/exec/obidos/ASIN/1590598563/jeffreysamb05-20" title="Buy it on Amazon">Paperback</a>
</div>
</body>

</html>