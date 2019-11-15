<!DOCTYPE html>
<html lang="fr" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Media Player - Login</title>
    <?php
      $link = 'https://' . $_SERVER['HTTP_HOST'];
      include_once($_SERVER['DOCUMENT_ROOT']."/assets/header.php");
    ?>
    <link rel="stylesheet" href="<?php echo $link ?>/styles/loginStyle.css">
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
  </head>
  <body>
    <form class="" method="post">
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
