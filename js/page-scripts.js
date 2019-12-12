function mediaPlayerAppear(identifier){
  var song = document.getElementById('identifer');
  var raw = song.value;
  console.log(raw);
  var value = JSONparse(song.value);
  console.log(value);
  var url = song;
  // var musicPlayer = document.getElementById('musicPlayer');
  // var readerPlayer = document.getElementById('readerPlayer');
  // var nameTxt = document.getElementById('songName');
  // nameTxt.innerHTML = song['file_author'] + " - " + song['file_name'];
  // musicPlayer.src = song['file_url'];
  // var audioPlayer = document.getElementById('audio-player');
  // audioPlayer.className = 'show';
  // document.getElementById('Previous').onclick = function () {
  //   mediaPlayerAppear(previous);
  // };
  // document.getElementById('Next').onclick = function () {
  //   mediaPlayerAppear(next);
  // };
}

function backgroundAppear(){
  var background = document.getElementById('background');
  background.className = 'background-appear';
}

function backgroundHide(){
  var background = document.getElementById('background');
  background.className = '';
}
