<?php
	include_once($_SERVER['DOCUMENT_ROOT']."/vendor/cloudinary/cloudinary_php/autoload.php");
	include_once($_SERVER['DOCUMENT_ROOT']."/functions/cloudinary/getCloudinary.php");

	\Cloudinary::config(array(
		"cloud_name" => $name,
		"api_key" => $key,
		"api_secret" => $secret,
		"secure" => true
	));
?>
