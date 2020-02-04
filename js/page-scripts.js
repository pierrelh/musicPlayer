function backgroundAppear() {
  var background = document.getElementById('background');
  background.className = 'background-appear';
}

function backgroundHide() {
  var background = document.getElementById('background');
  background.className = '';
}

function hideSidebar() {
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

function showSidebar() {
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
