function deleteFiles(){
  checkPlaylistSection();

  var library = document.getElementById("LibraryObjects").children;
  for (var i = 0; i < library.length; i++) {
    if (document.getElementById("Edit" + i) != undefined) {
      hideEdit();
      break;
    }else if (document.getElementById("Add" + i) != undefined) {
      hideAdd();
      break;
    }
  }
  for (var i = 0; i < library.length; i++) (function(i) {
    var li = document.createElement("li");
    li.classList.add("delete");
    li.id = "Delete" + i;

    var parent = document.getElementById("MusicList" + i);
    var child = document.getElementById("Music" + i);
    parent.insertBefore(li, child);

    document.getElementById("Delete" + i).onclick = function () {
      showDeleteSection(i);
    };
  })(i);
  var filter = document.getElementById("DeleteFileSidebar");
  filter.setAttribute("onclick", "hideDelete()");
}

function hideDelete(){
  checkPlaylistSection();

  var library = document.getElementById("LibraryObjects").children;
  for (var i = 0; i < library.length; i++){
    if (document.getElementById("delete" + i) != undefined) {
      var li = document.getElementById("delete" + i);
      li.classList.add("delete-hide");
      li.classList.remove("delete");
    }
  }

  setTimeout(function(){
    for (var i = 0; i < library.length; i++){
      var li = document.getElementById("delete" + i);
      if (li != undefined) {
        li.remove();
      }else {
        break;
      }
    }
  }, 800);

  var filter = document.getElementById("deleteFile");
  filter.setAttribute("onclick", "deleteFiles()");
}

function showDeleteSection(identifier){
  backgroundAppear();
  var del = document.getElementById("delete");
  del.className = "appear";
  var element = document.getElementById(identifier);
  document.getElementById("deleteTitle").innerHTML = "Voulez-vous vraiment supprimer: " + element.dataset.title + " de " + element.dataset.artist + " ?";
  document.getElementById("deleteYes").onclick = function () {
    deleteFileConfirm(element.dataset.id);
  };
}

function deleteFileConfirm(identifier){
  $.ajax({
    url: "../functions/files/deleteFile.php",
    type: "POST",
    data: {"file_id": identifier},
    success: function(data){
      if (data == 1) {
        backgroundHide();
        var del = document.getElementById("delete");
        del.className = "";
        var library = document.querySelector("#Library");
        var li = library.querySelectorAll("li[data-id='"+identifier+"']")[0];
        var ul = document.getElementById("ul" + li.id);
        ul.remove();
      }else {
        alert("Une erreur inatendue s'est produite, merci de réeassyer plus tard.")
      }
    }
  });
}

function hideDeleteSection(){
  backgroundHide();
  var del = document.getElementById("delete");
  del.className = "";
}
