<?php

    require_once($_SERVER['DOCUMENT_ROOT'].'/class/Files.php');
    print (new Files())->Edit($_FILES['file_image'], json_decode($_POST['covers']));

?>
