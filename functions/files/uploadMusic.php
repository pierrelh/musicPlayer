<?php

    include_once($_SERVER['DOCUMENT_ROOT']."/functions/cloudinary/cloudinaryUpload.php");
    uploadMusic($_POST["music"]["tmp_name"]);

?>