<?php

	include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
	$db = connect();

	if (isset($_FILES['file_image']) && $_FILES['file_image'] != "undefined") {
		$files = $_FILES["file_image"];
		$files = is_array($files) ? $files : array( $files );

		// Uploading on overwriting the new cover
		include_once($_SERVER['DOCUMENT_ROOT']."/functions/cloudinary/cloudinaryUpload.php");
		error_log(print_r($_POST['covers'], true));
		$covers = json_encode($_POST['covers']);
		error_log(print_r($covers, true));
		// foreach ($covers as $directory => $path) {
		// 	$size = str_replace("x", '', $directory);
		// 	$key = 'file_cover_' . $size;
		// 	$_POST[$key] = uploadCover($files["tmp_name"], $path, true, $directory, intval($size));
		// }
	}

	unset($_POST['covers'],$_POST['file_image']);

	// Updating the db
	$condition = array('file_id' => $_POST['file_id']);
	$res = pg_update($db, 'files', $_POST, $condition);

?>
