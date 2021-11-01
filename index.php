<?php

	$rootURL = 'https://' . $_SERVER['HTTP_HOST'];
	$cacheVersion = "20211023-2";
	require_once($_SERVER['DOCUMENT_ROOT'] . '/class/SQL.php');
	define('SQL', new SQL());
	require_once($_SERVER['DOCUMENT_ROOT'] . '/class/User.php');
	$GLOBALS['User'] = new User();

	switch (isset($_COOKIE['SESSION_ID'])) {
		case true:
			$GLOBALS['User']->CheckIdentification();
			require_once($_SERVER['DOCUMENT_ROOT'].'/class/Files.php');
			require_once($_SERVER['DOCUMENT_ROOT'].'/class/Storage.php');
			require_once($_SERVER['DOCUMENT_ROOT'].'/class/Playlist.php');
			require_once(__DIR__ . '/pages/music-player.php');
			break;
		
		case false:
		default:
			require_once(__DIR__ . '/pages/login.php');
			break;
	}
		
?>
