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

    document.getElementById('sidebar').className = 'sidebar';

    document.getElementById('Library').classList.add('library');

    document.getElementById('divPlaylist').classList.remove('playlist-sidebar-hided');

    document.getElementById('audio-player').classList.remove("left");
  }else {
    this.className = 'arrow-active';
    this.dataset.status = "hidden";

    document.getElementById('sidebar').className = 'sidebar-hide';

    document.getElementById('Library').classList.remove('library');

    document.getElementById('divPlaylist').classList.add('playlist-sidebar-hided');

    document.getElementById('audio-player').classList.add("left");
  }
});
