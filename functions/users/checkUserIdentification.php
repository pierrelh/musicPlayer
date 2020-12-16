<?php
  if(isset($_COOKIE['SESSION_ID'])){
    include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
    $db = connect();
    $selectSql = "SELECT user_session_id
                  FROM users
                  WHERE user_session_id = $1";
    $result =  pg_query_params($db, $selectSql, array($_COOKIE['SESSION_ID']));
    $rows = pg_fetch_all($result);
    if (!empty($rows)) {
      $row = $rows[0];
      setcookie('SESSION_ID', null, -1, '/');
      setcookie("SESSION_ID", $row['user_session_id'], time() + 3600, '/');
    }else {
      setcookie('SESSION_ID', null, -1, '/');
      echo "<script>window.location.assign('https://".$_SERVER['HTTP_HOST']."/login')</script>";
    }
  }else {
    setcookie('SESSION_ID', null, -1, '/');
    echo "<script>window.location.assign('https://".$_SERVER['HTTP_HOST']."/login')</script>";
  }

?>
