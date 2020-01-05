<?php

  function ut8Decode($value){
    return html_entity_decode($value);
  }

  include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
  $db = connect();
  $row = $_POST['row'];
  $type = $_POST['type'];
  $result = pg_query($db, "SELECT * FROM files ORDER BY ".$row." ".$type);
  if (!empty($result)) {
    $val = pg_fetch_all($result);
    foreach ($val as $key => $value) {
      $value = array_map('ut8Decode', $value);
    }
    print json_encode($val);
  }

?>
