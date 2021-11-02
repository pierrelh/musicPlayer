<?php

	class Playlist {

		public function __construct(){
			require_once($_SERVER['DOCUMENT_ROOT'] . '/class/Initiator.php');
		}

		public function Create($playlistName, $musics) {
			$request = 'INSERT INTO playlists (playlist_owner, playlist_name)
						VALUES ($1, $2)
						RETURNING playlist_id';
			$result = Initiator::SQL()->Request(
				$request,
				array(
					$_COOKIE['SESSION_ID'],
					$playlistName
				)
			);

			$playlistId = pg_fetch_all($result);
			$playlistId = $playlistId[0];
			
			foreach ($musics as $value) {
				$request = 'INSERT INTO playlists_musics (playlist_id, playlist_music_id)
							VALUES ($1, $2)';
				Initiator::SQL()->Request(
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
			$request = 'SELECT *
						FROM playlists
						ORDER BY playlist_id';
			$result = Initiator::SQL()->Request($request);
			if (!empty($result))
				return pg_fetch_all($result);
			return false;
		}

		public function getMusics($id) {
			$request = 'SELECT *
						FROM playlists_musics
						INNER JOIN files
						ON playlists_musics.playlist_music_id = files.file_id
						WHERE playlist_id = $1;';
			$result = Initiator::SQL()->Request($request, array($id));
			if (!empty($result))
				return pg_fetch_all($result);
			return false;
		}
	}

?>