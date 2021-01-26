<?php

	include_once($_SERVER['DOCUMENT_ROOT']."/functions/filter.php");
	$filtered = array_map('map_entities', $_POST);

	include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
	$db = connect();
	$request = "INSERT INTO files (file_name, file_url, file_image, file_author, file_album)
				VALUES ($1, $2, $3, $4, $5)";
	$result = pg_query_params(
		$db,
		$request,
		array(
			$filtered['file_name'],
			$_POST['file_url'],
			$_POST['file_image'],
			$filtered['file_author'],
			$filtered['file_album']
		)
	);

?>
