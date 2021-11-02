<link rel="stylesheet" href="<?php echo $rootURL ?>/styles/common/editFileStyle.css?cachev=<?php echo $cacheVersion ?>">
<section id="Edit">
	<button id="CrossEdit" class="cross">
		<i class="bi bi-x-lg"></i>
	</button>
	<h2 class="form-title">Modifier un fichier</h2>
	<form id="FormEdit" method="post">
		<div id="BannerContainer">
			<div id="Banner" class='div-detail'>
				<label class='modify-img' for="PictureEdit">
					<img class="editImage" src='<?php echo $rootURL ?>/img/edit.png' alt=''>
					<input id="PictureEdit" type="file" name="" value="" accept="image/*">
				</label>
			</div>
			<div class="progress">
				<div id="ProgressBarEditCover" class="progress-bar">
					<div id="TextProgressBarEditCover" class="progress-bar-text"></div>
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
<script type="text/javascript" src="<?php echo $rootURL ?>/scripts/editFiles.js?cachev=<?php echo $cacheVersion ?>"></script>