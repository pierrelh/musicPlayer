<?php

  include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
  include_once($_SERVER['DOCUMENT_ROOT']."/functions/filter.php");
  $filtered = array_map('map_entities', $_POST);

  $db = connect();
  $selectSql = "INSERT INTO playlist (playlist_owner, playlist_music) VALUES ($1, $2)";
  $result =  pg_query_params($db, $selectSql, array("noname", $filtered['musics']));

?>
