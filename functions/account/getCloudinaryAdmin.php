<?php

    include_once($_SERVER['DOCUMENT_ROOT']."/functions/getCloudinary.php");
    include_once($_SERVER['DOCUMENT_ROOT']."/functions/getWebPage.php");

    $response = getWebPage("https://$key:$secret@api.cloudinary.com/v1_1/$name/usage");
    
    $resArr = json_decode($response);
    $resArr = get_object_vars($resArr);
    print json_encode($resArr);

?>