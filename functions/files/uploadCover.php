<?php

	include_once($_SERVER['DOCUMENT_ROOT']."/functions/cloudinary/cloudinaryUpload.php");
	$coverSizes = [
		'x96'=> 96,
		'x128'=> 128,
		'x192'=> 192,
		'x256'=> 256,
		'x384'=> 384,
		'x512'=> 512
	];
	$cover = $_FILES["cover"];
	foreach ($coverSizes as $directory => $size) {
		$url = uploadCover($cover["tmp_name"], $cover["name"], false, $directory, $size);
	}
	print $url;

?>