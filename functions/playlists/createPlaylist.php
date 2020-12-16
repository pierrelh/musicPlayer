<?php

	include_once($_SERVER['DOCUMENT_ROOT']."/functions/connexion.php");
	$db = connect();

	// Create the playlist in the db
	$request = "INSERT INTO playlists (playlist_owner, playlist_name)
				VALUES ($1, $2)
				RETURNING playlist_id";
	
	$result =  pg_query_params(
		$db,
		$request,
		array(
			$_COOKIE["SESSION_ID"],
			$_POST['playlistName']
		)
	);

	$playlistId = pg_fetch_all($result);
	$playlistId = $playlistId[0];
	
	// Create each playlists_musics row in the db
	foreach ($_POST["musics"] as $value) {
		$request = "INSERT INTO playlists_musics (playlist_id, playlist_music_id)
					 VALUES ($1, $2)";

		$result =  pg_query_params(
			$db,
			$request,
			array(
				$playlistId["playlist_id"],
				$value
			)
		);
	}

?>