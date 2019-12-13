<?php

  function deleteCloudinaryAsset($type, $name){
    error_log('Type: ' . $type);
    error_log('Name: ' . $name);
    include_once($_SERVER['DOCUMENT_ROOT']."/functions/getCloudinary.php");
    $result = \Cloudinary\Uploader::destroy($name, array(
              "resource_type" => $type,
    ));
    error_log('Result: ' . $result);
  }

  include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
  $db = connect();
  $result = pg_query($db, "SELECT * FROM files WHERE file_id= " .$_POST['file_id']);
  if (!empty($result)) {
    $val = pg_fetch_all($result);
    $val = $val[0];
    $filesToDelete = [$val['file_image'], $val['file_url']];
    foreach ($filesToDelete as $value) {
      $name = explode("/", $value);
      $name = array_pop($name);
      $name = explode(".", $name);
      if ($value == $val['file_image']) {
        $type = 'image';
        $name = $type . '/' . $name[0];
        deleteCloudinaryAsset($type, $name);
      }else {
        $type = 'video';
      }
      // $name = $type . '/' . $name[0];
      // deleteCloudinaryAsset($type, $name);
    }

    // $res = pg_delete($db, 'files', $_POST);
    // print $res;
  }else {
    print 'false';
  }

?>
