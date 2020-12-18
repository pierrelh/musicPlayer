<?php

    include_once($_SERVER['DOCUMENT_ROOT']."/functions/cloudinary/cloudinaryUpload.php");
    
    $cover = $_FILES["cover"]; 
    $url = uploadCover($cover["tmp_name"], $cover["name"], false);
    print $url;

?>