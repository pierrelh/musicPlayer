<?php

	include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
	$db = connect();
	$row = $_POST['row'];
	$type = $_POST['type'];

	$request = "SELECT *
				FROM files
				ORDER BY " . $row . " " . $type;

	$result = pg_query($db, $request);
	if (!empty($result)) {
		$val = pg_fetch_all($result);
		print json_encode($val);
	}

?>
