<?php

  include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
  $db = connect();
  error_log("ids pre-treatment: " . print_r($_POST['musics']));
  $ids = array_map('intval', explode('#STOP#', $_POST['musics']));
  array_pop($ids);
  error_log("ids post-treatment: " . print_r($ids));
  $result = pg_query($db, "SELECT * FROM files WHERE file_id IN ($ids)");
  if (!empty($result)) {
    $val = pg_fetch_all($result);
    print json_encode($val);
  }

?>
