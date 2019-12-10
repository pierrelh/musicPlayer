<?php

  include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
  $db = connect();
  $result = pg_query($db, "SELECT * FROM files ORDER BY file_name DESC");
  if (!empty($result)) {
    $val = pg_fetch_all($result);
    print $val;
  }

?>
