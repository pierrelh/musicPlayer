<?php

	include_once($_SERVER['DOCUMENT_ROOT']."/functions/cloudinary/getCloudinary.php");
	include_once($_SERVER['DOCUMENT_ROOT']."/functions/getWebPage.php");

	$response = getWebPage("https://$key:$secret@api.cloudinary.com/v1_1/$name/usage");
	
	print $response;

?>