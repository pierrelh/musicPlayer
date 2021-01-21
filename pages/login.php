<?php

	if (isset($_POST['log_user'])) {
		if (!empty($_POST['login']) && !empty($_POST['password'])) {
			include_once($_SERVER['DOCUMENT_ROOT']."/functions/users/getUsers.php");
			userConnexion();
		}else {
			echo "<p>Veuillez remplir tous les champs.</p>";
		}
	}

?>
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
			<ul class="form-list">
				<li>
					<div class="fields">
						<label for="login">Login</label>
						<input id="login" type="email" name="login" value="">
					</div>
				</li>
				<li>
					<div class="fields">
						<label for="password">Password</label>
						<input id="password" type="password" name="password" value="">
					</div>
				</li>
			</ul>
			<input class="send-form" type="submit" name="log_user" value="Me Connecter">
		</form>
	</body>
</html>
