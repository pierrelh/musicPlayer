<?php

	include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
	function userConnexion(){
		$db = connect();
		$selectSql = "SELECT user_session_id
					  FROM users
					  WHERE user_login = $1 AND user_password = $2";
		$result =  pg_query_params(
			$db,
			$selectSql,
			array(
				$_POST['login'],
				hash("sha256", $_POST['password'])
			)
		);
		$rows = pg_fetch_all($result);
		if (empty($rows)) {
		 	print "false";
		}else {
		  	$row = $rows[0];
		  	$arr_cookie_options = array (
				'expires' => time() + 60*60*24*30,
				'path' => '/',
				'samesite' => 'Strict' // None || Lax  || Strict
			);
			setcookie("SESSION_ID", $row['user_session_id'], $arr_cookie_options);
		  	print "true";
		}
	}

?>
