function mediaPlayerAppear(identifier){
  var song = document.getElementById(identifier);
  var url = song.getAttribute('data-url');
  var author = song.getAttribute('data-artist');
  var name = song.getAttribute('data-title');
  var musicPlayer = document.getElementById('musicPlayer');
  var readerPlayer = document.getElementById('readerPlayer');
  var nameTxt = document.getElementById('songName');
  nameTxt.innerHTML = author + " - " + name;
  musicPlayer.src = url;
  var audioPlayer = document.getElementById('audio-player');
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
  var sidebar = document.getElementById('sidebar');
  var library = document.getElementById('Library');
  var player = document.getElementById('audio-player');
  player.classList.add("left");
  arrow.className = 'arrow-active';
  sidebar.className = 'sidebar-hide';
  library.className = 'library-show';
  arrow.setAttribute('onclick', 'showSidebar()');
}

function showSidebar(){
  var arrow = document.getElementById('arrow');
  var sidebar = document.getElementById('sidebar');
  var library = document.getElementById('Library');
  var player = document.getElementById('audio-player');
  player.classList.remove("left");
  arrow.className = 'arrow';
  sidebar.className = 'sidebar';
  library.className = 'library';
  arrow.setAttribute('onclick', 'hideSidebar()');
}
