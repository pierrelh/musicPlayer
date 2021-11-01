<?php
error_log(print_r($GLOBALS,true) );
    print json_encode($GLOBALS['Content']::GetAll());

?>
