<?php

    require_once($_SERVER['DOCUMENT_ROOT'].'/class/Files.php');
    print json_encode((new Files())->Delete($_POST['file_id'], $_POST['file_url'], json_decode($_POST['file_covers'])));

?>
