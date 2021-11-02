<?php
	
    require_once($_SERVER['DOCUMENT_ROOT'].'/class/Files.php');
    $files = new Files();
    print json_encode($files->GetAll());

?>
