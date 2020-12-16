<link rel="stylesheet" href="<?php echo $link ?>/styles/common/sidebarStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/screen/sidebarStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/handheld/sidebarStyle.css">
<section id="Sidebar" class="sidebar sidebar-hide">
	<ul id="SidebarList">
		<li><input id="MyAccountSidebar" type="button" value="Mon Compte"></li>
		<li><input id="CreateAccountSidebar" type="button" value="Créer un Compte"></li>
		<li><input id="UploadFileSidebar" type="button" value="Uploader un Fichier"></li>
		<li><input id="EditFileSidebar" type="button" value="Modifier un Fichier"></li>
		<li><input id="DeleteFileSidebar" type="button" value="Supprimer un Fichier"></li>
		<br>
		<li><input id='FilterAuthor' data-order="ASC" type="button" value="Trier par Auteur"></li>
		<li><input id='FilterAlbum' data-order="ASC" type="button" value="Trier par Album"></li>
		<li><input id='FilterId' data-order="ASC" type="button" value="Trier par Date d'ajout"></li>
		<li><input id='FilterName' data-order="ASC" type="button" value="Trier par Titre"></li>
		<br>
		<li><input id="MyPlaylistsSidebar" type="button" value="Mes Playlists"></li>
		<li><input data-is-active="false" id="CreatePlaylistSidebar" type="button" value="Créer une Playlist"></li>
	</ul>
</section>
<script type="text/javascript" src="<?php echo $link ?>/js/sidebar.js"></script>