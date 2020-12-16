<?php

	// Function to delete a cloudinary asset
	function deleteCloudinaryAsset($type, $fileName){
		$file = $type . "/" . $fileName;
		include_once($_SERVER['DOCUMENT_ROOT']."/functions/getCloudinary.php");
		$result = \Cloudinary\Uploader::destroy(
			$file, 
			array(
				"resource_type" => $type,
			)
		);
	}

	// Delete file audio
	deleteCloudinaryAsset("video", $_POST['file_url']);
	unset($_POST['file_url']);

	// Delete file cover
	if ($_POST['file_cover'] != "undefined") {
		deleteCloudinaryAsset("image", $_POST['file_cover']);
	}
	unset($_POST['file_cover']);

	// Deleting the db row
	include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
	$db = connect();
	$res = pg_delete($db, 'files', $_POST);
	print $res;

?>
