function deleteFiles(){
  var library = document.getElementById('Library').children;
  for (var i = 0; i < library.length; i++) (function(i) {
    if (document.getElementById('edit'+i) != undefined) {
      hideEdit();
      sleep(800);
    }
    var li = document.createElement('li');
    li.classList.add('delete');
    li.id = 'delete' + i;

    var parent = document.getElementById('ul'+i);
    var child = document.getElementById(i);
    parent.insertBefore(li, child);

    document.getElementById('delete'+i).onclick = function () {
      showDeleteSection();
    };
  })(i);
  var filter = document.getElementById('deleteFile');
  filter.setAttribute('onclick', 'hideDelete()');
}

function hideDelete(){
  var library = document.getElementById('Library').children;
  for (var i = 0; i < library.length; i++){
    var li = document.getElementById('delete'+i);
    li.classList.add('delete-hide');
  }
  setTimeout(function(){
    for (var i = 0; i < library.length; i++){
      var li = document.getElementById('delete'+i);
      li.remove();
    }
  },800);
  var filter = document.getElementById('deleteFile');
  filter.setAttribute('onclick', 'deleteFiles()');
}

function showDeleteSection(){
  backgroundAppear();
  var del = document.getElementById('delete');
  del.className = 'appear';
}

function deleteFileConfirm(){

}

function hideDeleteSection(){
  backgroundHide();
  var del = document.getElementById('delete');
  del.className = '';
}
