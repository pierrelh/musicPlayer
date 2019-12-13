<!DOCTYPE html>
<html lang="fr" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Music Player</title>
    <link rel="shortcut icon" href="../img/favicon.png">
    <?php
      include_once($_SERVER['DOCUMENT_ROOT']."/assets/header.php");
    ?>
    <link rel="stylesheet" href="<?php echo $link ?>/styles/videoStyle.css">
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>
    <script type="text/javascript" src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
    <script type="text/javascript" src="<?php echo $link ?>/js/getFiles.js"></script>
    <script type="text/javascript" src="<?php echo $link ?>/js/page-scripts.js"></script>
    <script type="text/javascript" src="<?php echo $link ?>/js/uploadFile.js"></script>
    <script type="text/javascript" src="<?php echo $link ?>/js/musicPlayer.js"></script>
    <script type="text/javascript" src="<?php echo $link ?>/js/playlist.js"></script>
    <script type="text/javascript" src="<?php echo $link ?>/js/editFiles.js"></script>
    <script type="text/javascript" src="<?php echo $link ?>/js/deleteFiles.js"></script>
  </head>
  <body>
    <?php
      include_once($_SERVER['DOCUMENT_ROOT']."/assets/sidebar.php");
      include_once($_SERVER['DOCUMENT_ROOT']."/assets/background.php");
      include_once($_SERVER['DOCUMENT_ROOT']."/assets/uploadFile.php");
      include_once($_SERVER['DOCUMENT_ROOT']."/assets/editFile.php");
      include_once($_SERVER['DOCUMENT_ROOT']."/assets/deleteFile.php");
      include_once($_SERVER['DOCUMENT_ROOT']."/assets/mediaPlayer.php");
    ?>
    <section id="Library" class="library">
      <script type="text/javascript">
        getFiles('file_id', 'DESC');
      </script>
    </section>
    <?php
      include_once($_SERVER['DOCUMENT_ROOT']."/assets/reader.php");
    ?>
  </body>
</html>
