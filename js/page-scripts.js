function backgroundAppear() {
  var background = document.getElementById('background');
  background.className = 'background-appear';
}

function backgroundHide() {
  var background = document.getElementById('background');
  background.className = '';
}

document.getElementById("arrow").addEventListener("click", function(){
  if (this.dataset.status == 'hidden') {
    this.dataset.status = "show";
    this.className = 'arrow';

    var sidebar = document.getElementById('sidebar');
    sidebar.className = 'sidebar';

    var library = document.getElementById('Library');
    library.classList.add('library');

    var playlist = document.getElementById('divPlaylist');
    playlist.classList.remove('playlist-sidebar-hided');

    var player = document.getElementById('audio-player');
    player.classList.remove("left");
  }else {
    this.className = 'arrow-active';
    this.dataset.status = "show";

    var sidebar = document.getElementById('sidebar');
    sidebar.className = 'sidebar-hide';

    var library = document.getElementById('Library');
    library.classList.remove('library');

    var playlist = document.getElementById('divPlaylist');
    playlist.classList.add('playlist-sidebar-hided');

    var player = document.getElementById('audio-player');
    player.classList.add("left");

  }
});
