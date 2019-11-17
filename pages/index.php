<!DOCTYPE html>
<html lang="fr" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Music Player</title>
    <?php
      include_once($_SERVER['DOCUMENT_ROOT']."/assets/header.php");
    ?>
    <link rel="stylesheet" type="text/css" href="https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
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
            echo "<ul><li onclick='mediaPlayerAppear(\"".$value['file_url']."\", \"".$value['file_image']."\", \"".$value['file_author']."\", \"".$value['file_name']."\")' class='view'>";
            if (!empty($value['file_image'])) {
              echo "<img src='".$value['file_image']."' alt=''>";
            }
            echo "</li>
                  <li><p onclick='mediaPlayerAppear(\"".$value['file_url']."\", \"".$value['file_image']."\", \"".$value['file_author']."\", \"".$value['file_name']."\")'>".$value['file_author']." - ".$value['file_name']."</p></li>
                  </ul>";
          }
        }else {
          echo "<p class='error-msg'>Aucun fichier n'a été trouvé</p>";
        }


      ?>
    </section>
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>
    <script type="text/javascript" src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
    <script type="text/javascript" src="<?php echo $link ?>/js/page-scripts.js"></script>
    <?php
      include_once($_SERVER['DOCUMENT_ROOT']."/assets/reader.php");
    ?>
  </body>
</html>
