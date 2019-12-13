function deleteFiles(){
  var library = document.getElementById('Library').children;
  for (var i = 0; i < library.length; i++) (function(i) {
    var li = document.createElement('li');
    li.classList.add('delete');
    li.id = 'delete' + i;

    var parent = document.getElementById('ul'+i);
    var child = document.getElementById(i);
    parent.insertBefore(li, child);

    document.getElementById('delete'+i).onclick = function () {
      showEditSection();
    };
  })(i);
  var filter = document.getElementById('deleteFile');
  filter.setAttribute('onclick', 'hideDelete()');
}

function hideDelete(){
  var library = document.getElementById('Library').children;
  for (var i = 0; i < library.length; i++){
    var li = document.getElementById('delete'+i);
    li.remove();
  }
  var filter = document.getElementById('deleteFile');
  filter.setAttribute('onclick', 'deleteFiles()');
}

function showDeleteSection(){
  backgroundAppear();
  var del = document.getElementById('delete');
  del.className = 'appear';
}

function hideDeleteSection(){
  backgroundHide();
  var del = document.getElementById('delete');
  del.className = '';
}
