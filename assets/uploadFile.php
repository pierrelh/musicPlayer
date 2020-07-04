<link rel="stylesheet" href="<?php echo $link ?>/styles/common/uploadFileStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/screen/uploadFileStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/handheld/uploadFileStyle.css">
<script src='<?php echo $link ?>/js/cloudinary/jquery.ui.widget.js' type='text/javascript'></script>
<script src='<?php echo $link ?>/js/cloudinary/jquery.iframe-transport.js' type='text/javascript'></script>
<script src='<?php echo $link ?>/js/cloudinary/jquery.fileupload.js' type='text/javascript'></script>
<script src='<?php echo $link ?>/js/cloudinary/jquery.cloudinary.js' type='text/javascript'></script>
<section id="upload">
  <img class="cross" onclick="uploadHide()" src="../img/cross.png" alt="">
  <form id="formUpload" enctype="multipart/form-data" method="post">
    <h2 id="error-msg"></h2>
    <ul>
      <li>
        <ul>
          <li>
            <label for="file"><img src="../img/upload.png" alt=""></label>
          </li>
          <li>
            <div class="progress-file">
              <div id="progressBarVideo" class="progress-bar-file">
                <div id="textProgressBarVideo" class="text-file"></div>
              </div>
            </div>
          </li>
        </ul>
      </li>
      <li>
        <ul>
          <li>
            <label for="picture"><img class="thumbnails" src="../img/picture.png" alt=""></label>
          </li>
          <li>
            <div class="progress-picture">
              <div id="progressBarPicture" class="progress-bar-picture">
                <div id="textProgessBarPicture" class="text-picture"></div>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
    <input class="upload_video upload-file" id="file" type="file" name="file" value="">
    <input class="upload_picture upload-file" id="picture" type="file" name="file" value="">
    <label for="fileName">Nom du Fichier</label>
    <input id="fileName" type="text" name="file_name" value="">
    <br>
    <label for="fileAuthor">Nom de l'Artiste</label>
    <input id="fileAuthor" type="text" name="file_author" value="">
    <br>
    <label for="fileAlbum">Nom de l'Album</label>
    <input id="fileAlbum" type="text" name="file_album" value="">
    <div class="progress-bar">
      <div id="myBarPlus" class="bar positive">
        <span id="sendButton">ENVOYER</span>
      </div>
      <div id="myBarMoins" class="bar negative">
        <span id="barSpan2">ENVOYER</span>
      </div>
    </div>
  </form>
  <script type="text/javascript" src="<?php echo $link ?>/js/uploadFile.js"></script>
</section>
