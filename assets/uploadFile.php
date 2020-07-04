<link rel="stylesheet" href="<?php echo $link ?>/styles/common/uploadFileStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/screen/uploadFileStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/handheld/uploadFileStyle.css">
<script src='<?php echo $link ?>/js/cloudinary/jquery.ui.widget.js' type='text/javascript'></script>
<script src='<?php echo $link ?>/js/cloudinary/jquery.iframe-transport.js' type='text/javascript'></script>
<script src='<?php echo $link ?>/js/cloudinary/jquery.fileupload.js' type='text/javascript'></script>
<script src='<?php echo $link ?>/js/cloudinary/jquery.cloudinary.js' type='text/javascript'></script>
<script type="text/javascript" src="<?php echo $link ?>/js/uploadFile.js"></script>
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
              <div class="progress-bar-file">
                <div class="text-file"></div>
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
              <div class="progress-bar-picture">
                <div class="text-picture"></div>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
    <input class="upload_video upload-file" id="file" type="file" name="file" value="">
    <input class="upload_picture upload-file" id="picture" type="file" name="file" value="">
    <label for="fileName">Nom du Fichier</label>
    <input id="fileName" type="text" name="" value="">
    <br>
    <label for="fileAuthor">Nom de l'Artiste</label>
    <input id="fileAuthor" type="text" name="" value="">
    <br>
    <label for="fileAlbum">Nom de l'Album</label>
    <input id="fileAlbum" type="text" name="" value="">
    <div class="progress-bar">
      <div id="myBarPlus" class="bar positive">
        <span id="sendButton">ENVOYER</span>
      </div>
      <div id="myBarMoins" class="bar negative">
        <span id="barSpan2">ENVOYER</span>
      </div>
    </div>
  </form>
</section>
<script type="text/javascript">
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  var cloud_name = 'htko7uqqo';
  var file_name = new Date().getTime() + getRandomInt(999999999);

  $.cloudinary.config({
    cloud_name: cloud_name
  })

  $('.upload_video').unsigned_cloudinary_upload('unsigned_video', {
    cloud_name: cloud_name,
    public_id: file_name
  }, {
    multiple: true
  }).bind('cloudinarydone', function(e, data) {
    document.getElementById("file").dataset.name = data["result"]["secure_url"];
    $('.progress-file .text-file').text('Envoyé !');
  }

  ).bind('cloudinaryprogress', function(e, data) {
    console.log("Vidéo Load: " + Math.round((data.loaded * 100.0) / data.total));
    document.getElementById("file").dataset.name = "uploading";
  	var percent = Math.round((data.loaded * 100.0) / data.total);
    $('.progress-bar-file').css('width', percent + '%');
    $('.progress-file .text-file').text(percent + '%');
  });

  $('.upload_picture').unsigned_cloudinary_upload('unsigned_image', {
    cloud_name: cloud_name,
    public_id: file_name
  }, {
    multiple: true
  }).bind('cloudinarydone', function(e, data) {
    document.getElementById("picture").dataset.name = data["result"]["secure_url"];
    $('.progress-picture .text-picture').text('Envoyé !');
  }

  ).bind('cloudinaryprogress', function(e, data) {
    console.log("Image Load: " + Math.round((data.loaded * 100.0) / data.total));
    document.getElementById("picture").dataset.name = "uploading";
    var percent = Math.round((data.loaded * 100.0) / data.total);
    $('.progress-bar-picture').css('width', percent + '%');
    $('.progress-picture .text-picture').text(percent + '%');
  });

</script>
