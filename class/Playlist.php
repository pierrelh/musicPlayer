<?php

class Playlist {

	public function Create() {
		global $SQL;
		$request = 'INSERT INTO playlists (playlist_owner, playlist_name)
					VALUES ($1, $2)
					RETURNING playlist_id';
		$result = $SQL->Request(
			$request,
			array(
				$_COOKIE['SESSION_ID'],
				$_POST['playlistName']
			)
		);

		$playlistId = pg_fetch_all($result);
		$playlistId = $playlistId[0];
		
		foreach ($_POST['musics'] as $value) {
			$request = 'INSERT INTO playlists_musics (playlist_id, playlist_music_id)
						VALUES ($1, $2)';
			$SQL->Request(
				$request,
				array(
					$playlistId['playlist_id'],
					$value
				)
			);
		}
		return false;
	}

	public function GetAll() {
		global $SQL;
		$request = 'SELECT *
					FROM playlists
					ORDER BY playlist_id';
		if (!empty($SQL->Request($request)))
			return pg_fetch_all($result);
		return false;
	}

	public function getMusics() {
		global $SQL;
		$request = 'SELECT *
					FROM playlists_musics
					INNER JOIN files
					ON playlists_musics.playlist_music_id = files.file_id
					WHERE playlist_id = $1;';
					
		if (!empty($SQL->Request($request, array($_POST['playlist_id']))))
			return pg_fetch_all($result);
		return false;
	}
}

?>