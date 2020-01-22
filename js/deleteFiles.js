function deleteFiles(){
  var library = document.getElementById('Library').children;
  for (var i = 0; i < library.length; i++) {
    if (document.getElementById('edit'+i) != undefined) {
      hideEdit();
      break;
    }else if (document.getElementById('add'+i) != undefined) {
      hideAdd();
      break;
    }
  }
  for (var i = 0; i < library.length; i++) (function(i) {
    var li = document.createElement('li');
    li.classList.add('delete');
    li.id = 'delete' + i;

    var parent = document.getElementById('ul'+i);
    var child = document.getElementById(i);
    parent.insertBefore(li, child);

    document.getElementById('delete'+i).onclick = function () {
      showDeleteSection(i);
    };
  })(i);
  var filter = document.getElementById('deleteFile');
  filter.setAttribute('onclick', 'hideDelete()');
}

function hideDelete(){
  var library = document.getElementById('Library').children;
  for (var i = 0; i < library.length; i++){
    if (document.getElementById('delete'+i) != undefined) {
      var li = document.getElementById('delete'+i);
      li.classList.add('delete-hide');
      li.classList.remove("delete");
    }
  }

  setTimeout(function(){
    for (var i = 0; i < library.length; i++){
      var li = document.getElementById('delete'+i);
      if (li != undefined) {
        li.remove();
      }else {
        break;
      }
    }
  }, 800);

  var filter = document.getElementById('deleteFile');
  filter.setAttribute('onclick', 'deleteFiles()');
}

function showDeleteSection(identifier){
  backgroundAppear();
  var del = document.getElementById('delete');
  del.className = 'appear';
  var element = document.getElementById(identifier);
  document.getElementById('deleteTitle').innerHTML = "Voulez-vous vraiment supprimer: " + element.dataset.title + " de " + element.dataset.artist + " ?";
  document.getElementById('deleteYes').onclick = function () {
    deleteFileConfirm(element.dataset.id);
  };
}

function deleteFileConfirm(identifier){
  $.ajax({
    url: "../functions/files/deleteFile.php",
    type: "POST",
    data: {'file_id': identifier},
    success: function(data){
      if (data == 1) {
        backgroundHide();
        var del = document.getElementById('delete');
        del.className = '';
        var library = document.querySelector('#Library');
        var li = library.querySelectorAll("li[data-id='"+identifier+"']")[0];
        var ul = document.getElementById('ul'+li.id);
        ul.remove();
      }else {
        alert('Une erreur inatendue s\'est produite, merci de réeassyer plus tard.')
      }
    }
  });
}

function hideDeleteSection(){
  backgroundHide();
  var del = document.getElementById('delete');
  del.className = '';
}
