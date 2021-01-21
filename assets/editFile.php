<section id="Edit">
	<img id="CrossEdit" class="cross" src="<?php echo $link ?>/img/cross.png" alt="">
	<form id="FormEdit" method="post">
		<h3 class="error-msg" id="ErrorMsgEdit"></h3>
		<div id="BannerContainer">
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
		</div>
		<ul class="form-list">
			<li>
				<div class="fields">
					<label for="FileNameEdit">Nom du Fichier :</label>
					<input id="FileNameEdit" type="text" name="file_name" value="">
				</div>
			</li>
			<li>
				<div class="fields">
					<label for="FileAuthorEdit">Nom de l'Artiste :</label>
					<input id="FileAuthorEdit" type="text" name="file_author" value="">
				</div>
			</li>
			<li>
				<div class="fields">
					<label for="FileAlbumEdit">Nom de l'Album :</label>
					<input id="FileAlbumEdit" type="text" name="file_album" value="">
				</div>
			</li>
		</ul>
		<input class="send-form" id="EditButton" type="submit" value="ENVOYER">
		</div>
	</form>
</section>
<script type="text/javascript" src="<?php echo $link ?>/js/editFiles.js"></script>
