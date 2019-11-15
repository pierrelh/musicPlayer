<?php

  function uploadFile($file_path){
    include_once($_SERVER['DOCUMENT_ROOT']."/functions/getCloudinary.php");
    $date = date_create();
    $name =  date_timestamp_get($date) . rand(1, 999999999);
    $result = \Cloudinary\Uploader::upload($file_path, array(
              "public_id" => $name,
              "resource_type" => "video"
    ));
    unlink($file_path);
    return $result['secure_url'];
  }

  if (!empty($_FILES)) {
    $files = $_FILES["file"];
    $files = is_array($files) ? $files : array( $files );
    error_log("tmp_name: " . $files["tmp_name"]);
    $fileName = uploadFile($files["tmp_name"]);
  }else {
    $fileName = "false";
  }
  if (isset($_FILES['picture']) && !empty($_FILES['picture'])) {
    $file_name = $_FILES['picture']['name'];
    $file_tmp = $_FILES['picture']['tmp_name'];
    $type = pathinfo($file_tmp, PATHINFO_EXTENSION);
    $data = file_get_contents( $file_tmp );
    $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
  }else {
    $base64 = "";
  }


  $db = connect();
  $selectSql = "INSERT INTO files (file_name, file_url, file_image) VALUES ($1, $2, $3)";
  $result =  pg_query_params($db, $selectSql, array($_POST['name'], $fileName, $base64));


?>
