<?php

    include_once($_SERVER['DOCUMENT_ROOT']."/functions/getCloudinary.php");
    include_once($_SERVER['DOCUMENT_ROOT']."/functions/getWebPage.php");

    $response = getWebPage("https://$key:$secret@api.cloudinary.com/v1_1/$name/usage");
    
    print $response;
    // $result = json_decode($response);
    // $result = get_object_vars($result);
    

?>