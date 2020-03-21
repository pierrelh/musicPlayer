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
      <li><label for="file"><img src="../img/upload.png" alt=""></label></li>
      <li><label for="picture"><img class="thumbnails" src="../img/picture.png" alt=""></label></li>
    </ul>
    <input class="upload_field upload-file" id="file" type="file" name="file" value="">
    <input class="upload-file" id="picture" type="file" name="picture" value="">
    <input id="fileName" type="text" placeholder="Nom du Fichier" name="" value="">
    <input id="fileAuthor" type="text" placeholder="Nom de l'Artiste" name="" value="">
    <input id="fileAlbum" type="text" placeholder="Nom de l'Album" name="" value="">
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
<script type="text/javascript">

  var cloud_name = 'htko7uqqo';

  $.cloudinary.config({
    cloud_name: cloud_name
  })

  $('.upload_field').unsigned_cloudinary_upload('unsigned_image', {
    cloud_name: cloud_name
  }, {
    multiple: true
  }).bind('cloudinarydone', function(e, data) {

      $('.thumbnails').append($.cloudinary.image(data.result.public_id, {
        format: 'jpg',
        width: 150,
        height: 100,
        crop: 'thumb',
        gravity: 'face',
        effect: 'sharpen:300'
      }))
    }

  ).bind('cloudinaryprogress', function(e, data) {
  	// var percent = Math.round((data.loaded * 100.0) / data.total);
    // $('.progress_bar').css('width', percent + '%');
    // $('.progress_wrapper .text').text(percent + '%');
  });

</script>
