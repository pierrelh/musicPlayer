<?php

    include_once($_SERVER['DOCUMENT_ROOT']."/functions/cloudinary/cloudinaryUpload.php");
    uploadMusic($_FILES["music"]["tmp_name"]);

?>