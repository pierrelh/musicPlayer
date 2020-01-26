function mediaPlayerAppear(identifier){
  var song = document.getElementById(identifier);
  var url = song.getAttribute('data-url');
  var author = song.getAttribute('data-artist');
  var name = song.getAttribute('data-title');

  var library = document.getElementById('Library');
  library.classList.add("library-reader-active");

  var playlist = document.getElementById('divPlaylist');
  playlist.classList.add('playlist-reader-showed');

  var musicPlayer = document.getElementById('musicPlayer');
  var readerPlayer = document.getElementById('readerPlayer');
  var nameTxt = document.getElementById('songName');
  nameTxt.innerHTML = author + " - " + name;
  musicPlayer.src = url;
  var audioPlayer = document.getElementById('audio-player');
  if (document.getElementById('sidebar').classList.contains('sidebar-hide') && !audioPlayer.classList.contains('left')) {
    audioPlayer.classList.add('left');
  }
  audioPlayer.classList.add('show');
  document.getElementById('Previous').onclick = function () {
    if (identifier != 0) {
      identifier = identifier - 1;
    }
    mediaPlayerAppear(identifier);
  };
  document.getElementById('Next').onclick = function () {
    if (document.getElementById(identifier+1) != undefined) {
      identifier = identifier + 1;
    }else {
      identifier = 0;
    }
    mediaPlayerAppear(identifier);
  };
}

function backgroundAppear(){
  var background = document.getElementById('background');
  background.className = 'background-appear';
}

function backgroundHide(){
  var background = document.getElementById('background');
  background.className = '';
}

function hideSidebar(){
  var arrow = document.getElementById('arrow');
  arrow.className = 'arrow-active';
  arrow.setAttribute('onclick', 'showSidebar()');

  var sidebar = document.getElementById('sidebar');
  sidebar.className = 'sidebar-hide';

  var library = document.getElementById('Library');
  library.classList.add('library-show');

  var playlist = document.getElementById('divPlaylist');
  playlist.classList.add('playlist-sidebar-hided');

  var player = document.getElementById('audio-player');
  player.classList.add("left");
}

function showSidebar(){
  var arrow = document.getElementById('arrow');
  arrow.className = 'arrow';
  arrow.setAttribute('onclick', 'hideSidebar()');

  var sidebar = document.getElementById('sidebar');
  sidebar.className = 'sidebar';

  var library = document.getElementById('Library');
  library.classList.add('library');
  library.classList.remove('library-show');

  var playlist = document.getElementById('divPlaylist');
  playlist.classList.remove('playlist-sidebar-hided');

  var player = document.getElementById('audio-player');
  player.classList.remove("left");
}
