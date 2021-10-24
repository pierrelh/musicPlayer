<?php

	// Upload a cover to Cloudinary
	function uploadCover($filePath, $fileName, $overwrite, $directory, $size){
		if (!$overwrite) {
			include_once($_SERVER['DOCUMENT_ROOT']."/functions/createSlug.php");
			$fileName = createSlug($fileName);
		}

		include_once($_SERVER['DOCUMENT_ROOT']."/functions/cloudinary/setCloudinary.php");
		$result = \Cloudinary\Uploader::upload(
			$filePath,
			array(
				"public_id" => $fileName,
				"resource_type" => "auto",
				"folder" => 'image/'.$directory,
				"overwrite" => $overwrite,
				"width" => $size,
				"height"=> $size,
				"crop" => "scale",
				"quality" => "auto",
				"invalidate" => true
			)
		);
		return $result['secure_url'];
	}

	// Upload a music to Cloudinary
	function uploadMusic($filePath, $fileName){
		include_once($_SERVER['DOCUMENT_ROOT']."/functions/createSlug.php");
		$fileName = createSlug($fileName);

		include_once($_SERVER['DOCUMENT_ROOT']."/functions/cloudinary/setCloudinary.php");
		$result = \Cloudinary\Uploader::upload(
			$filePath,
			array(
				"public_id" => $fileName,
				"resource_type" => "auto",
				"folder" => "video",
				"overwrite" => false
			)
		);
		return $result['secure_url'];
	}

?>