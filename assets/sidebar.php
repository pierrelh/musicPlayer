<link rel="stylesheet" href="<?php echo $link ?>/styles/sidebarStyle.css">
<section id="sidebar" class="sidebar">
  <img id="arrow" onclick="hideSidebar();" class="arrow" src="../img/arrow.png" alt="">
  <ul>
    <li><input onclick="" type="button" name="" value="Mon Compte"></li>
    <li><input onclick="" type="button" name="" value="Créer un compte"></li>
    <li><input onclick="uploadAppear()" type="button" name="" value="Uploader un fichier"></li>
    <li><input onclick="" type="button" name="" value="Supprimer un fichier"></li>
    <li><input onclick="getFiles('file_author', 'ASC');" type="button" name="" value="Trier par Auteur"></li>
    <li><input onclick="getFiles('file_album', 'ASC');" type="button" name="" value="Trier par Album"></li>
    <li><input onclick="getFiles('file_id', 'DESC');" type="button" name="" value="Trier par Date d'ajout"></li>
    <li><input onclick="getFiles('file_name', 'ASC');" type="button" name="" value="Trier par Titre"></li>
  </ul>
</section>
