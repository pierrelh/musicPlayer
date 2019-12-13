<link rel="stylesheet" href="<?php echo $link ?>/styles/sidebarStyle.css">
<section id="sidebar" class="sidebar">
  <img id="arrow" onclick="hideSidebar();" class="arrow" src="../img/arrow.png" alt="">
  <ul>
    <li><input onclick="" type="button" name="" value="Mon Compte"></li>
    <li><input onclick="" type="button" name="" value="Créer un compte"></li>
    <li><input onclick="uploadAppear()" type="button" name="" value="Uploader un fichier"></li>
    <li><input onclick="" type="button" name="" value="Supprimer un fichier"></li>
    <li><input id='filter1' onclick="getFiles('file_author', 'ASC', 'filter1');" type="button" name="" value="Trier par Auteur"></li>
    <li><input id='filter2' onclick="getFiles('file_album', 'ASC', 'filter2');" type="button" name="" value="Trier par Album"></li>
    <li><input id='filter3' onclick="getFiles('file_id', 'DESC', 'filter3');" type="button" name="" value="Trier par Date d'ajout"></li>
    <li><input id='filter4' onclick="getFiles('file_name', 'ASC', 'filter4');" type="button" name="" value="Trier par Titre"></li>
  </ul>
</section>
