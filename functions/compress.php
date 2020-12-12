<?php

	function compress($source, $quality) {

		$info = getimagesize($source);

	  	if ($info['mime'] == 'image/jpeg') {
			$image = imagecreatefromjpeg($source);
	  	}elseif ($info['mime'] == 'image/gif') {
			$image = imagecreatefromgif($source);
		}elseif ($info['mime'] == 'image/png') {
			$image = imagecreatefrompng($source);
		}
		imagejpeg($image, $source, $quality);
		return $source;
	}

?>
