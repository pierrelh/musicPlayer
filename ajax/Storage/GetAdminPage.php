<?php

    require_once($_SERVER['DOCUMENT_ROOT'].'/class/Storage.php');
    print (new Storage())->GetAdminPage();

?>