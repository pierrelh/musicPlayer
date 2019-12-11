<?php

  include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
  $db = connect();
  $row = $_POST['row']
  $result = pg_query($db, "SELECT * FROM files ORDER BY ".$row." DESC");
  if (!empty($result)) {
    $val = pg_fetch_all($result);
    print json_encode($val);
  }

?>
