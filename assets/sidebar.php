<link rel="stylesheet" href="<?php echo $link ?>/styles/common/sidebarStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/screen/sidebarStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/handheld/sidebarStyle.css">
<section id="Sidebar" class="sidebar sidebar-hide">
  <ul id="sidebarList">
    <li><input id="MyAccountSidebar" type="button" value="Mon Compte"></li>
    <li><input id="CreateAccountSidebar" type="button" value="Créer un Compte"></li>
    <li><input id="UploadFileSidebar" type="button" value="Uploader un Fichier"></li>
    <li><input id="EditFileSidebar" type="button" value="Modifier un Fichier"></li>
    <li><input id="DeleteFileSidebar" type="button" value="Supprimer un Fichier"></li>
    <br>
    <li><input id='FilterAuthor' data-order="ASC" type="button" value="Trier par Auteur"></li>
    <li><input id='FilterAlbum' onclick="getFiles('file_album', 'ASC', 'filter2');" type="button" value="Trier par Album"></li>
    <li><input id='FilterId' onclick="getFiles('file_id', 'DESC', 'filter3');" type="button" value="Trier par Date d'ajout"></li>
    <li><input id='FilterName' onclick="getFiles('file_name', 'ASC', 'filter4');" type="button" value="Trier par Titre"></li>
    <br>
    <li><input id="MyPlaylistsSidebar" onclick="getAllPlaylists()" type="button" value="Mes Playlists"></li>
    <li><input id="CreatePlaylistSidebar" type="button" value="Créer une Playlist"></li>
  </ul>
</section>
<script type="text/javascript" src="<?php echo $link ?>/js/sidebar.js"></script>