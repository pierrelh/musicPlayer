<!DOCTYPE html>
<html lang="fr" dir="ltr">
	<head>
		<meta charset="utf-8">
		<title>Music Player - Login</title>
	</head>
	<body>
		<?php
			include_once($_SERVER['DOCUMENT_ROOT']."/assets/headers/header-login.php");
		?>
		<form class="log-form" method="post">
			<label for="login">Login</label>
			<input id="login" type="email" name="login" value="">
			<br>
			<label for="password">Password</label>
			<input id="password" type="password" name="password" value="">
			<br>
			<input type="submit" name="log_user" value="Me Connecter">
		</form>
	</body>
</html>
