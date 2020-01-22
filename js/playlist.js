function getMyPlaylists() {

}

function createPlaylist() {
  var library = document.getElementById('Library').children;
  for (var i = 0; i < library.length; i++) {
    if (document.getElementById('delete'+i) != undefined) {
      hideDelete();
      break;
    }else if (document.getElementById('edit'+i) != undefined) {
      hideEdit();
      break;
    }
  }
  for (var i = 0; i < library.length; i++) (function(i) {
    var li = document.createElement('li');
    li.classList.add('add');
    li.id = 'add' + i;

    var parent = document.getElementById('ul'+i);
    var child = document.getElementById(i);
    parent.insertBefore(li, child);

    document.getElementById('add'+i).onclick = function () {
      addToPlaylist(i);
    };
  })(i);
  var filter = document.getElementById('createPlaylist');
  filter.setAttribute('onclick', 'hideAdd()');
}

function hideAdd() {
  var library = document.getElementById('Library').children;
  for (var i = 0; i < library.length; i++){
    var li = document.getElementById('add'+i);
    li.classList.add('add-hide');
    li.classList.remove("add");
  }

  setTimeout(function(){
    for (var i = 0; i < library.length; i++){
      var li = document.getElementById('add'+i);
      if (li != undefined) {
        li.remove();
      }else {
        break;
      }
    }
  }, 800);

  var filter = document.getElementById('createPlaylist');
  filter.setAttribute('onclick', 'createPlaylist()');
}

function addToPlaylist(identifier) {
  var li = document.getElementById('add'+identifier);
  li.classList.add('check');
  li.classList.remove("add");
  var sidebarList =  document.getElementById("sidebarList");
  var buttonCreatePlaylist = document.createElement('input');
  buttonCreatePlaylist.classList.add('button-create-playlist');
  buttonCreatePlaylist.innerHTML = "Créer la Playlist";
  sidebarList.appendChild(buttonCreatePlaylist);
  document.getElementById('add'+identifier).onclick = function () {
    removeToPlaylist(identifier);
  };
}

function removeToPlaylist(identifier) {
  var li = document.getElementById('add'+identifier);
  li.classList.add('add');
  li.classList.remove("check");
  document.getElementById('add'+identifier).onclick = function () {
    addToPlaylist(identifier);
  };
}
