<?php

    include_once($_SERVER['DOCUMENT_ROOT']."/functions/cloudinary/cloudinaryUpload.php");
    
    error_log("Upload Music");
    $music = $_FILES["music"]; 
    uploadMusic($music["tmp_name"], $music["name"]);

?>