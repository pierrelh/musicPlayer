<link rel="stylesheet" href="<?php echo $link ?>/styles/screen/sidebarStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/handheld/sidebarStyle.css">
<section id="sidebar" class="sidebar-hide">
  <img id="arrow" onclick="showSidebar();" class="arrow-active" src="../img/arrow.png" alt="">
  <ul>
    <li><input onclick="" type="button" name="" value="Mon Compte"></li>
    <li><input onclick="" type="button" name="" value="Créer un Compte"></li>
    <li><input onclick="uploadAppear()" type="button" name="" value="Uploader un Fichier"></li>
    <li><input id="editFile" onclick="editFiles()" type="button" name="" value="Modifier un Fichier"></li>
    <li><input id="deleteFile" onclick="deleteFiles()" type="button" name="" value="Supprimer un Fichier"></li>
    <br>
    <li><input id='filter1' onclick="getFiles('file_author', 'ASC', 'filter1');" type="button" name="" value="Trier par Auteur"></li>
    <li><input id='filter2' onclick="getFiles('file_album', 'ASC', 'filter2');" type="button" name="" value="Trier par Album"></li>
    <li><input id='filter3' onclick="getFiles('file_id', 'DESC', 'filter3');" type="button" name="" value="Trier par Date d'ajout"></li>
    <li><input id='filter4' onclick="getFiles('file_name', 'ASC', 'filter4');" type="button" name="" value="Trier par Titre"></li>
    <br>
    <li><input id="myPlaylists" onclick="getMyPlaylists()" type="button" name="" value="Mes Playlists"></li>
    <li><input id="createPlaylist" onclick="createPlalist()" type="button" name="" value="Créer une Playlist"></li>
  </ul>
</section>
