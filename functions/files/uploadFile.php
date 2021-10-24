<?php

	include_once($_SERVER['DOCUMENT_ROOT']."/functions/filter.php");
	$filtered = array_map('map_entities', $_POST);
	$covers = json_decode($_POST['file_covers']);

	include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
	$db = connect();
	$request = "INSERT INTO files (
					file_name,
					file_url,
					file_cover_96,
					file_cover_128,
					file_cover_192,
					file_cover_256,
					file_cover_384,
					file_cover_512,
					file_author,
					file_album
				)
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
	$result = pg_query_params(
		$db,
		$request,
		array(
			$filtered['file_name'],
			$_POST['file_url'],
			$covers->x96,
			$covers->x128,
			$covers->x192,
			$covers->x256,
			$covers->x384,
			$covers->x512,
			$filtered['file_author'],
			$filtered['file_album']
		)
	);

?>
