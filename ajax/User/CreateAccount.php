<?php

    require_once($_SERVER['DOCUMENT_ROOT'].'/class/User.php');
    print (new User())->CreateAccount($_POST['user_login'], $_POST['user_password']);

?>
