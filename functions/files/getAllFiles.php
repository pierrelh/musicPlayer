<?php

  function getAllFiles(){
    include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
    $db = connect();
    $sqlRequest = "SELECT *
                   FROM files
                   ORDER BY file_name DESC";
    $result = pg_query($db, $sqlRequest);
    if (!empty($result)) {
      $val = pg_fetch_all($result);
      return $val;
    }
  }

?>
