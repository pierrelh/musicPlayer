$(document).ready(function () {
  var progressBar = document.getElementById("ProgressBar");
  var player = document.getElementById("MusicPlayer");

  player.load();
  player.volume = 1;

  // $("#Volume").change(function (e) {
  //   var percent = ($(this).val() / 100) * 100;

  //   $(this).css("background-image",
  //       "-webkit-gradient(linear, left top, right top, " +
  //       "color-stop(" + percent + "%, #FFF), " +
  //       "color-stop(" + percent + "%, #0B0B0B)" +
  //       ")");
  // });

  // $("#Volume").mousemove(function (e) {
  //   var percent = ($(this).val() / 100 ) * 100;

  //   $(this).css("background-image",
  //       "-webkit-gradient(linear, left top, right top, " +
  //       "color-stop(" + percent + "%, #FFF), " +
  //       "color-stop(" + percent + "%, #0B0B0B)" +
  //       ")");
  // });

  // progressBar.addEventListener("input", function(){
  //   player.currentTime = player.duration / progressBar.max * progressBar.value;
  // }, false);
});

function playNextSongAtEnd(identifier) {
  var loopButtonClass = document.getElementById("Loop").classList;
  var randomButtonClass = document.getElementById("Random").classList;
  switch (loopButtonClass[0]) {
    case "fa-loop-one":
      identifier = identifier;
      break;

    case "fa-no-loop":
      switch (randomButtonClass[0]) {
        case 'fa-random':
          var lastSongList = document.getElementById("LibraryObjects").lastChild;
          var lastSong = lastSongList.firstChild;
          if (lastSong.id == "playedMusic") {
            var lastSong = lastSong.nextElementSibling;
          }
          var lastSongId = Number(lastSong.id);
          identifier = Math.floor(Math.random() * Math.floor(lastSongId+1));
          break;
        case 'fa-no-random':
          if (document.getElementById(identifier+1) != undefined) {
            identifier = identifier + 1;
          }else {
            identifier = 'stop';
          }
          break;
        default:
          if (document.getElementById(identifier+1) != undefined) {
            identifier = identifier + 1;
          }else {
            identifier = 'stop';
          }
        }
      break;

    case "fa-loop":
      switch (randomButtonClass[0]) {
        case 'fa-random':
          var lastSongList = document.getElementById("LibraryObjects").lastChild;
          var lastSong = lastSongList.firstChild;
          if (lastSong.id == "playedMusic") {
            var lastSong = lastSong.nextElementSibling;
          }
          var lastSongId = Number(lastSong.id);
          identifier = Math.floor(Math.random() * Math.floor(lastSongId+1));
          break;
        case 'fa-no-random':
          if (document.getElementById(identifier+1) != undefined) {
            identifier = identifier + 1;
          }else {
            identifier = 0;
          }
          break;
        default:
          if (document.getElementById(identifier+1) != undefined) {
            identifier = identifier + 1;
          }else {
            identifier = 0;
          }
        }
      break;

    default:
      if (document.getElementById(identifier+1) != undefined) {
        identifier = identifier + 1;
      }else {
        identifier = 0;
      }
  }
  mediaPlayerAppear(identifier)
}
