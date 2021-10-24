<?php

	include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
	$db = connect();

	if (isset($_FILES['file_image']) && $_FILES['file_image'] != "undefined") {
		$files = $_FILES["file_image"];
		$files = is_array($files) ? $files : array( $files );

		// Uploading on overwriting the new cover
		include_once($_SERVER['DOCUMENT_ROOT']."/functions/cloudinary/cloudinaryUpload.php");
		$coverSizes = [
			'x96'=> 96,
			'x128'=> 128,
			'x192'=> 192,
			'x256'=> 256,
			'x384'=> 384,
			'x512'=> 512
		];
		foreach ($coverSizes as $directory => $size) {
			$url = uploadCover($files["tmp_name"], $_POST['public_id'], true, $directory, $size);
		}
    
		// Getting the new url version
		$_POST['file_image'] = $url;
	}else {
		unset($_POST['file_image']);
	}

	unset($_POST['public_id']);

	// Updating the db
	$condition = array('file_id' => $_POST['file_id']);
	$res = pg_update($db, 'files', $_POST, $condition);

?>
