<?php

  function uploadFile($file_path, $type){
    include_once($_SERVER['DOCUMENT_ROOT']."/functions/getCloudinary.php");
    $date = date_create();
    $name =  date_timestamp_get($date) . rand(1, 999999999);
    $result = \Cloudinary\Uploader::upload($file_path, array(
              "folder" => $type."/",
              "public_id" => $name,
              "resource_type" => $type
    ));
    unlink($file_path);
    return $result['secure_url'];
  }

  if (!empty($_FILES)) {
    $files = $_FILES["file"];
    $files = is_array($files) ? $files : array( $files );
    $fileName = uploadFile($files["tmp_name"], 'video');
  }else {
    $fileName = "false";
  }

  if (isset($_FILES['picture']) && !empty($_FILES['picture'])) {
    $img = $_FILES["picture"];
    $img = is_array($img) ? $img : array( $img );

    // include_once($_SERVER['DOCUMENT_ROOT']."/functions/compress.php");
    // $img = compress($img, $destination_img, 90);

    $imgName = uploadFile($img["tmp_name"], 'image');
    // $file_name = $_FILES['picture']['name'];
    // $file_tmp = $_FILES['picture']['tmp_name'];
    // $type = pathinfo($file_tmp, PATHINFO_EXTENSION);
    // $data = file_get_contents( $file_tmp );
    // $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
  }else {
    $imgName = "";
  }

  if (!isset($_POST['album']) || $_POST['album'] == "") {
    $_POST['album'] = "indéfini";
  }

  include_once($_SERVER['DOCUMENT_ROOT']."/functions/filter.php");
  $filtered = map_entities($_POST);

  $db = connect();
  $selectSql = "INSERT INTO files (file_name, file_url, file_image, file_author, file_album) VALUES ($1, $2, $3, $4, $5)";
  $result =  pg_query_params($db, $selectSql, array($filtered['name'], $fileName, $imgName, $filtered['author'], $filtered['album']));


?>
