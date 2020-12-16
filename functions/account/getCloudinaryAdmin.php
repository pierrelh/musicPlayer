<?php
    include_once($_SERVER['DOCUMENT_ROOT']."/functions/getCloudinary.php");
    $result = $api->resources();
    var_dump($result->rate_limit_allowed);
    var_dump($result->rate_limit_remaining);
    var_dump($result->rate_limit_reset_at);
    var_dump($result);
?>