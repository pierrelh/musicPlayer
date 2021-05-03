<?php

	$link = 'https://' . $_SERVER['HTTP_HOST'];

	switch (isset($_COOKIE['SESSION_ID'])) {
		case false:
			require __DIR__ . '/pages/login.php';
			break;

		case true:
			include_once($_SERVER['DOCUMENT_ROOT']."/functions/users/checkUserIdentification.php");
			require __DIR__ . '/pages/music-player.php';
			break;
		
		default:
			require __DIR__ . '/pages/login.php';
			break;
	}
		
?>
