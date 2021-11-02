<?php

    require_once($_SERVER['DOCUMENT_ROOT'].'/class/User.php');
    print (new User())->EditPassword($_POST['user_password']);

?>
