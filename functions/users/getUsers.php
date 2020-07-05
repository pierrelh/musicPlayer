<?php

  include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
  function userConnexion(){
    $db = connect();
    $selectSql = "SELECT *
                  FROM users
                  WHERE user_login = $1 AND user_password = $2";
    $result =  pg_query_params($db, $selectSql, array($_POST['login'], hash("sha256", $_POST['password'])));
    $row = pg_fetch_result($result, 0, 0);
    if ($row === false) {
      echo "<p class='error-msg'>Ce compte n'a pas été trouvé.</p>";
    }else {
      setcookie("SESSION_ID", $row, time()+3600);
      echo "<script type='text/javascript'>window.location.assign('./pages/');</script>";
    }
  }

?>
