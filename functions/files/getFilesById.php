<?php

  include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
  $db = connect();
  $ids = json_decode('[' . $_POST['ids'] . ']', true);
  array_pop($ids);
  error_log("ids: ". $ids);
  $result = pg_query($db, "SELECT * FROM files WHERE file_id IN ($ids)");
  if (!empty($result)) {
    $val = pg_fetch_all($result);
    print json_encode($val);
  }

?>
