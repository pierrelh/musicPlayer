function mediaPlayerAppear(identifier){
  var song = document.getElementById('identifer');
  var url = song.dataset.url;
  var artist = song.dataset.artist;
  var title = song.dataset.title;
  console.log(url);
  console.log(artist);
  console.log(title);
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
