$(document).ready(function () {
  // var start = $("#Start");
  // var time = $("#time");
  var progressBar = document.getElementById("ProgressBar");
  var player = document.getElementById("MusicPlayer");
  // var duration = 0;

  // player.onloadedmetadata = function() {
  //   duration = player.duration;
  //   progressBar.max = duration;
  //   time.text(getTime(player.duration));
  // };

  player.load();
  player.volume = 1;

  // player.addEventListener("timeupdate", function() {
  //   progressBar.value = player.currentTime;
  //   start.text(getTime(player.currentTime));
  //   var percent = (progressBar.value / 100) * 100;

  //   $("#ProgressBar").css("background-image",
  //       "-webkit-gradient(linear, left top, right top, " +
  //       "color-stop(" + percent + "%, #FFF), " +
  //       "color-stop(" + percent + "%, #0B0B0B)" +
  //       ")");
  // }, false);

  // player.addEventListener("ended", function(){
  //      player.currentTime = 0;
  //      var url = player.src;
  //      var library = document.querySelector("#Library");
  //      var element = library.querySelectorAll("li[data-url='" + url + "']")[0];
  //      if (element != undefined) {
  //        var identifier = parseInt(element.id);
  //        playNextSongAtEnd(identifier);
  //      }
  // });

  $("#Volume").change(function (e) {
    var percent = ($(this).val() / 100) * 100;

    $(this).css("background-image",
        "-webkit-gradient(linear, left top, right top, " +
        "color-stop(" + percent + "%, #FFF), " +
        "color-stop(" + percent + "%, #0B0B0B)" +
        ")");
  });

  $("#Volume").mousemove(function (e) {
    var percent = ($(this).val() / 100 ) * 100;

    $(this).css("background-image",
        "-webkit-gradient(linear, left top, right top, " +
        "color-stop(" + percent + "%, #FFF), " +
        "color-stop(" + percent + "%, #0B0B0B)" +
        ")");
  });

  // function getTime(t) {
  //   var m = ~~(t / 60),
  //     s = ~~(t % 60);
  //   return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
  // }

  progressBar.addEventListener("input", function(){
    player.currentTime = player.duration / progressBar.max * progressBar.value;
  }, false);
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
