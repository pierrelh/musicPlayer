function backgroundAppear() {
  var background = document.getElementById('background');
  background.className = 'background-appear';
}

function backgroundHide() {
  var background = document.getElementById('background');
  background.className = '';
}

document.getElementById("arrow").addEventListener("click", function(){
  if (this.dataset.status == 'hidden') { // Show the sidebar and reduce the librarys and the player
    this.dataset.status = "show";
    this.className = 'arrow';

    document.getElementById('sidebar').classList.remove('sidebar-hide');

    document.getElementById('Library').classList.add('library');

    document.getElementById('divPlaylist').classList.remove('playlist-sidebar-hided');

    document.getElementById('audio-player').classList.remove("left");
  }else { // Hide the sidebar and enlarge the librarys and the player
    this.className = 'arrow-active';
    this.dataset.status = "hidden";

    document.getElementById('sidebar').classList.add('sidebar-hide');

    document.getElementById('Library').classList.remove('library');

    document.getElementById('divPlaylist').classList.add('playlist-sidebar-hided');

    document.getElementById('audio-player').classList.add("left");
  }
});
