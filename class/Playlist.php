<?php

class Playlist {

    public function Create() {
        global $db;
        $request = 'INSERT INTO playlists (playlist_owner, playlist_name)
                    VALUES ($1, $2)
                    RETURNING playlist_id';
        
        $result =  pg_query_params(
            $db,
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

            $result = pg_query_params(
                $db,
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
        global $db;
        $request = 'SELECT *
                    FROM playlists
                    ORDER BY playlist_id';
        $result = pg_query($db, $request);
        if (!empty($result))
            return pg_fetch_all($result);
        return false;
    }

    public function getMusics() {
        global $db;
        $request = 'SELECT *
                    FROM playlists_musics
                    INNER JOIN files
                    ON playlists_musics.playlist_music_id = files.file_id
                    WHERE playlist_id = $1;';
        $result = pg_query_params(
            $db,
            $request,
            array(
                $_POST['playlist_id']
            )
        );
        if (!empty($result))
            return pg_fetch_all($result);
        return false;
    }
}

?>