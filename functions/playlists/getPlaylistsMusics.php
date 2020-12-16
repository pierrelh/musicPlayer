<?php

	include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
	$db = connect();
	$request = "SELECT *
                FROM playlists_musics
                INNER JOIN files
                ON playlists_musics.playlist_music_id = files.file_id
                WHERE playlist_id = $1;";
    $result = pg_query_params(
        $db,
        $request,
        array(
            $_POST["playlist_id"]
        )
    );
	if (!empty($result)) {
		$val = pg_fetch_all($result);
		print json_encode($val);
	}

?>
