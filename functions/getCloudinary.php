<?php
	include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
	$db = connect();

	$selectSql = "SELECT * 
				  FROM cloudinary_api
				  WHERE key_id='1'";

	$result =  pg_query($db, $selectSql);
	$val = pg_fetch_all($result);
	
	foreach ($val as $key => $value) {
		$name = $value['cloud_name'];
		$key = $value['api_key'];
		$secret = $value['api_secret'];
	}

?>
