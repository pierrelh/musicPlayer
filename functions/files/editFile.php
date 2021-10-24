<?php

	include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
	$db = connect();

	if (isset($_FILES['file_image']) && $_FILES['file_image'] != "undefined") {
		$files = $_FILES["file_image"];
		$files = is_array($files) ? $files : array( $files );

		// Uploading on overwriting the new cover
		include_once($_SERVER['DOCUMENT_ROOT']."/functions/cloudinary/cloudinaryUpload.php");
		$covers = json_decode($_POST['covers']);
		foreach ($covers as $directory => $path) {
			$size = str_replace("x", '', $directory);
			$key = 'file_cover_' . $size;
			$_POST[$key] = uploadCover($files["tmp_name"], $path, true, $directory, intval($size));
		}
	}else {
		unset($_POST['file_image']);
	}

	unset($_POST['covers']);

	// Updating the db
	$condition = array('file_id' => $_POST['file_id']);
	$res = pg_update($db, 'files', $_POST, $condition);

?>
