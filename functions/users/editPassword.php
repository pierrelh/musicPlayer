<?php

	include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
	$db = connect();

	$request = "UPDATE users
                SET user_password = $1
                WHERE user_session_id = $2";

	$result =  pg_query_params(
		$db,
		$request,
		array(
            $_POST['user_password'],
            $_COOKIE['SESSION_ID']
		)
	);

	if (is_resource($result)) {
		print "true";
	}else {
		print "false";
	}

?>
