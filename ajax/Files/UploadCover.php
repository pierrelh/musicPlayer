<?php

    require_once($_SERVER['DOCUMENT_ROOT'].'/class/Files.php');
    print json_encode((new Files())->UploadCover());

?>