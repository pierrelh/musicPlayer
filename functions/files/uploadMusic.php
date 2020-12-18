<?php

    include_once($_SERVER['DOCUMENT_ROOT']."/functions/cloudinary/cloudinaryUpload.php");
    error_log( print_r($_FILES["music"], TRUE) );
    // uploadMusic($_FILES["music"]["tmp_name"]);

?>