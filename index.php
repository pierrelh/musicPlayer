<?php

	$rootURL = 'https://' . $_SERVER['HTTP_HOST'];
	$cacheVersion = "20211103-1";
	require_once($_SERVER['DOCUMENT_ROOT'] . '/class/User.php');
	$user = new User();

	switch (isset($_COOKIE['SESSION_ID'])) {
		case true:
			$user->CheckIdentification();
			require_once(__DIR__ . '/pages/music-player.php');
			break;
		
		case false:
		default:
			require_once(__DIR__ . '/pages/login.php');
			break;
	}
		
?>
