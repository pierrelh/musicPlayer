<?php

  include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
  $db = connect();
  $result = pg_query($db, "SELECT * FROM playlists ORDER BY playlist_id");
  if (!empty($result)) {
    $val = pg_fetch_all($result);
    print json_encode($val);
  }

?>
