<?php

function uploadCover($file_path, $overwrite){
    include_once($_SERVER['DOCUMENT_ROOT']."/functions/cloudinary/setCloudinary.php");
    $result = \Cloudinary\Uploader::upload(
        $file_path,
        array(
            "resource_type" => "auto",
            "folder" => "image",
            "overwrite" => $overwrite,
            "eager" => array(
                "width" => 150,
                "height"=> 150,
                "crop" => "scale" 
            ),
            "quality" => "auto"
        )
    );
    return $result['secure_url'];
}

function uploadMusic($file_path){
    include_once($_SERVER['DOCUMENT_ROOT']."/functions/cloudinary/setCloudinary.php");
    $result = \Cloudinary\Uploader::upload(
        $file_path,
        array(
            "resource_type" => "auto",
            "folder" => "video"
        )
    );
    return $result['secure_url'];
}

?>