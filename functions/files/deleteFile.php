<?php

  include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
  $db = connect();
  $result = pg_query($db, "SELECT * FROM files WHERE file_id= " .$_POST['id']);
  if (!empty($result)) {
    $val = pg_fetch_all($result);
    error_log($val);
  }

?>
