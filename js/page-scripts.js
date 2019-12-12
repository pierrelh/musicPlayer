function mediaPlayerAppear(identifier){
  var song = document.getElementById('identifier');
  var url = song.dataset.url;
  var author = song.dataset.artist;
  var name = song.dataset.title;
  console.log(url);
  console.log(artist);
  console.log(title);
  var musicPlayer = document.getElementById('musicPlayer');
  var readerPlayer = document.getElementById('readerPlayer');
  var nameTxt = document.getElementById('songName');
  nameTxt.innerHTML = author + " - " + name;
  musicPlayer.src = url;
  var audioPlayer = document.getElementById('audio-player');
  audioPlayer.className = 'show';
  document.getElementById('Previous').onclick = function () {
    if (identifier != 0) {
      identifier = identifier - 1;
    }
    mediaPlayerAppear(identifier);
  };
  document.getElementById('Next').onclick = function () {
    if (document.getElementById(identifier+1) != undefined) {
      identifier = identifier - 1;
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
