<link rel="stylesheet" href="<?php echo $link ?>/styles/common/uploadFileStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/screen/uploadFileStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/handheld/uploadFileStyle.css">
<script src='<?php echo $link ?>/js/cloudinary/jquery.ui.widget.js' type='text/javascript'></script>
<script src='<?php echo $link ?>/js/cloudinary/jquery.iframe-transport.js' type='text/javascript'></script>
<script src='<?php echo $link ?>/js/cloudinary/jquery.fileupload.js' type='text/javascript'></script>
<script src='<?php echo $link ?>/js/cloudinary/jquery.cloudinary.js' type='text/javascript'></script>
<section id="Upload">
	<img id="CrossUpload" class="cross" src="<?php echo $link ?>/img/cross.png" alt="">
	<form id="FormUpload" enctype="multipart/form-data" method="post">
		<h2 id="ErrorMsgUpload"></h2>
		<ul class="medias-upload-list">
			<li>
				<ul>
					<li>
						<label for="File"><img src="<?php echo $link ?>/img/upload.png" alt=""></label>
					</li>
					<li>
						<div class="progress-file">
							<div id="ProgressBarVideo" class="progress-bar-file">
								<div id="TextProgressBarVideo" class="text-file"></div>
							</div>
						</div>
					</li>
				</ul>
			</li>
			<li>
				<ul>
					<li>
						<label for="Picture"><img class="thumbnails" src="<?php echo $link ?>/img/picture.png" alt=""></label>
					</li>
					<li>
						<div class="progress-picture">
							<div id="ProgressBarPicture" class="progress-bar-picture">
								<div id="TextProgessBarPicture" class="text-picture"></div>
							</div>
						</div>
					</li>
				</ul>
			</li>
		</ul>
		<input class="upload_video upload-file" id="File" type="file" name="file" value="" accept="audio/*">
		<input class="upload_picture upload-file" id="Picture" type="file" name="file" value="" accept="image/*">
		<ul class="form-list">
			<li>
                <div class="fields">
					<label for="FileName">Nom du Fichier</label>
					<input id="FileName" type="text" name="file_name" value="">
                </div>
			</li>
			<li>
                <div class="fields">
					<label for="FileAuthor">Nom de l'Artiste</label>
					<input id="FileAuthor" type="text" name="file_author" value="">
                </div>
			</li>
			<li>
                <div class="fields">
					<label for="FileAlbum">Nom de l'Album</label>
					<input id="FileAlbum" type="text" name="file_album" value="">
                </div>
            </li>
		</ul>
		<input class="send-form" id="UploadButton" type="submit" value="ENVOYER">
	</form>
	<script type="text/javascript" src="<?php echo $link ?>/js/uploadFile.js"></script>
</section>
