<?php

	include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
	$db = connect();
	$ids = array_map('intval', explode('#STOP#', $_POST['musics']));
	array_pop($ids);
	$ids = join("','", $ids);
	$sqlRequest = "SELECT *
				   FROM files
				   WHERE file_id IN ('$ids')";
	$result = pg_query($db, $sqlRequest);
	if (!empty($result)) {
		$val = pg_fetch_all($result);
		print json_encode($val);
	}

?>
