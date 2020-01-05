function decode_utf8(s) {
  return unescape(encodeURIComponent(s));
}

function editFiles(){
  var library = document.getElementById('Library').children;
  for (var i = 0; i < library.length; i++) {
    if (document.getElementById('delete'+i) != undefined) {
      hideDelete();
      break;
    }
  }
  for (var i = 0; i < library.length; i++) (function(i) {
    var li = document.createElement('li');
    li.classList.add('edit');
    li.id = 'edit' + i;

    var parent = document.getElementById('ul'+i);
    var child = document.getElementById(i);
    parent.insertBefore(li, child);

    document.getElementById('edit'+i).onclick = function () {
      showEditSection(i);
    };
  })(i);
  var filter = document.getElementById('editFile');
  filter.setAttribute('onclick', 'hideEdit()');
}

function hideEdit(){
  var library = document.getElementById('Library').children;
  for (var i = 0; i < library.length; i++){
    var li = document.getElementById('edit'+i);
    li.classList.add('edit-hide');
    li.classList.remove("edit");
  }

  setTimeout(function(){
    for (var i = 0; i < library.length; i++){
      var li = document.getElementById('edit'+i);
      if (li != undefined) {
        li.remove();
      }else {
        break;
      }
    }
  }, 800);

  var filter = document.getElementById('editFile');
  filter.setAttribute('onclick', 'editFiles()');
}

function showEditSection(identifier){
  var element = document.getElementById(identifier);
  document.getElementById('fileNameEdit').value = decode_utf8(element.dataset.title);
  document.getElementById('fileAuthorEdit').value = decode_utf8(element.dataset.artist);
  document.getElementById('fileAlbumEdit').value = decode_utf8(element.dataset.album);
  backgroundAppear();
  var edit = document.getElementById('edit');
  edit.className = 'appear';
}

function hideEditSection(){
  backgroundHide();
  var edit = document.getElementById('edit');
  edit.className = '';
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('#banner').css('background-image', 'url(' + e.target.result + ')');
    }

    reader.readAsDataURL(input.files[0]);
  }
}

$("#modifyImage").change(function() {
  readURL(this);
});
