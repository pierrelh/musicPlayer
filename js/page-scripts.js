function mediaPlayerAppear(link, cover, artist, name){
  // var mediaPlayer = document.getElementById('mediaPlayer');
  var musicPlayer = document.getElementById('musicPlayer');
  var readerPlayer = document.getElementById('readerPlayer');
  var nameTxt = document.getElementById('songName');
  nameTxt.innerHTML = artist + " - " + name;
  // mediaPlayer.className = 'background-appear';
  musicPlayer.src = link;
  // document.getElementById('cover').src = cover;
  var audioPlayer = document.getElementById('audio-player');
  audioPlayer.className = 'show';
}

function mediaPlayerHide(){
  var mediaPlayer = document.getElementById('mediaPlayer');
  mediaPlayer.className = '';
  var audioPlayer = document.getElementById('audio-player');
  audioPlayer.className = 'show';
}

function backgroundAppear(){
  var background = document.getElementById('background');
  background.className = 'background-appear';
}

function backgroundHide(){
  var background = document.getElementById('background');
  background.className = '';
}
