<?php

    function uploadCover($filePath, $fileName, $overwrite){
        include_once($_SERVER['DOCUMENT_ROOT']."/functions/createSlug.php");
        $fileName = createSlug($fileName);

        include_once($_SERVER['DOCUMENT_ROOT']."/functions/cloudinary/setCloudinary.php");
        $result = \Cloudinary\Uploader::upload(
            $filePath,
            array(
                "resource_type" => "auto",
                "folder" => "image",
                "overwrite" => $overwrite,
                "width" => 150,
                "height"=> 150,
                "crop" => "scale",
                "quality" => "auto"
            )
        );
        return $result['secure_url'];
    }

    function uploadMusic($filePath, $fileName){
        include_once($_SERVER['DOCUMENT_ROOT']."/functions/createSlug.php");
        $fileName = createSlug($fileName);

        include_once($_SERVER['DOCUMENT_ROOT']."/functions/cloudinary/setCloudinary.php");
        $result = \Cloudinary\Uploader::upload(
            $filePath,
            array(
                "public_id" => $fileName,
                "resource_type" => "auto",
                "folder" => "video",
                "overwrite" => false
            )
        );
        return $result['secure_url'];
    }

?>