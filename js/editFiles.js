var decodeHTML = function (html) {
	var txt = document.createElement('textarea');
	txt.innerHTML = html;
	return txt.value;
};

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
  document.getElementById('fileNameEdit').value = decodeHTML(element.dataset.title);
  document.getElementById('fileAuthorEdit').value = decodeHTML(element.dataset.artist);
  document.getElementById('fileAlbumEdit').value = decodeHTML(element.dataset.album);
	$('#banner').css('background-image', 'url(' + element.dataset.img + ')');
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

$("#pictureEdit").change(function() {
	console.log('changed');
  readURL(this);
});
