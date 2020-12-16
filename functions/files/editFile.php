<?php

	include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
	$db = connect();

	if (isset($_FILES['file_image']) && $_FILES['file_image'] != "undefined") {
		// $selectSql = "SELECT file_image
		// 			  FROM files
		// 			  WHERE file_id ='".$_POST['file_id']."'";
		// $result =  pg_query($db, $selectSql);
		// $val = pg_fetch_all($result);
		// foreach ($val as $key => $value) {
		// 	$link = ($value['file_image']);
		// }
		// $fullName = explode("/", $link);
		// $fullName = array_pop($fullName);
		// $fullName = explode(".", $fullName);

		$files = $_FILES["file_image"];
		$files = is_array($files) ? $files : array( $files );

		include_once($_SERVER['DOCUMENT_ROOT']."/functions/getCloudinary.php");
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
		$_POST['file_image'] = $result['secure_url'];
	}else {
		unset($_POST['file_image']);
	}
	
	unset($_POST['public_id']);
	$condition = array('file_id' => $_POST['file_id']);
	$res = pg_update($db, 'files', $_POST, $condition);

?>
