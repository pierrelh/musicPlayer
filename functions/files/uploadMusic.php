<?php

    include_once($_SERVER['DOCUMENT_ROOT']."/functions/cloudinary/cloudinaryUpload.php");
    
    $music = $_FILES["music"]; 
    $url = uploadMusic($music["tmp_name"], $music["name"]);
    print $url;
    
?>