<?php

	function GetFileNameFormUrl($url) {
		$url = explode('/', $url);
		$filename = array_pop($url);
		$filename = explode('.', $filename);
		return $filename[0];
	}

	// Function to delete a cloudinary asset
	function deleteCloudinaryAsset($type, $fileName){
		$file = $type . "/" . $fileName;
		include_once($_SERVER['DOCUMENT_ROOT']."/functions/cloudinary/setCloudinary.php");
		$result = \Cloudinary\Uploader::destroy(
			$file, 
			array(
				"resource_type" => $type,
			)
		);
	}

	// Delete file audio
	deleteCloudinaryAsset('video', $_POST['file_url']);
	unset($_POST['file_url']);

	$covers = json_decode($_POST['file_covers']);
	foreach ($covers as $key => $value) {
		deleteCloudinaryAsset('image', GetFileNameFormUrl($value));
	}
	unset($_POST['file_covers']);

	// Deleting the db row
	include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
	$db = connect();
	$res = pg_delete($db, 'files', $_POST);
	print $res;

?>
