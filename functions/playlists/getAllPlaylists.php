<?php

	include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
	$db = connect();
	$sqlRequest = "SELECT *
				   FROM playlists
				   ORDER BY playlist_id";
	$result = pg_query($db, $sqlRequest);
	if (!empty($result)) {
		$val = pg_fetch_all($result);
		print json_encode($val);
	}

?>
