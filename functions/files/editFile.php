<?php

  include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
  $db = connect();

  if (isset($_FILES['file_image']) && $_FILES['file_image'] != "undefined") {
    $selectSql = "SELECT file_image FROM files WHERE file_image='".$_POST['file_image']."'";
    $result =  pg_query($db, $selectSql);
    $val = pg_fetch_all($result);
    foreach ($val as $key => $value) {
      $link = ($value['file_image']);
    }
    include_once($_SERVER['DOCUMENT_ROOT']."/functions/getCloudinary.php");
    $fullName = explode("/", $link);
    $fullName = array_pop($fullName);
    $fullName = explode(".", $fullName);

    $files = $_FILES["file_image"];
    $files = is_array($files) ? $files : array( $files );

    $result = \Cloudinary\Uploader::upload($files["tmp_name"], array(
            "public_id" => $fullName[0],
            "resource_type" => "auto",
            "folder" => "image",
            "chunk_size" => 5000000
    ));
    $_POST['file_image'] = $result['secure_url'];
  }else {
    unset($_POST['file_image']);
  }
  $condition = array('file_id' => $_POST['file_id']);
  $res = pg_update($db, 'files', $_POST, $condition);

?>
