<?php
global $Content, $SQL;
error_log(print_r($SQL,true) );
    print json_encode($Content::GetAll());

?>
