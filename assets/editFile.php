<link rel="stylesheet" href="<?php echo $link ?>/styles/common/uploadFileStyle.css">
<section id="Edit">
	<img id="CrossEdit" class="cross" src="<?php echo $link ?>/img/cross.png" alt="">
	<form id="FormEdit" method="post">
		<h2 id="ErrorMsgEdit"></h2>
		<div id="Banner" class='div-detail'>
			<ul class='delete-edit'>
				<li><label class='modify-img' for="PictureEdit"><img class="editImage" src='<?php echo $link ?>/img/edit.png' alt=''></label></li>
				<li><input id="PictureEdit" type="file" name="" value="" accept="image/*"></li>
			</ul>
		</div>
		<div class="progress-file">
			<div id="ProgressBarEditCover" class="progress-bar-file">
				<div id="TextProgressBarEditCover" class="text-file"></div>
			</div>
		</div>
		<input id="FileNameEdit" type="text" placeholder="Nom du Fichier" name="file_name" value="">
		<input id="FileAuthorEdit" type="text" placeholder="Nom de l'Artiste" name="file_author" value="">
		<input id="FileAlbumEdit" type="text" placeholder="Nom de l'Album" name="file_album" value="">
		<div class="upload-button">
			<span id="EditButton">ENVOYER</span>
		</div>
		</div>
	</form>
</section>
<script type="text/javascript" src="<?php echo $link ?>/js/editFiles.js"></script>
