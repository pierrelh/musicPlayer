<link rel="stylesheet" href="<?php echo $link ?>/styles/uploadFileStyle.css">
<section id="edit">
  <img class="cross" onclick="hideEditSection()" src="<?php echo $link ?>/img/cross.png" alt="">
  <form id="formEdit" method="post">
    <h2 id="error-msg"></h2>
    <div id="banner" class='div-detail'>
      <ul class='delete-edit'>
        <li><label class='modify-img' for="pictureEdit"><img class="editImage" src='<?php echo $link ?>/img/edit.png' alt=''></label></li>
        <li><input id="pictureEdit" type="file" name="" value=""></li>
      </ul>
    </div>
    <input id="fileNameEdit" type="text" placeholder="Nom du Fichier" name="" value="">
    <input id="fileAuthorEdit" type="text" placeholder="Nom de l'Artiste" name="" value="">
    <input id="fileAlbumEdit" type="text" placeholder="Nom de l'Album" name="" value="">
    <div class="progress-bar">
      <div id="myBarPlusEdit" class="bar positive">
        <span id="editButton">ENVOYER</span>
      </div>
      <div id="myBarMoinEdits" class="bar negative">
        <span onclick="uploadFile()" id="barSpan2Edit">ENVOYER</span>
      </div>
    </div>
  </form>
</section>
<script type="text/javascript" src="<?php echo $link ?>/js/editFiles.js"></script>
