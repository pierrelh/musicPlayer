<!DOCTYPE html>
<html id="html" lang="fr" dir="ltr">
	<head>
		<meta charset="utf-8">
		<title>Music Player</title>
		<link rel="stylesheet" href="<?php echo $link ?>/styles/common/videoStyle.css">
		<link rel="stylesheet" href="<?php echo $link ?>/styles/screen/videoStyle.css">
		<link rel="stylesheet" href="<?php echo $link ?>/styles/handheld/videoStyle.css">
		<script>
			// Setting globales variables
			var playlist = [];
			var randomPlaylist = [];
			var server = "https://" + window.location.hostname;
		</script>
		<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>
		<script type="text/javascript" src="<?php echo $link ?>/js/getFiles.js"></script>
		<script type="text/javascript" src="<?php echo $link ?>/js/functions.js"></script>
		<script type="text/javascript" src="<?php echo $link ?>/js/key-pressed.js"></script>
	</head>
	<body id="body">
		<?php
			include_once($_SERVER['DOCUMENT_ROOT']."/assets/header.php");
			include_once($_SERVER['DOCUMENT_ROOT']."/assets/sidebar.php");
			include_once($_SERVER['DOCUMENT_ROOT']."/assets/background.php");
			include_once($_SERVER['DOCUMENT_ROOT']."/assets/uploadFile.php");
			include_once($_SERVER['DOCUMENT_ROOT']."/assets/editFile.php");
			include_once($_SERVER['DOCUMENT_ROOT']."/assets/deleteFile.php");
			include_once($_SERVER['DOCUMENT_ROOT']."/assets/playlists.php");
		?>
		<section id="Library" class="library-show">
			<div id="LibraryObjects">
				<script type="text/javascript">
					getFiles('file_id', 'DESC');
				</script>
			</div>
		</section>
		<?php
			include_once($_SERVER['DOCUMENT_ROOT']."/assets/reader.php");
		?>
		<script type="text/javascript" src="<?php echo $link ?>/js/page-scripts.js"></script>
	</body>
</html>
