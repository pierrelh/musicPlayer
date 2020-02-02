function getAllPlaylists() {
  $.ajax({
    url: "../functions/playlist/getAllPlaylists.php",
    type: "POST",
    success: function(data){
      data = JSON.parse(data);
      if (data.length != 0) {
        var html = document.getElementById("html");
        html.classList.add('no-scroll')
        document.getElementById("divPlaylist").innerHTML = "";
        document.getElementById("divPlaylist").classList.remove("playlist-div-hide");
        document.getElementById("divPlaylist").classList.add("playlist-div");

        var ul = document.createElement("ul");
        ul.id = 'ulPlaylist';
        ul.className = "listPlaylist";
        document.getElementById("divPlaylist").appendChild(ul);

        for (var i = 0; i < data.length; i++) (function(i) {
          li = document.createElement("li");
          ul.appendChild(li);
          li.className = 'table';
          li.id = "playlistElement"+i;
          li.dataset.name = data[i]['playlist_name'];
          li.dataset.musics = data[i]['playlist_musics'];
          li.dataset.owner = data[i]['playlist_owner'];
          li.dataset.id = data[i]['playlist_id'];
          document.getElementById("playlistElement"+i).onclick = function () {
            openPlaylist("playlistElement"+i);
          };

          var p = document.createElement("p");
          li.appendChild(p);
          p.innerHTML = data[i]['playlist_name'];
          p.id = 'playlistText'+i;
          document.getElementById('playlistText'+i).onclick = function () {
            openPlaylist(data[i]['playlist_id']);
          };
        })(i);
        var filterGetPlaylist = document.getElementById("myPlaylists");
        filterGetPlaylist.setAttribute("onclick", "checkPlaylistSection()");
      }
    }
  });
}

function checkPlaylistSection() {
  if (document.getElementById("divPlaylist").classList.contains("playlist-div")) {
    document.getElementById("divPlaylist").classList.remove("playlist-div");
    document.getElementById("divPlaylist").classList.add("playlist-div-hide");
    document.getElementById("html").classList.remove("no-scroll");
    document.getElementById("myPlaylists").setAttribute("onclick", "getAllPlaylists()");
  }
}

function openPlaylist(identifier) {
  if (identifier != undefined) {
    var playlist = document.getElementById(identifier);
    var musics = playlist.dataset.musics.split('#STOP#');
    console.log(musics);
    musics.pop();
    console.log(musics);

    // var library = document.getElementById('Library');
    // library.innerHTML = "";

  }
}

function createPlaylist() {
  checkPlaylistSection();
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
  checkPlaylistSection();
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
  if (document.getElementById("buttonCreatePlaylist") != undefined) {
    document.getElementById("buttonCreatePlaylist").remove();
    document.getElementById("playlistName").remove();
    document.getElementById("playlistButtonElement").remove();
    document.getElementById("playlistNameElement").remove();
  }
}

function addToPlaylist(identifier) {
  var li = document.getElementById('add'+identifier);
  li.classList.remove("add");
  li.classList.add('check');
  document.getElementById('add'+identifier).setAttribute('onclick', 'removeToPlaylist('+identifier+')');
  if (document.getElementById("buttonCreatePlaylist") == undefined) {
    var sidebarList =  document.getElementById("sidebarList");

    var listPlaylistName = document.createElement('li');
    listPlaylistName.id = "playlistNameElement"
    sidebarList.appendChild(listPlaylistName);

    var playlistName = document.createElement('input');
    playlistName.id = "playlistName";
    playlistName.setAttribute("type", "text");
    playlistName.setAttribute("placeholder", "Nom de la Playlist");
    playlistName.classList.add('playlist-name');
    listPlaylistName.appendChild(playlistName);


    var listElement = document.createElement('li');
    listElement.id = "playlistButtonElement"
    sidebarList.appendChild(listElement);

    var buttonCreatePlaylist = document.createElement('input');
    buttonCreatePlaylist.id = "buttonCreatePlaylist";
    buttonCreatePlaylist.setAttribute("type", "submit");
    buttonCreatePlaylist.setAttribute("onclick", "sendPlaylist()");
    buttonCreatePlaylist.classList.add('button-create-playlist');
    buttonCreatePlaylist.value = "Créer la Playlist";
    listElement.appendChild(buttonCreatePlaylist);
  }
}

function removeToPlaylist(identifier) {
  var li = document.getElementById('add'+identifier);
  li.classList.remove("check");
  li.classList.add('add');
  document.getElementById('add'+identifier).setAttribute('onclick', 'addToPlaylist('+identifier+')');
  var choosed = false;
  var library = document.getElementById('Library').children;
  for (var i = 0; i < library.length; i++) {
    if (document.getElementById("add"+i).classList.contains("check")) {
      choosed = true;
    }
  }
  if (choosed == false) {
    document.getElementById("buttonCreatePlaylist").remove();
    document.getElementById("playlistName").remove();
    document.getElementById("playlistButtonElement").remove();
    document.getElementById("playlistNameElement").remove();
  }
}

function sendPlaylist() {
  var library = document.getElementById('Library').children;
  var playlistName = document.getElementById('playlistName').value;
  var musicList = "";
  for (var i = 0; i < library.length; i++) {
    if (document.getElementById("add"+i).classList.contains("check")) {
      musicList += document.getElementById(i).dataset.id + "#STOP#";
    }
  }
  if (playlistName == "" || musicList == "") {
    alert("Merci de choisir des morceaux et de remplir le nom de la playlist.")
  }else {
    $.ajax({
      url: "../functions/playlist/createPlaylist.php",
      type: "POST",
      data: {'musics': musicList,
             'playlistName': playlistName},
      success: function(data){
        hideAdd();
      }
    });
  }
}
