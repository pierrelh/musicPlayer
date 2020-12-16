<?php
	$link = 'https://' . $_SERVER['HTTP_HOST'];
	$uri = $_SERVER['REQUEST_URI'];

	switch ($uri) {
		// Login page
		case '':
		case '/':
			if (isset($_POST['log_user'])) {
				if (!empty($_POST['login']) && !empty($_POST['password'])) {
					include_once($_SERVER['DOCUMENT_ROOT']."/functions/users/getUsers.php");
					userConnexion();
				}else {
					echo "<p>Veuillez remplir tous les champs.</p>";
				}
			}
			require __DIR__ . '/pages/login.php';
			break;

		// MusicPlayer page
		case '/music-player':
		case '/music-player/':
			include_once($_SERVER['DOCUMENT_ROOT']."/functions/users/checkUserIdentification.php");
			require __DIR__ . '/pages/music-player.php';
			break;
		
		default:
			require __DIR__ . '/pages/login.php';
			break;
	}

	
?>
