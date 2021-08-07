<?php

	include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
	$db = connect();
	$request = "SELECT user_session_id
				FROM users
				WHERE user_session_id = $1";
	$result = pg_query_params(
		$db,
		$request,
		array(
			$_COOKIE['SESSION_ID']
		)
	);
	$rows = pg_fetch_all($result);
	if (empty($rows)) {
		setcookie('SESSION_ID', null, -1, '/');
		echo "<script>window.location.assign('https://".$_SERVER['HTTP_HOST']."')</script>";
	}

?>
