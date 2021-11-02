<?php

    require_once($_SERVER['DOCUMENT_ROOT'].'/class/Playlist.php');
    print json_encode((new Playlist())->GetMusics());

?>
