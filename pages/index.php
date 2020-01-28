<!DOCTYPE html>
<html id="html" lang="fr" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Music Player</title>
    <link rel="shortcut icon" href="../img/favicon.png">
    <?php
      include_once($_SERVER['DOCUMENT_ROOT']."/assets/header.php");
    ?>
    <link rel="stylesheet" href="<?php echo $link ?>/styles/common/videoStyle.css">
    <link rel="stylesheet" href="<?php echo $link ?>/styles/screen/videoStyle.css">
    <link rel="stylesheet" href="<?php echo $link ?>/styles/handheld/videoStyle.css">
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>
    <script type="text/javascript" src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
    <script type="text/javascript" src="<?php echo $link ?>/js/getFiles.js"></script>
    <script type="text/javascript" src="<?php echo $link ?>/js/page-scripts.js"></script>
    <script type="text/javascript" src="<?php echo $link ?>/js/musicPlayer.js"></script>
    <script type="application/ld+json">
      {"@context":"https://schema.org","@type":"VideoObject","description":"Alors que j'avais pu aborder les secrets toutes les consoles de salon Sony, il était temps de passer au marché des portables. Explorons les secrets de la géniale PSP (Playstation Portable),  plus grande rivale de l'histoire de Nintendo sur le secteur.\n\nPour t'abonner à la chaîne, merci beaucoup! ▶ https://goo.gl/wsMpNQ \n(N'oublie pas de cliquer sur la 🔔 pour être le premier informé lorsqu'une vidéo ou un live est dispo)\n\n- Si tu souhaites te procurer les Tee-shirts, c'est par là (-20% avec le code \"CONKERS\" sur tout le site): https://www.pampling.com\n\n- Pour me soutenir gratuitement sur Utip: https://www.utip.io/conkerax\n\n- Profitez de -20% sur tout le site Displate (Posters en métal dans la déco, et qualité géniale!) avec mon lien: https://displate.com/conkerax?art=5dc490921e386\n\n- Devenir membre soutien de la chaîne : https://www.youtube.com/channel/UCnyXbcCPqBOf_qXjyNF7dlg/join\n\n- La chaîne secondaire Conkerax Live: https://www.youtube.com/channel/UCyiwrqOtf4mlH8DstulOc1w\n\nIci Conkerax au rapport avec la Playstation Portable à l'honneur! \n\nMes réseaux sociaux, pour m'y retrouver et échanger autour du jeu vidéo:\n\n▶ Facebook : https://www.facebook.com/conkerax/\n▶Twitter : https://twitter.com/conkerax\n▶ Snapchat : Conkerax\n▶ Instagram : https://www.instagram.com/conkerax/\n▶ TWITCH: https://www.twitch.tv/conkerax\n▶ DISCORD: https://discord.gg/bAF2bV2\n\nBon visionnage et merci à vous :)\n\nCrédits: Rerez, TheLdjstyle, Tech James, Sony.","duration":"PT1008S","interactionCount":"3984","name":"5 SECRETS CACHÉS SUR LA PSP!","thumbnailUrl":["https://i.ytimg.com/vi/_ln4wsMweqI/maxresdefault.jpg"],"uploadDate":"2020-01-28","embedUrl":"https://www.youtube.com/embed/_ln4wsMweqI"}
    </script>
  </head>
  <body id="body">
    <?php
      include_once($_SERVER['DOCUMENT_ROOT']."/assets/sidebar.php");
      include_once($_SERVER['DOCUMENT_ROOT']."/assets/background.php");
      include_once($_SERVER['DOCUMENT_ROOT']."/assets/uploadFile.php");
      include_once($_SERVER['DOCUMENT_ROOT']."/assets/editFile.php");
      include_once($_SERVER['DOCUMENT_ROOT']."/assets/deleteFile.php");
      include_once($_SERVER['DOCUMENT_ROOT']."/assets/mediaPlayer.php");
      include_once($_SERVER['DOCUMENT_ROOT']."/assets/playlists.php");
    ?>
    <section id="Library" class="library-show">
      <script type="text/javascript">
        getFiles('file_id', 'DESC');
      </script>
    </section>
    <?php
      include_once($_SERVER['DOCUMENT_ROOT']."/assets/reader.php");
    ?>
  </body>
</html>
