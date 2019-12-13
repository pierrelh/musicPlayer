<?php

  function deleteCloudinaryAsset($type, $name){
    include_once($_SERVER['DOCUMENT_ROOT']."/functions/getCloudinary.php");
    $result = \Cloudinary\Uploader::destroy('1576178558327991196', array(
              "resource_type" => $type,
    ));
    error_log(print_r($result, TRUE));
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
        $type = "image";
        $fileName = $type . "/" . $name[0];
        deleteCloudinaryAsset($type, $fileName);
      }else {
        $type = "video";
      }
      // $fileName = $type . '/' . $name[0];
      // deleteCloudinaryAsset($type, $fileName);
    }

    // $res = pg_delete($db, 'files', $_POST);
    // print $res;
  }else {
    print 'false';
  }

?>
