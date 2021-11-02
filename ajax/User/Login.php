<?php

    require_once($_SERVER['DOCUMENT_ROOT'].'/class/User.php');
    print (new User())->Login($_POST['login'], $_POST['password']);

?>
