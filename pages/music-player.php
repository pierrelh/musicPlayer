<!DOCTYPE html>
<html id="html" lang="fr" dir="ltr">
	<head>
		<meta charset="utf-8">
		<title>Music Player</title>
		<script>
			// Setting globales variables
			var playlist = [];
			var randomPlaylist = [];
			var server = "https://" + window.location.hostname;
		</script>
		<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>
		<script type="text/javascript" src="<?php echo $link ?>/js/media-session.js"></script>
		<script type="text/javascript" src="<?php echo $link ?>/js/getFiles.js"></script>
		<script type="text/javascript" src="<?php echo $link ?>/js/functions.js"></script>
		<script type="text/javascript" src="<?php echo $link ?>/js/key-pressed.js"></script>
		<link rel="stylesheet" href="<?php echo $link ?>/styles/common/videoStyle.css">
		<link rel="stylesheet" href="<?php echo $link ?>/styles/screen/videoStyle.css">
		<link rel="stylesheet" href="<?php echo $link ?>/styles/handheld/videoStyle.css">
	</head>
	<body id="body">
		<?php
			include_once($_SERVER['DOCUMENT_ROOT']."/assets/headers/header.php");
			include_once($_SERVER['DOCUMENT_ROOT']."/assets/background.php");
			include_once($_SERVER['DOCUMENT_ROOT']."/assets/playlists.php");
			include_once($_SERVER['DOCUMENT_ROOT']."/assets/reader.php");
			include_once($_SERVER['DOCUMENT_ROOT']."/assets/sidebar.php");
		?>
		<section id="Library" class="library-show">
			<div id="LibraryObjects">
				<script type="text/javascript">
					getFiles('file_id', 'DESC');
				</script>
			</div>
		</section>
		<script type="text/javascript" src="<?php echo $link ?>/js/page-scripts.js"></script>
	</body>
</html>
