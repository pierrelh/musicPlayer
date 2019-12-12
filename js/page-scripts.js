function mediaPlayerAppear(song, previous, next){
  var musicPlayer = document.getElementById('musicPlayer');
  var readerPlayer = document.getElementById('readerPlayer');
  var nameTxt = document.getElementById('songName');
  console.log(song);
  console.log(previous);
  nameTxt.innerHTML = song['file_author'] + " - " + song['file_name'];
  musicPlayer.src = song['file_url'];
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
