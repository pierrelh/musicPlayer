<link rel="stylesheet" href="<?php echo $link ?>/styles/uploadFileStyle.css">
<section id="upload">
  <img class="cross" onclick="uploadHide()" src="../img/cross.png" alt="">
  <form id="formUpload" enctype="multipart/form-data" method="post">
    <h2 id="error-msg"></h2>
    <ul>
      <li><label for="file"><img src="../img/upload.png" alt=""></label></li>
      <li><label for="picture"><img src="../img/picture.png" alt=""></label></li>
    </ul>
    <input class="upload-file" id="file" type="file" name="file" value="">
    <input id="fileName" type="text" placeholder="Nom du Fichier" name="" value="">
    <input class="upload-file" id="picture" type="file" name="picture" value="">
    <div class="progress-bar">
      <div id="myBarPlus" class="bar positive">
        <span id="sendButton">ENVOYER</span>
      </div>
      <div id="myBarMoins" class="bar negative">
        <span onclick="uploadFile()" id="barSpan2">ENVOYER</span>
      </div>
    </div>
  </form>
</section>
