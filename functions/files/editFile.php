<?php

	include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
	$db = connect();

	if (isset($_FILES['file_image']) && $_FILES['file_image'] != "undefined") {
		$files = $_FILES["file_image"];
		$files = is_array($files) ? $files : array( $files );

		// Uploading on overwriting the new cover
		include_once($_SERVER['DOCUMENT_ROOT']."/functions/setCloudinary.php");
		$result = \Cloudinary\Uploader::upload(
			$files["tmp_name"],
			array(
				"public_id" => $_POST["public_id"],
				"resource_type" => "auto",
				"folder" => "image",
				"overwrite" => true,
				"invalidate" => true
			)
		);

		// Getting the new url version
		$_POST['file_image'] = $result['secure_url'];
	}else {
		unset($_POST['file_image']);
	}

	unset($_POST['public_id']);

	// Updating the db
	$condition = array('file_id' => $_POST['file_id']);
	$res = pg_update($db, 'files', $_POST, $condition);

?>
