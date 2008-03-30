#!/usr/bin/perl -w

use strict;
use CGI;

my $file;
my $files = '';
my @files = <uploads/*.jpg>;
my $fileCount = @files;

my @parts;
my $justFile;
my $fileSize;
foreach $file (@files) {
	@parts = split(/\//, $file);
	$justFile = pop @parts;
	$fileSize = sprintf("%.0f", ((-s "$file") / 1024));
	
	$files .= "<li><a href=\"$file\">$justFile</a> <em>~ $fileSize kb</em></li>";	
}

# output the header
print "Content-type:text/html\n\n";

print <<XHTML;
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<title>Image Uploader with Progress (Perl)</title>
    <!-- Inclue some CSS style sheet to make 
    everything look a little nicer -->
    <link rel="stylesheet" type="text/css" 
        href="../../../shared/source.css" />
    <link rel="stylesheet" type="text/css" 
        href="../../chapter.css" />
    <link rel="stylesheet" type="text/css" href="style.css" />

    <!-- Your ADS library with the common JavaScript objects -->
    <script type="text/javascript" 
        src="../../../ADS-final-verbose.js"></script>

    <!-- Progress bar script -->
    <script type="text/javascript" src="uploader.js"></script>

    <!-- load script -->
    <script type="text/javascript" src="load.js"></script></head>
<body>
	<div id="content">
		<h1>Image Uploader with Progress (Perl)</h1>
		<form action="actions/" enctype="multipart/form-data" method="post" id="uploadForm">
			<h2>Upload an image</h2>
			<p>(only jpg files less than 100kb allowed)</p>
	
			<fieldset>
				<legend>Add New Files</legend>
				<div class="fileSelector">
					<label for="newFile1">File 1</label><input type="file" id="newFile1" name="newFile1" accept="image/jpeg,image/gif,image/png,image/tiff"/>
				</div>
				<div class="fileSelector">
					<label for="newFile2">File 2</label><input type="file" id="newFile2" name="newFile2" accept="image/jpeg,image/gif,image/png,image/tiff"/>
				</div>
				<div class="fileSelector">
					<label for="newFile3">File 3</label><input type="file" id="newFile3" name="newFile3" accept="image/jpeg,image/gif,image/png,image/tiff"/>
				</div>
				<input id="submitUpload" name="submitUpload" type="submit" value="Upload Files" />
			</fieldset>
		</form>
	
		<div id="browserPane">
			<h2><span id="fileCount">$fileCount</span> Existing Files</h2>
			<ul id="fileList">
				$files
			</ul>
		</div>
	</div>

<div id="where-from">
	From <a href="http://advanceddomscripting.com" title="AdvancED DOM Scripting">AdvancED DOM Scripting</a> 
	| <a href="http://www.amazon.com/exec/obidos/ASIN/1590598563/jeffreysamb05-20" title="Buy it on Amazon">Paperback</a>
</div>
</body>

</html>
XHTML

