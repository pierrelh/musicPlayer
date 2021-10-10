<!DOCTYPE html>
<html id="html" lang="fr" dir="ltr">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Music Player</title>
		<script>
			// Setting globales variables
			const server = "https://" + window.location.hostname;
		</script>
		<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>
		<link rel="stylesheet" href="<?php echo $link ?>/styles/common/videoStyle.css?cachev=<?php echo $cacheVersion ?>">
		<link rel="stylesheet" href="<?php echo $link ?>/styles/screen/videoStyle.css?cachev=<?php echo $cacheVersion ?>">
		<link rel="stylesheet" href="<?php echo $link ?>/styles/handheld/videoStyle.css?cachev=<?php echo $cacheVersion ?>">
	</head>
	<body id="body">
		<?php
			include_once($_SERVER['DOCUMENT_ROOT']."/assets/headers/header.php");
			include_once($_SERVER['DOCUMENT_ROOT']."/assets/background.php");
			include_once($_SERVER['DOCUMENT_ROOT']."/assets/playlists.php");
			include_once($_SERVER['DOCUMENT_ROOT']."/assets/reader.php");
			include_once($_SERVER['DOCUMENT_ROOT']."/assets/reader-playlist.php");
			include_once($_SERVER['DOCUMENT_ROOT']."/assets/sidebar.php");
		?>
		<section class="library" id="Library"></section>
		<script type="text/javascript" src="<?php echo $link ?>/scripts/media-session.js?cachev=<?php echo $cacheVersion ?>"></script>
		<script type="text/javascript" src="<?php echo $link ?>/scripts/key-pressed.js?cachev=<?php echo $cacheVersion ?>"></script>
		<script type="text/javascript" src="<?php echo $link ?>/scripts/library.js?cachev=<?php echo $cacheVersion ?>"></script>
		<script type="text/javascript" src="<?php echo $link ?>/scripts/background.js?cachev=<?php echo $cacheVersion ?>"></script>
		<script type="text/javascript" src="<?php echo $link ?>/scripts/layouts.js?cachev=<?php echo $cacheVersion ?>"></script>
		<script type="text/javascript" src="<?php echo $link ?>/scripts/account.js?cachev=<?php echo $cacheVersion ?>"></script>
		<script type="text/javascript" src="<?php echo $link ?>/scripts/music.js?cachev=<?php echo $cacheVersion ?>"></script>
		<script type="text/javascript" src="<?php echo $link ?>/scripts/create-account.js?cachev=<?php echo $cacheVersion ?>"></script>
		<script type="text/javascript" src="<?php echo $link ?>/scripts/deleteFiles.js?cachev=<?php echo $cacheVersion ?>"></script>
		<script type="text/javascript" src="<?php echo $link ?>/scripts/editFiles.js?cachev=<?php echo $cacheVersion ?>"></script>
		<script type="text/javascript" src="<?php echo $link ?>/scripts/help.js?cachev=<?php echo $cacheVersion ?>"></script>
		<script type="text/javascript" src="<?php echo $link ?>/scripts/playlist.js?cachev=<?php echo $cacheVersion ?>"></script>
		<script type="text/javascript" src="<?php echo $link ?>/scripts/playlist-reader.js?cachev=<?php echo $cacheVersion ?>"></script>
		<script type="text/javascript" src="<?php echo $link ?>/scripts/uploadFile.js?cachev=<?php echo $cacheVersion ?>"></script>
		<script type="text/javascript" src="<?php echo $link ?>/scripts/reader.js?cachev=<?php echo $cacheVersion ?>"></script>
		<script type="text/javascript" src="<?php echo $link ?>/scripts/sidebar.js?cachev=<?php echo $cacheVersion ?>"></script>
	</body>
</html>
