<?php

	include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
	$db = connect();
	$request = "INSERT INTO users (user_login, user_password, user_session_id)
                VALUES ($1, $2, $3)";
    
    include_once($_SERVER['DOCUMENT_ROOT']."/functions/createSessionId.php");
	$result = pg_query_params(
		$db,
		$request,
		array(
			$_POST['user_login'],
			hash("sha256", $_POST['user_password']),
			createSessionId()
		)
	);

?>
