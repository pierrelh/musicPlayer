<?php

    require_once($_SERVER['DOCUMENT_ROOT'].'/class/Playlist.php');
    print (new Playlist())->Create();

?>