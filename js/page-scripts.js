function mediaPlayerAppear(song, previous, next){
  var musicPlayer = document.getElementById('musicPlayer');
  var readerPlayer = document.getElementById('readerPlayer');
  var nameTxt = document.getElementById('songName');
  console.log(JSON.stringify(song));
  console.log(JSON.stringify(previous));
  console.log(JSON.stringify(next));
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
