<link rel="stylesheet" href="<?php echo $link ?>/styles/common/uploadFileStyle.css?cachev=<?php echo $cacheVersion ?>">
<section id="Upload">
	<button id="CrossUpload" class="cross">
		<img src="<?php echo $link ?>/img/cross.png" alt="">
	</button>
	<h2 class="form-title">Uploader un fichier</h2>
	<form id="FormUpload" enctype="multipart/form-data" method="post">
		<h3 class="error-msg" id="ErrorMsgUpload"></h3>
		<ul class="medias-upload-list">
			<li>
				<ul>
					<li>
						<label for="File">
							<img src="<?php echo $link ?>/img/upload.png" alt="">
						</label>
					</li>
					<li>
						<div class="progress">
							<div id="ProgressBarVideo" class="progress-bar">
								<div id="TextProgressBarVideo" class="progress-bar-text"></div>
							</div>
						</div>
					</li>
				</ul>
			</li>
			<li>
				<ul>
					<li>
						<label for="Picture">
							<img class="thumbnails" src="<?php echo $link ?>/img/picture.png" alt="">
						</label>
					</li>
					<li>
						<div class="progress">
							<div id="ProgressBarPicture" class="progress-bar">
								<div id="TextProgessBarPicture" class="progress-bar-text"></div>
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
					<label for="FileName">Nom du Fichier :</label>
					<input id="FileName" type="text" name="file_name" value="">
				</div>
			</li>
			<li>
				<div class="fields">
					<label for="FileAuthor">Nom de l'Artiste :</label>
					<input id="FileAuthor" type="text" name="file_author" value="">
				</div>
			</li>
			<li>
				<div class="fields">
					<label for="FileAlbum">Nom de l'Album :</label>
					<input id="FileAlbum" type="text" name="file_album" value="">
				</div>
			</li>
		</ul>
		<input class="send-form" id="UploadButton" type="submit" value="ENVOYER">
	</form>
</section>
<script type="text/javascript" src="<?php echo $link ?>/scripts/uploadFile.js?cachev=<?php echo $cacheVersion ?>"></script>