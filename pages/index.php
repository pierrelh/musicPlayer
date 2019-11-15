<!DOCTYPE html>
<html lang="fr" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Music Player</title>
    <?php
      include_once($_SERVER['DOCUMENT_ROOT']."/assets/header.php");
    ?>
    <link rel="stylesheet" href="<?php echo $link ?>/styles/videoStyle.css">
  </head>
  <body>
    <?php
      include_once($_SERVER['DOCUMENT_ROOT']."/assets/sidebar.php");
      include_once($_SERVER['DOCUMENT_ROOT']."/assets/background.php");
      include_once($_SERVER['DOCUMENT_ROOT']."/assets/uploadFile.php");
      include_once($_SERVER['DOCUMENT_ROOT']."/assets/mediaPlayer.php");
    ?>
    <section class="library">
      <?php
        include_once($_SERVER['DOCUMENT_ROOT']."/functions/files/getAllFiles.php");
        $response = getAllFiles();
        if ($response != "") {
          foreach ($response as $key => $value) {
            echo "<ul><li onclick='mediaPlayerAppear(\"".$value['file_url']."\")' class='view'>";
            if (!empty($value['file_image'])) {
              echo "<img src='".$value['file_image']."' alt=''>";
            }
            echo "</li>
                  <li><p onclick='mediaPlayerAppear(\"".$value['file_url']."\", \"".$value['file_image']."\")'>".$value['file_name']."</p></li>
                  </ul>";
          }
        }else {
          echo "<p class='error-msg'>Aucun fichier n'a été trouvé</p>";
        }


      ?>
    </section>
    <script type="text/javascript" src="//code.jquery.com/jquery-1.11.0.min.js"></script>
    <script type="text/javascript" src="<?php echo $link ?>/js/page-scripts.js"></script>
  </body>
</html>
