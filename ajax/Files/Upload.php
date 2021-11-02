<?php

    require_once($_SERVER['DOCUMENT_ROOT'].'/class/Files.php');
    print (new Files())->Upload($_POST['file_name'], $_POST['file_url'], $_POST['file_author'], $_POST['file_album'], json_decode($_POST['file_covers']));

?>
